import { useRouter } from 'next/router'
import React from 'react'
import { trpc } from '../../utils/trpc';

export default function Directory() {
    const navigate = useRouter();
    // const {data} = trpc.db.directory.useQuery({getDoctors: true, state: "OH", zipCode: "43212"});
    // console.log(data);
    
    

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
            <div className="flex w-full h-96 justify-center">
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
                <div className='w-80 mx-2'>
                    <select name="search" id="search-subject" className='bg-violet-500 w-full p-2 rounded-lg cursor-pointer text-white'>
                        <option value="">Search for...</option>
                        <option value="Doctors">Doctors</option>
                        <option value="Manufacturers">Manufacturers</option>
                        <option value="Products">Products</option>
                    </select>

                    <p className='text-violet-700 text-lg  my-2'>
                        Filter By
                    </p>
                
                    <div className='my-1'>
                        <hr />
                    </div>

                    <div className="wrap-filters py-2">
                        <button className='bg-violet-500 text-white px-4 py-2 rounded-full mx-1 hover:bg-violet-400 hover:text-violet-900 '>
                            Filter
                        </button>
                        <button className='bg-violet-500 text-white py-2 px-4 rounded-full mx-1 hover:bg-violet-400 hover:text-violet-900 '>
                            Filter
                        </button>
                        <button className='bg-violet-500 text-white py-2 px-4 rounded-full mx-1 hover:bg-violet-400 hover:text-violet-900 '>
                            Filter
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </>
  )
}
