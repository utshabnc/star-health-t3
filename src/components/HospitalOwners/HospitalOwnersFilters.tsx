import { Dispatch, SetStateAction, useMemo} from "react";
import { useEffect, useState } from "react";
import type { HospitalOwners } from "./HospitalOwners.model";
import type { Owners } from "./Owners.model";
import Image from "next/image";
import getData, {data} from "./processJSON"

import cbi from '../../assets/logos/community-benefits.png';

interface HospitalOwnersFiltersProps {
  params: {
    hospitalOwnersData?: HospitalOwners[];
    setHospitalOwnersData: Dispatch<SetStateAction<HospitalOwners[]>>;
    setIsApiProcessing: Dispatch<SetStateAction<boolean>>;
  }
}

export default function HospitalsFilters({params}: HospitalOwnersFiltersProps) {
  const { hospitalOwnersData, setHospitalOwnersData, setIsApiProcessing } = params;
  const [searchStr, setSearchStr] = useState("");
  const [dataIsAvailable, setDataIsAvailable] = useState(false);
  const [error, setError] = useState<any>("");

  useEffect(() => {
    if (hospitalOwnersData && hospitalOwnersData.length > 1) {
      setDataIsAvailable(true);
    }
  }, [hospitalOwnersData])

  useEffect(() => {
    if (searchStr) {
      const delayDebounceFn = setTimeout(() => {
        setIsApiProcessing(true);

        const matchedHospitals: HospitalOwners[] = [];
      for (let i=0; i<data.length; i+=1) {
          if (JSON.stringify(data[i]).toUpperCase().includes(searchStr.toUpperCase())) {
            matchedHospitals.push(data[i])
          }
        }
        setHospitalOwnersData(matchedHospitals);
        setIsApiProcessing(false);

      }, 500)

      return () => clearTimeout(delayDebounceFn)
    } else {
      setHospitalOwnersData(data);
    }
  }, [searchStr])

  return (
    <>
      <div className="w-full">
        <div>
          <p className="p-1 text-xs font-semibold text-violet-900">
            Search for hospitals
          </p>
          <div className="flex justify-between w-[100%] items-center gap-3">
            <input
              type="text"
              placeholder="Search"
              className="mx-1 my-2 w-[30%] cursor-pointer rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
              value={searchStr}
              onChange={(e) => setSearchStr(e.target.value)}
            />

            <Image
              src={cbi}
              alt=""
              width={128}
              height={128}
              className="bottom-0 right-0 object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
}
