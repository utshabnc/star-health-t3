import {
    useEffect,
    useState,
  } from "react";
  import { formatLocation } from "../../utils";
  import { trpc } from "../../utils/trpc";
import ResultDetailsTable from "../../components/ResultDetailsTable";
import Image from "next/image";
import Logo from "../../assets/Logo.png"
import LoadingStarHealth from "../../components/Loading";
import { HiOutlineSearch } from "react-icons/hi";
import { Tab } from "../../utils/Enums/Tab.enum";
import * as HospitalOwnerData from "../../components/HospitalOwners/processJSON";
import type { HospitalOwners } from "../../components/HospitalOwners/HospitalOwners.model";

interface ResultSchema {
  title: string | null;
  subtitle: string | null;
  category: string;
  link: string

}
const ResultPage= () => {
const [search, setSearch] = useState<string>();
const [searchT, setSearchT] = useState<string>('');
const [selectedTab, setSelectedTab] = useState<Tab>(Tab.All);
const [food,setFood]=useState([]);
const [currentData,setCurrentData]=useState<ResultSchema[]>()
const { data: searchResults, refetch: fetchSearchResults } =
trpc.db.searchAll.useQuery({
  searchTerm: searchT,

}, { enabled: false });
const [hospitalOwners,setHospitalOwners]=useState<ResultSchema[]>([]);

useEffect(()=>{
  const array:ResultSchema[]= [
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
      })),
    ...hospitalOwners??[],
    ...searchResults?.payments
  .map(({ id,amount,product }) => ({
    title: product['name'] ?? "",
    subtitle: "Amount: $"+ amount??"",
    link:'',
    category: "Payments",
    }))??[]
  ]
  setSelectedTab(Tab.All)
  setCurrentData(array)


},[searchResults])
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
}
catch{setFood([])}
}
fetchFood()
const fetchHospitals = async () => {
  try {
    const response = await HospitalOwnerData.default();
    const data: HospitalOwners[] = await HospitalOwnerData.data;
    const filteredOwners:ResultSchema[] = [];
    data?.forEach((item:any,index:any) => {
      item['OWNERS']?.forEach((owner:any) => {
        if (owner?.NAME_OWNER?.toLowerCase().includes(searchT.toLowerCase())) {
          filteredOwners.push({'title':owner.NAME_OWNER,'subtitle':item.ORGANIZATION_NAME,'link':`/HospitalOwners?index=${index}`,'category':'Hospital Owner'});
        }
      });
    });

    setHospitalOwners(filteredOwners);
  } catch (error) {
  }}
fetchHospitals();

},[searchT,fetchSearchResults])
const handleTabClick = (tab: Tab, array:ResultSchema[] ) => {
setSelectedTab(tab)
setCurrentData(array)
}
  return (
    
    <div className="flex flex-col w-full bg-bgPrimary">
    {!searchT&&<>
      <div className="flex h-[100vh] flex-col w-100 bg-white justify-start items-center pt-[10rem]">
        <div className="pb-4 font-custom font-bold
							text-white md:block">
              <Image
                src={Logo}
                alt="logo"
                width={300}
                height={300}
              />        </div>      
      <div className="flex flex-row w-full justify-center ">
      <div className="w-[60%] relative hidden items-center justify-center md:flex">
      <div  className="absolute pointer-events-none  w-[100%] ml-[4.1rem] text-gray-400">
              <HiOutlineSearch size={21} />
            </div>
        <input
        type="text"
        placeholder={
       "Search the StarHealth Database"
        }
        className={`w-[100%] outline rounded-full px-[2.2rem] mx-[1.5rem] text-[2.5rem] h-[2.488rem]  lg:text-base `}
        value={search} 
        onChange={(e) => {setSearch(e.target.value);} }
      />
      </div>
      <div className="ease focus:shadow-outline select-none rounded-full font-bold border border-violet-700 bg-violet-700 px-[2.2rem] py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none" onClick={(e)=>{{setSearchT(search??'');}}}>
            Search
      </div>
      </div>
    </div>
    </>}
    {searchT&&<>
    <div className="flex flex-col w-100 justify-center items-center pt-4">

        <div className="pb-4 font-custom font-bold
							text-white md:block">
        Search the StarHealth Database
        </div>      
        <div className="flex flex-row w-full justify-center ">
      <div className="w-[60%] relative hidden items-center justify-center md:flex">
      <div  className="absolute pointer-events-none  w-[100%] ml-[4.1rem] text-gray-400">
              <HiOutlineSearch size={21} />
            </div>
        <input
        type="text"
        placeholder={
       "Search the StarHealth Database"
        }
        className={`w-[100%] outline rounded-full px-[2.2rem] mx-[1.5rem] text-[2.5rem] h-[2.488rem]  lg:text-base `}
        value={search} 
        onChange={(e) => {setSearch(e.target.value);} }
      />
      </div>
      <div className="ease focus:shadow-outline select-none rounded-full font-bold border border-violet-700 bg-violet-700 px-[2.2rem] py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none" onClick={(e)=>{{setSearchT(search??'');}}}>
            Search
      </div>
      </div>
      </div>
      {/* {( !searchResults)&&<div className="h-full w-full bg-white flex justify-center	items-center mt-4">Search the StarHealth Database</div>} */}
      {(!searchResults)&&
      <div className="mt-4">
      <LoadingStarHealth></LoadingStarHealth>
      </div>}
      {searchResults&&
      <div className="rounded-lg border border-gray-200 bg-white shadow-lg pt-4 mt-4">
      <div  className="flex gap-3 justify-center ">
      <button
            onClick={() => {
                    handleTabClick(Tab.All, 
                      [
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
                          })),
                        ...hospitalOwners??[],
                        ...searchResults?.payments
                      .map(({ id,amount,product }) => ({
                        title: product['name'] ?? "",
                        subtitle: "Amount: $"+ amount??"",
                        link:'',
                        category: "Payments",
                        }))??[]
                      ]
                      );
                  }}
                  className={`border-b-2 hover:border-zinc-500 ${
                    selectedTab === Tab.All
                      ? "border-violet-600"
                      : "border-zinc-200"
                  }`}
                >
        <span>All</span>

      </button>
      <button
            onClick={() => {
                    handleTabClick(Tab.ClinicalTrials, 
                    [            ...searchResults?.clinicalTrials.map(
                      ({ id, brief_title,nctid}) => ({
                        title: brief_title,
                        subtitle: "",
                        link:'/clinicalTrial?NCTId='+nctid,
                        category: "Clinical Trials",
                      })
                    )??[]]
                      );
                  }}
                  className={`border-b-2 hover:border-zinc-500 ${
                    selectedTab === Tab.ClinicalTrials
                      ? "border-violet-600"
                      : "border-zinc-200"
                  }`}
                >
        <span>Clinical Trials</span>

      </button>
      <button
            onClick={() => {
                    handleTabClick(Tab.Diseases,   [...searchResults?.diseases.map(
                      ({ id, name ,url}) => ({
                        title: name,
                        subtitle: "",
                        link:'/genetic/condition?name='+url?.substring(url.lastIndexOf('/')+1),                  
                        category: "Diseases",
                      })
                    )]??[]);
                  }}
                  className={`border-b-2 hover:border-zinc-500 ${
                    selectedTab === Tab.Diseases
                      ? "border-violet-600"
                      : "border-zinc-200"
                  }`}
                >
          <span>Diseases</span>
      </button>
      <button
            onClick={() => {
                    handleTabClick(Tab.Doctors,[
                      ...searchResults?.doctors.map(
                        ({ id, firstName, lastName, city, state }) => ({
                          title: `${firstName} ${lastName}`,
                          subtitle: formatLocation(city, state),
                          category: "Doctor",
                          link:'/doctor/'+id,
                  
                        })
                      )??[]
                    ]);
                  }}
                  className={`border-b-2 hover:border-zinc-500 ${
                    selectedTab === Tab.Doctors
                      ? "border-violet-600"
                      : "border-zinc-200"
                  }`}
                >
          <span>Doctors</span>
      </button>
      <button
            onClick={() => {
                    handleTabClick(Tab.Drugs, [            ...searchResults?.drugs.map(
                      ({ id, brand_name }) => ({
                        title: brand_name,
                        subtitle: "",
                        link:'/drugs/'+id,
                        category: "Drugs"
                      })
                    )??[]]);
                  }}
                  className={`border-b-2 hover:border-zinc-500 ${
                    selectedTab === Tab.Drugs
                      ? "border-violet-600"
                      : "border-zinc-200"
                  }`}
                >
          <span>Drugs</span>
      </button>
      <button
            onClick={() => {
                    handleTabClick(Tab.Food,[...food?.map(                
                      (item) => ({
                      title: item['description'],
                      link:'/food?id='+ item['fdcId'],
                      subtitle:item['foodCategory'],
                      category: "Food" as const,
                    }))
                ]);
                  }}
                  className={`border-b-2 hover:border-zinc-500 ${
                    selectedTab === Tab.Food
                      ? "border-violet-600"
                      : "border-zinc-200"
                  }`}
                >
          <span>Food</span>
      </button>
      <button
            onClick={() => {
                    handleTabClick(Tab.Genetics, [            ...searchResults?.genetics.map(
                      ({ id, name ,url}) => ({
                        title: name,
                        subtitle: "",
                        link:'/genetic/gene?name='+url?.substring(url.lastIndexOf('/')+1),
                        category: "Genetics" as const,
                      })
                    )??[]]);
                  }}
                  className={`border-b-2 hover:border-zinc-500 ${
                    selectedTab === Tab.Genetics
                      ? "border-violet-600"
                      : "border-zinc-200"
                  }`}
                >
          <span>Genetics</span>
      </button>
      <button
            onClick={() => {
                    handleTabClick(Tab.Hospitals,[...searchResults?.hospital.map(
                      ({ id, name, state,street_address, hospital_id }) => ({
                        title:name,
                        subtitle: formatLocation("USA", state),
                        link:'/hospital?hospital_id='+hospital_id+'&hospital_address='+street_address,
                        category: "Hospital",
                      })
                    )??[]]);
                  }}
                  className={`border-b-2 hover:border-zinc-500 ${
                    selectedTab === Tab.Hospitals
                      ? "border-violet-600"
                      : "border-zinc-200"
                  }`}
                >
          <span>Hospitals</span>
      </button>
      <button
            onClick={() => {
                    handleTabClick(Tab.HospitalOwners, hospitalOwners)
                  }}
                  className={`border-b-2 hover:border-zinc-500 ${
                    selectedTab === Tab.HospitalOwners
                      ? "border-violet-600"
                      : "border-zinc-200"
                  }`}
                >
          <span>Hospital Owners</span>
      </button>
      <button
            onClick={() => {
                    handleTabClick(Tab.Manufacturers,[ ...searchResults?.manufacturers.map(
                      ({ id, name, state, country }) => ({
                        title:name,
                        subtitle: formatLocation(country, state),
                        category: "Manufacturer",
                        link:'/manufacturer/'+id,
                
                      })
                    )]??[]);
                  }}
                  className={`border-b-2 hover:border-zinc-500 ${
                    selectedTab === Tab.Manufacturers
                      ? "border-violet-600"
                      : "border-zinc-200"
                  }`}
                >
          <span>Manufacturers</span>
      </button>
      <button
            onClick={() => {
                    handleTabClick(Tab.Products, [ ...searchResults?.products
                      .filter(
                        (product) =>
                          product.type && product.type.toLowerCase() === "device"
                      ) // TODO - enable other products when we have somewhere to display them
                      .map(({ id, name }) => ({
                        title: name ?? "",
                        subtitle: "",
                        link:'/drug/'+id,
                        category: "Device",
                        }))??[]]);
                  }}
                  className={`w-max border-b-2 hover:border-zinc-500 ${
                    selectedTab === Tab.Products
                      ? "border-violet-600"
                      : "border-zinc-200"
                  }`}
                >
                  <span>Medical</span> <span>Devices</span>
      </button>
      <button
            onClick={() => {
                    handleTabClick(Tab.OpioidTreatmentProviders, [...searchResults?.opioidTreatmentProviders
                      .map(({ id, provider_name, }) => ({
                        title: provider_name ?? "",
                        subtitle: "",
                        link:'/opioidTreatment/'+id,
                        category: "Opioid Treatment Providers",
                        }))??[]]);
                  }}
                  className={`w-max border-b-2 hover:border-zinc-500 ${
                    selectedTab === Tab.OpioidTreatmentProviders
                      ? "border-violet-600"
                      : "border-zinc-200"
                  }`}
                >
          <span>Opioid Treatment</span>
      </button>
      <button
            onClick={() => {
                    handleTabClick(Tab.Transactions, [...searchResults?.payments
                      .map(({ id,amount,product }) => ({
                        title: product['name'] ?? "",
                        subtitle: "Amount: $"+ amount??"",
                        link:'',
                        category: "Payments",
                        }))??[]]);
                  }}
                  className={`border-b-2 hover:border-zinc-500 ${
                    selectedTab === Tab.Transactions
                      ? "border-violet-600"
                      : "border-zinc-200"
                  }`}
                >
          <span>Transactions</span>
      </button>
      </div>
      <div className="my-1">
              <hr />
            </div>
      
      <ResultDetailsTable 
      rows={currentData??[]}/>
      </div>}
      </>}
    </div>
  );
};
export default ResultPage;
