import Link from 'next/link'
import React from 'react'
import { formatMoney } from '../../utils'

export default function DirectoryCards({data, filterParams}) {

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
                            <Link href={`/manufacturer/${item.id}`}>
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
            
        ))}
        </>
    )
  }

  if(data?.payments){
    return (
    <>
        {data && data?.payments && data?.payments.map((item, index) => (
            
            <div key={index} className="w-[100%] rounded-lg bg-white text-center shadow-lg mb-2">
                <div className=" p-2">
                    <div className="flex flex-row justify-between">
                        <h5 className="text-md mb-2 font-medium text-gray-900">
                        {/* Sold By: {item.manufacturerName} */}
                        Item: {item.product.name !== "UNKNOWN" ? item.product.name : "N/A"} <span className='text-sm text-slate-400'>{`(${item.product.type})`}</span>
                        
                        </h5>
                        <p className="mb-1 text-gray-600 text-sm text-right">
                            {formatMoney(item.amount)}
                            <br />
                            <span className='text-xs'>{item.paymentType}</span> 
                        </p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <h5 className="text-md mb-2 text-gray-900">
                        {/* Product: {item.type} */}
                        Doctor: {item.doctor.firstName.charAt(0).toUpperCase() + item.doctor.firstName.slice(1, item.length).toLowerCase()} {item.doctor.lastName.charAt(0).toUpperCase() + item.doctor.lastName.slice(1, item.length).toLowerCase()}
                        </h5>
                        <p className="mb-1 text-base text-gray-700"> </p>
                    </div>
                    <div className="flex flex-row justify-between text-sm">
                        <p className="mb-1 text-xs text-gray-700">
                            {/* Category: {item.category.charAt(0).toUpperCase() + item.category.slice(1, item.category.length).toLowerCase()}  */}
                            Manufacturer: {item.manufacturerName}
                        </p>

                    <div className="border-gray-300 text-gray-600"></div>
                </div>
            </div>
            </div>
        
    ))}
    </>
    )
  }

  if(data?.manufacturerSummary){
    return (
        <>  
            {data && data?.manufacturerSummary && data?.manufacturerSummary.map((item, index) => (
            
            <div key={index} className="w-[100%] rounded-lg bg-white text-center shadow-lg mb-2">
                <div className=" p-2">
                    <div className="flex flex-row justify-between">
                        <h5 className="text-md mb-2 font-medium text-gray-900">
                            {item.manufacturer.name}
                        </h5>
                        <p className="mb-1 text-gray-600 text-sm text-right">
                            {formatMoney(item.totalAmount)}
                            <br />
                        </p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <h5 className="text-md mb-2 text-gray-900">
                            {item.manufacturer.state}
                        </h5>
                        <p className="mb-1 text-base text-gray-700"> </p>
                    </div>
                    <div className="flex flex-row justify-between text-sm">
                        <p className="mb-1 text-xs text-gray-700">
                            Largest payment: {formatMoney(item.manufacturer.ManufacturerTopPayment[0].amount)}
                        </p>

                    <div className="border-gray-300 text-gray-600"></div>
                </div>
            </div>
            </div>
        
    ))}
        </>
    )
  }

  return (
    <>
        <div>
            Try adjusting your search filter. No results were found.
        </div>
    </>
  )

}
