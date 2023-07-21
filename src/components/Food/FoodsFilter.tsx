import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import type { Food } from "./Food.model";
import Image from "next/image";
import AutocompleteInput from "../AutoCompleteInput";
import { toTitleCase } from "../../utils";
import usda from "../../assets/logos/USDA-Emblem.png";

interface FoodsFiltersProps {
  params: {
    setFilteredFood: Dispatch<SetStateAction<Food[]>>;
    setFood: Dispatch<SetStateAction<Food[]>>;
    setIsApiProcessing: Dispatch<SetStateAction<boolean>>;
    food: Food[];
  };
}
const returnFoodNames =(list:any[])=>{
  const output:any = []
    if ( list === undefined)
    {
      return[]
    }
    list.forEach((element:any) => {
      output.push(toTitleCase((element.description).toLowerCase()))
    });
    return output
  }
const NUTRIENT_DESIGNATIONS = {
  "301": "Calcium",
  "208": "Calories",
  "205": "Carbohydrates",
  "601": "Cholesterol",
  "204": "Fat",
  "291": "Fiber",
  "303": "Iron",
  "304": "Magnesium",
  "305": "Phosphorus",
  "306": "Potassium",
  "203": "Protein",
  "307": "Sodium",
  "269": "Sugar",
  "255": "Water",
  "309": "Zinc",
  "320": "Vitamin A",
  "401": "Vitamin C",
  "328": "Vitamin D",
  "415": "Vitamin B6",
  "418": "Vitamin B12",
};

const NUTRIENT_ARRAY = [
  "301",
  "208",
  "205",
  "601",
  "204",
  "291",
  "303",
  "304",
  "305",
  "306",
  "203",
  "307",
  "269",
  "255",
  "309",
  "320",
  "401",
  "328",
  "415",
  "418"
]

export default function FoodsFilters({ params }: FoodsFiltersProps) {
  const { setFilteredFood, setFood, setIsApiProcessing, food } = params;
  const [searchStr, setSearchStr] = useState<string>("");
  const [minProtein, setMinProtein] = useState<number>(0);
  const [minCalories, setMinCalories] = useState<number>(0);
  const [minCarbs, setMinCarbs] = useState<number>(0);
  const [minFat, setMinFat] = useState<number>(0);
  const [minWater, setMinWater] = useState<number>(0);
  const [minSugar, setMinSugar] = useState<number>(0);
  const [minFiber, setMinFiber] = useState<number>(0);
  const [minCalcium, setMinCalcium] = useState<number>(0);
  const [minIron, setMinIron] = useState<number>(0);
  const [minMagnesium, setMinMagnesium] = useState<number>(0);
  const [minPhosphorus, setMinPhosphorus] = useState<number>(0);
  const [minPotassium, setMinPotassium] = useState<number>(0);
  const [minSodium, setMinSodium] = useState<number>(0);
  const [minZinc, setMinZinc] = useState<number>(0);
  const [minVitaminA, setMinVitaminA] = useState<number>(0);
  const [minVitaminB6, setMinVitaminB6] = useState<number>(0);
  const [minVitaminB12, setMinVitaminB12] = useState<number>(0);
  const [minVitaminC, setMinVitaminC] = useState<number>(0);
  const [minVitaminD, setMinVitaminD] = useState<number>(0);
  const [minCholesterol, setMinCholesterol] = useState<number>(0);
  const [inclusiveNutrients, setInclusiveNutrients] = useState<string[]>([]);
  const [exclusiveNutrients, setExclusiveNutrients] = useState<string[]>([]);
  const [selectedNutrient, setSelectedNutrient] = useState<string>("203");
  const returnFoodNames =(list:any[])=>{
    const output:any = []
    if ( list === undefined)
    {
      return[]
    }
    list.forEach((element:any) => {
      output.push(toTitleCase((element.description).toLowerCase()))
    });
    return output
  }
  const filterFoodByNutrient = (nutrientNumber: string, minValue: number) => {
    let currFood = food;
    currFood = currFood.filter((food) => {
      const nutrient = food.foodNutrients.find(
        (nutrient) => nutrient["nutrientNumber"] === nutrientNumber
      );
      if (nutrient) {
        return (
          parseInt(
            nutrient["nutrient"]
              ? nutrient["nutrient"]["value"]
              : nutrient["value"]
          ) >= minValue
        );
      }
      return false;
    });
    setFilteredFood(currFood);
    setIsApiProcessing(false);
    if (exclusiveNutrients.includes(nutrientNumber)) {
      setExclusiveNutrients(
        exclusiveNutrients.filter((nutrient) => nutrient !== nutrientNumber)
      );
    }
  };

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
    }
  }, [searchStr]);

  useEffect(() => {
    if (minProtein > -1) {
      const delayDebounceFn = setTimeout(() => {
        setIsApiProcessing(true);
        filterFoodByNutrient("203", minProtein);
      }, 250);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [minProtein]);

  useEffect(() => {
    if (minCalories > -1) {
      const delayDebounceFn = setTimeout(() => {
        setIsApiProcessing(true);
        filterFoodByNutrient("208", minCalories);
      }, 250);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [minCalories]);

  useEffect(() => {
    if (minCarbs > -1) {
      const delayDebounceFn = setTimeout(() => {
        setIsApiProcessing(true);
        filterFoodByNutrient("205", minCarbs);
      }, 250);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [minCarbs]);

  useEffect(() => {
    if (minFat > -1) {
      const delayDebounceFn = setTimeout(() => {
        setIsApiProcessing(true);
        filterFoodByNutrient("204", minFat);
      }, 250);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [minFat]);

  useEffect(() => {
    if (minWater > -1) {
      const delayDebounceFn = setTimeout(() => {
        setIsApiProcessing(true);
        filterFoodByNutrient("255", minWater);
      }, 250);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [minWater]);

  useEffect(() => {
    if (minSugar > -1) {
      const delayDebounceFn = setTimeout(() => {
        setIsApiProcessing(true);
        filterFoodByNutrient("269", minSugar);
      }, 250);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [minSugar]);

  useEffect(() => {
    if (minFiber > -1) {
      const delayDebounceFn = setTimeout(() => {
        setIsApiProcessing(true);
        filterFoodByNutrient("291", minFiber);
      }, 250);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [minFiber]);

  useEffect(() => {
    if (minCalcium > -1) {
      const delayDebounceFn = setTimeout(() => {
        setIsApiProcessing(true);
        filterFoodByNutrient("301", minCalcium);
      }, 250);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [minCalcium]);

  useEffect(() => {
    if (minIron > -1) {
      const delayDebounceFn = setTimeout(() => {
        setIsApiProcessing(true);
        filterFoodByNutrient("303", minIron);
      }, 250);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [minIron]);

  useEffect(() => {
    if (minMagnesium > -1) {
      const delayDebounceFn = setTimeout(() => {
        setIsApiProcessing(true);
        filterFoodByNutrient("304", minMagnesium);
      }, 250);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [minMagnesium]);

  useEffect(() => {
    if (minPhosphorus > -1) {
      const delayDebounceFn = setTimeout(() => {
        setIsApiProcessing(true);
        filterFoodByNutrient("305", minPhosphorus);
      }, 250);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [minPhosphorus]);

  useEffect(() => {
    if (minPotassium > -1) {
      const delayDebounceFn = setTimeout(() => {
        setIsApiProcessing(true);
        filterFoodByNutrient("306", minPotassium);
      }, 250);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [minPotassium]);

  useEffect(() => {
    if (minSodium > -1) {
      const delayDebounceFn = setTimeout(() => {
        setIsApiProcessing(true);
        filterFoodByNutrient("307", minSodium);
      }, 250);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [minSodium]);

  useEffect(() => {
    if (minZinc > -1) {
      const delayDebounceFn = setTimeout(() => {
        setIsApiProcessing(true);
        filterFoodByNutrient("309", minZinc);
      }, 250);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [minZinc]);

  useEffect(() => {
    if (minVitaminA > -1) {
      const delayDebounceFn = setTimeout(() => {
        setIsApiProcessing(true);
        filterFoodByNutrient("318", minVitaminA);
      }, 250);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [minVitaminA]);

  useEffect(() => {
    if (minVitaminB6 > -1) {
      const delayDebounceFn = setTimeout(() => {
        setIsApiProcessing(true);
        filterFoodByNutrient("415", minVitaminB6);
      }, 250);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [minVitaminB6]);

  useEffect(() => {
    if (minVitaminB12 > -1) {
      const delayDebounceFn = setTimeout(() => {
        setIsApiProcessing(true);
        filterFoodByNutrient("418", minVitaminB12);
      }, 250);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [minVitaminB12]);

  useEffect(() => {
    if (minVitaminC > -1) {
      const delayDebounceFn = setTimeout(() => {
        setIsApiProcessing(true);
        filterFoodByNutrient("401", minVitaminC);
      }, 250);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [minVitaminC]);

  useEffect(() => {
    if (minVitaminD > -1) {
      const delayDebounceFn = setTimeout(() => {
        setIsApiProcessing(true);
        filterFoodByNutrient("324", minVitaminD);
      }, 250);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [minVitaminD]);

  useEffect(() => {
    if (minCholesterol > -1) {
      const delayDebounceFn = setTimeout(() => {
        setIsApiProcessing(true);
        filterFoodByNutrient("601", minCholesterol);
      }, 250);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [minCholesterol]);

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
          <p className="pl-1 text-sm font-semibold text-violet-900">
            Search by Name of Food/Beverage
          </p>
          <div className="flex w-[100%] items-center justify-between gap-3">
          <AutocompleteInput expr={searchStr} setExpr={setSearchStr} options={returnFoodNames(food)}></AutocompleteInput>
            <Image
              src={usda}
              alt=""
              width={128}
              height={128}
              className="bottom-0 right-0 object-contain"
            />
          </div>
          <p className="pl-1 text-sm font-semibold text-violet-900">
            Filter by Minimum Values
          </p>
          <div className="flex w-[100%] flex-row">
            <div className="mx-2">
              <p className="p-1 text-xs font-semibold text-violet-900">
                Calcium: {minCalcium} MG
              </p>
              <input
                type="range"
                min="0"
                max="200"
                value={minCalcium}
                onChange={(e) => setMinCalcium(parseInt(e.target.value))}
                className="w-[100%] cursor-pointer rounded-lg border border-violet-900 border-violet-900 bg-transparent accent-violet-500"
              />
            </div>
            <div className="mx-2">
              <p className="p-1 text-xs font-semibold text-violet-900">
                Carbohydrates: {minCarbs} G
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
                Cholesterol: {minCholesterol} MG
              </p>
              <input
                type="range"
                min="0"
                max="10"
                value={minCholesterol}
                onChange={(e) => setMinCholesterol(parseInt(e.target.value))}
                className="w-[100%] cursor-pointer rounded-lg border border-violet-900 border-violet-900 bg-transparent accent-violet-500"
              />
            </div>
            <div className="mx-2">
              <p className="p-1 text-xs font-semibold text-violet-900">
                Fat: {minFat} G
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
            <div className="mx-2">
              <p className="p-1 text-xs font-semibold text-violet-900">
                Fiber: {minFiber} G
              </p>
              <input
                type="range"
                min="0"
                max="100"
                value={minFiber}
                onChange={(e) => setMinFiber(parseInt(e.target.value))}
                className="w-[100%] cursor-pointer rounded-lg border border-violet-900 border-violet-900 bg-transparent accent-violet-500"
              />
            </div>
            <div className="mx-2">
              <p className="p-1 text-xs font-semibold text-violet-900">
                Iron: {minIron} MG
              </p>
              <input
                type="range"
                min="0"
                max="10"
                value={minIron}
                onChange={(e) => setMinIron(parseInt(e.target.value))}
                className="w-[100%] cursor-pointer rounded-lg border border-violet-900 border-violet-900 bg-transparent accent-violet-500"
              />
            </div>
            <div className="mx-2">
              <p className="p-1 text-xs font-semibold text-violet-900">
                Magnesium: {minMagnesium} MG
              </p>
              <input
                type="range"
                min="0"
                max="10"
                value={minMagnesium}
                onChange={(e) => setMinMagnesium(parseInt(e.target.value))}
                className="w-[100%] cursor-pointer rounded-lg border border-violet-900 border-violet-900 bg-transparent accent-violet-500"
              />
            </div>
          </div>
          <div className="flex w-[100%] flex-row">
            <div className="mx-2">
              <p className="p-1 text-xs font-semibold text-violet-900">
                Phosphorus: {minPhosphorus} MG
              </p>
              <input
                type="range"
                min="0"
                max="100"
                value={minPhosphorus}
                onChange={(e) => setMinPhosphorus(parseInt(e.target.value))}
                className="w-[100%] cursor-pointer rounded-lg border border-violet-900 border-violet-900 bg-transparent accent-violet-500"
              />
            </div>
            <div className="mx-2">
              <p className="p-1 text-xs font-semibold text-violet-900">
                Potassium: {minPotassium} MG
              </p>
              <input
                type="range"
                min="0"
                max="200"
                value={minPotassium}
                onChange={(e) => setMinPotassium(parseInt(e.target.value))}
                className="w-[100%] cursor-pointer rounded-lg border border-violet-900 border-violet-900 bg-transparent accent-violet-500"
              />
            </div>
            <div className="mx-2">
              <p className="p-1 text-xs font-semibold text-violet-900">
                Protein: {minProtein} G
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
                Sodium: {minSodium} MG
              </p>
              <input
                type="range"
                min="0"
                max="200"
                value={minSodium}
                onChange={(e) => setMinSodium(parseInt(e.target.value))}
                className="w-[100%] cursor-pointer rounded-lg border border-violet-900 border-violet-900 bg-transparent accent-violet-500"
              />
            </div>
            <div className="mx-2">
              <p className="p-1 text-xs font-semibold text-violet-900">
                Sugar: {minSugar} G
              </p>
              <input
                type="range"
                min="0"
                max="100"
                value={minSugar}
                onChange={(e) => setMinSugar(parseInt(e.target.value))}
                className="w-[100%] cursor-pointer rounded-lg border border-violet-900 border-violet-900 bg-transparent accent-violet-500"
              />
            </div>
            <div className="mx-2">
              <p className="p-1 text-xs font-semibold text-violet-900">
                Water: {minWater} G
              </p>
              <input
                type="range"
                min="0"
                max="100"
                value={minWater}
                onChange={(e) => setMinWater(parseInt(e.target.value))}
                className="w-[100%] cursor-pointer rounded-lg border border-violet-900 border-violet-900 bg-transparent accent-violet-500"
              />
            </div>
            <div className="mx-2">
              <p className="p-1 text-xs font-semibold text-violet-900">
                Zinc: {minZinc} MG
              </p>
              <input
                type="range"
                min="0"
                max="10"
                value={minZinc}
                onChange={(e) => setMinZinc(parseInt(e.target.value))}
                className="w-[100%] cursor-pointer rounded-lg border border-violet-900 border-violet-900 bg-transparent accent-violet-500"
              />
            </div>
          </div>
          <div className="flex w-[100%] flex-row">
            <div className="mx-2">
              <p className="p-1 text-xs font-semibold text-violet-900">
                Vitamin A: {minVitaminA} UG
              </p>
              <input
                type="range"
                min="0"
                max="10"
                value={minVitaminA}
                onChange={(e) => setMinVitaminA(parseInt(e.target.value))}
                className="w-[100%] cursor-pointer rounded-lg border border-violet-900 border-violet-900 bg-transparent accent-violet-500"
              />
            </div>
            <div className="mx-2">
              <p className="p-1 text-xs font-semibold text-violet-900">
                Vitamin B6: {minVitaminB6} UG
              </p>
              <input
                type="range"
                min="0"
                max="10"
                value={minVitaminB6}
                onChange={(e) => setMinVitaminB6(parseInt(e.target.value))}
                className="w-[100%] cursor-pointer rounded-lg border border-violet-900 border-violet-900 bg-transparent accent-violet-500"
              />
            </div>
            <div className="mx-2">
              <p className="p-1 text-xs font-semibold text-violet-900">
                Vitamin B12: {minVitaminB12} UG
              </p>
              <input
                type="range"
                min="0"
                max="10"
                value={minVitaminB12}
                onChange={(e) => setMinVitaminB12(parseInt(e.target.value))}
                className="w-[100%] cursor-pointer rounded-lg border border-violet-900 border-violet-900 bg-transparent accent-violet-500"
              />
            </div>
            <div className="mx-2">
              <p className="p-1 text-xs font-semibold text-violet-900">
                Vitamin C: {minVitaminC} UG
              </p>
              <input
                type="range"
                min="0"
                max="10"
                value={minVitaminC}
                onChange={(e) => setMinVitaminC(parseInt(e.target.value))}
                className="w-[100%] cursor-pointer rounded-lg border border-violet-900 border-violet-900 bg-transparent accent-violet-500"
              />
            </div>
            <div className="mx-2">
              <p className="p-1 text-xs font-semibold text-violet-900">
                Vitamin D: {minVitaminD} UG
              </p>
              <input
                type="range"
                min="0"
                max="10"
                value={minVitaminD}
                onChange={(e) => setMinVitaminD(parseInt(e.target.value))}
                className="w-[100%] cursor-pointer rounded-lg border border-violet-900 border-violet-900 bg-transparent accent-violet-500"
              />
            </div>
          </div>

          <div className="my-2 flex w-[100%] flex-row">
            <div className="mx-2">
              <p className="p-1 text-sm font-semibold text-violet-900">
                Include/Exclude by Nutrients
              </p>
              <div className="flex flex-row">
                <select
                  className="mr-1 w-[100%] cursor-pointer rounded-lg border border-violet-900 bg-transparent p-1 text-sm text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
                  onChange={(e) => setSelectedNutrient(e.target.value)}
                  defaultValue={selectedNutrient}
                >
                  {NUTRIENT_ARRAY.map(
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
