import { Blocks, Code2, Download } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@workspace/ui/components/card";
import Link from "next/link";

import { unstable_cacheTag as cacheTag } from "next/cache";
import { Suspense } from "suspense-fallback-debugger";
import { RefetchSlowComponent } from "@/components/refetch-slow-component";

export default function Page() {
	return (
		<main className="p-12">
			<h1 className="text-3xl font-medium font-mono text-balance ">
				Suspense Fallback Debugger
			</h1>
			<p className="text-muted-foreground text-pretty mt-4">
				Suspense Fallback Debugger is a development tool to help you debug React
				Suspense fallbacks in an easy, efficient and beautiful way.
			</p>
			<section>
				<h3 className="text-2xl font-medium mt-6">Basic example</h3>
				<div>
					<Suspense fallback={<div>Loading...</div>}>
						<SlowComponent />
					</Suspense>
					<RefetchSlowComponent />
				</div>
			</section>
			<section className="flex flex-col gap-4">
				<h3 className="text-2xl font-medium mt-6">Whats next?</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<Link className="group" href="/installation">
						<Card className="h-full group-hover:bg-accent transition-colors duration-100">
							<CardContent className="flex flex-col justify-between h-full gap-6">
								<Download className="size-8" />
								<div className="flex flex-col gap-2">
									<CardTitle>Installation</CardTitle>
									<CardDescription className="text-pretty">
										Install and configure the package.
									</CardDescription>
								</div>
							</CardContent>
						</Card>
					</Link>
					<Link className="group" href="/usage">
						<Card className="h-full group-hover:bg-accent transition-colors duration-100">
							<CardContent className="flex flex-col justify-between h-full gap-6">
								<Blocks className="size-8" />
								<div className="flex flex-col gap-2">
									<CardTitle>Usage</CardTitle>
									<CardDescription className="text-pretty">
										Learn how to use the package.
									</CardDescription>
								</div>
							</CardContent>
						</Card>
					</Link>
					<Link className="group" href="/api">
						<Card className="h-full group-hover:bg-accent transition-colors duration-100">
							<CardContent className="flex flex-col justify-between h-full gap-6">
								<Code2 className="size-8" />
								<div className="flex flex-col gap-2">
									<CardTitle>API Reference</CardTitle>
									<CardDescription className="text-pretty">
										A deep dive into the package API.
									</CardDescription>
								</div>
							</CardContent>
						</Card>
					</Link>
				</div>
			</section>
		</main>
	);
}

const SlowComponent = async () => {
	await slowLoad();

	return (
		<div>
			<h2>Slow Component</h2>
		</div>
	);
};

const slowLoad = async () => {
	"use cache";
	cacheTag("slow-load");
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve("slow-load");
		}, 5000);
	});
};
