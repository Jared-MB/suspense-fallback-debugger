"use client";

import { Menu } from "@base-ui-components/react";

import { cn } from "@workspace/ui/lib/utils";
import type { ComponentProps } from "react";

function MenuContent({
  children,
  className,
  ...props
}: ComponentProps<typeof Menu.Positioner>) {
  return (
    <Menu.Portal>
      <Menu.Positioner
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
          className
        )}
        {...props}
      >
        <Menu.Popup>{children}</Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  );
}

function MenuLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Menu.Group>
      <Menu.GroupLabel
        className={cn(
          "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
          className
        )}
      >
        {children}
      </Menu.GroupLabel>
    </Menu.Group>
  );
}

function MenuGroup({ children, ...props }: ComponentProps<typeof Menu.Group>) {
  return <Menu.Group {...props}>{children}</Menu.Group>;
}

function MenuGroupLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Menu.GroupLabel
      className={cn(
        "text-xs text-muted-foreground font-medium px-1.5 py-1",
        className
      )}
    >
      {children}
    </Menu.GroupLabel>
  );
}

function MenuItem({
  children,
  className,
  ...props
}: ComponentProps<typeof Menu.Item>) {
  return (
    <Menu.Item
      {...props}
      className={cn(
        "flex items-center gap-2",
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
    >
      {children}
    </Menu.Item>
  );
}

function MenuSub({ children, ...props }: ComponentProps<typeof Menu.Sub>) {
  return <Menu.SubmenuRoot {...props}>{children}</Menu.SubmenuRoot>;
}

function MenuSubTrigger({
  children,
  className,
  ...props
}: ComponentProps<typeof Menu.SubmenuTrigger>) {
  return (
    <Menu.SubmenuTrigger
      className={cn(
        "flex flex-row items-center gap-2 px-2 py-1.5 text-sm font-medium data-[inset]:pl-8 focus:bg-accent focus:text-accent-foreground",
        className
      )}
    >
      <span> Preferences</span>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M3.5 9L7.5 5L3.5 1" stroke="currentcolor" strokeWidth="1.5" />
      </svg>
    </Menu.SubmenuTrigger>
  );
}

function MenuRadioGroup({
  children,
  ...props
}: ComponentProps<typeof Menu.RadioGroup>) {
  return <Menu.RadioGroup {...props}>{children}</Menu.RadioGroup>;
}

function MenuRadioItem({
  children,
  ...props
}: ComponentProps<typeof Menu.RadioItem>) {
  return (
    <Menu.RadioItem
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        props?.className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <Menu.RadioItemIndicator>
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
            className="lucide lucide-circle-icon lucide-circle size-2 fill-current"
          >
            <title>Circle</title>
            <circle cx="12" cy="12" r="10" />
          </svg>
        </Menu.RadioItemIndicator>
      </span>
      {children}
    </Menu.RadioItem>
  );
}

function MenuSeparator() {
  return <Menu.Separator className="bg-border -mx-1 my-1 h-px" />;
}

export {
  MenuContent,
  MenuLabel,
  MenuSeparator,
  MenuGroup,
  MenuSub,
  MenuSubTrigger,
  MenuGroupLabel,
  MenuRadioGroup,
  MenuRadioItem,
  MenuItem,
};
