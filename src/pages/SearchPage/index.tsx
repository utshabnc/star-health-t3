import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { debounce } from "lodash";
import DetailsTable from "../../components/DetailsTable";
import { formatName } from "../../utils";
import Search from "../../components/Search";
import { Popover } from "react-tiny-popover";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
// import './index.css';

// from index.css
// .MainBG {
//   background-color: #f6f6f6;
// }

type Props = {
  buttonStyle?: string;
  buttonPlaceholder?: string;
  buttonSmall?: boolean;
};

const SearchPage = ({ buttonPlaceholder, buttonSmall }: Props) => {
  const { query: querySearch } = useRouter();
  const [search, setSearch] = useState<string>();
  const { data: searchResults, refetch: fetchSearchResults } =
    trpc.db.search.useQuery(search ?? "", { enabled: false });
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    // const params = new URLSearchParams(querySearch);
    const searchParam = querySearch["search"] as string;
    if (searchParam) {
      setSearch(searchParam);
    }
  }, [querySearch]);

  const debouncedSearch = useCallback(
    debounce((search: string) => {
      if (search.length < 2) return;
      setIsPopoverOpen(true);
      fetchSearchResults();
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSearch(search ?? "")
  }, [search]);

  const SearchResults = () => {
    if (!searchResults) return null;
    if (
      searchResults?.doctors?.length === 0 &&
      searchResults?.manufacturers?.length === 0
    ) {
      return null;
    }
    return (
      <div style={{ marginLeft: 20 }} className="flex">
        <div
          onClick={() => setIsPopoverOpen(false)}
          className="modal-close absolute top-1 right-0 z-50 mt-4 mr-1 flex cursor-pointer flex-col items-center text-sm"
        >
          <svg
            className="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
          </svg>
        </div>
        <DetailsTable
          rows={[
            ...searchResults?.doctors.map(
              ({ id, firstName, lastName, city, state }) => ({
                id,
                name: `${firstName} ${lastName}`,
                location: `${formatName(city)}, ${state}`,
                type: "doctor" as const,
              })
            ),
            ...searchResults?.manufacturers.map(
              ({ id, name, state, country }) => ({
                id,
                name,
                location: `${state}, ${country}`,
                type: "manufacturer" as const,
              })
            ),
          ]}
        />
      </div>
    );
  };
  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={["bottom"]} // preferred positions by priority
      content={<SearchResults />}
      onClickOutside={() => setIsPopoverOpen(false)}
    >
      <input
        type="text"
        placeholder={
          buttonPlaceholder ?? "Search for Doctor, Company, or Drug Data"
        }
        className={`
              ${buttonSmall ? "max-w-[160px]" : ""}
               sm:text-md mx-2 h-9 rounded-md border-2 border-violet-800 bg-violet-500 pl-3 pr-3  text-sm text-white placeholder-white focus:border-violet-600 focus:ring-violet-400 sm:mx-0 sm:min-w-[400px] sm:max-w-[400px]`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </Popover>
  );
};

export default SearchPage;
