import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import _ from "lodash";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "./_app";
import { Prisma } from "@prisma/client";

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
  payments: true,
  rank: true,
});

// added selections for product
const defaultProductSelect = Prisma.validator<Prisma.ProductSelect>()({
  id: true,
  type: true,
  name: true,
  category: true,
  payments: true,
  manufacturerItems: true,
  stateItem: true,
  stateDoctor: true,
  stateManufacturer: true,
  stateSummary: true
})

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

      // TODO -- add in prisma call for drugs(products) and include in the data returned
      const products = await prisma.product.findMany({
        where: {
          name: {
            contains: search,
            mode: "insensitive"
          }
        },
        take: 10
      })

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
      const doctor = await prisma.doctor.findFirst({
        where: { id },
        select: defaultDoctorSelect,
      });
      const payments =
        doctor?.payments.filter((p) => !year || p.year === year) ?? [];

      const totalAmount = _.round(_.sum(payments.map((p) => p.amount)), 2);

      const topProducts = _(payments)
        .groupBy("productName")
        .map((pmts, productName) => ({
          productName,
          amount: _.round(_.sumBy(pmts, "amount"), 2),
          type: payments.find((p) => p.productName === productName)
            ?.productType,
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

      // TODO
      // const reviews = await Promise.all(
      //   doctor?.reviews?.map(async (review) => ({
      //     ...review,
      //     user: await getUser(review.createdBy).catch(() => {}),
      //   })) ?? []
      // );

      return {
        ...doctor,
        payments,
        // reviews,
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
        category: z.string().optional(),
      })
    )
    .query(async ({ ctx: { prisma }, input: { id, category, year } }) => {
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
          // drugType: drugType ?? "ALL",
          product: {category: category ?? "ALL"},
          year: year ?? "ALL",
        },
      });

      const items = await prisma.stateItem.findMany({
        where: {
          stateId: id,
          // drugType: drugType ?? "ALL",
          product: {category: category ?? "ALL"},
          year: year ?? "ALL",
        },
        select: {
          manufacturer: {
            select: {
              id: true,
              name: true,
            },
          },
          productName: true,
          productType: true,
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
          // drugType: drugType ?? "ALL",
          product: {category: category ?? "ALL"},
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
          // drugType: drugType ?? "ALL",
          product: {category: category ?? "ALL"},
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
          // drugType: drugType ?? "ALL",
          product: {category: category ?? "ALL"},
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
        category: z.string().optional(),
      })
    )
    .query(async ({ ctx: { prisma }, input: {category} }) => {
      const states = await prisma.stateSummary.findMany({
        where: {
          year: "ALL",
          // drugType: drugType ?? "ALL",
          product: {category: category ?? "ALL"},
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
        where: {
          id
        },
        select: defaultProductSelect
      })

      const payments =
        product?.payments.filter((p) => !year || p.year === year) ?? [];

      const totalAmount = _.round(_.sum(payments.map((p) => p.amount)), 2);

      const topDoctors = _(payments)
        .groupBy("doctor.name")
        .map((pmts, doctorName) => ({
          doctorName,
          amount: _.round(_.sumBy(pmts, "amount"), 2),
          paymentNature: payments.find((payment) => payment.doctor.name === doctorName)?.paymentNature,
          count: pmts.length
        }))
        .value()

      const topManufacturers = _(payments)
        .groupBy("manufacturer.name")
        .map((pmts, manufacturerName) => ({
          manufacturerName,
          amount: _.round(_.sumBy(pmts, "amount"), 2),
          paymentNature: payments.find((payment) => payment.manufacturer.name === manufacturerName)?.paymentNature, 
          count: pmts.length
        }))

      // group together the above results to make it easier for client to display all transactions for that given product whether doctor or manufacturer
      const transactionsSummary = topDoctors.concat(topManufacturers);

      return {
        product,
        totalAmount,
        topDoctors,
        topManufacturers,
        transactionsSummary
      }
    })
});

// TODO - consider moving these type defs
type RouterOutput = inferRouterOutputs<AppRouter>;
export type SearchResponse = RouterOutput["db"]["search"];
export type DoctorResponse = RouterOutput["db"]["doctor"];
export type ManufacturerResponse = RouterOutput["db"]["manufacturer"];
export type StateResponse = RouterOutput["db"]["state"];
export type AllStatesResponse = RouterOutput["db"]["allStates"];
