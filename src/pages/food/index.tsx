import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ExpansionPanel from "../../components/ExpansionPanel";
import LoadingStarHealth from "../../components/Loading";
import type { FoodData } from "../../components/Food/FoodData.model";
import Citation from "../../components/Citation";

function upperCaseAllWords(name: string) {
  const words = name.split(" ");
  const upperCasedWords = words.map((word: string) => {
    return word[0]?.toUpperCase() + word.slice(1);
  });
  return upperCasedWords.join(" ");
}

const acceptableAttributes = ["Common Name"]

function foodAttributes(foodData: FoodData) {
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
  } catch { }
}

function foodIngredients(ingredients: string) {
  let foodIngredients = ingredients.split(",");
  foodIngredients = foodIngredients.map((ingredient: string) => {
    return upperCaseAllWords(ingredient.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").replace(/\s{2,}/g, " ").trim().toLocaleLowerCase());
  }
  );
  return (
    <div>
      {foodIngredients.map((ingredient: string, index: number) => {
        return (
          <div key={index} className="flex flex-row">
            <p className="text-md mb-1 text-violet-700 ml-1">{"• " + ingredient}</p>
          </div>
        );
      }
      )}
    </div>
  );
}

function foodNutrients(foodData: FoodData) {
  try {
    let foodNutrients = foodData["foodNutrients"];
    if (!Array.isArray(foodNutrients)) {
      foodNutrients = [foodNutrients];
    }
    const convertedNutrients = foodNutrients.map((nutrient: any) => {
      return {
        name: upperCaseAllWords(nutrient["nutrient"] ? nutrient["nutrient"]["name"] : nutrient["nutrientName"]),
        number: nutrient["nutrient"] ? nutrient["nutrient"]["value"] : nutrient["value"],
        unitName: nutrient["nutrient"] ? nutrient["nutrient"]["unitName"] : nutrient["unitName"],
        designation: nutrient["nutrient"] ? nutrient["nutrient"]["number"] : nutrient["nutrientNumber"],
      };
    });
    let count = 0;
    return (
      <div>
        {convertedNutrients.map((nutrient: any, index: number) => {
          if (nutrient.number !== 0) {
            count++;
            return (
              <tr key={index} className={count % 2 == 0 ? "bg-violet-100" : ""}>
                <td className="px-4 py-1 whitespace-nowrap text-md text-gray-800">
                  {nutrient.name}
                </td>
                <td className="px-4 py-1 whitespace-nowrap text-md text-gray-800">
                  {nutrient.number + " " + nutrient.unitName}
                </td>
              </tr>
            );
          }
        })}
      </div>
    );
  } catch (error) {
    console.log("error", error);
  }
}

async function enrichFoodData(foodData: FoodData) {
  const foodName = foodData.description;
  const fdcID = foodData.fdcID;
  const enrichedData = await fetch(`/api/food/search/${foodName}`).then((response) => {
    return response.json().then((data) => {
      const enrichedFoodData = data.foods.find((food: any) => food.fdcID === fdcID);
      if (enrichedFoodData) {
        const totalFoodData = { ...foodData, ...enrichedFoodData };
        return totalFoodData;
      } else {
        return foodData;
      }
    });
  });
  return enrichedData;
}

const FoodDetails = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [foodData, setFoodData] = useState<FoodData>({} as FoodData);
  const navigate = useRouter();
  const foodID = navigate.query.id as string;

  useEffect(() => {
    if (foodID) {
      setIsProcessing(true);
      const fetchFoodData = async (foodID: string) => {
        try {
          const response = await fetch(`/api/food/${foodID}`);
          const data = await response.json();
          enrichFoodData(data).then((enrichedData) => {
            setFoodData(enrichedData);
          });
        } catch (error) {
          console.log(error);
        } finally {
          setIsProcessing(false);
        }
      };
      fetchFoodData(foodID);
    }
  }, [foodID]);

  return foodData && isProcessing ? (
    <LoadingStarHealth />
  ) : (
    <>
      <div className="bgColor">
        <div className="rounded bg-white p-5">
          <div className="flex flex-row">
            <div>
              <button
                onClick={navigate.back}
                className="ease focus:shadow-outline select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-end sm:px-2 lg:px-28">
            <div className="flex flex-row justify-between	items-start">
              <div>
                <p className="text-2xl font-semibold text-violet-700">
                  {foodData.description
                    ? upperCaseAllWords(foodData.description)
                    : ""}
                </p>
                <p className="text-purp-5 pt-1 text-violet-700 sm:text-md">
                  Category:{" "}
                  {foodData.foodCategory ? foodData.foodCategory.description ? foodData.foodCategory.description : foodData.foodCategory : "-"}
                </p>
                <p className="text-purp-5 pt-1 text-violet-700 sm:text-md">
                  Brand:{" "}
                  {foodData.brandOwner ? foodData.brandOwner : "-"}
                </p>
                <p className="text-purp-5 pt-1 text-violet-700 sm:text-xs">
                  Published:{" "}
                  {foodData.publicationDate ? foodData.publicationDate : "-"}
                </p>
              </div>
              <Citation title={foodData.description
                ? upperCaseAllWords(foodData.description)
                : ""} />
            </div>
            <div className="my-1">
              <hr />
            </div>
            <div className="flex flex-col">
              {(foodAttributes(foodData) !== undefined) ? (
                <ExpansionPanel
                  key={"attributes"}
                  title={"Attributes"}
                  content={foodAttributes(foodData) as any}
                />
              ) : (
                <></>
              )}
              {(foodNutrients(foodData) !== undefined) ? (
                <ExpansionPanel
                  key={"nutrients"}
                  title={"Nutrients"}
                  content={foodNutrients(foodData) as any}
                />
              ) : (
                <></>
              )}
              {(foodData.ingredients !== undefined) ? (
                <ExpansionPanel
                  key={"ingredients"}
                  title={"Ingredients"}
                  content={foodIngredients(foodData.ingredients) as any}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodDetails;
