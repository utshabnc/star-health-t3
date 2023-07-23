import {
    useCallback,
    useEffect,
    useState,
  } from "react";
  import { debounce } from "lodash"
  import DetailsTable from "../../components/DetailsTable";
  import { formatLocation } from "../../utils";
  import { Popover } from "react-tiny-popover";
  import { useRouter } from "next/router";
  import { trpc } from "../../utils/trpc";
import ResultDetailsTable from "../../components/ResultDetailsTable";
import LoadingStarHealth from "../../components/Loading";
interface ResultSchema {
  title: string | null;
  subtitle: string | null;
  category: string;
  link: string

}
import Image from "next/image";

const ResultPage= () => {
const { query: querySearch } = useRouter();
const [search, setSearch] = useState<string>();
const [food,setFood]=useState([])
const [results,setResults]=useState<ResultSchema[]>([])

const { data: searchResults, refetch: fetchSearchResults } =
trpc.db.searchAll.useQuery(search ?? "", { enabled: false });

useEffect(()=>{
  const s = [
    ...[],
    ...['sas']
  ]
  const rows=[
    // doctors,
    searchResults?.doctors.map(
      ({ id, firstName, lastName, city, state })=> ({
        title: `${firstName} ${lastName}`,
        subtitle: formatLocation(city, state),
        category: "Doctor",
        link:'/doctor/'+id,

      })
    ),
  ]
},[search])
useEffect(() => {
    const searchParam = querySearch["search"] as string;
    
    if (searchParam) {
      setSearch(searchParam);
      if (search||search!='')
      {
        debouncedSearch(search ?? "")
      }
      }
  }, [querySearch]);
  const debouncedSearch = useCallback(
    debounce((search: string) => {
      if (search.length < 2) return;
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

  return (
    <div className="flex h-screen w-full items-center justify-center bg-bgPrimary">
      {!searchResults&&
      <LoadingStarHealth></LoadingStarHealth>}

      {searchResults&&<ResultDetailsTable 
      rows={[
        // doctors
        ...searchResults?.doctors.map(
          ({ id, firstName, lastName, city, state }) => ({
            title: `${firstName} ${lastName}`,
            subtitle: formatLocation(city, state),
            category: "Doctor",
            link:'/doctor/'+id,
    
          })
        )??[],
        // manufacturers
        ...searchResults?.manufacturers.map(
          ({ id, name, state, country }) => ({
            title:name,
            subtitle: formatLocation(country, state),
            category: "Manufacturer",
            link:'/manufacturer/'+id,
    
          })
        )??[],
        // products
        ...searchResults?.products
          .filter(
            (product) =>
              product.type && product.type.toLowerCase() === "device"
          ) // TODO - enable other products when we have somewhere to display them
          .map(({ id, name }) => ({
            title: name ?? "",
            subtitle: "",
            link:'/drug/'+id,
            category: "Device",
            }))??[],
            ...searchResults?.hospital.map(
              ({ id, name, state,street_address, hospital_id }) => ({
                title:name,
                subtitle: formatLocation("USA", state),
                link:'/hospital?hospital_id='+hospital_id+'&hospital_address='+street_address,
                category: "Hospital",
              })
            )??[],
            ...searchResults?.clinicalTrials.map(
              ({ id, brief_title,nctid}) => ({
                title: brief_title,
                subtitle: "",
                link:'/clinicalTrial?NCTId='+nctid,
                category: "Clinical Trials",
              })
            )??[],
            ...searchResults?.drugs.map(
              ({ id, brand_name }) => ({
                title: brand_name,
                subtitle: "",
                link:'/drugs/'+id,
                category: "Drugs"
              })
            )??[],
            ...searchResults?.diseases.map(
              ({ id, name ,url}) => ({
                title: name,
                subtitle: "",
    
                link:'/genetic/condition?name='+url?.substring(url.lastIndexOf('/')+1),                  
                category: "Diseases",
              })
            )??[],
            ...searchResults?.genetics.map(
              ({ id, name ,url}) => ({
                title: name,
                subtitle: "",
                link:'/genetic/gene?name='+url?.substring(url.lastIndexOf('/')+1),
                category: "Genetics" as const,
              })
            )??[],
          ...food?.map(                
            (item) => ({
            title: item['description'],
            link:'/food?id='+ item['fdcId'],
            subtitle:item['foodCategory'],
            category: "Food" as const,
          }))
      ]}/>}
    </div>
  );
};
export default ResultPage;
