import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { BRAND } from "@/lib/constants";

export function SidebarLogo() {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton
					size="lg"
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
				>
					<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
						<BRAND.logo className="size-5" />
					</div>

					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-semibold">{BRAND.name}</span>
						<span className="truncate text-xs">{BRAND.summary}</span>
					</div>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
