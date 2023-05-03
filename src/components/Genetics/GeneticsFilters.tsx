import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import type { Genetic } from "./Genetic.model";
import Image from "next/image";

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

  const allCategories: string[] = ["Genes", "Chromosomes", "Conditions"];

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
      }, 250);
      return () => clearTimeout(delayDebounceFn);
    } else {
      setFilteredGenetics(genetics || []);
    }
  }, [searchStr]);

  const onSelectCategory = (category: string) => {
    setIsApiProcessing(true);
    setSelectedCategory(category);
    setSearchStr("");
    const filteredData = genetics?.filter((genetic: Genetic) => {
      return genetic.type === category.toLowerCase().slice(0, -1);
    });
    if (category === "") {
      setFilteredGenetics(genetics || []);
    } else {
      setFilteredGenetics(filteredData || []);
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
          <p className="p-1 text-xs font-semibold text-violet-900">Search</p>
          <div className="flex w-[100%] items-center justify-between gap-3">
            <input
              type="text"
              placeholder="Search"
              className="mx-1 my-2 w-[30%] cursor-pointer rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
              value={searchStr}
              onChange={(e) => setSearchStr(e.target.value)}
            />
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
