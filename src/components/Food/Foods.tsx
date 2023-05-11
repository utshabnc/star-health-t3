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

const acceptableAttributes = ["Common Name"]

function foodAttributes(foodData: Food) {
  try {
    let foodAttrs = foodData["foodAttributes"];
    if (!Array.isArray(foodAttrs)) {
      foodAttrs = [foodAttrs];
    }
    foodAttrs = foodAttrs.map((attr: any) => {
        return {
            'name': upperCaseAllWords(attr['value']),
            'desc': attr['foodAttributeType']['name'],
        };
    }).filter((attr: any) => attr['name'] !== undefined)
    .filter((attr: any) => acceptableAttributes.includes(attr['desc']));
    if (foodData.foodCategory) {
        foodAttrs.push({
            'name': upperCaseAllWords(foodData.foodCategory),
            'desc': 'Category',
        });
    }
    if (foodData.scientificName) {
        foodAttrs.push({
            'name': upperCaseAllWords(foodData.scientificName),
            'desc': 'Scientific Name',
        });
    }
    if (foodData.footnote) {
        foodAttrs.push({
            'name': (foodData.footnote),
            'desc': 'Note',
        });
    }
    if (foodData.brandOwner) {
        foodAttrs.push({
            'name': (upperCaseAllWords(foodData.brandOwner.toLocaleLowerCase())),
            'desc': 'Brand',
        });
    }
    if (foodData.ingredients) {
        foodAttrs.push({
            'name': (upperCaseAllWords(foodData.ingredients.toLocaleLowerCase())),
            'desc': 'Ingredients',
        });
    }
    if (foodData.additionalDescriptions) {
        foodAttrs.push({
            'name': (upperCaseAllWords(foodData.additionalDescriptions.toLocaleLowerCase())),
            'desc': 'Additional Description',
        });
    }

    if (foodAttrs.length === 0) {
        return;
    }
    return (
        <div>
            {foodAttrs.map((attr: any, index: number) => {
                return (
                    <div key={index} className="flex flex-row">
                        <p className="text-md mb-1 text-violet-700 ml-1">{attr.desc + ": " + attr.name}</p>
                    </div>
                );
            })}
        </div>
    );
  } catch {}
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
                  <div className="flex w-[85%] flex-row justify-between">
                    <h5 className="mb-2 text-xs text-gray-500">
                    {foodAttributes(food)}
                    </h5>
                    <p className="mb-1 text-base text-gray-700"> </p>
                  </div>
                </div>
                <div className="w-[15%]">
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
