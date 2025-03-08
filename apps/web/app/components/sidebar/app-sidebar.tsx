import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { rolesWeights, sidebarItems } from "@/lib/constants";
import { SidebarLogo } from "@/components/sidebar/nav-logo";
import { NavMain } from "@/components/sidebar/nav-items";
import type { User } from "@/lib/auth";
import { NavUser } from "./nav-user";

export function AppSidebar({ user }: { user: User }) {
	return (
		<Sidebar collapsible="icon" variant="floating">
			<SidebarHeader>
				<SidebarLogo />
			</SidebarHeader>

			<SidebarContent>
				{Object.keys(sidebarItems).map((key) => (
					<NavMain
						key={key}
						title={key === "Null" ? null : key}
						items={sidebarItems[key].filter(
							(item) =>
								!item.minimalRole || rolesWeights[item.minimalRole] <= rolesWeights[user?.role || "user"],
						)}
					/>
				))}
			</SidebarContent>

			<SidebarFooter>
				<NavUser user={user} />
			</SidebarFooter>
		</Sidebar>
	);
}
