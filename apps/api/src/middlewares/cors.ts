import type { Context, Next } from "hono";
import config from "../utils/config";
import { cors } from "hono/cors";

export const corsMiddleware = async (c: Context, next: Next) => {
	const middleware = cors({
		origin: config.WEB_URL,
		credentials: true,
	});

	return await middleware(c, next);
};
