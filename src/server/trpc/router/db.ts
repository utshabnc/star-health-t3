import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import _ from "lodash";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "./_app";
import { Prisma } from "@prisma/client";
import { filterDuplicateObjArr, filterDuplicates } from "../../../utils";

const directoryInput = z.object({
  subject: z.string(),
  specialty: z.string().optional(),
  state: z.string().optional(), 
  city: z.string().optional(), 
  zipCode: z.string().optional(), 
  type: z.string().optional(), 
  category: z.string().optional(),
  doctorFilter: z.string().optional(),
  manufacturerFilter: z.string().optional(),
  productFilter: z.string().optional(),
  cursor: z.string().optional(),
  year: z.string().optional()

})

const defaultDoctorSelect = Prisma.validator<Prisma.DoctorSelect>()({
  id: true,
  firstName: true,
  middleName: true,
  lastName: true,
  addressLine1: true,
  addressLine2: true,
  city: true,
  state: true,
  zipCode: true,
  specialty: true,
  reviews: true,
  rank: true,
});

// added selections for product
const defaultProductSelect = Prisma.validator<Prisma.ProductSelect>()({
  id: true,
  type: true,
  name: true,
  category: true,
});

const defaultReviewSelect = Prisma.validator<Prisma.ReviewSelect>()({
  id: true,
  doctorId: true,
  rating: true,
  text: true,
  createdAt: true,
  createdBy: true,
});

const defaultManufacturerSelect = Prisma.validator<Prisma.ManufacturerSelect>()(
  {
    id: true,
    name: true,
    state: true,
    country: true,
    rank: true,
  }
);

export const db = router({
  search: publicProcedure
    .input(z.string())
    .query(async ({ ctx: { prisma }, input: search }) => {
      const names = search.split(" ");
      

      let searchArgs: Prisma.DoctorWhereInput = {
        OR: [
          {
            firstName: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            lastName: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      };

      if (names.length === 2) {
        searchArgs = {
          AND: [
            {
              firstName: {
                startsWith: names[0],
                mode: "insensitive",
              },
            },
            {
              lastName: {
                startsWith: names[1],
                mode: "insensitive",
              },
            },
          ],
        };
      } else if (names.length > 2) {
        searchArgs = {
          AND: [
            {
              firstName: {
                startsWith: names[0],
                mode: "insensitive",
              },
            },
            {
              middleName: {
                startsWith: names[1],
                mode: "insensitive",
              },
            },
            {
              lastName: {
                startsWith: names[2],
                mode: "insensitive",
              },
            },
          ],
        };
      }

      const doctors = await prisma.doctor.findMany({
        where: searchArgs,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          city: true,
          state: true,
        },
        take: 10,
      });
      

      const manufacturers = await prisma.manufacturer.findMany({
        where: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        
        take: 10,
      });

      const products = await prisma.product.findMany({
        where: {
          name: {
            contains: search,
            mode: "insensitive"
          },

        },
        take: 10,
      
      }) 
      
      console.log(doctors)

      return { doctors, manufacturers, products };
    }),

  doctor: publicProcedure
    .input(
      z.object({
        id: z.string(),
        year: z.string().optional(),
      })
    )
    .query(async ({ ctx: { prisma }, input: { id, year } }) => {
      console.log(id);
      
      const doctor = await prisma.doctor.findFirst({
        where: { id },
        select: {
          ...defaultDoctorSelect,
          payments: {
            include: {
              product: true,
            },
            where: year ? { year } : undefined,
            take: 50,
          },
        },
      });
      console.log(doctor)
      const payments =
        doctor?.payments.filter((p) => !year || p.year === year) ?? [];

      const totalAmount = _.round(_.sum(payments.map((p) => p.amount)), 2);

      const topProducts = _(payments)
        .groupBy("product.name")
        .map((pmts, productName) => ({
          productName,
          amount: _.round(_.sumBy(pmts, "amount"), 2),
          type: payments.find((p) => p.product.name === productName)?.product
            .type,
          count: pmts.length,
        }))
        .value();

      const topManufacturers = _(payments)
        .groupBy("manufacturerName")
        .map((pmts, manufacturerName) => ({
          manufacturerName,
          amount: _.round(_.sumBy(pmts, "amount"), 2),
          count: pmts.length,
        }))
        .value();

      const reviews = await Promise.all(
        doctor?.reviews?.map(async (review) => ({
          ...review,
          // TODO
          // user: await getUser(review.createdBy).catch(() => {}),
        })) ?? []
      );

      return {
        ...doctor,
        payments,
        reviews,
        totalAmount,
        topProducts,
        topManufacturers,
      };
    }),

  manufacturer: publicProcedure
    .input(
      z.object({
        id: z.string(),
        year: z.string().optional(),
      })
    )
    .query(async ({ ctx: { prisma }, input: { id, year } }) => {
      const manufacturer = await prisma.manufacturer.findFirst({
        where: { id },
        select: defaultManufacturerSelect,
      });

      const summary = await prisma.manufacturerSummary.findFirst({
        where: {
          manufacturerId: id,
          year: year ?? "ALL",
        },
        select: {
          totalAmount: true,
        },
      });

      const topDoctors = await prisma.manufacturerDoctors.findMany({
        where: {
          manufacturerId: id,
          year: year ?? "ALL",
        },
        select: {
          doctor: {
            select: {
              id: true,
              firstName: true,
              middleName: true,
              lastName: true,
            },
          },
          totalAmount: true,
          transactionCount: true,
        },
      });

      const largestPayments = await prisma.manufacturerTopPayment.findMany({
        where: {
          manufacturerId: id,
          year: year ?? "ALL",
        },
        select: {
          doctor: {
            select: {
              id: true,
              firstName: true,
              middleName: true,
              lastName: true,
            },
          },
          amount: true,
        },
      });

      const topStates = await prisma.manufacturerState.findMany({
        where: {
          manufacturerId: id,
          year: year ?? "ALL",
        },
        select: {
          state: true,
          totalAmount: true,
          transactionCount: true,
        },
      });

      const items = await prisma.manufacturerItems.findMany({
        where: {
          manufacturerId: id,
          year: year ?? "ALL",
        },
      });

      return {
        ...manufacturer,
        totalAmount: summary?.totalAmount ?? 0,
        largestPayments,
        items,
        topDoctors,
        topStates,
      };
    }),

  state: publicProcedure
    .input(
      z.object({
        id: z.string(),
        year: z.string().optional(),
        drugType: z.string().optional(),
      })
    )
    .query(async ({ ctx: { prisma }, input: { id, drugType, year } }) => {
      const state = await prisma.state.findFirst({
        where: { id },
        select: {
          id: true,
          name: true,
          rank: true,
        },
      });

      const summary = await prisma.stateSummary.findFirst({
        where: {
          stateId: id,
          drugType: drugType ?? "ALL",
          year: year ?? "ALL",
        },
      });

      const items = await prisma.stateItem.findMany({
        where: {
          stateId: id,
          drugType: drugType ?? "ALL",
          year: year ?? "ALL",
        },
        select: {
          manufacturer: {
            select: {
              id: true,
              name: true,
            },
          },
          product: true,
          productId: true,
          totalAmount: true,
          transactionCount: true,
        },
        orderBy: {
          totalAmount: "desc",
        },
        take: 1000,
      });

      const mostCommonItems = _.sortBy(items, "transactionCount")
        .reverse()
        .slice(0, 10);
      const topItems = _.sortBy(items, "totalAmount").reverse().slice(0, 10);

      const topManufacturers = await prisma.stateManufacturer.findMany({
        where: {
          stateId: id,
          drugType: drugType ?? "ALL",
          year: year ?? "ALL",
        },
        select: {
          manufacturer: {
            select: {
              id: true,
              name: true,
            },
          },
          totalAmount: true,
          transactionCount: true,
        },
      });

      const topDoctors = await prisma.stateDoctor.findMany({
        where: {
          stateId: id,
          drugType: drugType ?? "ALL",
          year: year ?? "ALL",
        },
        select: {
          doctor: {
            select: {
              id: true,
              firstName: true,
              middleName: true,
              lastName: true,
            },
          },
          totalAmount: true,
          transactionCount: true,
        },
      });

      const counties = await prisma.stateCounty.findMany({
        where: {
          stateId: id,
          drugType: drugType ?? "ALL",
          year: year ?? "ALL",
        },
        select: {
          fips: true,
          name: true,
          totalAmount: true,
          population: true,
        },
      });

      return {
        ...state,
        totalAmount: summary?.totalAmount ?? 0,
        summaryRank: summary?.rank,
        mostCommonItems,
        topItems,
        topManufacturers,
        topDoctors,
        counties,
      };
    }),

  allStates: publicProcedure
    .input(
      z.object({
        drugType: z.string().optional(),
      })
    )
    .query(async ({ ctx: { prisma }, input: {drugType} }) => {
      const states = await prisma.stateSummary.findMany({
        where: {
          year: "ALL",
          drugType: drugType ?? "ALL",
        },
        select: {
          stateId: true,
          totalAmount: true,
        },
      });
      return states;
    }),
  // add in query for product model
  product: publicProcedure
    .input(
      z.object({
        id: z.string(),
        year: z.string().optional()
      })
    )
    .query(async ({ ctx: { prisma }, input: {id, year}}) => {
      const product = await prisma.product.findFirst({
        where: { id },
        select: {
          ...defaultProductSelect,
          payments: {
            include: {
              doctor: true,
              manufacturer: true,
            },
            where: year ? { year } : undefined,
            take: 50,
          },
        },
      });

      // check for no result -- uncomment once there is data to display
      // if(!product){
      //   return {errMsg: "Product not found"}
      // }

      const payments =
        product?.payments.filter((p) => !year || p.year === year) ?? [];

      const totalAmount = _.round(_.sum(payments.map((p) => p.amount)), 2);

      const topDoctors = _(payments)
        .groupBy("doctor.lastName")
        .map((pmts, doctorName) => ({
          doctorName,
          amount: _.round(_.sumBy(pmts, "amount"), 2),
          paymentNature: payments.find((payment) => payment.doctor.firstName === doctorName)?.paymentNature,
          count: pmts.length
        }))
        .value()

      const topManufacturers = _(payments)
        .groupBy("manufacturer.name")
        .map((pmts, manufacturerName) => ({
          manufacturerName,
          amount: _.round(_.sumBy(pmts, "amount"), 2),
          paymentNature: payments.find((payment) => payment.manufacturerName === manufacturerName)?.paymentNature, 
          count: pmts.length
        }))
        .value()

      // group together the above results to make it easier for client to display all transactions for that given product whether doctor or manufacturer
      const transactionsSummary = [...topDoctors, ...topManufacturers];

      return {
        ...product,
        payments,
        totalAmount,
        topDoctors,
        topManufacturers,
        transactionsSummary
      }
    }),
  directory: publicProcedure
    .input(directoryInput)
    .query(async ({ctx: {prisma}, input}) => {
      console.log(input);
      

      if(input.subject.toLowerCase().trim() === "doctor"){
        const doctors = await prisma.doctor.findMany({
          where: {
            AND: [
              {
                state: input.state !== '' ? input.state : {not: ""}
              },
              {
                city: input.city !== "" ? input.city : {not: ""}
              },
              {
                zipCode: input.zipCode !== "" ? input.zipCode : {not: ""}
              },
              {
                specialty: input.specialty !== "" ? input.specialty : {not: ""}
              }
            ]  
          },
          cursor: {
            id: input.cursor ? input.cursor : "1"
          },
          take: 100
        });

        const cities = doctors.map(item => {
          return item.city
        })

        const zipCodes = doctors.map(item => {
          return item.zipCode
        })

        const specialties = doctors.map(item => {
          return item.specialty
        })

        return {doctors, cities: filterDuplicates(cities), zipCodes: filterDuplicates(zipCodes), specialties: filterDuplicates(specialties)}

      }

      if(input.subject.toLowerCase() === "manufacturer"){
        const manufacturers = await prisma.manufacturer.findMany({
          where: {
            state: input.state !== "" ? input.state : {not: ""}
          },
          include: {
            ManufacturerSummary: {
              where: {
                year: input.year ? input.year : "ALL"
              }
            }
          },
          cursor: {
            id: input.cursor ? input.cursor : "100000000103"
          },
          take: 50
        });

        const allYears = ["ALL", "2021", "2020", "2019", "2018", "2017","2016"]


        return {manufacturers, allYears}
      }

      if(input.subject.toLowerCase() === "product"){
        const products = await prisma.product.findMany({
          where: {
            AND: [
              {
                type: input.type !== "" ? input.type : {not: ""}
              },
              {
                category: input.category !== "" ? input.category : {not: ""}
              },
            ]
          },
          // cursor: {
          //   id: input.cursor ? input.cursor : 
          // },
          take: 5
        });

        const productTypes = products.map(item => {
          return item.type
        })

        const categories = products.map(item => {
          return item.category
        })

        return {products, productTypes: filterDuplicates(productTypes), categories: filterDuplicates(categories)}
      }

      if(input.subject === "payment"){
                
        const payments = await prisma.payment.findMany({
          where: {
            AND: [
              {
                doctorId: input.doctorFilter ? input.doctorFilter : {not: ""}
              },
              {
                manufacturerName: input.manufacturerFilter ? input.manufacturerFilter : {not: ''}
              },
              {
                productId: input.productFilter ? input.productFilter : {not: ""}
              }
            ]
          },
          include: {
            manufacturer: true,
            doctor: true,
            product: {
              select: {
                name: true,
                type: true
              } 
            }
          },
          cursor: {
            id: input.cursor ? input.cursor : "345881410"
          },
          take: 1000,
          
        })

        
        
        const doctorNames = payments.map(item => {
          return {
            id: item.doctorId,
            name: `${item.doctor.firstName} ${item.doctor.lastName}`
          }
        })

        const manufacturerNames = payments.map(item => {
          return item.manufacturerName
        })

        const productNameList = payments.map(item => {
          return {
            id: item.productId,
            name: item.product.name
          }
        })



        return {payments, manufacturerList: filterDuplicates(manufacturerNames), doctorList: filterDuplicateObjArr(doctorNames, "id"), productNameList: filterDuplicateObjArr(productNameList, "id")}

      }

      if(input.subject.toLowerCase() === "top-manufacturer"){
        const manufacturerSummary = await prisma.manufacturerSummary.findMany({
          where: {
            manufacturer: {
              state: input.state ? input.state : {not: ""}
            }
          },
          include: {
            manufacturer: {
              select: {
                name: true,
                state: true,
                ManufacturerTopPayment: true
              }
            },

          },
          orderBy: {
            totalAmount: "desc",
          },
          take: 25
        })

        manufacturerSummary.forEach(item => {
          return item.manufacturer.ManufacturerTopPayment.sort((a,b) => b.amount - a.amount)
        })
  
        return {manufacturerSummary}
      }

      const stateSummary = await prisma.payment.findMany({
        include: {
          doctor: true
        },
        
        take: 50
      })

      // const paymentSummary = await prisma.payment.groupBy({
      //   by: ["doctorId", "amount"],
      //   _sum: {
      //     amount: true
      //   },
      //   take: 1000,
      //   orderBy: {
      //     amount: "desc"
      //   }
      // })
      
      // else
      return {stateSummary}

      
    })
});

// TODO - consider moving these type defs
type RouterOutput = inferRouterOutputs<AppRouter>;
export type SearchResponse = RouterOutput["db"]["search"];
export type DoctorResponse = RouterOutput["db"]["doctor"];
export type ManufacturerResponse = RouterOutput["db"]["manufacturer"];
export type StateResponse = RouterOutput["db"]["state"];
export type AllStatesResponse = RouterOutput["db"]["allStates"];
export type ProductResponse = RouterOutput["db"]["product"];
export type DirectoryResponse = RouterOutput["db"]["directory"];