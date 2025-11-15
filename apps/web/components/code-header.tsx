export function CodeHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="[&_p]:pb-0 bg-muted text-muted-foreground inline-flex items-center rounded-lg p-[3px] h-fit w-full justify-start border-2 border-sidebar/50 border-b-1 border-b-gray-400/10">
      {children}
    </div>
  );
}

export function CodeHeaderContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center p-2 gap-2 font-mono">{children}</div>
  );
}

export function CodeHeaderIcon({ children }: { children: React.ReactNode }) {
  return <div className="p-4 pr-2">{children}</div>;
}
