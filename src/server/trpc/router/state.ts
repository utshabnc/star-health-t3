import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import _ from "lodash";

export const stateRouter = router({
  stateQuery: publicProcedure
    .input(
      z
        .object({
          id: z.string(),
          year: z.string().optional(),
          drugType: z.string().optional(),
        })
        .nullish()
    )
    .query(async ({ ctx, input }) => {
      // TODO - not sure if this always works
      const { id, drugType, year } = input ?? {};

      const state = ctx.prisma.state.findFirst({
        where: { id },
        select: {
          id: true,
          name: true,
          rank: true,
        },
      });

      const summary = await ctx.prisma.stateSummary.findFirst({
        where: {
          stateId: id,
          drugType: drugType ?? "ALL",
          year: year ?? "ALL",
        },
      });

      const items = await ctx.prisma.stateItem.findMany({
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

      const topManufacturers = await ctx.prisma.stateManufacturer.findMany({
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

      const topDoctors = await ctx.prisma.stateDoctor.findMany({
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

      const counties = await ctx.prisma.stateCounty.findMany({
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

  allStatesQuery: publicProcedure
    .input(
      z.object({
        drugType: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const states = await ctx.prisma.stateSummary.findMany({
        where: {
          year: "ALL",
          drugType: input.drugType ?? "ALL",
        },
        select: {
          stateId: true,
          totalAmount: true,
        },
      });

      return states;
    }),
});
