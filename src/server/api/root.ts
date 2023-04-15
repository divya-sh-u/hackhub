import { createTRPCRouter } from "~/server/api/trpc";
import { projectRouter } from "./routers/project";
import { authRouter } from "./routers/auth";
import { postRouter } from "./routers/post";
import { userRouter } from "./routers/user";
import { communityRouter } from "./routers/community";
import { messageRouter } from "./routers/message";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  auth:  authRouter,
  projects: projectRouter,
  user: userRouter,
  community: communityRouter,
  message: messageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
