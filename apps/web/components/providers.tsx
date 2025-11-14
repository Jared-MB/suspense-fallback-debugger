"use client";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { Button } from "@workspace/ui/components/button";
import { Moon, Sun } from "lucide-react";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<NextThemesProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
			enableColorScheme
		>
			{children}
		</NextThemesProvider>
	);
}

export function ThemeSwitcher() {
	const { setTheme, theme } = useTheme();

	return (
		<Button
			size="icon"
			variant="outline"
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
		>
			{theme === "dark" ? <Sun /> : <Moon />}
		</Button>
	);
}
