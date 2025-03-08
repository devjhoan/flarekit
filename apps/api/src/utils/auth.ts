import { account, session, user, verification } from "@/db/schemas/auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getConfig } from "@/utils/config";
import type { HonoEnv } from "@/bindings";
import { betterAuth } from "better-auth";
import type { Context } from "hono";
import { connect } from "@/db";

export const auth = (ctx: Context<HonoEnv>) => {
	const db = connect(ctx.env.DB);
	const config = getConfig(ctx);

	return betterAuth({
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
};

// export type Session = typeof auth.$Infer.Session;
export type Session = Awaited<ReturnType<typeof auth>>["$Infer"]["Session"];
export type User = Awaited<ReturnType<typeof auth>>["$Infer"]["Session"]["user"];
