"use client";

import { useState, useEffect, useMemo } from "react";
import { cn } from "@workspace/ui/lib/utils";

import { Menu } from "@base-ui-components/react";
import { Button } from "@workspace/ui/components/button";
import { useRenderedSuspenses } from "src/suspense/use-rendered-suspenses";
import {
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuLabel,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuSub,
  MenuSubTrigger,
} from "./dropdown-menu";

interface Props {
  children?: React.ReactNode;
}

/**
 * Always render the dropdown even if it is not a development environment
 *
 * **Should not be used for most other cases**
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
    <Menu.Root>
      <Menu.Trigger
        render={
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
        }
      />
      <MenuContent>
        <MenuLabel>DevTools</MenuLabel>
        <MenuSeparator />
        <DropdownSuspenseContent />
        <MenuSeparator />
        {children ? (
          <>
            {children}
            <MenuSeparator />
          </>
        ) : null}
        <MenuSub>
          <MenuSubTrigger>Preferences</MenuSubTrigger>
          <MenuContent>
            <MenuGroup>
              <MenuGroupLabel>Panel Position</MenuGroupLabel>
              <MenuSeparator />
              <MenuRadioGroup
                value={position}
                onValueChange={handlePositionChange}
              >
                <MenuRadioItem value="top-left">Top - Left</MenuRadioItem>
                <MenuRadioItem value="top-right">Top - Right</MenuRadioItem>
                <MenuRadioItem value="bottom-left">Bottom - Left</MenuRadioItem>
                <MenuRadioItem value="bottom-right">
                  Bottom - Right
                </MenuRadioItem>
              </MenuRadioGroup>
            </MenuGroup>
          </MenuContent>
        </MenuSub>
      </MenuContent>
    </Menu.Root>
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
    <MenuGroup className="flex flex-col gap-1">
      <MenuGroupLabel>Rendered Suspenses</MenuGroupLabel>
      {visibleSuspenses.length > 0 ? (
        visibleSuspenses.map(({ id, isSelected }) => (
          <MenuItem
            key={id}
            onMouseEnter={() => setHoveredSuspense(id)}
            onMouseLeave={() => setHoveredSuspense(null)}
            onClick={() => {
              setSelectedSuspense(id);
              setHoveredSuspense(null);
            }}
            className={isSelected ? "bg-primary/10" : ""}
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
          </MenuItem>
        ))
      ) : (
        <MenuItem disabled>
          <span>No Suspenses Rendered</span>
          <small>
            If you have one, check if its imported from
            <pre>
              <code className="font-mono">suspense-fallback-debugger</code>
            </pre>
          </small>
        </MenuItem>
      )}
    </MenuGroup>
  );
}
