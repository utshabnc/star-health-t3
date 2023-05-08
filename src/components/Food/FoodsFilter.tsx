import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import type { Food } from "./Food.model";
import Image from "next/image";

import usda from "../../assets/logos/USDA-Emblem.png";

interface FoodsFiltersProps {
  params: {
    setFood: Dispatch<SetStateAction<Food[]>>;
    setIsApiProcessing: Dispatch<SetStateAction<boolean>>;
  };
}

export default function FoodsFilters({ params }: FoodsFiltersProps) {
  const { setFood, setIsApiProcessing } = params;
  const [searchStr, setSearchStr] = useState<string>("");

  useEffect(() => {
    if (searchStr) {
      const delayDebounceFn = setTimeout(() => {
        setIsApiProcessing(true);
        fetch(`/api/food/search/${searchStr}`).then((response) => {
          response.json().then((data) => {
            setFood(data['foods']);
            setIsApiProcessing(false);
          });
        });
      }, 250);
      return () => clearTimeout(delayDebounceFn);
    } else {
      setIsApiProcessing(true);
      fetch("/api/food/getAll/1").then((response) => {
        response.json().then((data) => {
          setFood(data);
          setIsApiProcessing(false);
        });
      });
    }
  }, [searchStr]);

  return (
    <>
      <div className="w-full">
        <div>
          <div className="my-1">
          </div>
          <p className="p-1 text-xs font-semibold text-violet-900">
            Search by Name of Food/Beverage
          </p>
          <div className="flex w-[100%] items-center justify-between gap-3">
            <input
              type="text"
              placeholder="Search"
              className="mx-1 mb-2 w-[30%] cursor-pointer rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
              value={searchStr}
              onChange={(e) => setSearchStr(e.target.value)}
            />
            <Image
              src={usda}
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
