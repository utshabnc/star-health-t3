import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import React, { SetStateAction, useCallback, useEffect, useState } from 'react'
import { trpc } from '../../utils/trpc';

export default function DirectorySearch({search, setSearch}: {search: string, setSearch: any}) {

  const { query: querySearch } = useRouter();
  const { data: searchResults, refetch: fetchSearchResults } = trpc.db.search.useQuery(search ?? "", { enabled: false });
  console.log(searchResults);


  return (
    <>
    <input
        type="text"
        placeholder={
         "Search for Doctor by name"
        }
        className={`
        bg-violet-500 my-2 placeholder:text-slate-100 text-white w-[30%] p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

    </>
  )
}
