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
import { formatName, formatLocation } from "../../utils";
import Search from "../../components/Search";
import { Popover } from "react-tiny-popover";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

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
  console.log(searchResults);

  useEffect(() => {
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
    debouncedSearch(search ?? "");
  }, [search]);

  const SearchResults = () => {
    if (!searchResults) return null;
    if (
      searchResults?.doctors?.length === 0 &&
      searchResults?.manufacturers?.length === 0 &&
      searchResults?.products?.length === 0
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
            // doctors
            ...searchResults?.doctors.map(
              ({ id, firstName, lastName, city, state }) => ({
                id,
                name: `${firstName} ${lastName}`,
                location: formatLocation(city, state),
                type: "doctor" as const,
              })
            ),
            // manufacturers
            ...searchResults?.manufacturers.map(
              ({ id, name, state, country }) => ({
                id,
                name,
                location: formatLocation(country, state),
                type: "manufacturer" as const,
              })
            ),
            // products
            ...searchResults?.products
              .filter((product) => product.type && product.type.toLowerCase() === "drug") // TODO - enable other products when we have somewhere to display them
              .map(({ id, name }) => ({
                id: id,
                name: name ?? '',
                location: '',
                type: "drug" as const,
              })),
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
							 w-[390px] h-10 mx-4 px-[2.2rem] rounded-full
               `}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </Popover>
  );
};

export default SearchPage;
