"use client";

import { refresh } from "@/lib/refresh";
import { Button } from "@workspace/ui/components/button";
import { useTransition } from "react";

const RefetchSlowComponent = () => {
	const [isPending, startTransition] = useTransition();

	return (
		<Button
			variant="outline"
			onClick={async () =>
				startTransition(async () => {
					await refresh("slow-load");
				})
			}
		>
			{isPending ? "Loading..." : "Refetch"}
		</Button>
	);
};

export { RefetchSlowComponent };
