import { Doctor } from '@prisma/client'
import React, {useState} from 'react'
import { type FilterParams } from '../../pages/directory'
import { type DirectoryResponse } from '../../server/trpc/router/db'
import { allStates } from '../../utils'

export default function Filters({data, filterParams, setFilterParams}: {data: DirectoryResponse, filterParams: FilterParams, setFilterParams: React.Dispatch<React.SetStateAction<FilterParams>>}) {    

    const allYears = ["ALL", "2021", "2020", "2019", "2018", "2017","2016"]

    const [showFilters, setShowFilters] = useState<boolean>(false)

  return (
    <>
        <div className='w-full'>
            <div>

                {<div className="filters flex w-full items-center">

                    <p className='text-violet-700 text-lg w-[10%]'>
                        Filter By
                    </p>
                
            
                    <div className="wrap-filters py-2 flex w-full">
                        {data && (data?.doctors || data?.manufacturers) && <select onChange={(e) => {
                            setFilterParams((prev: FilterParams) => {
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
                        {data && data?.cities && <select value={filterParams.city} onChange={(e) => {setFilterParams((prev: FilterParams) => {
                            return {
                                ...prev,
                                city: e.target.value
                            }
                        })}} name="city-opt" id="city-opt" className='bg-violet-500 w-[20%] my-2 text-white p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer'>
                            <option value="">{filterParams.city == "" ? "City" : "Reset"}</option>
                            {data?.cities.sort().map((item: string, index: number) => (
                                <option key={index} value={item}>{item.charAt(0).toUpperCase() + item.slice(1, item.length).toLowerCase()}</option>
                            ))}
                        </select>}
                        
                        {data && data?.zipCodes && <select value={filterParams.zipCode} onChange={(e) => {setFilterParams((prev: FilterParams) => {
                            return {
                                ...prev,
                                zipCode: e.target.value
                            }
                        })}} name="city-opt" id="city-opt" className='bg-violet-500 my-2 text-white p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer w-[20%]'>
                            <option value="">{filterParams.zipCode == "" ? "Zipcode" : "Reset"}</option>
                            {data?.zipCodes.map((item: string, index: number) => (
                                <option key={index} value={item}>{item.charAt(0).toUpperCase() + item.slice(1, item.length).toLowerCase()}</option>
                            ))}
                        </select>}
                        {data && data?.specialties && <select value={filterParams.specialty} onChange={(e) => {setFilterParams((prev: FilterParams) => {
                            return {
                                ...prev,
                                specialty: e.target.value
                            }
                        })}} name="city-opt" id="city-opt" className='bg-violet-500 w-[20%] my-2 text-white p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer'>
                            <option value="">{filterParams.specialty == "" ? "Specialty" : "Reset"}</option>
                            {data?.specialties.sort().map((item: string, index: number) => (
                                <option key={index} value={item}>{item.charAt(0).toUpperCase() + item.slice(1, item.length).toLowerCase()}</option>
                            ))}
                        </select>}
                        {data && data?.products && <select onChange={(e) => {
                            setFilterParams((prev: FilterParams) => {
                                return {
                                    ...prev,
                                    type: e.target.value
                                }
                            })
                        }} value={filterParams.type} className='bg-violet-500 my-2 text-white p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer w-[20%]' name="state-filter" id="state-filter">
                            <option value="">{filterParams.type == "" ? "Type" : "Reset"}</option>
                            {data?.productTypes.map((item: {type: string, category: string} , index: number) => (
                                <option key={index} value={item.type}>{item.type === "NULL" ? "Misc" : item.type}</option>
                            ))}
                        </select>}
                        {data && data?.products && <select onChange={(e) => {
                            setFilterParams((prev: FilterParams) => {
                                return {
                                    ...prev,
                                    category: e.target.value
                                }
                            })
                        }} value={filterParams.category} className='bg-violet-500 my-2 text-white p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer w-[20%]' name="state-filter" id="state-filter">
                            <option value="">{filterParams.category == "" ? "Category" : "Reset"}</option>
                            {data?.productTypes.map((item: {type: string, category: string} , index: number) => (
                                <option key={index} value={item.category}>{item.category === "NULL" ? "Misc" : item.category}</option>
                            ))}
                        </select>}
                        {data && data?.payments && <select onChange={(e) => {
                            console.log("val", e.target.value);
                            
                            setFilterParams((prev: FilterParams) => {
                                return {
                                    ...prev,
                                    doctorFilter: e.target.value
                                }
                            })
                        }} value={filterParams.doctorFilter} className='bg-violet-500 my-2 text-white p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer w-[20%]' name="state-filter" 
                        id="doc-filter">
                            <option value={""}>{filterParams.doctorFilter == "" ? "Doctor" : "Reset"}</option>
                            {data?.doctorList.sort().map((item: {id: string, fullName: string}, index: number) => (
                                <option key={index} value={item.id}>{item.fullName}</option>
                            ))}
                            
                        </select>}
                        {data && data?.payments && <select onChange={(e) => {
                            setFilterParams((prev: FilterParams) => {
                                return {
                                    ...prev,
                                    manufacturerFilter: e.target.value
                                }
                            })
                        }} value={filterParams.manufacturerFilter} className='bg-violet-500 my-2 text-white p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer w-[20%]' name="state-filter" id="state-filter">
                            <option value="">{filterParams.category == "" ? "Manufacturer" : "Reset"}</option>
                            {data?.manufacturerList.map((item: string, index: number) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>}
                        {data && data?.payments && <select onChange={(e) => {
                            setFilterParams((prev: FilterParams) => {
                                return {
                                    ...prev,
                                    productFilter: e.target.value
                                }
                            })
                        }} value={filterParams.productFilter} className='bg-violet-500 my-2 text-white p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer w-[20%]' name="state-filter" id="state-filter">
                            <option value="">{filterParams.productFilter == "" ? "Product" : "Reset"}</option>
                            {data?.productNameItems.map((item: {id: string, name: string}, index: number) => (
                                <option key={index} value={item.id}>{item.name}</option>
                            ))}
                        </select>}
                        {(data?.manufacturers || data?.products) && <select onChange={(e) => {
                            setFilterParams((prev: FilterParams) => {
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
                <div className='my-1 w-full'>
                    <hr />
                </div>
                
            </div>
        </div>
    </>
  )
}
