import Link from "next/link";
import { useEffect, useState } from "react";
import getData, {data} from "./processJSON"
import {HospitalOwners} from "./HospitalOwners.model"

export default function HospitalOwnersComponent(props: any) {

  return (
    <>
      {data.map((hospital: any, index: any) => {
        return (
          <div key={index} className="mb-2 w-[100%] rounded-lg bg-white shadow-lg">
            <div className="p-2">
              <div className="flex flex-row justify-between">
                <div className="flex-auto">
                  <h5 className="text-md mb-2 font-medium text-violet-700 underline w-[75%]">
                    <Link
                      onClick={() => localStorage.setItem(`${index}`, JSON.stringify(hospital))}
                      href={`/HospitalOwners?index=${index}`}
                    >{hospital["ORGANIZATION_NAME"] || '-'}</Link>
                  </h5>
                  <div className="flex flex-row justify-between w-[75%]">
                    <p className="mb-1 text-base text-gray-700"> </p>
                  </div>
                  <div className="flex flex-row justify-between text-sm">
                    <p className="mb-1 text-xs text-violet-400">
                      United States
                    </p>
                    <div className="border-gray-300 text-gray-600"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
