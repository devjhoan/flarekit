import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router";
import type { User } from "@/lib/auth";

import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export interface NavItem {
	title: string;
	url: string;
	icon?: LucideIcon;
	items?: NavItem[];
	minimalRole?: User["role"];
}

export function NavMain({
	title,
	items,
}: {
	title: string | null;
	items: NavItem[];
}) {
	if (items.length === 0) return null;

	return (
		<SidebarGroup>
			{title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
			<SidebarMenu>
				{items.map((item) =>
					item.items ? (
						<CollapsibleNavItem key={item.title} item={item} />
					) : (
						<SimpleNavItem key={item.title} item={item} />
					),
				)}
			</SidebarMenu>
		</SidebarGroup>
	);
}

function CollapsibleNavItem({
	item,
}: {
	item: NavItem;
}) {
	const location = useLocation();

	return (
		<Collapsible
			key={item.title}
			asChild
			defaultOpen={location.pathname === item.url}
			className="group/collapsible"
		>
			<SidebarMenuItem>
				<CollapsibleTrigger asChild>
					<SidebarMenuButton tooltip={item.title}>
						{item.icon && <item.icon />}
						<span>{item.title}</span>

						<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
					</SidebarMenuButton>
				</CollapsibleTrigger>

				<CollapsibleContent>
					<SidebarMenuSub>
						{item.items?.map((subItem) => (
							<SidebarMenuSubItem key={subItem.title}>
								<SidebarMenuSubButton asChild>
									<a href={subItem.url}>
										<span>{subItem.title}</span>
									</a>
								</SidebarMenuSubButton>
							</SidebarMenuSubItem>
						))}
					</SidebarMenuSub>
				</CollapsibleContent>
			</SidebarMenuItem>
		</Collapsible>
	);
}

function SimpleNavItem({ item }: { item: NavItem }) {
	const location = useLocation();

	return (
		<SidebarMenuItem>
			<Link to={item.url}>
				<SidebarMenuButton tooltip={item.title} isActive={location.pathname === item.url}>
					{item.icon && <item.icon />}
					<span>{item.title}</span>
				</SidebarMenuButton>
			</Link>
		</SidebarMenuItem>
	);
}
