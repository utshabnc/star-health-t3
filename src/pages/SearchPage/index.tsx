import {
  useCallback,
  useEffect,
  useState,
} from "react";
import { debounce } from "lodash";
import DetailsTable from "../../components/DetailsTable";
import { formatLocation } from "../../utils";
import { Popover } from "react-tiny-popover";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import LoadingStarHealth from "../../components/Loading";

type Props = {
  setSearchVar:React.Dispatch<React.SetStateAction<string>>;
  buttonStyle?: string;
  buttonPlaceholder?: string;
  buttonSmall?: boolean;
};

const SearchPage = ({setSearchVar, buttonPlaceholder, buttonSmall }: Props) => {
  const { query: querySearch } = useRouter();
  const [search, setSearch] = useState<string>();
  const { data: searchResults, refetch: fetchSearchResults } =
    trpc.db.search.useQuery(search ?? "", { enabled: false });
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  // console.log(searchResults);
  const [food,setFood]=useState([])
  const navigate = useRouter();





  const debouncedSearch = useCallback(
    debounce((search: string) => {
      if (search.length < 2) return;
      setIsPopoverOpen(true);
      fetchSearchResults();
      const fetchFood = async () => {
        try {
          const response = await fetch(`/api/food/search/`+search);
          const data = await response.json();
          if (response.status != 200) {
          } else {
            setFood(data["foods"]);
          }
    }
  catch{setFood([])}
  }
   fetchFood()
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
      searchResults?.products?.length === 0 &&
      searchResults?.hospital?.length === 0 &&
      searchResults?.clinicalTrials?.length === 0 &&
      searchResults?.diseases?.length === 0 &&
      searchResults?.genetics?.length === 0
          ) {
      return null;
    }
    return (
      <div style={{ marginLeft: 20 }} className="flex">
        <div
          onClick={() => setIsPopoverOpen(false)}
          className="modal-close absolute right-0 top-1 z-50 mr-1 mt-4 flex cursor-pointer flex-col items-center text-sm"
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
                link:'/doctor/'+id,

              })
            ),
            // manufacturers
            ...searchResults?.manufacturers.map(
              ({ id, name, state, country }) => ({
                id,
                name,
                location: formatLocation(country, state),
                type: "manufacturer" as const,
                link:'/manufacturer/'+id,

              })
            ),
            // products
            ...searchResults?.products
              .filter(
                (product) =>
                  product.type && product.type.toLowerCase() === "device"
              ) // TODO - enable other products when we have somewhere to display them
              .map(({ id, name }) => ({
                id: id,
                name: name ?? "",
                location: "",
                link:'/drug/'+id,
                type: "device" as const,
                })),
                ...searchResults?.hospital.map(
                  ({ id, name, state,street_address, hospital_id }) => ({
                    id,
                    name,
                    location: formatLocation("USA", state),
                    link:'/hospital?hospital_id='+hospital_id+'&hospital_address='+street_address,
                    type: "hospital" as const,
                  })
                ),
                ...searchResults?.clinicalTrials.map(
                  ({ id, brief_title,nctid}) => ({
                    id: id,
                    name: brief_title,
                    location: "",

                    link:'/clinicalTrial?NCTId='+nctid,
                    type: "clinical trials" as const,
                  })
                ),
                ...searchResults?.drugs.map(
                  ({ id, brand_name }) => ({
                    id: id,
                    name: brand_name,
                    location: "",

                    link:'/drugs/'+id,
                    type: "drugs" as const,
                  })
                ),
                ...searchResults?.diseases.map(
                  ({ id, name ,url}) => ({
                    id: id,
                    name: name,
                    location: "",

                    link:'/genetic/condition?name='+url?.substring(url.lastIndexOf('/')+1),                  
                    type: "diseases" as const,
                  })
                ),
                ...searchResults?.genetics.map(
                  ({ id, name ,url}) => ({
                    id: id,
                    name: name,
                    location: "",

                    link:'/genetic/gene?name='+url?.substring(url.lastIndexOf('/')+1),
                    type: "genetics" as const,
                  })
                ),
              ...food?.map(                
                (item) => ({
                id: item['fdcId'],
                name: item['description'],
                link:'/food?id='+ item['fdcId'],
                location:item['foodCategory'],
                type: "food" as const,
              }))
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
      <div className="flex flex-row">
      <input
        type="text"
        placeholder={
           "Search the StarHealth Database"
        }
        className={`
              ${buttonSmall ? "max-w-[160px]" : ""}
							 mx-20 z-10  text-gray-300 rounded-full px-[8rem] md:text-sm  md:w-[1rem] text-[2.5rem]  md:h-[2.488rem] lg:w-[20rem] lg:px-[2.2rem] lg:text-base
               `}
        value={search}
        onChange={(e) => {setSearch(e.target.value);setSearchVar(e.target.value)} }
      />
           </div>
    </Popover>
  );
};

export default SearchPage;
