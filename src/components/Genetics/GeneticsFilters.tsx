import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import type { Genetic } from "./Genetic.model";
import Image from "next/image";
import { toTitleCase } from "../../utils";
import AutocompleteInput from "../AutoCompleteInput";

import mps from "../../assets/logos/medlinePlus.png";

interface GeneticsFiltersProps {
  params: {
    category?: string;
    genetics?: Genetic[];
    setFilteredGenetics: Dispatch<SetStateAction<Genetic[]>>;
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

export default function GeneticsFilters({ params }: GeneticsFiltersProps) {
  const { genetics, setFilteredGenetics, setIsApiProcessing } = params;
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [dataIsAvailable, setDataIsAvailable] = useState<boolean>(false);
  const [searchStr, setSearchStr] = useState<string>("");
  const [filterGeneticList,setFilteredGeneticsList]=useState<any>([])
  const allCategories: string[] = ["Genes", "Chromosomes"];

  useEffect(() => {
    if (genetics && genetics.length > 0) {
      setDataIsAvailable(true);
    }
  }, [genetics]);

  useEffect(() => {
    if (searchStr) {
      const delayDebounceFn = setTimeout(() => {
        const filteredData = genetics?.filter((genetic: Genetic) => {
          return (
            genetic.title.toLowerCase().includes(searchStr.toLowerCase()) ||
            mapOtherNames(genetic.other_names)
              .toLowerCase()
              .includes(searchStr.toLowerCase())
          );
        });
        setFilteredGenetics(filteredData || []);
        setFilteredGeneticsList(filteredData || []);

      }, 250);
      return () => clearTimeout(delayDebounceFn);
    } else {
      setFilteredGenetics(genetics || []);
      setFilteredGeneticsList(genetics || []);

    }
  }, [searchStr]);
  const returnGeneticsNames =(list:any[])=>{
    var output = []
    if ( list === undefined)
    {
      return[]
    }
    list.forEach((element:any) => {
      output.push(toTitleCase((element.title).toLowerCase()))
    });
    return output
  }
  const onSelectCategory = (category: string) => {
    setIsApiProcessing(true);
    setSelectedCategory(category);
    setSearchStr("");
    const filteredData = genetics?.filter((genetic: Genetic) => {
      return genetic.type === category.toLowerCase().slice(0, -1);
    });
    if (category === "") {
      setFilteredGenetics(genetics || []);
      setFilteredGeneticsList(genetics || []);

    } else {
      setFilteredGenetics(filteredData || []);
      setFilteredGeneticsList(filteredData || []);

    }
    setIsApiProcessing(false);
  };

  return (
    <>
      <div className="w-full">
        <div>
          <div className="filters flex w-full items-center">
            <p className="my-2 w-20 text-lg text-violet-700">Filter By:</p>
            <div className="wrap-filters flex w-full items-center py-2">
              <select
                title="Category"
                className="my-2 mr-5 w-[20%] cursor-pointer rounded-lg bg-violet-500 p-1 text-white hover:bg-violet-400 hover:text-violet-900"
                onChange={(e) => onSelectCategory(e.target.value)}
                value={selectedCategory}
              >
                <option value="">Category</option>
                {allCategories.map((category: string) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="my-1">
            <hr />
          </div>
          <p className="p-1 text-xs font-semibold text-violet-900">Search by Gene/Chromosome Name</p>
          <div className="flex w-[100%] items-center justify-between gap-3">
          <AutocompleteInput expr={searchStr} setExpr={setSearchStr} options={returnGeneticsNames(filterGeneticList?filterGeneticList:[])}></AutocompleteInput>
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
