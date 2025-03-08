import { drizzle } from "drizzle-orm/libsql";
import config from "@/utils/config";

import * as auth from "@/db/schemas/auth";

export const db = drizzle(config.DB_FILE_NAME, {
	schema: {
		...auth,
	},
});
