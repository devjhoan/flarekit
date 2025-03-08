import { account, session, user, verification } from "@/db/schemas/auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth";
import config from "@/utils/config";
import { db } from "@/db";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "sqlite",
		schema: {
			user,
			account,
			session,
			verification,
		},
	}),
	trustedOrigins: [config.WEB_URL],
	emailAndPassword: {
		enabled: true,
	},
	databaseHooks: {
		user: {
			create: {
				before: async (user) => {
					const existingUser = await db.query.user.findFirst({});

					return {
						data: {
							...user,
							role: existingUser ? "user" : "admin",
						},
					};
				},
			},
		},
	},
	socialProviders: {
		google: {
			clientId: config.GOOGLE_CLIENT_ID,
			clientSecret: config.GOOGLE_CLIENT_SECRET,
			redirectURI: `${config.API_URL}/api/auth/callback/google`,
		},
	},
	user: {
		additionalFields: {
			role: {
				type: "string",
				enum: ["admin", "user"],
				default: "user",
				defaultValue: () => "user",
				required: true,
				input: false,
			},
		},
	},
});

export type Session = typeof auth.$Infer.Session;
