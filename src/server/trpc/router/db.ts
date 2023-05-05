import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import _ from "lodash";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "./_app";
import { Doctor, Payment, Prisma, Product, Review } from "@prisma/client";
import { filterDuplicateObjArr, filterDuplicates } from "../../../utils";
import { useSession } from "next-auth/react";

const directoryInput = z.object({
  subject: z.string().optional(),
  specialty: z.string().optional(),
  state: z.string().optional(), 
  city: z.string().optional(), 
  zipCode: z.string().optional(), 
  type: z.string().optional(), 
  category: z.string().optional(),
  doctorFilter: z.string().optional(),
  manufacturerFilter: z.string().optional(),
  productFilter: z.string().optional(),
  opioidTreatmentProviderFilter: z.string().optional(),
  cursor: z.string().optional(),
  year: z.string().optional(),
  price: z.object({
    min: z.number().optional(), 
    max: z.number().optional()
  }).optional(),
  name: z.string().optional(),
  drugManufacturer: z.string().optional(),
  drugType: z.string().optional(),
  drugRoute: z.string().optional(),
  altName: z.string().optional()
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

const defaultOpioidTreatmentSelect = Prisma.validator<Prisma.OpioidTreatmentSelect>()(
  {
    id: true,
    npi: true,
    provider_name: true,
    address_line_1: true,
    address_line_2: true,
    city: true,
    state: true,
    zip: true,
    phone: true,
    medicare_id_effective_date: true,
  }
);

const defaultDrugSelect = Prisma.validator<Prisma.DrugsSelect>()({
  id: true,
  brand_name: true,
  generic_name: true,
  manufacturer_name: true,
  effective_time: true,
  product_type: true,
  route: true,
  purpose: true,
  warnings_and_cautions: true,
  adverse_reactions: true,
  description: true,
  clinical_studies: true,
  active_ingredient: true,
  laboratory_tests: true,
  instructions_for_use: true,
  overdosage: true,
  microbiology: true,

})

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
          addressLine1: true,
          specialty: true

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
        include: {
          ManufacturerSummary: {
            where: {
              year: "ALL"
            }
          }
        },
        orderBy: {
          rank: "asc"
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

      const opioidTreatmentProviders = await prisma.opioidTreatment.findMany({
        where: {
          provider_name: {
            contains: search,
            mode: "insensitive"
          },

        },
        select: {
          id: true,
          npi: true,
          provider_name: true,
          address_line_1: true,
          address_line_2: true,
          city: true,
          state: true,
          zip: true,
          phone: true,
          medicare_id_effective_date: true,
        },
        take: 10,
      
      }) 
      
      return { doctors, manufacturers, products, opioidTreatmentProviders };
    }),

  doctor: publicProcedure
    .input(
      z.object({
        id: z.string(),
        year: z.string().optional(),
      })
    )
    .query(async ({ ctx: { prisma }, input: { id, year } }) => {
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
          reviews: {
            include: {
              user: true,
            },
          }
        },
      });

      const payments =
        doctor?.payments.filter((p) => !year || p.year === year) ?? [];

      const totalAmount = _.round(_.sum(payments.map((p) => p.amount)), 2);

      const topProducts = _(payments)
        .groupBy(p => p.product.name)
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

      return {
        ...doctor,
        payments,
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

    opioidTreatment: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx: { prisma }, input: { id } }) => {
      const opioidTreatmentprovider = await prisma.opioidTreatment.findFirst({
        where: { id },
        select: defaultOpioidTreatmentSelect,
      });

      return {
        ...opioidTreatmentprovider,
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

  drugs: publicProcedure
  .input(z.object({
    id: z.string()
  })).query(async ({ ctx: { prisma }, input: {id}}) => {
    const drug = await prisma.drugs.findFirst({
      where: { id },
      select: {
        ...defaultDrugSelect
      },
    });
    return {drug}
  }),

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
        .groupBy(d => d.doctor.firstName)
        .map((pmts, doctorName) => ({
          doctorName,
          amount: _.round(_.sumBy(pmts, "amount"), 2),
          paymentNature: payments.find((payment) => payment.doctor.firstName === doctorName)?.paymentNature,
          count: pmts.length
        }))
        .value()

      const topManufacturers = _(payments)
        .groupBy(m => m.manufacturer.name)
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

      if(input.subject?.toLowerCase().trim() === "doctors"){
        const names = input.name?.split(" ")
        let doctors: any = []

        if(names && names?.length === 1) {
          // console.log("HITTT")
          doctors = await prisma.doctor.findMany({
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
                },
                {
                  OR: [
                    {
                      firstName: {
                        contains: names[0],
                        mode: "insensitive"
                      },
                    },
                    {
                      lastName: {
                        contains: names[0],
                        mode: "insensitive"
                      },

                    }
                    

                  ]
                  
                }
              ]  
            },
            cursor: {
              id: input.cursor ? input.cursor : "1"
            },
            take: 10
          });
        }

        if(names && names?.length > 1) {
          doctors = await prisma.doctor.findMany({
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
                },
                {
                  firstName: {
                    contains: names[0],
                    mode: "insensitive"
                  },
                  lastName: {
                    contains: names[names.length -1],
                    mode: "insensitive"
                  }
                }
              ]  
            },
            cursor: {
              id: input.cursor ? input.cursor : "1"
            },
            take: 10
          });
        }

        if(!names) {
          doctors = await prisma.doctor.findMany({
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
                },
              ]  
            },
            cursor: {
              id: input.cursor ? input.cursor : "1"
            },
            take: 100
          });

        }

        const cities = doctors.map((item: any) => {
          return item.city
        })

        const zipCodes = doctors.map((item: any) => {
          return item.zipCode
        })

        const specialties = doctors.map((item: any) => {
          return item.specialty
        })

        return {doctors, cities: filterDuplicates(cities), zipCodes: filterDuplicates(zipCodes), specialties: filterDuplicates(specialties)}

      }

      if(input.subject?.toLowerCase() === "manufacturers"){
        const manufacturers = await prisma.manufacturer.findMany({
          where: {
            AND: [
              {
                state: input.state !== "" ? input.state : {not: ""}

              },
              {
                name: {
                  contains: input.name,
                  mode: "insensitive"
                }
              }
            ]
          },
          include: {
            ManufacturerSummary: {
              where: {
                year: input.year ? input.year : "ALL"
              }
            }
          },
          orderBy: {
            rank: "asc"
          },
          take: 100
        });

        const allYears = ["ALL", "2021", "2020", "2019", "2018", "2017","2016"]


        return {manufacturers, allYears}
      }

      if(input.subject?.toLowerCase() === "products"){
        const products = await prisma.product.findMany({
          where: {
            AND: [
              {
                type: input.type !== "" ? input.type : {not: ""}
              },
              {
                category: input.category !== "" ? input.category : {not: ""}
              },
              {
                name: {
                  contains: input.name,
                  mode: "insensitive"
                }
              }
            ]
          },
          // cursor: {
          //   id: input.cursor ? input.cursor : 
          // },
          take: 100
        });

        const productTypes = products.map(item => {
          return {
            type: item.type,
            category: item.category
          }
        })

        return {products, productTypes: filterDuplicateObjArr(productTypes, "type")}
      }

      if(input.subject?.toLowerCase() === "opioidtreatmentproviders"){
        const opioidTreatmentProviders = await prisma.opioidTreatment.findMany({
          where: {},
          take: 2000
        });

        return {opioidTreatmentProviders}
      }

      if(input.subject === "transactions"){
                
        const payments = await prisma.payment.findMany({
          where: {
            AND: [
              {
                doctorId: input.doctorFilter !== '' ? input.doctorFilter : {not: ""}
              },
              {
                manufacturerId: input.manufacturerFilter !== '' ? input.manufacturerFilter : {not: ''}
              },
              {
                productId: input.productFilter !== '' ? input.productFilter : {not: ""}
              },
              {
                product: {
                  name: {
                    contains: input.name,
                    mode: "insensitive"
                  }
                }
              },
              {
                amount: {gte: input.price?.min, lte: input.price?.max},
                
              }
            ]
          },
          include: {
            manufacturer: {
              select: {
                name: true,
                id: true
              }
            },
            doctor: {
              select: {
                firstName: true,
                lastName: true,
                id: true
              }
            },
            product: {
              select: {
                name: true,
                type: true
              } 
            }
          },
          orderBy: {
            year: "desc"
          },
          // cursor: {
          //   id: input.cursor ? input.cursor : "345881410"
          // },
          take: !input.name ? 250 : 10,
          
        })
        

        let doctorNames = [];
        let manufacturerNames = [];
        let productNameList = [];

        doctorNames = payments.map(item => {
          return {
            id: item.doctorId,
            name: `${item.doctor.firstName} ${item.doctor.lastName}`
          }
        })

        manufacturerNames = payments.map(item => {
          return {
            id: item.manufacturer.id,
            name: item.manufacturer.name
          }
        })

        productNameList = payments.map(item => {
          return {
            id: item.productId,
            name: item.product.name
          }
        })



        return {payments: payments.sort((a:any,b: any) => b.date - a.date), manufacturerList: filterDuplicateObjArr(manufacturerNames, "id"), doctorList: filterDuplicateObjArr(doctorNames, "id"), productNameList: filterDuplicateObjArr(productNameList, "id")}

      }

      if(input.subject?.toLowerCase() === "top-manufacturer"){
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

      if (input.subject?.toLowerCase() === 'drugs') {

        let drugs = []
        if (input.name) {
          drugs = await prisma.drugs.findMany({
            where: {
              AND: [
                {
                  brand_name: {
                    contains: input.name,
                    mode: "insensitive"
                  }
                },
                
              ]
            },
            orderBy: {brand_name: 'asc'},
            take: 100
          })
        } else if (input.drugManufacturer) {
          drugs = await prisma.drugs.findMany({
            where: {
              AND: [
                {
                  manufacturer_name: {
                    contains: input.drugManufacturer,
                    mode: "insensitive"
                  }
                },
                
              ]
            },
            orderBy: {brand_name: 'asc'},
            take: 100
          })
        } else if (input.drugRoute && !input.drugManufacturer) {
          drugs = await prisma.drugs.findMany({
            where: {
              AND: [
                {
                  route: {
                    contains: input.drugRoute,
                    mode: "insensitive"
                  }
                },
                
              ]
            },
            orderBy: {brand_name: 'asc'},
            take: 100
          })
        } else if (input.drugType && !input.drugManufacturer) {
          drugs = await prisma.drugs.findMany({
            where: {
              AND: [
                {
                  product_type: {
                    contains: input.drugType,
                    mode: "insensitive"
                  }
                },
                
              ]
            },
            orderBy: {brand_name: 'asc'},
            take: 100
          })
        } else {
        drugs = await prisma.drugs.findMany({
          where: {
            AND: [
              {
                brand_name: {
                  contains: input.name,
                  mode: "insensitive"
                }
              },
              
            ]
          },
          orderBy: {brand_name: 'asc'},
          take: 100
        })
      }
        if (input.drugRoute) {
          drugs = drugs.filter(drug => drug.route?.toLowerCase() === input.drugRoute?.toLowerCase())
        }
        if (input.drugManufacturer) {
          drugs = drugs.filter(drug => drug.manufacturer_name?.toLowerCase() === input.drugManufacturer?.toLowerCase())
        }
        if (input.drugType) {
          drugs = drugs.filter(drug => drug.product_type?.toLowerCase() === input.drugType?.toLowerCase())
        }
        if (input.name) {
          drugs = drugs.filter(drug => drug?.brand_name?.toLowerCase()?.includes(input?.name?.toLowerCase() || ''))
        }
      
        // console.log(drugs.length)
        let manufacturerNames = drugs.map(item => {
          return {
            id: item.id,
            name: item?.manufacturer_name
          }
        })
        // console.log(manufacturerNames.length)
        manufacturerNames = manufacturerNames.filter(manu => manu?.name)
        manufacturerNames = manufacturerNames.sort()

        let routeNames = drugs.map(item => {
          return {
            id: item.id,
            name: item?.route
          }
        })
        routeNames = routeNames.filter(route => route?.name)

        let typeNames = drugs.map(item => {
          return {
            id: item.id,
            name: item?.product_type
          }
        })
        typeNames = typeNames.filter(type => type?.name)

        
        const allYears = ["ALL", "2023", "2022", "2021", "2020", "2019", "2018", "2017","2016"]
        return {drugs, allYears,  manufacturerNames, routeNames: filterDuplicateObjArr(routeNames, 'name'), typeNames: filterDuplicateObjArr(typeNames, 'name')}
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

      
    }),
    nameList: publicProcedure.query(async ({ctx: {prisma}}) => {
      let doctorNames = [];
      let productNameList = [];
      let drugNames = [];
      let opioidTreatmentProviderNames = [];
      const manufacturers = await prisma.manufacturer.findMany({
        where: {
          payments: {none: undefined}
        },
        select: {
          id: true,
          name: true,
        },
        take: 1000
      })
      const products = await prisma.product.findMany({
        select: {
          id: true,
          name: true
        },
        take: 1000
      })
      const doctors = await prisma.doctor.findMany({
        select: {
          id: true,
          firstName: true,
          lastName: true
        },
        take: 1000
      })

      const opioidTreatmentProviders = await prisma.opioidTreatment.findMany({
        select: {
          id: true,
          provider_name: true
        },
        take: 1000
      })

      const drugs = await prisma.drugs.findMany({
        select: {
          id: true,
          brand_name: true
        },
        take: 1000
      })

      drugNames = drugs.map(item => {
        return {
          id: item.id,
          name: item.brand_name
        }
      })

      doctorNames = doctors.map(item => {
        return {
          id: item.id,
          name: `${item.firstName} ${item.lastName}`
        }
      })

      opioidTreatmentProviderNames = opioidTreatmentProviders.map(item => {
          return {
            id: item.id,
            name: item.provider_name
          }})

      // manufacturerNames = manufacturers.map(item => {
      //   return {
      //     id: item.id,
      //     name: item.name
      //   }
      // })

      // manufacturers.filter(item => {
      //   return item.payments.length > 0
      // })

      
      productNameList = products.map(item => {
        return {
          id: item.id,
          name: item.name
        }
      })
      
      // testing out query to get accurate list items that have payment relationships
      // const payments = await prisma.payment.findMany({
      //   select: {
      //     manufacturer: {
      //       select: {
      //         id: true,
      //         name: true
      //       }
      //     }
          
      //   },
      //   take: 5000
      // })

      // const manufacturers = payments.map(item => {
      //   return {
      //     id: item.manufacturer.id,
      //     name: item.manufacturer.name
      //   }
      // })
    
     
      
        
      return {
        drugNames: filterDuplicateObjArr(drugNames, "id"),
        doctorNames: filterDuplicateObjArr(doctorNames, "id"),
        manufacturerNames: filterDuplicateObjArr(manufacturers, "id"),
        productNameList: filterDuplicateObjArr(products, "id"),
        opioidTreatmentProviderNames: filterDuplicateObjArr(opioidTreatmentProviders, "id"),
      }
      // return {}
    })
    ,

    /**
     * Add a review if a user can review a doctor (one per user per doctor)
     * 
     * @param doctorId the doctor to review
     * @param rating the rating to give the doctor
     * @param text the text of the review
     * @returns the review that was created, or { error: string } if the user cannot review the doctor
     */
    addReview: publicProcedure
    .input(z.object({
      doctorId: z.string(),
      rating: z.number(),
      text: z.string(),
    }))
    .mutation(async ({ctx: {prisma, session}, input}) => {
      const reviewInput: Prisma.ReviewUncheckedCreateInput = {
        ...input,
        createdBy: session?.user?.id || "anonymous",
      }
      const hasReviewed = await prisma.review.findFirst({
        where: {
          doctorId: input.doctorId,
          createdBy: session?.user?.id,
        }
      });
      if (hasReviewed) {
        return { review: hasReviewed, error: "You have already reviewed this doctor." } as const;
      }
      const review = await prisma.review.create({
        data: reviewInput,
      });
      return {review} as const;
    }),
});

type RouterOutput = inferRouterOutputs<AppRouter>;
export type SearchResponse = RouterOutput["db"]["search"];
export type DoctorResponse = RouterOutput["db"]["doctor"];
export type OpioidTreatmentProviderResponse = RouterOutput["db"]["opioidTreatment"];
export type ManufacturerResponse = RouterOutput["db"]["manufacturer"];
export type StateResponse = RouterOutput["db"]["state"];
export type AllStatesResponse = RouterOutput["db"]["allStates"];
export type ProductResponse = RouterOutput["db"]["product"];
export type DirectoryResponse = RouterOutput["db"]["directory"];
export type NameListResponse = RouterOutput["db"]["nameList"];
export type addReviewResponse = RouterOutput["db"]["addReview"];
export type DrugResponse = RouterOutput["db"]["drugs"]