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
const ResultPage= () => {
const [search, setSearch] = useState<string>();
const [searchT, setSearchT] = useState<string>();

const [food,setFood]=useState([]);
const [isSearching,setIsSearching]=useState(false);
const { data: searchResults, refetch: fetchSearchResults } =
trpc.db.searchAll.useQuery(searchT ?? "", { enabled: false });

useEffect(()=>{
  if (!searchT||searchT.length < 2) return;
  fetchSearchResults();
  const fetchFood = async () => {
    try {
      const response = await fetch(`/api/food/search/`+searchT);
      const data = await response.json();
      if (response.status != 200) 
      {

      }
      else {
        setFood(data["foods"]);
       
      }
      setIsSearching(false)
}
catch{setFood([])}
}
fetchFood()
},[searchT])

  return (
    <div className="flex flex-col h-screen w-full bg-bgPrimary">

      <div className="flex flex-row w-full pt-4 px-[2.2rem]">
        <input
        type="text"
        placeholder={
       "Search the StarHealth Database"
        }
        className={` me-20  w-full rounded-full px-[2.2rem] text-[2.5rem] h-[2.488rem]  lg:text-base `}
        value={search}
        onChange={(e) => {setSearch(e.target.value);} }
      />
      <div className="ease focus:shadow-outline select-none rounded-full font-bold border border-violet-700 bg-violet-700 px-[2.2rem] py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none" onClick={(e)=>{{setSearchT(search);setIsSearching(true);}}}>
            Search
      </div>
      </div>
      {/* {( !searchResults)&&<div className="h-full w-full bg-white flex justify-center	items-center mt-4">Search the StarHealth Database</div>} */}
      {(!searchResults)&&<LoadingStarHealth></LoadingStarHealth>}
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
