import type { Context, Next } from "hono";
import type { HonoEnv } from "@/bindings";
import { roles } from "@/utils/config";
import { auth } from "@/utils/auth";

type ValidRoles = (typeof roles)[number]["name"];

const roleLevels = roles.reduce(
	(acc, role) => {
		acc[role.name] = role.level;
		return acc;
	},
	{} as Record<ValidRoles, number>,
);

export const authMiddleware = async (c: Context, next: Next) => {
	const session = await auth(c).api.getSession({
		headers: c.req.raw.headers,
	});

	if (!session) {
		return c.json({ error: "Unauthorized from middleware" }, 401);
	}

	c.set("user", session.user);
	return next();
};

export const roleMiddleware = (requiredRole: ValidRoles) => {
	return async (c: Context<HonoEnv>, next: Next) => {
		const user = c.get("user");

		if (!user?.role) {
			return c.json({ error: "Unauthorized" }, 401);
		}

		const userRoleLevel = roleLevels[user.role as keyof typeof roleLevels] || -1;
		const requiredRoleLevel = roleLevels[requiredRole];

		if (userRoleLevel < requiredRoleLevel) {
			return c.json({ error: "Forbidden" }, 403);
		}

		return next();
	};
};
