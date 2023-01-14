import Link from 'next/link'
import React from 'react'
import { formatMoney, formatDate } from '../../utils'
import type { DirectoryResponse } from '../../server/trpc/router/db'
import { Manufacturer, ManufacturerSummary, Product } from '@prisma/client'
import { formatSpecialties } from '../Filters'

type FilterParams = {
    subject: string
    state: string
    city: string
    zipCode: string
    specialty: string
    type: string
    category: string
    doctorFilter: string
    manufacturerFilter: string
    productFilter: string
    cursor: string
    year: string
}

export default function DirectoryCards({data, filterParams, searchResults, search}: {data: any, filterParams: FilterParams, searchResults: any, search: string}) {
    // if(searchResults && search !== "") {
    //     if(filterParams.subject === "doctor") {
    //         return (
    //             <>
    //             {data && searchResults?.doctors && searchResults?.doctors.map((item: any, index: number) => (
    //         <>
    //             <div key={index} className="w-[100%] rounded-lg bg-white text-center shadow-lg mb-2">
    //                 <div className=" p-2">
    //                     <div className="flex flex-row justify-between">
    //                         <h5 className="text-md mb-2 font-medium text-violet-700 underline">
    //                         <Link href={`/doctor/${item.id}`}>
    //                             {item.firstName} {item.lastName}
    //                         </Link>
                            
    //                         </h5>
    //                         <p className="mb-1 text-gray-600 text-xs">
    //                         {item.addressLine1}
    //                         </p>
    //                     </div>
    //                     <div className="flex flex-row justify-between">
    //                     <h5 className="text-md mb-2 text-gray-900">
    //                     {item.city.charAt(0).toUpperCase() + item.city.slice(1, item.city.length).toLowerCase()}, {item.state}
    //                     </h5>
    //                     <p className="mb-1 text-base text-gray-700"> </p>
    //                 </div>
    //                 <div className="flex flex-row justify-between text-sm">
    //                     <p className="mb-1 text-xs text-violet-400">
    //                     {item.specialty} 
    //                     </p>

    //                 <div className="border-gray-300 text-gray-600"></div>
    //             </div>
    //         </div>
    //     </div>
    //         </>
    //     ))}
    //             </>
    //         )
    //     }
    //     if(filterParams.subject === "manufacturer") {
    //         return (
    //             <>
    //             {data && searchResults?.manufacturers && searchResults?.manufacturers.map((item: any, index: number) => (
    //         <>
    //             <div key={index} className="w-[100%] rounded-lg bg-white text-center shadow-lg mb-2">
    //                 <div className="p-2">
    //                     <div className="flex flex-row justify-between">
    //                         <h5 className="text-md mb-2 font-medium text-violet-700 underline">
    //                         <Link href={`/manufacturer/${item.id}`}>
    //                             {item.name}
    //                         </Link>
                            
    //                         </h5>
    //                         <p className="mb-1 text-gray-600 text-xs">
    //                             Rank: {item.rank}
                            
    //                         </p>
    //                     </div>
    //                     <div>
    //                     <div className="flex flex-row justify-between">
    //                         <h5 className="text-md mb-2 text-gray-900">
    //                         {item.state}
    //                         </h5>
    //                         <p className="mb-1 text-base text-gray-700"> </p>
    //                     </div>
    //                     <div className="flex flex-row justify-between text-sm">
    //                         <p className="mb-1 text-xs text-gray-700">
    //                         {item.country} 
    //                         </p>

    //                         {item.ManufacturerSummary.length > 0 && item.ManufacturerSummary[0] && <p className='text-sm r'>{filterParams.year == "" || filterParams.year === "ALL" ? "Overall" : `${filterParams.year}`} payments made to doctors: {formatMoney(item.ManufacturerSummary[0].totalAmount)}</p>}

                        

    //                     </div>
    //                 </div>
    //             </div>
    //             </div>
    //         </>
    //     ))}
    //             </>
    //         )
    //     }
    //     if(filterParams.subject === "product") {
    //         return (
    //             <>
    //             {data && searchResults?.products && searchResults?.products.map((item: any, index: number) => (
    //         <>
    //             <div key={index} className="w-[100%] rounded-lg bg-white text-center shadow-lg mb-2">
    //                 <div className=" p-2">
    //                     <div className="flex flex-row justify-between">
    //                         <h5 className="text-md mb-2 font-medium text-violet-700 underline">
    //                         <Link href={`/doctor/${item.id}`}>
    //                             {item.name}
    //                         </Link>
                            
    //                         </h5>
    //                         <p className="mb-1 text-gray-600 text-xs">
    //                         {item.type}
    //                         </p>
    //                     </div>
    //                     <div className="flex flex-row justify-between">
    //                     <h5 className="text-md mb-2 text-gray-900">
    //                     {/* {item.city.charAt(0).toUpperCase() + item.city.slice(1, item.city.length).toLowerCase()}, {item.state} */}
    //                     </h5>
    //                     <p className="mb-1 text-base text-gray-700"> </p>
    //                 </div>
    //                 <div className="flex flex-row justify-between text-sm">
    //                     <p className="mb-1 text-xs text-gray-700">
    //                     {/* {item.specialty}  */}
    //                     </p>

    //                 <div className="border-gray-300 text-gray-600"></div>
    //             </div>
    //         </div>
    //     </div>
    //         </>
    //     ))}
    //             </>
    //         )
    //     }
    // }

  if(data?.doctors || searchResults?.doctors){
    return (
    <>
        {data && data?.doctors && (!searchResults ? data?.doctors : searchResults?.doctors).map((item: any, index: number) => (
            <>
                <div key={index} className="w-[100%] rounded-lg bg-white text-center shadow-lg mb-2">
                    <div className=" p-2">
                        <div className="flex flex-row justify-between">
                            <h5 className="text-md mb-2 font-medium text-violet-700 underline">
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
                            {item.city.split(" ").map((word: string, index: number) => word.charAt(0).toUpperCase() + word.slice(1, word.length).toLowerCase() + " ")}, {item.state}
                        </h5>
                        <p className="mb-1 text-base text-gray-700"> </p>
                    </div>
                    <div className="flex flex-row justify-between text-sm">
                        <p className="mb-1 text-xs text-violet-400">
                        {formatSpecialties(item.specialty)} 
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
            {data && data?.manufacturers && (!searchResults ? data?.manufacturers : searchResults?.manufacturers).sort((a: any,b: any) => a.rank - b.rank).map((item: any, index: number) => (
            <>
                <div key={index} className="w-[100%] rounded-lg bg-white text-center shadow-lg mb-2">
                    <div className="p-2">
                        <div className="flex flex-row justify-between">
                            <h5 className="text-md mb-2 font-medium text-violet-700 underline">
                            <Link href={`/manufacturer/${item.id}`}>
                                {item.name}
                            </Link>
                            
                            </h5>
                            <p className="mb-1 text-gray-600 text-xs">
                                Rank: {item.rank}
                            
                            </p>
                        </div>
                        <div>
                        <div className="flex flex-row justify-between">
                            <h5 className="text-md mb-2 text-gray-900">
                            {item.state}
                            </h5>
                            <p className="mb-1 text-base text-gray-700"> </p>
                        </div>
                        <div className="flex flex-row justify-between text-sm">
                            <p className="mb-1 text-xs text-violet-400">
                            {item.country} 
                            </p>

                            {item.ManufacturerSummary.length > 0 && item.ManufacturerSummary[0] && <p className='text-sm r'>{filterParams.year == "" || filterParams.year === "ALL" ? "Overall" : `${filterParams.year}`} payments made to doctors: {formatMoney(item.ManufacturerSummary[0].totalAmount)}</p>}

                        

                        </div>
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
        {data &&
          data?.products &&
          (!searchResults ? data?.products : searchResults?.products).map((item: any, index: number) => (
            <div
              key={index}
              className="mb-2 w-[100%] rounded-lg bg-white text-center shadow-lg"
            >
              <div className=" p-2">
                <div className="flex flex-row justify-between">
                  <h5 className="text-md mb-2 font-medium text-violet-700 underline">
                    <Link href={`/drug/${item.id}`}>{item.name}</Link>
                  </h5>
                  <p className="mb-1 text-xs text-gray-600"></p>
                </div>
                <div className="flex flex-row justify-between">
                  <h5 className="text-md mb-2 text-gray-900">
                    Product: {item.type}
                  </h5>
                  <p className="mb-1 text-base text-gray-700"> </p>
                </div>
                <div className="flex flex-row justify-between text-sm">
                  <p className="mb-1 text-xs text-violet-400">
                    Category:{" "}
                    {item.category &&
                      item.category.charAt(0).toUpperCase() +
                        item.category
                          .slice(1, item.category.length)
                          .toLowerCase()}
                  </p>

                  <div className="border-gray-300 text-gray-600"></div>
                </div>
              </div>
            </div>
          ))}
      </>
    );
  }

  if(data?.payments || searchResults?.payments){
    return (
    <>
        {data && (data?.payments || searchResults?.payments) && (!searchResults ? data?.payments : searchResults?.payments).map((item: any, index: number) => (
            
            <div key={index} className="w-[100%] rounded-lg bg-white text-center shadow-lg mb-2">
                <div className=" p-2">
                    <div className="flex flex-row justify-between">
                        <h5 className="text-md mb-2 font-medium ">
                        <Link href={`/drug/${item.id}`} className="text-violet-700 underline">
                        {item.product.name !== "UNKNOWN" ? item.product.name : "N/A"} 
                        </Link>
                        <span className='text-sm text-slate-400 pl-2'>{`(${item.product.type})`}</span>
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
                        <Link href={`/doctor/${item.doctor.id}`} className="hover:underline hover:text-violet-600 text-violet-500 font-semibold">
                        Doctor: {item.doctor.firstName.charAt(0).toUpperCase() + item.doctor.firstName.slice(1, item.doctor.firstName.length).toLowerCase()} {item.doctor.lastName.charAt(0).toUpperCase() + item.doctor.lastName.slice(1, item.doctor.lastName.length).toLowerCase()}
                        </Link>
                        </h5>
                        <p className="mb-1 text-base text-gray-700"> </p>
                    </div>
                    <div className="flex flex-row justify-between text-sm">
                        <p className="mb-1 text-xs text-violet-400">
                            {/* Category: {item.category.charAt(0).toUpperCase() + item.category.slice(1, item.category.length).toLowerCase()}  */}
                            <Link href={`/manufacturer/${item.manufacturer.id}`} className="hover:underline hover:text-violet-500">
                                Manufacturer: {item.manufacturerName}
                            
                            </Link>
                        </p>

                        <p className='text-gray-600 text-sm'>{item.date.toLocaleDateString("en-US")}</p>

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
            {data && data?.manufacturerSummary && data?.manufacturerSummary.map((item: any, index: number) => (
            
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
                        <p className="mb-1 text-xs text-violet-400">
                            Largest payment: {formatMoney(item.manufacturer.ManufacturerTopPayment[0]?.amount ?? 0)}
                        </p>

                    <div className="border-gray-300 text-gray-600"></div>
                </div>
            </div>
            </div>
        
    ))}
        </>
    )
  }

  if(data?.drugs){
    return (
        <>  
            {data && data?.drugs && (!searchResults ? data?.drugs : searchResults?.drugs).map((item: any, index: number) => (
            
            <div key={index} className="w-[100%] rounded-lg bg-white text-center shadow-lg mb-2">
                <div className=" p-2">
                    <div className="flex flex-row justify-between">
                        <h5 className="text-md mb-2 font-medium text-gray-900">
                        <Link href={`/drugs/${item.id}`} className="hover:underline hover:text-violet-600 text-violet-500 font-semibold">
                            {item.brand_name}
                        </Link>
                        </h5>
                        <p className="mb-1 text-gray-600 text-sm text-right">
                            Effective Date: {formatDate(item.effective_time, '-')}
                            <br />
                        </p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <h5 className="text-md mb-2 text-gray-900">
                            Manufacturer: {item.manufacturer_name}
                        </h5>
                        <p className="mb-1 text-base text-gray-700"> </p>
                    </div>
                    <div className="flex flex-row justify-between text-sm">
                        <p className="mb-1 text-xs text-violet-400">
                            product type: {item.product_type}
                        </p>
                        
                        
                    <div className="border-gray-300 text-gray-600"></div>
                    
                    
                </div>
                <div className="flex flex-row justify-between text-sm">
                        <p className="mb-1 text-xs text-violet-400">
                            route: {item.route}
                        </p>
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
