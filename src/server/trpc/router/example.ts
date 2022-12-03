import { z } from "zod";
import { trpc } from "../../../utils/trpc";

import { router, publicProcedure } from "../trpc";

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.doctor.findMany({
      take: 10
    });
  }),
  // otherThing: publicProcedure.query()
});

