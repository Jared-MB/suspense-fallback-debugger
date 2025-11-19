import { create } from "zustand";

interface RenderedSuspensesState {
  renderedSuspenses: Set<string>;
  hoveredSuspense: string | null;
  selectedSuspenses: Set<string>;
  setSelectedSuspense: (id: string | null) => void;
  setHoveredSuspense: (id: string | null) => void;
  addSuspense: (id: string) => void;
  removeSuspense: (id: string) => void;
}

export const useRenderedSuspenses = create<RenderedSuspensesState>()((set) => ({
  renderedSuspenses: new Set(),
  hoveredSuspense: null,
  selectedSuspenses: new Set(),
  setHoveredSuspense: (id: string | null) =>
    set(() => {
      return { hoveredSuspense: id };
    }),
  addSuspense: (id: string) =>
    set((state) => {
      const hasSuspense = state.renderedSuspenses.has(id);

      if (hasSuspense) {
        throw new Error(`Duplicate Suspense with name **${id}** is detected`);
      }

      return {
        renderedSuspenses: new Set([...state.renderedSuspenses, id]),
      };
    }),
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

export const useIsSelected = (id: string) =>
  useRenderedSuspenses((state) => state.selectedSuspenses.has(id));

export const useIsHovered = (id: string) =>
  useRenderedSuspenses((state) => state.hoveredSuspense === id);
