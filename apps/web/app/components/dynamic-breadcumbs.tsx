import { sidebarItems } from "@/lib/constants";
import { useLocation } from "react-router";

import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator,
	BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const allRoutes = Object.values(sidebarItems).flat();

export function DynamicBreadcrumb() {
	const location = useLocation();

	const item = allRoutes.find((item) => item.url === location.pathname);
	const key = Object.keys(sidebarItems).find((key) => sidebarItems[key].includes(item!));

	return (
		<>
			{/* <pre>{JSON.stringify(key, null, 2)}</pre> */}
			<Breadcrumb>
				<BreadcrumbList>
					{key !== "Null" && (
						<>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink href="#">{key}</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />
						</>
					)}
					<BreadcrumbItem>
						<BreadcrumbPage>{item?.title}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		</>
	);
}
