import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),

	layout("layouts/dashboard.tsx", [
		route("dashboard", "routes/dashboard/index.tsx"),
		route("settings", "routes/dashboard/settings.tsx"),
	]),

	route("login", "routes/auth/login.tsx"),
	route("register", "routes/auth/register.tsx"),

	route("*", "routes/errors/404.tsx"),
] satisfies RouteConfig;
