import type { HonoEnv } from "@/bindings";
import type { Context } from "hono";
import { z } from "zod";

const configSchema = z.object({
	// General Settings
	WEB_URL: z.string().url(),
	API_URL: z.string().url(),

	// Authentication Settings
	BETTER_AUTH_SECRET: z.string().min(32),

	// Google Settings
	GOOGLE_CLIENT_ID: z.string(),
	GOOGLE_CLIENT_SECRET: z.string(),

	// Encryption Settings
	ENCRYPTION_SECRET: z.string().min(32),
});

export const roles = [
	{
		name: "user",
		level: 0,
		isDefault: true,
	},
	{
		name: "admin",
		level: 1,
		isDefault: false,
	},
] as const;

export const getConfig = (ctx: Context<HonoEnv>): z.infer<typeof configSchema> => {
	const config = configSchema.safeParse(ctx.env);
	if (!config.success) {
		throw new Error("❌ Error en las variables de entorno", { cause: config.error });
	}

	return config.data;
};
