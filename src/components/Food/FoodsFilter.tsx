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

const NUTRIENT_DESIGNATIONS = {
  "203": "Protein",
  "204": "Fat",
  "205": "Carbohydrates",
  "208": "Calories",
  "303": "Iron",
  "291": "Fiber",
  "269": "Sugar",
  "301": "Calcium",
  "307": "Sodium",
  "306": "Potassium",
  "401": "Vitamin C",
  "328": "Vitamin D",
  "320": "Vitamin A",
  "415": "Vitamin B6",
  "418": "Vitamin B12",
  "255": "Water",
  "305": "Phosphorus",
  "304": "Magnesium",
  "309": "Zinc",
  "601": "Cholesterol",
};

export default function FoodsFilters({ params }: FoodsFiltersProps) {
  const { setFilteredFood, setFood, setIsApiProcessing, food } = params;
  const [searchStr, setSearchStr] = useState<string>("");
  const [minProtein, setMinProtein] = useState<number>(0);
  const [minCalories, setMinCalories] = useState<number>(0);
  const [minCarbs, setMinCarbs] = useState<number>(0);
  const [minFat, setMinFat] = useState<number>(0);
  const [inclusiveNutrients, setInclusiveNutrients] = useState<string[]>([]);
  const [exclusiveNutrients, setExclusiveNutrients] = useState<string[]>([]);
  const [selectedNutrient, setSelectedNutrient] = useState<string>("203");

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
            setInclusiveNutrients([]);
            setExclusiveNutrients([]);
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
          setInclusiveNutrients([]);
          setExclusiveNutrients([]);
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
        if (exclusiveNutrients.includes("203")) {
          setExclusiveNutrients(
            exclusiveNutrients.filter((nutrient) => nutrient !== "203")
          );
        }
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
        if (exclusiveNutrients.includes("208")) {
          setExclusiveNutrients(
            exclusiveNutrients.filter((nutrient) => nutrient !== "208")
          );
        }
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
                carbs["nutrient"] ? carbs["nutrient"]["value"] : carbs["value"]
              ) >= minCarbs
            );
          }
          return false;
        });
        setFilteredFood(currFood);
        setIsApiProcessing(false);
        if (exclusiveNutrients.includes("205")) {
          setExclusiveNutrients(
            exclusiveNutrients.filter((nutrient) => nutrient !== "205")
          );
        }
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
        if (exclusiveNutrients.includes("204")) {
          setExclusiveNutrients(
            exclusiveNutrients.filter((nutrient) => nutrient !== "204")
          );
        }
      }, 250);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [minFat]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setIsApiProcessing(true);
      let currFood = food;
      currFood = currFood.filter((food) => {
        let found = true;
        inclusiveNutrients.forEach((nutrient) => {
          const nutrientObj = food.foodNutrients.find(
            (nutrientObj) => nutrientObj["nutrientNumber"] === nutrient
          );
          if (nutrientObj) {
            if (
              parseFloat(
                nutrientObj["nutrient"]
                  ? nutrientObj["nutrient"]["value"]
                  : nutrientObj["value"]
              ) <= 0
            ) {
              found = false;
            } else {
            }
          } else {
            found = false;
          }
        });
        exclusiveNutrients.forEach((nutrient) => {
          const nutrientObj = food.foodNutrients.find(
            (nutrientObj) => nutrientObj["nutrientNumber"] === nutrient
          );
          if (nutrientObj) {
            if (
              parseFloat(
                nutrientObj["nutrient"]
                  ? nutrientObj["nutrient"]["value"]
                  : nutrientObj["value"]
              ) > 0
            ) {
              found = false;
            }
          } else {
            found = false;
          }
        });
        return found;
      });
      console.log(currFood);
      setFilteredFood(currFood);
      setIsApiProcessing(false);
    }, 250);
    return () => clearTimeout(delayDebounceFn);
  }, [inclusiveNutrients, exclusiveNutrients]);

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
          <div className="my-2 flex w-[100%] flex-row">
            <div className="mx-2">
              <p className="p-1 text-xs font-semibold text-violet-900">
                Include/Exclude by Nutrients
              </p>
              <div className="flex flex-row">
                <select
                  className="mr-1 w-[100%] cursor-pointer rounded-lg border border-violet-900 bg-transparent p-1 text-sm text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
                  onChange={(e) => setSelectedNutrient(e.target.value)}
                  defaultValue={selectedNutrient}
                >
                  {Object.keys(NUTRIENT_DESIGNATIONS).map(
                    (nutrient: string) => (
                      <option key={nutrient} value={nutrient}>
                        {
                          NUTRIENT_DESIGNATIONS[
                            nutrient as keyof typeof NUTRIENT_DESIGNATIONS
                          ]
                        }
                      </option>
                    )
                  )}
                </select>
                <button
                  className="mx-1 cursor-pointer rounded-lg border border-violet-900 bg-transparent p-1 text-sm text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
                  onClick={() => {
                    if (exclusiveNutrients.includes(selectedNutrient)) {
                      setExclusiveNutrients(
                        exclusiveNutrients.filter(
                          (nutrient) => nutrient !== selectedNutrient
                        )
                      );
                    }
                    setInclusiveNutrients([
                      ...inclusiveNutrients,
                      selectedNutrient,
                    ]);
                  }}
                >
                  Include
                </button>
                <button
                  className="ml-1 mr-2 cursor-pointer rounded-lg border border-violet-900 bg-transparent p-1 text-sm text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
                  onClick={() => {
                    if (inclusiveNutrients.includes(selectedNutrient)) {
                      setInclusiveNutrients(
                        inclusiveNutrients.filter(
                          (nutrient) => nutrient !== selectedNutrient
                        )
                      );
                    }
                    setExclusiveNutrients([
                      ...exclusiveNutrients,
                      selectedNutrient,
                    ]);
                    if (selectedNutrient === "203") {
                      setMinProtein(0);
                    } else if (selectedNutrient === "208") {
                      setMinCalories(0);
                    } else if (selectedNutrient === "205") {
                      setMinCarbs(0);
                    } else if (selectedNutrient === "204") {
                      setMinFat(0);
                    }
                  }}
                >
                  Exclude
                </button>
                {inclusiveNutrients.length > 0 && (
                  <div
                    className="flex flex-row"
                    style={{ alignItems: "center" }}
                  >
                    {inclusiveNutrients.map((nutrient) => (
                      <button
                        key={nutrient}
                        style={{ width: "110px", height: "25px" }}
                        className="hover:text-white-900 mx-1 cursor-pointer rounded-xl border border-green-900 bg-green-100 p-1 text-xs text-green-900 hover:bg-green-300"
                        onClick={() => {
                          setInclusiveNutrients(
                            inclusiveNutrients.filter(
                              (nutrient_) => nutrient_ !== nutrient
                            )
                          );
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="w-40%">
                            {
                              NUTRIENT_DESIGNATIONS[
                                nutrient as keyof typeof NUTRIENT_DESIGNATIONS
                              ]
                            }
                          </div>
                          <div className="w-10% text-xxs">
                            <p>X</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                {exclusiveNutrients.length > 0 && (
                  <div
                    className="flex flex-row"
                    style={{ alignItems: "center" }}
                  >
                    {exclusiveNutrients.map((nutrient) => (
                      <button
                        key={nutrient}
                        style={{ width: "110px", height: "25px" }}
                        className="hover:text-white-900 mx-1 cursor-pointer rounded-xl border border-red-900 bg-red-100 p-1 text-xs text-red-900 hover:bg-red-300"
                        onClick={() => {
                          setExclusiveNutrients(
                            exclusiveNutrients.filter(
                              (nutrient_) => nutrient_ !== nutrient
                            )
                          );
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="w-40%">
                            {
                              NUTRIENT_DESIGNATIONS[
                                nutrient as keyof typeof NUTRIENT_DESIGNATIONS
                              ]
                            }
                          </div>
                          <div className="w-10% text-xxs">
                            <p>X</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
