import { Doctor } from '@prisma/client'
import React from 'react'
import { DirectoryResponse } from '../../server/trpc/router/db'
import { allStates } from '../../utils'

export default function Filters({data, filterParams, setFilterParams}: {data: DirectoryResponse, filterParams: any, setFilterParams: any}) {    

    // add in year filter

  return (
    <>
        <div className='w-80 mx-2'>
            <div>
                <div className="wrap-top-top flex gap-2">
                    <select value={filterParams.subject} onChange={(e) => setFilterParams((prev: any) => {
                        return {
                            ...prev,
                            subject: e.target.value,
                        }
                    })} name="search" id="search-subject" className='bg-violet-500 w-3/4 p-2 rounded-lg cursor-pointer text-white'>
                        <option value="">Search for...</option>
                        <option value="top-manufacturer">Top 25 Manufacturers by earnings</option>
                        <option value="payment">Transactions</option>
                        <option value="doctor">Doctors</option>
                        <option value="manufacturer">Manufacturers</option>
                        <option value="product">Products</option>
                    </select>
                    <button 
                    className='px-3 py-1 rounded-lg bg-rose-400 hover:bg-rose-500 active:bg-rose-600'
                    onClick={() => {
                        setFilterParams({
                            subject: '', 
                            state: '', 
                            city: '', 
                            zipCode: '', 
                            specialty: '', 
                            type: '', 
                            category: '', 
                            doctorFilter: "", 
                            manufacturerFilter: '', 
                            productFilter: ''
                        })
                    }}
                    >
                        Clear
                    </button>
                </div>

                <p className='text-violet-700 text-lg  my-2'>
                    Filter By
                </p>
            
                <div className='my-1'>
                    <hr />
                </div>
                <div className="wrap-filters py-2">
                    {data && (data?.doctors || data?.manufacturers || data?.stateSummary) && <select onChange={(e) => {
                        setFilterParams((prev: any) => {
                            return {
                                ...prev,
                                state: e.target.value,
                                city: '',
                                zipCode: '',
                            }
                        })
                    }} value={filterParams.state} className='bg-violet-500 my-2 text-white px-4 py-2 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer' name="state-filter" id="state-filter">
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
                    })}} name="city-opt" id="city-opt" className='bg-violet-500 my-2 text-white px-4 py-2 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer w-40'>
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
                    })}} name="city-opt" id="city-opt" className='bg-violet-500 my-2 text-white px-4 py-2 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer w-28'>
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
                    })}} name="city-opt" id="city-opt" className='bg-violet-500 my-2 text-white px-4 py-2 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer w-40'>
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
                    }} value={filterParams.type} className='bg-violet-500 my-2 text-white px-4 py-2 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer w-full' name="state-filter" id="state-filter">
                        <option value="">{filterParams.type == "" ? "Type" : "Reset"}</option>
                        {data?.productTypes.map((item, index) => (
                            <option key={index} value={item}>{item === "NULL" ? "Misc" : item}</option>
                        ))}
                    </select>}
                    {data && data?.products && <select onChange={(e) => {
                        setFilterParams((prev: any) => {
                            return {
                                ...prev,
                                category: e.target.value
                            }
                        })
                    }} value={filterParams.category} className='bg-violet-500 my-2 text-white px-4 py-2 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer w-full' name="state-filter" id="state-filter">
                        <option value="">{filterParams.category == "" ? "Category" : "Reset"}</option>
                        {data?.categories.map((item, index) => (
                            <option key={index} value={item}>{item === "NULL" ? "Misc" : item}</option>
                        ))}
                    </select>}
                    {/* fix bug of e.target.value console logging out as [onject Object] rather than its actual value*/}
                    {data && data?.payments && <select onChange={(e) => {
                        console.log("val", e.target.value);
                        
                        setFilterParams((prev: any) => {
                            return {
                                ...prev,
                                doctorFilter: e.target.value
                            }
                        })
                    }} value={filterParams.doctorFilter} className='bg-violet-500 my-2 text-white px-4 py-2 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer w-full' name="state-filter" id="state-filter">
                        <option value={""}>{filterParams.doctorFilter == "" ? "Doctor" : "Reset"}</option>
                        {data?.doctorList.sort().map((item, index) => (
                            <option key={index} value={item.id}>{item.name.split(" ").map((li: string) => `${li.charAt(0).toUpperCase()}${li.slice(1, li.length).toLowerCase()}`).join(" ")}</option>
                        ))}
                    </select>}
                    {data && data?.payments && <select onChange={(e) => {
                        setFilterParams((prev: any) => {
                            return {
                                ...prev,
                                manufacturerFilter: e.target.value
                            }
                        })
                    }} value={filterParams.manufacturerFilter} className='bg-violet-500 my-2 text-white px-4 py-2 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer w-full' name="state-filter" id="state-filter">
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
                    }} value={filterParams.productFilter} className='bg-violet-500 my-2 text-white px-4 py-2 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer w-full' name="state-filter" id="state-filter">
                        <option value="">{filterParams.productFilter == "" ? "Product" : "Reset"}</option>
                        {data?.productNameList.map((item, index) => (
                            <option key={index} value={item.id}>{item.name}</option>
                        ))}
                    </select>}
                    {data?.manufacturers && <select onChange={(e) => {
                        setFilterParams((prev: any) => {
                            return {
                                ...prev,
                                year: e.target.value, 
                            }
                        })
                    }} value={filterParams.year} className='bg-violet-500 my-2 text-white px-4 py-2 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer' name="state-filter" id="state-filter">
                        <option value={"ALL"}>Year</option>
                        {data?.allYears.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>}
                    
                </div>
                
            </div>
        </div>
    </>
  )
}
