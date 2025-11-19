"use client";

import { useSearch } from "@/hooks/use-search";

export function Search() {
  const { search } = useSearch("wa");

  return (
    <div className="hidden">
      <input type="text" placeholder="Search..." onChange={search} />
      <button>Search</button>
    </div>
  );
}
