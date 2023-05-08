import Link from "next/link";
import type { Food } from "./Food.model";

function upperCaseAllWords(name: string) {
  const words = name.split(" ");
  const upperCasedWords = words.map((word: string) => {
    return word[0]?.toUpperCase() + word.slice(1);
  });
  return upperCasedWords.join(" ");
}

function mapOtherNames(other_names: any[]) {
  try {
    let otherNames = "";
    other_names.forEach((name: any) => {
      otherNames += (name["name"] || name["nutrientName"]) + ", ";
    });
    return otherNames.slice(0, -2) || "";
  } catch (error) {
    return "";
  }
}

export default function FoodsComponent({ data }: { data: Food[] }) {
  return (
    <>
      {data?.map((food: Food, index: number) => {
        return (
          <div
            key={index}
            className="mb-2 w-[100%] rounded-lg bg-white shadow-lg"
          >
            <div className="p-2">
              <div className="flex flex-row justify-between">
                <div className="flex-auto">
                  <h5 className="text-md mb-2 w-[75%] font-medium text-violet-700 underline">
                    <Link href={`/food?id=${food.fdcId}`}>
                      {upperCaseAllWords(food?.description) || "-"}
                    </Link>
                  </h5>
                  <div className="flex w-[75%] flex-row justify-between">
                    <h5 className="mb-2 text-xs text-gray-500">
                      {mapOtherNames(food.foodNutrients)}
                    </h5>
                    <p className="mb-1 text-base text-gray-700"> </p>
                  </div>
                </div>
                <div className="w-[25%]">
                  <div className="flex flex-col">
                    <p className="mb-1 text-right text-sm text-gray-600">
                      {food.fdcId}
                      <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
