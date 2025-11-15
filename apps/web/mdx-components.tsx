import { cn } from "@workspace/ui/lib/utils";
import type { MDXComponents } from "mdx/types";
import { CopyButton } from "./components/copy-button";
import Link from "next/link";
import { LinkIcon } from "lucide-react";

const components = {
  h1: ({ children, ...props }: { children: React.ReactNode }) => (
    <h1
      id={children?.toString()}
      className="text-3xl font-medium font-mono text-balance mb-5"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: { children: React.ReactNode }) => (
    <h2
      id={children?.toString()}
      className="text-2xl font-medium font-mono mb-4"
      {...props}
    >
      <Link
        href={`#${children?.toString()}`}
        className="flex items-center gap-2 hover:underline"
      >
        {children} <LinkIcon className="size-4 text-muted-foreground" />
      </Link>
    </h2>
  ),
  h3: ({ children, ...props }: { children: React.ReactNode }) => (
    <h3
      id={children?.toString()}
      className="text-xl font-medium font-mono mb-3"
      {...props}
    >
      <Link
        href={`#${children?.toString()}`}
        className="flex items-center gap-1 hover:underline"
      >
        {children} <LinkIcon className="size-3 text-muted-foreground" />
      </Link>
    </h3>
  ),
  h4: ({ children, ...props }: { children: React.ReactNode }) => (
    <h4
      id={children?.toString()}
      className="text-lg font-medium font-mono mb-2"
      {...props}
    >
      {children}
    </h4>
  ),
  table: ({ children, ...props }: { children: React.ReactNode }) => (
    <table className="w-full mb-4" {...props}>
      {children}
    </table>
  ),
  thead: ({ children, ...props }: { children: React.ReactNode }) => (
    <thead className="border-b border-border" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }: { children: React.ReactNode }) => (
    <th className="px-2 py-1.5 font-bold font-mono" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: { children: React.ReactNode }) => (
    <td className="odd:font-mono odd:italic px-2 py-1.5" {...props}>
      {children}
    </td>
  ),
  ul: ({ children, ...props }: { children: React.ReactNode }) => (
    <ul className="list-disc list-inside pb-4" {...props}>
      {children}
    </ul>
  ),
  p: ({ children, ...props }: { children: React.ReactNode }) => (
    <p className="text-pretty pb-4" {...props}>
      {children}
    </p>
  ),
  pre: ({ children, ...props }: { children: React.ReactNode }) => {
    return (
      <pre
        className="bg-sidebar/50 border-2 border-sidebar/50 p-4 relative mb-4"
        {...props}
      >
        {children}
      </pre>
    );
  },
  a: ({
    children,
    className,
    ...props
  }: { children: React.ReactNode; className?: string } & React.ComponentProps<
    typeof Link
  >) => (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      className={cn("hover:underline text-primary font-medium", className)}
      {...props}
    >
      {children}
    </Link>
  ),
  code: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    const isCodeBlock = className?.includes("hljs");

    return (
      <>
        <code
          className={cn(
            "font-mono",
            !isCodeBlock
              ? "font-bold bg-accent border border-accent-foreground/10 rounded-[3px] px-1 py-0.25"
              : "",
            className
          )}
          {...props}
        >
          {children}
        </code>
        {/*{isCodeBlock && <CopyButton text={children?.toString() ?? ""} />}*/}
      </>
    );
  },
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
