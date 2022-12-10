import { router } from "../trpc";
import { authRouter } from "./auth";
import { db } from "./db";

export const appRouter = router({
  auth: authRouter,
  db: db,
});

// export type definition of API
export type AppRouter = typeof appRouter;
