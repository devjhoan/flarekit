import { auth, type Session } from "@/utils/auth";
import { logger } from "hono/logger";
import config from "@/utils/config";
import { Hono } from "hono";

// 🔔 Middlewares
import { authMiddleware } from "@/middlewares/auth";
import { corsMiddleware } from "@/middlewares/cors";

// 🌴 Routes
import { exampleRouter } from "@/routes/v1/example.router";

declare module "hono" {
	interface ContextVariableMap {
		user: Session["user"];
	}
}

const app = new Hono();

// 🔔 Global middleware
app.use("*", corsMiddleware);
app.use("*", logger());

// 🚀 Public routes that don't require auth
app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

// 🔒 Protected routes /admin/v1
const apiRoutes = app.use(authMiddleware).route("/api/v1/example", exampleRouter);

export default {
	fetch: apiRoutes.fetch,
	port: config.API_PORT,
};

export type ApiRoutes = typeof apiRoutes;
