import Link from 'next/link'
import React from 'react'

export default function DirectoryCards({data}) {

  if(data?.doctors){
    return (
    <>
        {data && data?.doctors && data?.doctors.map((item, index) => (
            <>
                <div key={index} className="w-[100%] rounded-lg bg-white text-center shadow-lg mb-2">
                    <div className=" p-2">
                        <div className="flex flex-row justify-between">
                            <h5 className="text-md mb-2 font-medium text-gray-900 underline">
                            <Link href={`/doctor/${item.id}`}>
                                {item.firstName} {item.lastName}
                            </Link>
                            
                            </h5>
                            <p className="mb-1 text-gray-600 text-xs">
                            {item.addressLine1}
                            </p>
                        </div>
                        <div className="flex flex-row justify-between">
                        <h5 className="text-md mb-2 text-gray-900">
                        {item.city.charAt(0).toUpperCase() + item.city.slice(1, item.city.length).toLowerCase()}, {item.state}
                        </h5>
                        <p className="mb-1 text-base text-gray-700"> </p>
                    </div>
                    <div className="flex flex-row justify-between text-sm">
                        <p className="mb-1 text-xs text-gray-700">
                        {item.specialty} 
                        </p>

                    <div className="border-gray-300 text-gray-600"></div>
                </div>
            </div>
        </div>
            </>
        ))}
    </>
    )
  }

  if(data?.manufacturers){
    return (
        <>
            {data && data?.manufacturers && data?.manufacturers.sort((a,b) => a.rank - b.rank).map((item, index) => (
            <>
                <div key={index} className="w-[100%] rounded-lg bg-white text-center shadow-lg mb-2">
                    <div className=" p-2">
                        <div className="flex flex-row justify-between">
                            <h5 className="text-md mb-2 font-medium text-gray-900 underline">
                            <Link href={`/doctor/${item.id}`}>
                                {item.name}
                            </Link>
                            
                            </h5>
                            <p className="mb-1 text-gray-600 text-xs">
                                Rank: {item.rank}
                            
                            </p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <h5 className="text-md mb-2 text-gray-900">
                         {item.state}
                            </h5>
                            <p className="mb-1 text-base text-gray-700"> </p>
                        </div>
                        <div className="flex flex-row justify-between text-sm">
                            <p className="mb-1 text-xs text-gray-700">
                            {item.country} 
                            </p>

                        <div className="border-gray-300 text-gray-600"></div>
                    </div>
                </div>
                </div>
            </>
        ))}
        </>
    )
  }

  if(data?.products){
    return (
        <>
            {data && data?.products && data?.products.map((item, index) => (
            <>
                <div key={index} className="w-[100%] rounded-lg bg-white text-center shadow-lg mb-2">
                    <div className=" p-2">
                        <div className="flex flex-row justify-between">
                            <h5 className="text-md mb-2 font-medium text-gray-900 underline">
                            <Link href={`/drug/${item.id}`}>
                                {item.name}
                            </Link>
                            
                            </h5>
                            <p className="mb-1 text-gray-600 text-xs">
                                
                            
                            </p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <h5 className="text-md mb-2 text-gray-900">
                            Product: {item.type}
                            </h5>
                            <p className="mb-1 text-base text-gray-700"> </p>
                        </div>
                        <div className="flex flex-row justify-between text-sm">
                            <p className="mb-1 text-xs text-gray-700">
                                Category: {item.category.charAt(0).toUpperCase() + item.category.slice(1, item.category.length).toLowerCase()} 
                            </p>

                        <div className="border-gray-300 text-gray-600"></div>
                    </div>
                </div>
                </div>
            </>
        ))}
        </>
    )
  }

}
