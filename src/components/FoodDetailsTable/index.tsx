import Link from "next/link";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import NoResultComponent from "../NoResultComponent";
import Search from "../Search";
import { toTitleCase } from "../../utils";
import { BsFillTrashFill } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";

interface ResultSchema {
  id: string | null;
  title: string | null;
  dateTimeofMeal: string | null;
  date: string | null;
  time: string | null;
  numOfServings: number | null;
  nutrientFact: JSON | null;
  portionSize: number | null;
  link: string;
  mealCategory: string;
  foodID: string;
  editFunction: any;
}

function FoodDetailsTable({
  rows,
  foodData,
  setFoodData,
}: {
  rows: ResultSchema[];
  foodData: any[];
  setFoodData: any;
}) {
  const [foodJournalEntries, setFoodJournalEntries] =
    useState<ResultSchema[]>(rows);

  useEffect(() => {
    setFoodJournalEntries(rows);
  }, [rows]);
  function deleteFoodItem(id: any) {
    fetch(`/api/foodJournal/deleteFoodItem/?key=${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Food item deleted successfully");
          // Perform any additional actions you need after successful deletion

          setFoodData((prevEntries: any) =>
            prevEntries.filter((entry: any) => entry.id !== id)
          );
        } else {
          console.error("Failed to delete food item");
          // Handle the error scenario here
        }
      })
      .catch((error) => {
        console.error("An error occurred while making the request", error);
      });
  }

  return (
    <>
      <section
        className=" h-full w-full text-gray-600 antialiased"
        x-data="app"
      >
        <div className="flex h-full w-full flex-row">
          <div className=" h-full w-full rounded-lg bg-white shadow-lg">
            <div className="p-3 font-bold">
              {foodJournalEntries.length} Results Found
            </div>
            <div className="overflow-x-auto p-3 ">
              {foodJournalEntries.length == 0 && (
                <NoResultComponent title={""}></NoResultComponent>
              )}
              {foodJournalEntries.map((row, i) => (
                <div
                  key={i}
                  className="mb-2 w-[100%] rounded-lg bg-white text-center shadow-lg"
                >
                  <div className="flex flex-row justify-between">
                    <div className="ml-2">
                      <div className="flex flex-row justify-between">
                        <h5 className="text-md mb-2 font-medium text-violet-700 underline">
                          <Link href={`${row.link}`}>
                            {toTitleCase(
                              row.title ? row.title.toLowerCase() : ""
                            )}
                          </Link>
                        </h5>
                        <p className="mb-1 text-xs text-gray-600"></p>
                      </div>
                      <div className="flex flex-row justify-between">
                        <h5 className="text-md mb-2 text-gray-900">
                          Servings Size: {row.portionSize}g
                        </h5>
                      </div>
                      <div className="flex flex-row justify-between">
                        <h5 className="text-md mb-2 text-gray-900">
                          Number of Servings: {row.numOfServings}
                        </h5>
                      </div>
                      <div className="flex flex-row justify-between">
                        <h5 className="text-md mb-2 text-gray-900">
                          Meal: {row.mealCategory}
                        </h5>
                      </div>
                      <div className="flex flex-col items-start text-sm">
                        <p className="mb-1 text-sm text-violet-400">
                          Date: {row.date}
                        </p>
                        <p className="mb-1 text-sm text-violet-400">
                          Time: {row.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <button
                        className="flex w-[70px] items-center justify-center bg-blue-600 hover:bg-blue-900 "
                        onClick={() => {
                          row.editFunction(row);
                        }}
                      >
                        <AiOutlineEdit size={35} color="white"></AiOutlineEdit>
                      </button>
                      <button
                        className="flex  w-[70px] items-center justify-center rounded-r-lg bg-red-600 hover:bg-red-900 "
                        onClick={() => deleteFoodItem(row.id)}
                      >
                        <BsFillTrashFill
                          size={35}
                          color="white"
                        ></BsFillTrashFill>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FoodDetailsTable;
