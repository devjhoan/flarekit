import { ChevronsUpDownIcon, LogOutIcon, UserIcon, SunIcon, MoonIcon, SettingsIcon } from "lucide-react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/components/theme-provider";
import { authClient, type User } from "@/lib/auth";
import { Link } from "react-router";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NavUser({ user }: { user: User | null }) {
	return (
		<SidebarMenu>
			<SidebarMenuItem>{user ? <UserMenu user={user} /> : <LoginMenu />}</SidebarMenuItem>
		</SidebarMenu>
	);
}

function UserMenu({ user }: { user: User }) {
	const { setTheme, theme } = useTheme();
	const { isMobile } = useSidebar();
	const { signOut } = authClient;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<SidebarMenuButton
					size="lg"
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
				>
					<Avatar className="h-8 w-8 rounded-lg">
						<AvatarImage src={user.image ?? ""} alt={user.name} />
						<AvatarFallback className="rounded-lg">{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
					</Avatar>
					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-semibold">{user.name}</span>
						<span className="truncate text-xs capitalize">{user.role}</span>
					</div>
					<ChevronsUpDownIcon className="ml-auto size-4" />
				</SidebarMenuButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
				side={isMobile ? "bottom" : "right"}
				align="end"
				sideOffset={4}
			>
				<DropdownMenuLabel className="p-0 font-normal">
					<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<Avatar className="h-8 w-8 rounded-lg">
							<AvatarImage src={user.image ?? ""} alt={user.name} />
							<AvatarFallback className="rounded-lg">{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
						</Avatar>
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-semibold">{user.name}</span>
							<span className="truncate text-xs">{user.email}</span>
						</div>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />

				<DropdownMenuGroup>
					<DropdownMenuItem
						onClick={() => {
							console.log({ actualTheme: theme, setTo: theme === "dark" ? "light" : "dark" });
							setTheme(theme === "dark" ? "light" : "dark");
							console.log({ newTheme: theme });
						}}
					>
						{theme === "dark" ? <SunIcon /> : <MoonIcon />}
						Cambiar tema
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />

				<DropdownMenuGroup>
					<Link to="/settings">
						<DropdownMenuItem>
							<SettingsIcon />
							Configuración
						</DropdownMenuItem>
					</Link>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => signOut()}>
					<LogOutIcon />
					Cerrar sesión
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function LoginMenu() {
	return (
		<SidebarMenuButton
			size="lg"
			className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground "
		>
			<Link to="/login" className="flex items-center gap-2">
				<Avatar className="h-8 w-8 rounded-lg">
					<AvatarFallback className="rounded-lg">
						<UserIcon />
					</AvatarFallback>
				</Avatar>

				<div className="grid flex-1 text-left text-sm leading-tight">
					<span className="truncate font-semibold">Iniciar sesión</span>
					<span className="truncate text-xs">invitado</span>
				</div>
			</Link>

			{/* <ChevronsUpDown className="ml-auto size-4" /> */}
		</SidebarMenuButton>
	);
}
