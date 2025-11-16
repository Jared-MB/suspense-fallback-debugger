"use client";

import {
  type ComponentProps,
  createContext,
  Suspense as ReactSuspense,
  useEffect,
  useEffectEvent,
  useId,
  useMemo,
} from "react";

import { create } from "zustand";

import { ChevronRight } from "lucide-react";

import {
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
} from "@workspace/ui/components/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";

import { cn } from "@workspace/ui/lib/utils";

import { __IS__DEV__ } from "../lib/__is__dev__";
import { useRender } from "src/components/dev-dropdown";

interface RenderedSuspensesState {
  renderedSuspenses: Set<string>;
  hoveredSuspense: string | null;
  selectedSuspenses: Set<string>;
  setSelectedSuspense: (id: string | null) => void;
  setHoveredSuspense: (id: string | null) => void;
  addSuspense: (id: string) => void;
  removeSuspense: (id: string) => void;
}

const useRenderedSuspenses = create<RenderedSuspensesState>()((set) => ({
  renderedSuspenses: new Set(),
  hoveredSuspense: null,
  selectedSuspenses: new Set(),
  setHoveredSuspense: (id: string | null) =>
    set(() => {
      return { hoveredSuspense: id };
    }),
  addSuspense: (id: string) =>
    set((state) => ({
      renderedSuspenses: new Set([...state.renderedSuspenses, id]),
    })),
  removeSuspense: (id: string) =>
    set((state) => {
      const newSet = new Set(state.renderedSuspenses);
      newSet.delete(id);
      return { renderedSuspenses: newSet };
    }),
  setSelectedSuspense: (id: string | null) =>
    set((state) => {
      if (!id) return { selectedSuspenses: new Set<string>() };

      const newSet = new Set(state.selectedSuspenses);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return { selectedSuspenses: newSet };
    }),
}));

const useIsSelected = (id: string) =>
  useRenderedSuspenses((state) => state.selectedSuspenses.has(id));

const useIsHovered = (id: string) =>
  useRenderedSuspenses((state) => state.hoveredSuspense === id);

export const SuspenseContext = createContext<string | null>(null);

function SuspenseProvider({ children }: { children: React.ReactNode }) {
  return (
    <SuspenseContext.Provider value={"__DEV_SUSPENSE__"}>
      {children}
    </SuspenseContext.Provider>
  );
}

type SuspenseProps = ComponentProps<typeof ReactSuspense> & {
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
  const render = useRender((state) => state.render);

  if (!__IS__DEV__ && !render) {
    return (
      <ReactSuspense fallback={fallback} {...props}>
        {children}
      </ReactSuspense>
    );
  }

  return (
    <EnhanceSuspense fallback={fallback} {...props}>
      {children}
    </EnhanceSuspense>
  );
}

function EnhanceSuspense({
  children,
  fallback,
  className,
  ...props
}: SuspenseProps) {
  const id = useId();

  const isSelected = useIsSelected(id);
  const isHovered = useIsHovered(id);

  const addSuspense = useRenderedSuspenses((state) => state.addSuspense);
  const removeSuspense = useRenderedSuspenses((state) => state.removeSuspense);

  const stableAddSuspense = useEffectEvent(addSuspense);
  const stableRemoveSuspense = useEffectEvent(removeSuspense);

  useEffect(() => {
    stableAddSuspense(id);
    return () => stableRemoveSuspense(id);
  }, [id]);

  const computedClassName = useMemo(
    () =>
      cn(
        "transition-colors duration-200 rounded-[var(--radius)]",
        isSelected && "outline-1 outline-primary/50",
        isHovered && "outline-2 outline-primary",
        className
      ),
    [isSelected, isHovered, className]
  );

  return (
    <ReactSuspense fallback={fallback} {...props} name={id}>
      <SuspenseProvider>
        <Tooltip open={isSelected || isHovered}>
          <TooltipTrigger asChild>
            <div className={computedClassName} id={id}>
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
            <div className="font-semibold">Suspense: {id}</div>
            <div className="text-xs">
              {isSelected ? "🔒 Fallback Forced" : "Click to force fallback"}
            </div>
          </TooltipContent>
        </Tooltip>
      </SuspenseProvider>
    </ReactSuspense>
  );
}

const MAX_VISIBLE_SUSPENSES = 25;

export function DropdownSuspenseContent() {
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
            {/* @ts-ignore I don't know why its not recognizing the component */}
            {isSelected && <ChevronRight className="text-primary" />}
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
