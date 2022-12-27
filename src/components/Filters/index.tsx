import { Doctor } from '@prisma/client'
import React, { SetStateAction, useEffect, useState } from 'react'
import { FilterParams } from '../../pages/directory'
import SearchPage from '../../pages/SearchPage'
import type { DirectoryResponse, NameListResponse } from '../../server/trpc/router/db'
import { allStates } from '../../utils'
import { trpc } from '../../utils/trpc'
import DirectorySearch from '../DirectorySearch'



export default function Filters({data, filterParams, setFilterParams, search, setSearch }: {data: DirectoryResponse, filterParams: any, setFilterParams: any, search: string | undefined, setSearch: SetStateAction<string>}) {  
    
    const {data: listData, isLoading} = trpc.db.nameList.useQuery()
    console.log(listData);
    
    
    const filterList = (arr: any[]) => {
        if(arr){
            if(filterParams.doctorFilter || filterParams.manufacturerFilter || filterParams.productFilter){
                listData?.doctorNames.filter(item => {
                    if(data?.doctorList){
                        if(data?.doctorList.filter((doc: Doctor) => doc.id === item.id).length > 0){
                            return true
                        }else {
                            return false
                        }
                        
                    }
                })
            }
            return arr
        }
        return arr
    }

    const filteredDocListToggle = () => {
        if(filterParams.doctorFilter || filterParams.manufacturerFilter || filterParams.productFilter) {
            return data?.doctorList
        }
        return listData?.doctorNames
    }
    const filteredManuListToggle = () => {
        if(filterParams.doctorFilter || filterParams.manufacturerFilter || filterParams.productFilter) {
            return data?.manufacturerList
        }
        return listData?.manufacturerNames
    }
    const filteredProdListToggle = () => {
        if(filterParams.doctorFilter || filterParams.manufacturerFilter || filterParams.productFilter) {
            return data?.productNameList
        }
        return listData?.productNameList
    }
    
  

    // add in year filter

    const formatSpecialties = (str: string) => {
        const lastIndex = str.lastIndexOf("|");
        const finalString = str.slice(lastIndex + 1).trim()

        return finalString
    }

    const allYears = ["ALL", "2021", "2020", "2019", "2018", "2017","2016"]

  return (
    <>
        <div className='w-full'>
            <div>
                <div className="filters flex w-full items-center">
                    <p className='text-violet-700 w-20 text-lg  my-2'>
                        Filter By
                    </p>
                    
                    <div className="wrap-filters flex w-full py-2">
                        {data && (data?.doctors || data?.manufacturers) && <select onChange={(e) => {
                            setFilterParams((prev: FilterParams) => {
                                return {
                                    ...prev,
                                    state: e.target.value,
                                    city: '',
                                    zipCode: '',
                                    cursor: ''

                                }
                            })
                           
                        }} value={filterParams.state} className='bg-violet-500 my-2 text-white w-[20%] p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer' name="state-filter" id="state-filter">
                            <option value={""}>State</option>
                            {allStates.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>}
                        {data && data?.cities && <select value={filterParams.city} onChange={(e) => {
                            setFilterParams((prev: FilterParams) => {
                                return {
                                    ...prev,
                                    city: e.target.value,
                                    cursor: ''
                                }
                            })
                           
                        }} name="city-opt" id="city-opt" className='bg-violet-500 my-2 text-white w-[20%] p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer'>
                            <option value="">{filterParams.city == "" ? "City" : "Reset"}</option>
                            {data?.cities.sort().map((item, index) => (
                                <option key={index} value={item}>{item.charAt(0).toUpperCase() + item.slice(1, item.length).toLowerCase()}</option>
                            ))}
                        </select>}
                        
                        {data && data?.zipCodes && <select value={filterParams.zipCode} onChange={(e) => {setFilterParams((prev: FilterParams) => {
                            return {
                                ...prev,
                                zipCode: e.target.value,
                                cursor: ''
                            }
                            })
                           
                        }} name="city-opt" id="city-opt" className='bg-violet-500 my-2 text-white w-[20%] p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer'>
                            <option value="">{filterParams.zipCode == "" ? "Zipcode" : "Reset"}</option>
                            {data?.zipCodes.map((item, index) => (
                                <option key={index} value={item}>{item.charAt(0).toUpperCase() + item.slice(1, item.length).toLowerCase()}</option>
                            ))}
                        </select>}
                        {data && data?.specialties && <select value={filterParams.specialty} onChange={(e) => {setFilterParams((prev: FilterParams) => {
                            return {
                                ...prev,
                                specialty: e.target.value,
                                cursor: ''
                            }
                            })
                           
                        }} name="city-opt" id="city-opt" className='bg-violet-500 my-2 text-white w-[20%] p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer'>
                            <option value="">{filterParams.specialty == "" ? "Specialty" : "Reset"}</option>
                            {data?.specialties.sort().map((item, index) => (
                                <option key={index} value={item}>{formatSpecialties(item)}</option>
                            ))}
                        </select>}
                        {data && data?.products && <select onChange={(e) => {
                            setFilterParams((prev: FilterParams) => {
                                return {
                                    ...prev,
                                    type: e.target.value,
                                    cursor: ''
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
                                    category: e.target.value,
                                    cursor: ''
                                }
                            })
                           
                        }} value={filterParams.category} className='bg-violet-500 my-2 text-white p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer w-[20%]' name="state-filter" id="state-filter">
                            <option value="">{filterParams.category == "" ? "Category" : "Reset"}</option>
                            {data?.productTypes.map((item: {type: string, category: string} , index: number) => (
                                <option key={index} value={item.category}>{item.category === "NULL" ? "Misc" : item.category}</option>
                            ))}
                        </select>}
                        {/* fix bug of e.target.value console logging out as [onject Object] rather than its actual value*/}
                        {data && data?.payments && listData?.doctorNames && <select onChange={(e) => {
                            console.log("val", e.target.value);
                            
                            setFilterParams((prev: FilterParams) => {
                                return {
                                    ...prev,
                                    doctorFilter: e.target.value,
                                    cursor: ''
                                }
                            })
                           
                        }} value={filterParams.doctorFilter} className='bg-violet-500 my-2 text-white w-[20%] p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer' name="state-filter" id="state-filter">
                            <option value={""}>{filterParams.doctorFilter == "" ? "Doctor" : "Reset"}</option>
                            {filteredDocListToggle()?.sort().map((item, index) => (
                                <option key={index} value={item.id}>{item.name.split(" ").map((li: string) => `${li.charAt(0).toUpperCase()}${li.slice(1, li.length).toLowerCase()}`).join(" ")}</option>
                            ))}
                        </select>}
                        {data && data?.payments && listData?.manufacturerNames && <select onChange={(e) => {
                            setFilterParams((prev: FilterParams) => {
                                return {
                                    ...prev,
                                    manufacturerFilter: e.target.value,
                                    cursor: ''
                                }
                            })
                           
                        }} value={filterParams.manufacturerFilter} className='bg-violet-500 my-2 text-white w-[20%] p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer' name="state-filter" id="state-filter">
                            <option value="">{filterParams.category == "" ? "Manufacturer" : "Reset"}</option>
                            {filteredManuListToggle()?.map((item, index) => (
                                <option key={index} value={item.id}>{item.name}</option>
                            ))}
                        </select>}
                        {data && data?.payments && listData?.productNameList && <select onChange={(e) => {
                            setFilterParams((prev: FilterParams) => {
                                return {
                                    ...prev,
                                    productFilter: e.target.value,
                                    cursor: ''
                                }
                            })
                           
                        }} value={filterParams.productFilter} className='bg-violet-500 my-2 text-white w-[20%] p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer' name="state-filter" id="state-filter">
                            <option value="">{filterParams.productFilter == "" ? "Product" : "Reset"}</option>
                            {filteredProdListToggle()?.map((item, index) => (
                                <option key={index} value={item.id}>{item.name}</option>
                            ))}
                        </select>}
                        {data?.manufacturers && <select onChange={(e) => {
                            setFilterParams((prev: FilterParams) => {
                                return {
                                    ...prev,
                                    year: e.target.value,
                                    cursor: '', 
                                }
                            })
                           
                        }} value={filterParams.year} className='bg-violet-500 my-2 text-white w-[20%] p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer' name="state-filter" id="state-filter">
                            <option value={"ALL"}>Year</option>
                            {allYears.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>}
                        
                        
                    </div>
                </div>
                <div className='my-1'>
                    <hr />
                </div>

            
                
            </div>
        </div>
    </>
  )
}