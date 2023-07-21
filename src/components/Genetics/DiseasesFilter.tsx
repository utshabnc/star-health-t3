import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import type { Genetic } from "./Genetic.model";
import Image from "next/image";
import AutocompleteInput from "../AutoCompleteInput";

import mps from "../../assets/logos/medlinePlus.png";

interface DiseasesFiltersProps {
  params: {
    diseases?: Genetic[];
    setFilteredDiseases: Dispatch<SetStateAction<Genetic[]>>;
    setIsApiProcessing: Dispatch<SetStateAction<boolean>>;
  };
}

function mapOtherNames(other_names: any[]) {
  try {
    let otherNames = "";
    other_names.forEach((name: any) => {
      otherNames += name["_text"] + ", ";
    });
    return otherNames.slice(0, -2) || "-";
  } catch (error) {
    return "-";
  }
}

export default function DiseasesFilters({ params }: DiseasesFiltersProps) {
  const { diseases, setFilteredDiseases, setIsApiProcessing } = params;
  const [diseaseslist, setFilteredDiseaseslist] = useState<Genetic[]>([]);
  const [searchStr, setSearchStr] = useState<string>("");
  const returnNames =(list:any[],name:string)=>{
    const output:any = []
    if ( list === undefined)
    {
      return[]
    }
    list.forEach((element:any) => {
      output.push(element[name])
    });
    return output
  }
  useEffect(() => {
    if (searchStr) {
      const delayDebounceFn = setTimeout(() => {
        const filteredData = diseases?.filter((genetic: Genetic) => {
          return (
            genetic.title.toLowerCase().includes(searchStr.toLowerCase()) ||
            mapOtherNames(genetic.other_names)
              .toLowerCase()
              .includes(searchStr.toLowerCase())
          );
        });
        setFilteredDiseases(filteredData || []);
        setFilteredDiseaseslist(filteredData || [])

      }, 250);
      return () => clearTimeout(delayDebounceFn);
    } else {
      setFilteredDiseases(diseases || []);
      setFilteredDiseaseslist(diseases || [])

    }
  }, [searchStr]);

  return (
    <>
      <div className="w-full">
        <div>
          <div className="my-1">
            <hr />
          </div>
          <p className="p-1 text-xs font-semibold text-violet-900">Search by Condition Name</p>
          <div className="flex w-[100%] items-center justify-between gap-3">
          <AutocompleteInput setExpr={setSearchStr} expr={searchStr} options={returnNames(diseaseslist?diseaseslist:[],'title')}></AutocompleteInput>
            <Image
              src={mps}
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
