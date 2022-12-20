import { Doctor } from '@prisma/client'
import React, {useState} from 'react'
import { DirectoryResponse } from '../../server/trpc/router/db'
import { allStates } from '../../utils'

export default function Filters({data, filterParams, setFilterParams, setBtnDisable}: {data: DirectoryResponse, filterParams: any, setFilterParams: any, setBtnDisable: any}) {    

    const allYears = ["ALL", "2021", "2020", "2019", "2018", "2017","2016"]

    const [showFilters, setShowFilters] = useState<boolean>(false)

  return (
    <>
        <div className='w-full'>
            <div>

                {showFilters && <div className="filters flex w-full items-center">

                    <p className='text-violet-700 text-lg w-[10%]'>
                        Filter By
                    </p>
                
            
                    <div className="wrap-filters py-2 flex w-full">
                        {data && (data?.doctors || data?.manufacturers || data?.stateSummary) && <select onChange={(e) => {
                            setFilterParams((prev: any) => {
                                return {
                                    ...prev,
                                    state: e.target.value,
                                    city: '',
                                    zipCode: '',
                                }
                            })
                        }} value={filterParams.state} className='bg-violet-500 w-[20%] p-1 my-2 text-white rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer' name="state-filter" id="state-filter">
                            <option value={""}>State</option>
                            {allStates.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>}
                        {data && data?.cities && <select value={filterParams.city} onChange={(e) => {setFilterParams((prev: any) => {
                            return {
                                ...prev,
                                city: e.target.value
                            }
                        })}} name="city-opt" id="city-opt" className='bg-violet-500 w-[20%] my-2 text-white p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer'>
                            <option value="">{filterParams.city == "" ? "City" : "Reset"}</option>
                            {data?.cities.sort().map((item, index) => (
                                <option key={index} value={item}>{item.charAt(0).toUpperCase() + item.slice(1, item.length).toLowerCase()}</option>
                            ))}
                        </select>}
                        
                        {data && data?.zipCodes && <select value={filterParams.zipCode} onChange={(e) => {setFilterParams((prev: any) => {
                            return {
                                ...prev,
                                zipCode: e.target.value
                            }
                        })}} name="city-opt" id="city-opt" className='bg-violet-500 my-2 text-white p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer w-[20%]'>
                            <option value="">{filterParams.zipCode == "" ? "Zipcode" : "Reset"}</option>
                            {data?.zipCodes.map((item, index) => (
                                <option key={index} value={item}>{item.charAt(0).toUpperCase() + item.slice(1, item.length).toLowerCase()}</option>
                            ))}
                        </select>}
                        {data && data?.specialties && <select value={filterParams.specialty} onChange={(e) => {setFilterParams((prev: any) => {
                            return {
                                ...prev,
                                specialty: e.target.value
                            }
                        })}} name="city-opt" id="city-opt" className='bg-violet-500 w-[20%] my-2 text-white p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer'>
                            <option value="">{filterParams.specialty == "" ? "Specialty" : "Reset"}</option>
                            {data?.specialties.sort().map((item, index) => (
                                <option key={index} value={item}>{item.charAt(0).toUpperCase() + item.slice(1, item.length).toLowerCase()}</option>
                            ))}
                        </select>}
                        {data && data?.products && <select onChange={(e) => {
                            setFilterParams((prev: any) => {
                                return {
                                    ...prev,
                                    type: e.target.value
                                }
                            })
                        }} value={filterParams.type} className='bg-violet-500 my-2 text-white p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer w-[20%]' name="state-filter" id="state-filter">
                            <option value="">{filterParams.type == "" ? "Type" : "Reset"}</option>
                            {data?.productTypes.map((item , index) => (
                                <option key={index} value={item.type}>{item.type === "NULL" ? "Misc" : item.type}</option>
                            ))}
                        </select>}
                        {data && data?.products && <select onChange={(e) => {
                            setFilterParams((prev: any) => {
                                return {
                                    ...prev,
                                    category: e.target.value
                                }
                            })
                        }} value={filterParams.category} className='bg-violet-500 my-2 text-white p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer w-[20%]' name="state-filter" id="state-filter">
                            <option value="">{filterParams.category == "" ? "Category" : "Reset"}</option>
                            {data?.productTypes.map((item, index) => (
                                <option key={index} value={item.category}>{item === "NULL" ? "Misc" : item.category}</option>
                            ))}
                        </select>}
                        {data && data?.payments && <select onChange={(e) => {
                            console.log("val", e.target.value);
                            
                            setFilterParams((prev: any) => {
                                return {
                                    ...prev,
                                    doctorFilter: e.target.value
                                }
                            })
                        }} value={filterParams.doctorFilter} className='bg-violet-500 my-2 text-white p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer w-[20%]' name="state-filter" id="state-filter">
                            <option value={""}>{filterParams.doctorFilter == "" ? "Doctor" : "Reset"}</option>
                            {data?.doctorList.sort().map((item, index) => (
                                <option key={index} value={item.id}>{item.fullName}</option>
                            ))}
                        </select>}
                        {data && data?.payments && <select onChange={(e) => {
                            setFilterParams((prev: any) => {
                                return {
                                    ...prev,
                                    manufacturerFilter: e.target.value
                                }
                            })
                        }} value={filterParams.manufacturerFilter} className='bg-violet-500 my-2 text-white p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer w-[20%]' name="state-filter" id="state-filter">
                            <option value="">{filterParams.category == "" ? "Manufacturer" : "Reset"}</option>
                            {data?.manufacturerList.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>}
                        {data && data?.payments && <select onChange={(e) => {
                            setFilterParams((prev: any) => {
                                return {
                                    ...prev,
                                    productFilter: e.target.value
                                }
                            })
                        }} value={filterParams.productFilter} className='bg-violet-500 my-2 text-white p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer w-[20%]' name="state-filter" id="state-filter">
                            <option value="">{filterParams.productFilter == "" ? "Product" : "Reset"}</option>
                            {data?.productNameItems.map((item, index) => (
                                <option key={index} value={item.id}>{item.name}</option>
                            ))}
                        </select>}
                        {(data?.manufacturers || data?.products) && <select onChange={(e) => {
                            setFilterParams((prev: any) => {
                                return {
                                    ...prev,
                                    year: e.target.value, 
                                }
                            })
                        }} value={filterParams.year} className='bg-violet-500 my-2 text-white p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer w-[20%]' name="state-filter" id="state-filter">
                            <option value={"ALL"}>Year</option>
                            {allYears.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>}
                        
                    </div>
                </div>}
                <div className="w-full mr-2 flex justify-end">
                    <button onClick={!showFilters ? (() => setShowFilters(true)) : (() => setShowFilters(false))} className='text-sm text-slate-600 hover:bg-slate-100 rounded p-1'>{!showFilters ? "Show" : "Hide"} filters</button>

                </div>
               {showFilters && <div className='my-1 w-full'>
                    <hr />
                </div>}
                
            </div>
        </div>
    </>
  )
}
