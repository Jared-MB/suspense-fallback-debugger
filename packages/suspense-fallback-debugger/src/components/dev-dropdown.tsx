"use client";

import { useState, useEffect, useMemo } from "react";
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
  DropdownMenuGroupLabel,
  DropdownMenuItem,
} from "@workspace/ui/components/dropdown-menu";
import { Button } from "@workspace/ui/components/button";
import { useRenderedSuspenses } from "src/suspense/use-rendered-suspenses";

interface Props {
  children?: React.ReactNode;
}

/**
 * Always render the dropdown even if it is not a development environment
 *
 * @internal This is not part of public API since is only a feature for docs.
 * @deprecated
 */
export function always_render_DevTools({ children }: Props) {
  return <DropdownSuspense>{children}</DropdownSuspense>;
}

export function DropdownSuspense({ children }: Props) {
  const [position, setPosition] = useState("bottom-right");

  const handlePositionChange = (value: string) => {
    window.localStorage.setItem("react:suspense:debug:position", value);
    setPosition(value);
  };

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
          data-custom-id="suspense-debugger:button"
          className={cn(
            "rounded-full m-1 fixed size-10 font-mono text-lg font-semibold shadow pointer-events-auto z-999999",
            {
              "top-2 right-2": position === "top-right",
              "top-2 left-2": position === "top-left",
              "bottom-2 right-2": position === "bottom-right",
              "bottom-2 left-2": position === "bottom-left",
            }
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

const MAX_VISIBLE_SUSPENSES = 25;

function DropdownSuspenseContent() {
  const renderedSuspenses = useRenderedSuspenses(
    (state) => state.renderedSuspenses
  );
  const selectedSuspenses = useRenderedSuspenses(
    (state) => state.selectedSuspenses
  );
  const setHoveredSuspense = useRenderedSuspenses(
    (state) => state.setHoveredSuspense
  );
  const setSelectedSuspense = useRenderedSuspenses(
    (state) => state.setSelectedSuspense
  );

  const visibleSuspenses = useMemo(
    () =>
      Array.from(renderedSuspenses)
        .map((id) => ({
          id,
          isSelected: selectedSuspenses.has(id),
        }))
        .slice(0, MAX_VISIBLE_SUSPENSES),
    [renderedSuspenses, selectedSuspenses]
  );

  return (
    <DropdownMenuGroup className="flex flex-col gap-1">
      <DropdownMenuGroupLabel>Rendered Suspenses</DropdownMenuGroupLabel>
      {visibleSuspenses.length > 0 ? (
        visibleSuspenses.map(({ id, isSelected }) => (
          <DropdownMenuItem
            key={id}
            onMouseEnter={() => setHoveredSuspense(id)}
            onMouseLeave={() => setHoveredSuspense(null)}
            onClick={() => {
              setSelectedSuspense(id);
              setHoveredSuspense(null);
            }}
            className={cn(
              "flex items-center gap-2",
              isSelected && "bg-primary/10"
            )}
          >
            {isSelected && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-right-icon lucide-chevron-right text-primary"
              >
                <title>Chevron Right</title>
                <path d="m9 18 6-6-6-6" />
              </svg>
            )}
            {id}
          </DropdownMenuItem>
        ))
      ) : (
        <DropdownMenuItem disabled className="flex flex-col gap-1">
          <span>No Suspenses Rendered</span>
          <small>
            If you have one, check if its imported from
            <pre>
              <code className="font-mono">suspense-fallback-debugger</code>
            </pre>
          </small>
        </DropdownMenuItem>
      )}
    </DropdownMenuGroup>
  );
}
