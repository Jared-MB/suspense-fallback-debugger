import Link from "next/link";

const components = [
  "Suspense",
  "DevDropdown",
  "SuspenseContext",
  "DropdownMenu (Components)",
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[1fr_25%] gap-12 relative">
      <div>{children}</div>
      <aside className="sticky top-[10dvh] h-[80dvh] flex flex-col gap-4">
        <header>
          <h5 className="text-sm">On this page</h5>
        </header>
        <div>
          <ul className="text-muted-foreground cursor-pointer text-sm">
            <li>
              <h6 className="hover:text-primary mb-3">
                <Link href="#Components">Components</Link>
              </h6>
              <ul className="[&_li:hover]:text-primary cursor-pointer ml-4 flex flex-col gap-2">
                {components.map((component) => (
                  <li key={component}>
                    <Link href={`#${component}`}>{component}</Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
