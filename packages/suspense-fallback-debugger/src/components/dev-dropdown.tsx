"use client";

import { __IS__DEV__ } from "../lib/__is__dev__";
import { useState, useEffect } from "react";
import { cn } from "@workspace/ui/lib/utils";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuGroup,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuPortal,
} from "@workspace/ui/components/dropdown-menu";
import { Button } from "@workspace/ui/components/button";
import { DropdownSuspenseContent } from "../suspense";

interface Props {
	children?: React.ReactNode;
}

export function DevDropdown({ children }: Props) {
	if (!__IS__DEV__) return null;

	// biome-ignore lint/correctness/useHookAtTopLevel: We don't need to load this hook if we are not in dev
	const [position, setPosition] = useState("top-right");

	const handlePositionChange = (value: string) => {
		window.localStorage.setItem("react:suspense:debug:position", value);
		setPosition(value);
	};

	// biome-ignore lint/correctness/useHookAtTopLevel: We don't need to load this hook if we are not in dev
	useEffect(() => {
		const stored = window.localStorage.getItem("react:suspense:debug:position");
		if (stored) {
			setPosition(stored);
		}
	}, []);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className={cn(
						"rounded-full m-1 fixed size-10 font-mono text-lg font-semibold shadow pointer-events-auto z-999999",
						{
							"top-2 right-2": position === "top-right",
							"top-2 left-2": position === "top-left",
							"bottom-2 right-2": position === "bottom-right",
							"bottom-2 left-2": position === "bottom-left",
						},
					)}
				>
					K
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>DevTools</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownSuspenseContent />
				<DropdownMenuSeparator />
				{children ? (
					<>
						{children}
						<DropdownMenuSeparator />
					</>
				) : null}
				<DropdownMenuGroup>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>Preferences</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<DropdownMenuGroup>
									<DropdownMenuLabel>Panel Position</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuRadioGroup
										value={position}
										onValueChange={handlePositionChange}
									>
										<DropdownMenuRadioItem value="top-left">
											Top - Left
										</DropdownMenuRadioItem>
										<DropdownMenuRadioItem value="top-right">
											Top - Right
										</DropdownMenuRadioItem>
										<DropdownMenuRadioItem value="bottom-left">
											Bottom - Left
										</DropdownMenuRadioItem>
										<DropdownMenuRadioItem value="bottom-right">
											Bottom - Right
										</DropdownMenuRadioItem>
									</DropdownMenuRadioGroup>
								</DropdownMenuGroup>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
