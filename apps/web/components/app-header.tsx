"use client";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbLink,
	BreadcrumbSeparator,
	BreadcrumbPage,
} from "@workspace/ui/components/breadcrumb";
import { SidebarTrigger } from "@workspace/ui/components/sidebar";
import { usePathname } from "next/navigation";

export function AppHeader() {
	const pathname = usePathname();
	const routes = pathname.split("/").filter((route) => route !== "");

	return (
		<header className="p-6 pb-0 flex items-center gap-3">
			<SidebarTrigger />
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Suspense Fallback Debugger</BreadcrumbLink>
					</BreadcrumbItem>
					{routes.length > 0 ? (
						routes.map((route) => (
							<>
								<BreadcrumbSeparator key={route} />
								<BreadcrumbItem key={route}>
									<BreadcrumbLink href={`/${route}`}>{route}</BreadcrumbLink>
								</BreadcrumbItem>
							</>
						))
					) : (
						<>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>Home</BreadcrumbPage>
							</BreadcrumbItem>
						</>
					)}
				</BreadcrumbList>
			</Breadcrumb>
		</header>
	);
}
