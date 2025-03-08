import { z } from "zod";

const configSchema = z.object({
	// General Settings
	API_PORT: z.string().regex(/^\d+$/),
	WEB_URL: z.string().url(),
	API_URL: z.string().url(),

	// Authentication Settings
	BETTER_AUTH_SECRET: z.string().min(32),

	// Database Settings
	DB_FILE_NAME: z.string(),

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

const config = configSchema.safeParse(process.env);
if (!config.success) {
	console.error("❌ Error en las variables de entorno:");
	console.error("----------------------------------------");

	for (const error of config.error.errors) {
		const path = error.path.join(".");
		console.error(`- ${path}: ${error.message}`);
	}

	console.error("----------------------------------------");
	console.error("💡 Asegúrate de que todas las variables estén definidas en el archivo .env");
	process.exit(1);
}

export default config.data;
