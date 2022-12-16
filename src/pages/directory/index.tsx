import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { allStates } from '../../utils';
import { trpc } from '../../utils/trpc';
import { filterDuplicates } from '../../utils';
import Filters from '../../components/Filters';

interface FilterParams {
    subject: string,
    state: string,
    city: string,
    zipCode: string,
    specialty: string,
    type: string
}

export default function Directory() {
    const navigate = useRouter();
    const [filterParams, setFilterParams] = useState<FilterParams>({subject: '', state: '', city: '', zipCode: '', specialty: '', type: ''})
    const {data, error, isLoading} = trpc.db.directory.useQuery({subject: filterParams.subject, state: filterParams.state, city: filterParams.city, zipCode: filterParams.zipCode, specialty: filterParams.specialty, type: filterParams.type});
    const [searchData, setSearchData] = useState([])
    console.log("search", searchData);
    const [cities, setCities] = useState([])
    console.log("cities", cities);

    if (isLoading || !data) {
        return (
          <>
            <div className="bgColor">
              <div
                style={{
                  height: "800px",
                }}
                className="rounded bg-white p-5"
              >
                <div className="flex flex-row">
                  <div>
                    <button
                      onClick={navigate.back}
                      className="ease focus:shadow-outline select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6 "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                        />
                      </svg>
                    </button>
                  </div>
    
                  <div className="flex w-11/12 justify-center">
                    <div className="flex flex-col">
                      <p className="p-1 text-2xl font-semibold text-violet-700"></p>
    
                      <div className="mx-auto mt-48 max-w-2xl">
                        <svg
                          role="status"
                          className="mr-2 inline h-20 w-20 animate-spin fill-purple-600 text-gray-200 dark:text-gray-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      </div>
                      <p className="flex justify-center pt-2 text-lg font-semibold text-violet-700 sm:text-2xl">
                        Loading StarHealth Data...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      }
    

  return (
    <>
        <div className="p-5 rounded bg-white h-screen">
            <div className="flex flex-row">
                <div>
                    <button
                    onClick={navigate.back}
                    className="border border-violet-700 bg-violet-700 text-white rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-violet-900 focus:outline-none focus:shadow-outline"
                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 "
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                        />
                    </svg>
                    </button>
                </div>
            </div>
            <div className='flex flex-col justify-end lg:px-28 sm:px-2 py-10'>
                <p className='text-violet-700 text-2xl font-semibold'>
                    Directory
                </p>
                
                <div className='my-1'>
                <hr />
                </div>
            </div>
            <div className="flex w-full h-96 xl:h-[70%] justify-center">
                <div className='flex max-h-[100%] flex-col overflow-scroll sm:w-1/2'>
                    <div className="w-[100%] rounded-lg bg-white text-center shadow-lg">
                        <div className=" p-2">
                            <div className="flex flex-row justify-between">
                            <h5 className="text-md mb-2 font-medium text-gray-900 underline">
                                {/* <Link href={`/manufacturer/${manufacturerId}`}>
                                {manufacturerName}
                                </Link> */}
                                link
                            </h5>
                            <p className="mb-1 text-base text-gray-700">
                                {" "}
                                {/* {new Date(date).toLocaleDateString()} */}
                                testing
                            </p>
                            </div>
                            <div className="flex flex-row justify-between">
                            <h5 className="text-md mb-2 text-gray-900">
                                Fake Text
                            </h5>
                            <p className="mb-1 text-base text-gray-700"> </p>
                            </div>
                            <div className="flex flex-row justify-between text-sm">
                            <p className="mb-1 text-base text-gray-700">
                                Context: 
                            </p>

                            <div className="border-gray-300 text-gray-600"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <Filters data={data} filterParams={filterParams} setFilterParams={setFilterParams} />
                {/* <div className='w-80 mx-2'>
                    <select value={filterParams.subject} onChange={(e) => setFilterParams(prev => {
                        return {
                            ...prev,
                            subject: e.target.value,
                            state: prev.state === "" ? "AL" : prev.state
                        }
                    })} name="search" id="search-subject" className='bg-violet-500 w-full p-2 rounded-lg cursor-pointer text-white'>
                        <option value="">Search for...</option>
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
                        {data && !data?.products && <select onChange={(e) => {
                            setFilterParams(prev => {
                                return {
                                    ...prev,
                                    state: e.target.value
                                }
                            })
                        }} value={filterParams.state} className='bg-violet-500 my-2 text-white px-4 py-2 rounded-full mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer' name="state-filter" id="state-filter">
                            <option value={undefined}>State</option>
                            {allStates.map((item, index) => (
                                <option key={index} value={item}>{item.charAt(0) + item.slice(1, item.length)}</option>
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
                            {data?.zipCodes.sort((a,b) => a - b).map((item, index) => (
                                <option className='shadow-lg' key={index} value={item}>{item.charAt(0).toUpperCase() + item.slice(1, item.length).toLowerCase()}</option>
                            ))}
                        </select>}
                        {data && data?.specialties && <select value={filterParams.specialty} onChange={(e) => {setFilterParams(prev => {
                            return {
                                ...prev,
                                specialty: e.target.value
                            }
                        })}} name="city-opt" id="city-opt" className='bg-violet-500 my-2 text-white px-4 py-2 rounded-full mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer w-40'>
                            <option value="">{filterParams.specialty == "" ? "Specialties" : "Reset"}</option>
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
                            <option value="">{filterParams.type == "" ? "Types" : "Reset"}</option>
                            {data?.productTypes.map((item, index) => (
                                <option key={index} value={item}>{item === "NULL" ? "Misc" : item}</option>
                            ))}
                        </select>}
                        
                    </div>  */}

                {/* </div> */}
            </div>
        </div>
    </>
  )
}
