"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from ".";
import { Icon } from "../icons";

type SearchProps = {
  placeholder?: string;
};
export const Search = ({ placeholder }: SearchProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Input
      defaultValue={searchParams.get("query")?.toString()}
      placeholder={placeholder ?? "Search..."}
      suffix={<Icon icon="mingcute:search-2-line" />}
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
    />
  );
};
