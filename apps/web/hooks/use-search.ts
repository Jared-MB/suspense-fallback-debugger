"use client";

import type { Route } from "next";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext } from "react";
import { useDebouncedCallback } from "use-debounce";

import { SuspenseContext } from "suspense-fallback-debugger/context";
import { ENV } from "@/lib/constants";

/**
 * This hook allows you to handle URL state for search queries
 * while preserving other query parameters and the actual pathname.
 *
 * @param name - The name of the search parameter. This will be placed in the URL as a query parameter.
 * @param options - Options to configure the search behavior.
 * @param options.debounceTime - The debounce time (time to wait before updating the URL) in milliseconds (default: 400).
 * @param options.clearOnValue - The value that will clear the search parameter from the URL.
 */
export function useSearch(
  name: string,
  {
    debounceTime = 400,
    clearOnValue = "",
  }: { debounceTime?: number; clearOnValue?: string } = {}
) {
  /**
   * Read it at the top of the component to check if the component is used within a <Suspense/> component.
   */
  const context = useContext(SuspenseContext);

  /**
   * We only check if the component is used within a <Suspense/> component in development mode.
   * When building for production, we don't need to check since we already handled it in development mode.
   */
  if (ENV.__IS__DEV__ && !context) {
    throw new Error(
      `useSearch("${name}") must be used within a <Suspense/> component. Import it from 'suspense-fallback-debugger'.`
    );
  }

  /**
   * All the rest of the hook can stay the same.
   */

  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const search = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement> | string) => {
      const searchValue = typeof e === "string" ? e : e.target.value;
      const searchParams = new URLSearchParams(params);

      if (
        !searchValue ||
        searchValue.length === 0 ||
        searchValue === clearOnValue
      ) {
        searchParams.delete(name);
      } else {
        searchParams.set(name, searchValue);
      }

      router.replace(`${pathname}?${searchParams.toString()}` as Route);
    },
    debounceTime
  );

  return { search };
}
