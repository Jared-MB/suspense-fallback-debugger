import { DropdownSuspense } from "./dev-dropdown";

/**
 * Contains all the Suspense rendered on the actual page. When interact with the suspenses
 * you can toggle to render the Suspense fallbacks.
 */
export function DevTools({ children }: { children?: React.ReactNode }) {
  if (process.env.NODE_ENV === "development") {
    return <DropdownSuspense>{children}</DropdownSuspense>;
  }

  return null;
}

/**
 * @deprecated Use `<DevTools/>` instead.
 *
 * We changed the name to `<DevTools/>` to better reflect its purpose and give it a more descriptive name.
 */
export const DevDropdown = DevTools;
