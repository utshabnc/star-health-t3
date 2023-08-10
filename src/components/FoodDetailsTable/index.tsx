import Link from "next/link";
import { useRouter } from "next/router";


import {
  useEffect,
  useState,
} from "react";
import NoResultComponent from "../NoResultComponent";
import Search from "../Search";
import { toTitleCase } from "../../utils";
import { BsFillTrashFill } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";


interface ResultSchema {
    id: string | null;
    title: string | null;
    dateTimeofMeal: string|null;
    date: string | null;
    time: string | null;
    numOfServings: number|null;
    nutrientFact:JSON|null;
    portionSize:number|null
    link: string;
    mealCategory:string;
    foodID:string;
    editFunction:any;
  }


function FoodDetailsTable({ rows }: { rows: ResultSchema[] }) {
  const resultsPerPage = 15; // Number of results to display per page
  const [foodJournalEntries, setFoodJournalEntries] = useState<ResultSchema[]>(rows);

  const [currentPage, setCurrentPage] = useState(1);
  // Calculate the total number of pages based on the total number of results
  const totalPages = Math.ceil(foodJournalEntries.length / resultsPerPage);

  // Get the current subset of rows to display on the current page
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = foodJournalEntries.slice(indexOfFirstResult, indexOfLastResult);

  useEffect(()=>{setFoodJournalEntries(rows)},[rows])
  function deleteFoodItem(id:any){

    fetch(`/api/foodJournal/deleteFoodItem/?key=${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Food item deleted successfully");
          // Perform any additional actions you need after successful deletion
          setFoodJournalEntries((prevEntries) =>
          prevEntries.filter((entry) => entry.id !== id)
        );
        } else {
          console.error("Failed to delete food item");
          // Handle the error scenario here
        }
      })
      .catch((error) => {
        console.error("An error occurred while making the request", error);
      });  }
  useEffect(()=>{setCurrentPage(1)},[foodJournalEntries])
  // Function to handle pagination navigation
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }}
  return (
    <>
      <section className=" text-gray-600 h-full w-full antialiased" x-data="app">
        <div className="flex h-full w-full flex-row">
          <div className=" w-full h-full rounded-lg bg-white shadow-lg">
        
            <div className="font-bold p-3">
            {foodJournalEntries.length} Results Found

            </div>
            <div className="overflow-x-auto p-3 ">
                  {foodJournalEntries.length==0&&<NoResultComponent title={''}></NoResultComponent>}
                  {currentResults.map((row,i) => (
                    <div
                key={i}
                className="mb-2 w-[100%] rounded-lg bg-white text-center shadow-lg"
              >
                <div className="flex flex-row justify-between">
                <div className="ml-2">
                  <div className="flex flex-row justify-between">
                    <h5 className="text-md mb-2 font-medium text-violet-700 underline">
                      <Link href={`${row.link}`}>{toTitleCase(row.title?row.title.toLowerCase():'')}</Link>
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
                <button className="bg-blue-600 w-[70px] flex justify-center items-center hover:bg-blue-900 " onClick={()=>{row.editFunction(row)}}>
                  <AiOutlineEdit size={35} color="white"></AiOutlineEdit>
                </button>
                <button className="bg-red-600  rounded-r-lg w-[70px] flex justify-center items-center hover:bg-red-900 " onClick={()=>deleteFoodItem(row.id)}>
                  <BsFillTrashFill size={35} color="white"></BsFillTrashFill>

                </button>
                </div>
                </div>

              </div>
                 ))}

            </div>
            <div className="flex items-center justify-center p-4">
              <button
                className="mr-2 ease focus:shadow-outline select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                PREV
              </button>
              {currentPage} / {totalPages}
              <button
                className="ml-2 ease focus:shadow-outline select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                NEXT
              </button>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default FoodDetailsTable;
