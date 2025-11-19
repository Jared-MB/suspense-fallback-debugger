"use client";

import {
  createContext,
  Suspense as ReactSuspense,
  useEffect,
  useEffectEvent,
  useId,
} from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";

import { cn } from "@workspace/ui/lib/utils";

import {
  useIsHovered,
  useIsSelected,
  useRenderedSuspenses,
} from "./use-rendered-suspenses";
import type { SuspenseProps } from ".";

export const SuspenseContext = createContext<string | null>(null);

function SuspenseProvider({ children }: { children: React.ReactNode }) {
  return (
    <SuspenseContext.Provider value={"__DEV_SUSPENSE__"}>
      {children}
    </SuspenseContext.Provider>
  );
}

/**
 * Always render the suspense even if it is not a development environment
 *
 * @internal This is not part of public API since is only a feature for docs.
 * @deprecated
 */
export function always_render_Suspense({ ...props }: SuspenseProps) {
  return <EnhanceSuspense {...props} />;
}

export function EnhanceSuspense({
  children,
  fallback,
  className,
  name,
  ...props
}: SuspenseProps) {
  const id = useId();

  const suspenseId = name ?? id;

  const isSelected = useIsSelected(suspenseId);
  const isHovered = useIsHovered(suspenseId);

  const addSuspense = useRenderedSuspenses((state) => state.addSuspense);
  const removeSuspense = useRenderedSuspenses((state) => state.removeSuspense);

  const stableAddSuspense = useEffectEvent(addSuspense);
  const stableRemoveSuspense = useEffectEvent(removeSuspense);

  useEffect(() => {
    stableAddSuspense(suspenseId);
    return () => stableRemoveSuspense(suspenseId);
  }, [suspenseId]);

  return (
    <ReactSuspense fallback={fallback} {...props} name={suspenseId}>
      <SuspenseProvider>
        <Tooltip open={isSelected || isHovered}>
          <TooltipTrigger asChild>
            <div
              className={cn(
                "transition-colors duration-200 rounded-[var(--radius)]",
                isSelected && "outline-1 outline-primary/50",
                isHovered && "outline-2 outline-primary",
                className
              )}
              id={suspenseId}
            >
              {isSelected ? (
                fallback ? (
                  fallback
                ) : (
                  <div className="p-2 h-9 border border-dashed border-orange-500 bg-orange-50 dark:bg-orange-950/20 rounded text-center">
                    <div className="text-sm font-mono text-orange-600 dark:text-orange-400">
                      ⚠️ FALLBACK NOT PROVIDED
                    </div>
                  </div>
                )
              ) : (
                children
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent className="font-mono flex flex-col gap-0.5">
            <div className="font-semibold">Suspense: {suspenseId}</div>
            <div className="text-xs">
              {isSelected ? "🔒 Fallback Forced" : "Click to force fallback"}
            </div>
          </TooltipContent>
        </Tooltip>
      </SuspenseProvider>
    </ReactSuspense>
  );
}
