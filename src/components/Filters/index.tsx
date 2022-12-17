import { Doctor } from '@prisma/client'
import React from 'react'
import { allStates } from '../../utils'

export default function Filters({data, filterParams, setFilterParams}) {
    console.log("data", data?.cities);
    
    

  return (
    <>
        <div className='w-80 mx-2'>
            <div>
                
                <select value={filterParams.subject} onChange={(e) => setFilterParams(prev => {
                    return {
                        ...prev,
                        subject: e.target.value,
                    }
                })} name="search" id="search-subject" className='bg-violet-500 w-full p-2 rounded-lg cursor-pointer text-white'>
                    <option value="">Search for...</option>
                    <option value="payment">Transactions</option>
                    <option value="doctor">Doctors</option>
                    <option value="manufacturer">Manufacturers</option>
                    <option value="product">Products</option>
                </select>

                <p className='text-violet-700 text-lg  my-2'>
                    Filter By
                </p>
            
                <div className='my-1'>
                    <hr />
                </div>
                <div className="wrap-filters py-2">
                    {data && (data?.doctors || data?.manufacturers) && <select onChange={(e) => {
                        setFilterParams(prev => {
                            return {
                                ...prev,
                                state: e.target.value
                            }
                        })
                    }} value={filterParams.state} className='bg-violet-500 my-2 text-white px-4 py-2 rounded-full mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer' name="state-filter" id="state-filter">
                        <option value={""}>State</option>
                        {allStates.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>}
                    {data && data?.cities && <select value={filterParams.city} onChange={(e) => {setFilterParams(prev => {
                        return {
                            ...prev,
                            city: e.target.value
                        }
                    })}} name="city-opt" id="city-opt" className='bg-violet-500 my-2 text-white px-4 py-2 rounded-full mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer w-40'>
                        <option value="">{filterParams.city == "" ? "City" : "Reset"}</option>
                        {data?.cities.sort().map((item, index) => (
                            <option key={index} value={item}>{item.charAt(0).toUpperCase() + item.slice(1, item.length).toLowerCase()}</option>
                        ))}
                    </select>}
                    
                    {data && data?.zipCodes && <select value={filterParams.zipCode} onChange={(e) => {setFilterParams(prev => {
                        return {
                            ...prev,
                            zipCode: e.target.value
                        }
                    })}} name="city-opt" id="city-opt" className='bg-violet-500 my-2 text-white px-4 py-2 rounded-full mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer w-28'>
                        <option value="">{filterParams.zipCode == "" ? "Zipcode" : "Reset"}</option>
                        {data?.zipCodes.map((item, index) => (
                            <option key={index} value={item}>{item.charAt(0).toUpperCase() + item.slice(1, item.length).toLowerCase()}</option>
                        ))}
                    </select>}
                    {data && data?.specialties && <select value={filterParams.specialty} onChange={(e) => {setFilterParams(prev => {
                        return {
                            ...prev,
                            specialty: e.target.value
                        }
                    })}} name="city-opt" id="city-opt" className='bg-violet-500 my-2 text-white px-4 py-2 rounded-full mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer w-40'>
                        <option value="">{filterParams.specialty == "" ? "Specialty" : "Reset"}</option>
                        {data?.specialties.sort().map((item, index) => (
                            <option key={index} value={item}>{item.charAt(0).toUpperCase() + item.slice(1, item.length).toLowerCase()}</option>
                        ))}
                    </select>}
                    {data && data?.products && <select onChange={(e) => {
                        setFilterParams(prev => {
                            return {
                                ...prev,
                                type: e.target.value
                            }
                        })
                    }} value={filterParams.type} className='bg-violet-500 my-2 text-white px-4 py-2 rounded-full mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer w-full' name="state-filter" id="state-filter">
                        <option value="">{filterParams.type == "" ? "Type" : "Reset"}</option>
                        {data?.productTypes.map((item, index) => (
                            <option key={index} value={item}>{item === "NULL" ? "Misc" : item}</option>
                        ))}
                    </select>}
                    {data && data?.products && <select onChange={(e) => {
                        setFilterParams(prev => {
                            return {
                                ...prev,
                                category: e.target.value
                            }
                        })
                    }} value={filterParams.category} className='bg-violet-500 my-2 text-white px-4 py-2 rounded-full mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer w-full' name="state-filter" id="state-filter">
                        <option value="">{filterParams.category == "" ? "Category" : "Reset"}</option>
                        {data?.categories.map((item, index) => (
                            <option key={index} value={item}>{item === "NULL" ? "Misc" : item}</option>
                        ))}
                    </select>}
                    {data && data?.payments && <select onChange={(e) => {
                        setFilterParams(prev => {
                            return {
                                ...prev,
                                doctorFilter: e.target.value
                            }
                        })
                    }} value={filterParams.doctorFilter} className='bg-violet-500 my-2 text-white px-4 py-2 rounded-full mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer w-full' name="state-filter" id="state-filter">
                        <option value="">{filterParams.category == "" ? "Doctor" : "Reset"}</option>
                        {data?.doctorList.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>}
                    {data && data?.payments && <select onChange={(e) => {
                        setFilterParams(prev => {
                            return {
                                ...prev,
                                manufacturerFilter: e.target.value
                            }
                        })
                    }} value={filterParams.manufacturerFilter} className='bg-violet-500 my-2 text-white px-4 py-2 rounded-full mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer w-full' name="state-filter" id="state-filter">
                        <option value="">{filterParams.category == "" ? "Manufacturer" : "Reset"}</option>
                        {data?.manufacturerList.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>}
                    {data && data?.payments && <select onChange={(e) => {
                        setFilterParams(prev => {
                            return {
                                ...prev,
                                productFilter: e.target.value
                            }
                        })
                    }} value={filterParams.productFilter} className='bg-violet-500 my-2 text-white px-4 py-2 rounded-full mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer w-full' name="state-filter" id="state-filter">
                        <option value="">{filterParams.category == "" ? "Product" : "Reset"}</option>
                        {data?.productNameList.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>}
                    
                </div>
                
            </div>
        </div>
    </>
  )
}
