import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { stateRouter } from "./state";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,

  state: stateRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
