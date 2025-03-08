import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { DynamicBreadcrumb } from "@/components/dynamic-breadcumbs";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { authClient, type User } from "@/lib/auth";
import { ValidateAuth } from "@/hooks/is-auth";
import { Outlet } from "react-router";

export default function DashboardLayout() {
	const { data, error, isPending } = authClient.useSession();

	if (isPending) {
		return null;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<ValidateAuth>
			<SidebarProvider>
				{/* Sidebar */}
				<AppSidebar user={data?.user as User} />

				{/* Main content */}
				<SidebarInset>
					<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
						<div className="flex items-center gap-2 px-4">
							<SidebarTrigger className="-ml-1" />
							<Separator orientation="vertical" className="mr-2 h-4" />
							<DynamicBreadcrumb />
						</div>
					</header>

					<div className="flex flex-1 flex-col gap-4 p-2 pt-0">
						<Outlet />
					</div>
				</SidebarInset>
			</SidebarProvider>
		</ValidateAuth>
	);
}
