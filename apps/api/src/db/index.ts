import * as auth from "@/db/schemas/auth";
import { drizzle } from "drizzle-orm/d1";

export const connect = (db: D1Database) =>
	drizzle(db, {
		schema: {
			...auth,
		},
	});

export type Database = ReturnType<typeof connect>;
