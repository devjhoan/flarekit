import type { HonoEnv } from "./bindings";
import { logger } from "hono/logger";
import { auth } from "@/utils/auth";
import { Hono } from "hono";

// 🔔 Middlewares
import { authMiddleware } from "@/middlewares/auth";
import { corsMiddleware } from "@/middlewares/cors";

// 🌴 Routes
import { exampleRouter } from "@/routes/v1/example.router";

const app = new Hono<HonoEnv>();

// 🔔 Global middleware
app.use("*", corsMiddleware);
app.use("*", logger());

// 🚀 Public routes that don't require auth
app.on(["POST", "GET"], "/api/auth/*", (c) => auth(c).handler(c.req.raw));

// 🔒 Protected routes /admin/v1
const apiRoutes = app.use(authMiddleware).route("/api/v1/example", exampleRouter);

export default app;
export type ApiRoutes = typeof apiRoutes;
