import type { Session, User } from "@/utils/auth";

export type HonoEnv = {
	Bindings: Bindings;
	Variables: Variables;
};

type Bindings = {
	DB: D1Database;

	// General Settings
	WEB_URL: string;
	API_URL: string;

	// Authentication Settings
	BETTER_AUTH_SECRET: string;

	// Google Settings
	GOOGLE_CLIENT_ID: string;
	GOOGLE_CLIENT_SECRET: string;

	// Encryption Settings
	ENCRYPTION_SECRET: string;
};

type Variables = {
	user: User;
	session: Session | null;
};
