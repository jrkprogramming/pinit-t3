/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { pinRouter } from "~/server/api/routers/pin"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  pin: pinRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
