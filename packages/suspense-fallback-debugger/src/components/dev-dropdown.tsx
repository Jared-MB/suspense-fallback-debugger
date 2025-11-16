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
import { create } from "zustand";

interface State {
  render: boolean;
  setRender: (render: boolean) => void;
}

export const useRender = create<State>()((set) => ({
  render: false,
  setRender: (render) => set({ render }),
}));

interface Props {
  children?: React.ReactNode;
  /**
   * Whether to force render the component in production and Suspenses even on production builds.
   */
  forceRender?: boolean;
}

/**
 * Contains all the Suspense rendered on the actual page. When interact with the suspenses
 * you can toggle to render the Suspense fallbacks.
 */
export function DevTools({ children, forceRender }: Props) {
  if (!__IS__DEV__ && !forceRender) return null;

  return (
    <DropdownSuspense forceRender={forceRender}>{children}</DropdownSuspense>
  );
}

/**
 * @deprecated Use `<DevTools/>` instead.
 *
 * We changed the name to `<DevTools/>` to better reflect its purpose and give it a more descriptive name.
 */
export function DevDropdown({ children, forceRender }: Props) {
  if (!__IS__DEV__ && !forceRender) return null;

  return (
    <DropdownSuspense forceRender={forceRender}>{children}</DropdownSuspense>
  );
}

function DropdownSuspense({ children, forceRender }: Props) {
  const setRender = useRender((state) => state.setRender);

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
    setRender(forceRender ?? false);
  }, [forceRender]);

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
