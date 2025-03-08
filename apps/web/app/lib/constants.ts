import { SettingsIcon, HelpCircleIcon, LayoutDashboardIcon, ServerCrashIcon } from "lucide-react";
import type { NavItem } from "@/components/sidebar/nav-items";
import { GoogleIcon } from "@/components/icons";

export const sidebarItems: Record<string, NavItem[]> = {
	General: [
		{
			title: "Resumen",
			url: "/dashboard",
			icon: LayoutDashboardIcon,
		},
	],
	Cuenta: [
		{
			title: "Configuración",
			url: "/settings",
			icon: SettingsIcon,
		},
		{
			title: "Ayuda",
			url: "/help",
			icon: HelpCircleIcon,
		},
	],
};

export const API_URL = "http://localhost:8787";
export const BRAND = {
	name: "RDSNode",
	summary: "Hosting de servidores",
	logo: ServerCrashIcon,
};

export const rolesWeights: Record<"user" | "admin", number> = {
	user: 0,
	admin: 1,
};

export const avaliableProviders = {
	google: {
		name: "Google",
		icon: GoogleIcon,
	},
} as const;
