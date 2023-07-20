import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import type { HospitalOwners } from "./HospitalOwners.model";
import { data } from "./processJSON";
import { toTitleCase } from "../../utils";
import AutocompleteInput from "../AutoCompleteInput";

import cbi from "../../assets/logos/Data-CMS-gov.png";

interface HospitalOwnersFiltersProps {
  params: {
    hospitalOwnersData?: HospitalOwners[];
    setHospitalOwnersData: Dispatch<SetStateAction<HospitalOwners[]>>;
    setIsApiProcessing: Dispatch<SetStateAction<boolean>>;
  };
}

export default function HospitalsFilters({
  params,
}: HospitalOwnersFiltersProps) {
  const { hospitalOwnersData, setHospitalOwnersData, setIsApiProcessing } =
    params;
  const [searchStr, setSearchStr] = useState("");
  const [dataIsAvailable, setDataIsAvailable] = useState(false);
  const [error, setError] = useState<any>("");
  const returnHospitalsOwnersNames =(list:any[])=>{
    const output:any = []
    if ( list === undefined)
    {
      return[]
    }
    list.forEach((element:any) => {
      output.push(element['ORGANIZATION_NAME'])
    });
    return output
  }
  useEffect(() => {
    if (hospitalOwnersData && hospitalOwnersData.length > 1) {
      setDataIsAvailable(true);
    }
  }, [hospitalOwnersData]);

  useEffect(() => {
    if (searchStr) {
      const delayDebounceFn = setTimeout(() => {
        setIsApiProcessing(true);

        const matchedHospitals: HospitalOwners[] = [];
        for (let i = 0; i < data.length; i += 1) {
          if (
            JSON.stringify(data[i])
              .toUpperCase()
              .includes(searchStr.toUpperCase())
          ) {
            matchedHospitals.push(data[i]);
          }
        }
        setHospitalOwnersData(matchedHospitals);
        setIsApiProcessing(false);
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    } else {
      setHospitalOwnersData(data);
    }
  }, [searchStr]);

  return (
    <>
      <div className="w-full">
        <div>
          <p className="p-1 text-xs font-semibold text-violet-900">
            Search for hospitals
          </p>
          <div className="flex w-[100%] items-center justify-between gap-3">
          <AutocompleteInput expr={searchStr} setExpr={setSearchStr} options={returnHospitalsOwnersNames(hospitalOwnersData?hospitalOwnersData:[])}></AutocompleteInput>

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
