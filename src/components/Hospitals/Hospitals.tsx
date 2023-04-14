import Link from "next/link";
import type { Hospital } from "./Hospital.model";

export default function HospitalsComponent({ data }: { data: Hospital[] }) {

  return (
    <>
      {data?.map((hospital: Hospital, index: number) => {
        return (
          <div key={index} className="mb-2 w-[100%] rounded-lg bg-white shadow-lg">
            <div className="p-2">
              <div className="flex flex-row justify-between">
                <div className="flex-auto">
                  <h5 className="text-md mb-2 font-medium text-violet-700 underline w-[75%]">
                    <Link
                      onClick={() => localStorage.setItem(`${hospital?.hospital_id}`, JSON.stringify(hospital))}
                      href={`/hospital?hospital_id=${hospital?.hospital_id || ''}`}
                    >{hospital?.name || '-'}</Link>
                  </h5>
                  <div className="flex flex-row justify-between w-[75%]">
                    <h5 className="text-md mb-2 text-gray-900">
                      {hospital.city}, {hospital?.state.toUpperCase() || '-'}
                    </h5>
                    <p className="mb-1 text-base text-gray-700"> </p>
                  </div>
                  <div className="flex flex-row justify-between text-sm">
                    <p className="mb-1 text-xs text-violet-400">
                      United States
                    </p>
                    <div className="border-gray-300 text-gray-600"></div>
                  </div>
                </div>
                <div className="w-[25%]">
                  <div className="flex flex-col">
                    <p className="mb-1 text-gray-600 text-sm text-right">
                      Hospital ID: {hospital.hospital_id}
                      <br />
                    </p>
                    
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
