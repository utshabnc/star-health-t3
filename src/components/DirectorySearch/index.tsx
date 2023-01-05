import { debounce } from "lodash";
import { useRouter } from "next/router";
import React, { SetStateAction, useCallback, useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";

export default function DirectorySearch({
  search,
  setSearch,
}: {
  search: string;
  setSearch: any;
}) {
  const { query: querySearch } = useRouter();
  const { data: searchResults, refetch: fetchSearchResults } =
    trpc.db.search.useQuery(search ?? "", { enabled: false });

  return (
    <>
      <input
        type="text"
        placeholder={"Search for Doctor by name"}
        className={`
        my-2 mx-1 w-[30%] cursor-pointer rounded-lg bg-violet-500 p-1 text-white placeholder:text-slate-100 hover:bg-violet-400 hover:text-violet-900`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </>
  );
}
