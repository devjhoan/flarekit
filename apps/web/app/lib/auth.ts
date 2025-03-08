import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { API_URL } from "./constants";

export const authClient = createAuthClient({
	baseURL: API_URL,
	plugins: [
		inferAdditionalFields({
			user: {
				role: {
					type: "string",
					enum: ["admin", "user"],
					default: "user",
					defaultValue: () => "user",
					required: true,
					input: false,
				},
			},
		}),
	],
});

type MainUser = typeof authClient.$Infer.Session.user;
export interface User extends MainUser {
	role: "user" | "admin";
}
