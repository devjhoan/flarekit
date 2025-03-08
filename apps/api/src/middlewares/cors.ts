import type { Context, Next } from "hono";
import { getConfig } from "@/utils/config";
import { cors } from "hono/cors";

export const corsMiddleware = async (c: Context, next: Next) => {
	const middleware = cors({
		origin: getConfig(c).WEB_URL,
		credentials: true,
	});

	return await middleware(c, next);
};
