import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import type { Food } from "./Food.model";
import Image from "next/image";

import usda from "../../assets/logos/USDA-Emblem.png";

interface FoodsFiltersProps {
  params: {
    setFilteredFood: Dispatch<SetStateAction<Food[]>>;
    setFood: Dispatch<SetStateAction<Food[]>>;
    setIsApiProcessing: Dispatch<SetStateAction<boolean>>;
    food: Food[];
  };
}

export default function FoodsFilters({ params }: FoodsFiltersProps) {
  const { setFilteredFood, setFood, setIsApiProcessing, food } = params;
  const [searchStr, setSearchStr] = useState<string>("");
  const [minProtein, setMinProtein] = useState<number>(0);
  const [minCalories, setMinCalories] = useState<number>(0);
  const [minCarbs, setMinCarbs] = useState<number>(0);
  const [minFat, setMinFat] = useState<number>(0);

  useEffect(() => {
    if (searchStr) {
      const delayDebounceFn = setTimeout(() => {
        setIsApiProcessing(true);
        fetch(`/api/food/search/${searchStr}`).then((response) => {
          response.json().then((data) => {
            setFilteredFood(data["foods"]);
            setFood(data["foods"]);
            setIsApiProcessing(false);
            setMinProtein(0);
            setMinCalories(0);
            setMinCarbs(0);
            setMinFat(0);
          });
        });
      }, 250);
      return () => clearTimeout(delayDebounceFn);
    } else {
      setIsApiProcessing(true);
      fetch("/api/food/search/apple").then((response) => {
        response.json().then((data) => {
          setFilteredFood(data["foods"]);
          setIsApiProcessing(false);
          setMinProtein(0);
          setMinCalories(0);
          setMinCarbs(0);
          setMinFat(0);
      });
      });
    }
  }, [searchStr]);

  useEffect(() => {
    if (minProtein > -1) {
      const delayDebounceFn = setTimeout(() => {
        setIsApiProcessing(true);
        let currFood = food;
        currFood = currFood.filter((food) => {
          const protein = food.foodNutrients.find(
            (nutrient) => nutrient["nutrientNumber"] === "203"
          );
          if (protein) {
            return (
              parseInt(
                protein["nutrient"]
                  ? protein["nutrient"]["value"]
                  : protein["value"]
              ) >= minProtein
            );
          }
          return false;
        });
        setFilteredFood(currFood);
        setIsApiProcessing(false);
      }, 250);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [minProtein]);

  useEffect(() => {
    if (minCalories > -1) {
      const delayDebounceFn = setTimeout(() => {
        setIsApiProcessing(true);
        let currFood = food;
        currFood = currFood.filter((food) => {
          const calories = food.foodNutrients.find(
            (nutrient) => nutrient["nutrientNumber"] === "208"
          );
          if (calories) {
            return (
              parseInt(
                calories["nutrient"]
                  ? calories["nutrient"]["value"]
                  : calories["value"]
              ) >= minCalories
            );
          }
          return false;
        });
        setFilteredFood(currFood);
        setIsApiProcessing(false);
      }, 250);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [minCalories]);

  useEffect(() => {
    if (minCarbs > -1) {
      const delayDebounceFn = setTimeout(() => {
        setIsApiProcessing(true);
        let currFood = food;
        currFood = currFood.filter((food) => {
          const carbs = food.foodNutrients.find(
            (nutrient) => nutrient["nutrientNumber"] === "205"
          );
          if (carbs) {
            return (
              parseInt(
                carbs["nutrient"]
                  ? carbs["nutrient"]["value"]
                  : carbs["value"]
              ) >= minCarbs
            );
          }
          return false;
        });
        setFilteredFood(currFood);
        setIsApiProcessing(false);
      }, 250);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [minCarbs]);

  useEffect(() => {
    if (minFat > -1) {
      const delayDebounceFn = setTimeout(() => {
        setIsApiProcessing(true);
        let currFood = food;
        currFood = currFood.filter((food) => {
          const fat = food.foodNutrients.find(
            (nutrient) => nutrient["nutrientNumber"] === "204"
          );
          if (fat) {
            return (
              parseInt(
                fat["nutrient"] ? fat["nutrient"]["value"] : fat["value"]
              ) >= minFat
            );
          }
          return false;
        });
        setFilteredFood(currFood);
        setIsApiProcessing(false);
      }, 250);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [minFat]);

  return (
    <>
      <div className="w-full">
        <div>
          <div className="my-1"></div>
          <p className="pl-1 text-xs font-semibold text-violet-900">
            Search by Name of Food/Beverage
          </p>
          <div className="flex w-[100%] items-center justify-between gap-3">
            <input
              type="text"
              placeholder="Search"
              className="mx-1 mb-2 w-[30%] cursor-pointer rounded-lg border border-violet-900 bg-violet-100 p-2 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
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
          <div className="flex w-[100%] flex-row">
            <div className="mx-2">
              <p className="p-1 text-xs font-semibold text-violet-900">
                Minimum Protein: {minProtein}g
              </p>
              <input
                type="range"
                min="0"
                max="30"
                value={minProtein}
                onChange={(e) => setMinProtein(parseInt(e.target.value))}
                className="w-[100%] cursor-pointer rounded-lg border border-violet-900 border-violet-900 bg-transparent accent-violet-500"
              />
            </div>
            <div className="mx-2">
              <p className="p-1 text-xs font-semibold text-violet-900">
                Minimum Calories: {minCalories} kcal
              </p>
              <input
                type="range"
                min="0"
                max="300"
                value={minCalories}
                onChange={(e) => setMinCalories(parseInt(e.target.value))}
                className="w-[100%] cursor-pointer rounded-lg border border-violet-900 border-violet-900 bg-transparent accent-violet-500"
              />
            </div>
            <div className="mx-2">
              <p className="p-1 text-xs font-semibold text-violet-900">
                Minimum Carbohydrates: {minCarbs}g
              </p>
              <input
                type="range"
                min="0"
                max="30"
                value={minCarbs}
                onChange={(e) => setMinCarbs(parseInt(e.target.value))}
                className="w-[100%] cursor-pointer rounded-lg border border-violet-900 border-violet-900 bg-transparent accent-violet-500"
              />
            </div>
            <div className="mx-2">
              <p className="p-1 text-xs font-semibold text-violet-900">
                Minimum Fat: {minFat}g
              </p>
              <input
                type="range"
                min="0"
                max="30"
                value={minFat}
                onChange={(e) => setMinFat(parseInt(e.target.value))}
                className="w-[100%] cursor-pointer rounded-lg border border-violet-900 border-violet-900 bg-transparent accent-violet-500"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
