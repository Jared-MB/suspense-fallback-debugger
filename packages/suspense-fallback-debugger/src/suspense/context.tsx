import { createContext } from "react";

export const SuspenseContext = createContext<string | null>(null);

export function SuspenseProvider({ children }: { children: React.ReactNode }) {
  return (
    <SuspenseContext.Provider value={"__DEV_SUSPENSE__"}>
      {children}
    </SuspenseContext.Provider>
  );
}
