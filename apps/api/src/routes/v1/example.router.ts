import { roleMiddleware } from "@/middlewares/auth";
import { zValidator } from "@hono/zod-validator";
import { v4 as uuidv4 } from "uuid";
import { Hono } from "hono";
import { z } from "zod";

let users: Array<{ id: string; name: string }> = [];

const idParamSchema = z.object({
	id: z.string().uuid(),
});

const userSchema = z.object({
	name: z.string(),
});

const idParamValidator = zValidator("param", idParamSchema);
const userValidator = zValidator("json", userSchema);

export const exampleRouter = new Hono()
	// 🔍 Get all users
	.get("/", (c) => {
		return c.json(users);
	})
	// 🔍 Get a user by id
	.get("/:id", idParamValidator, (c) => {
		const { id } = c.req.valid("param");
		const user = users.find((user) => user.id === id);

		if (!user) {
			return c.json({ error: "User not found" }, 404);
		}

		return c.json(user);
	})
	// 🔍 Create a user (admin only)
	.post("/", roleMiddleware("admin"), userValidator, (c) => {
		const user = c.req.valid("json");
		users.push({ id: uuidv4(), ...user });

		return c.json(user);
	})
	// 🔍 Update a user (admin only)
	.put("/:id", roleMiddleware("admin"), idParamValidator, userValidator, (c) => {
		const { id } = c.req.valid("param");
		const user = c.req.valid("json");

		const index = users.findIndex((user) => user.id === id);
		users[index] = { id, ...user };

		return c.json(user);
	})
	// 🔍 Delete a user (admin only)
	.delete("/:id", roleMiddleware("admin"), idParamValidator, (c) => {
		const { id } = c.req.valid("param");
		users = users.filter((user) => user.id !== id);

		return c.json({ message: "User deleted" });
	});
