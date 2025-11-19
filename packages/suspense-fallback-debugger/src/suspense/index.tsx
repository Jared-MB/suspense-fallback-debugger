import { Suspense as ReactSuspense, type ComponentProps, lazy } from "react";
import { EnhanceSuspense } from "./enhance-suspense";

export type SuspenseProps = ComponentProps<typeof ReactSuspense> & {
  className?: string;
};

/**
 * Suspense component for development purposes,
 *
 * On production it will render the same as the regular Suspense component
 *
 * On development it will render a div with the id of the suspense and a border
 * to help you identify which suspense is being rendered
 *
 * Sometimes you must pass same children className to the Suspense component so you can have the same style as production
 */
export function Suspense({
  children,
  fallback,
  className,
  ...props
}: SuspenseProps) {
  if (process.env.NODE_ENV === "development") {
    return (
      <EnhanceSuspense fallback={fallback} {...props}>
        {children}
      </EnhanceSuspense>
    );
  }

  return (
    <ReactSuspense fallback={fallback} {...props}>
      {children}
    </ReactSuspense>
  );
}
