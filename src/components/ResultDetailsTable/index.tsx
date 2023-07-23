import { capitalize } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { formatName } from "../../utils";
import ResultComponent from "../ResultComponent";
import Image from "next/image";

import {
  useCallback,
  useEffect,
  useState,
} from "react";
import NoResultComponent from "../NoResultComponent";
import Search from "../Search";
import { toTitleCase } from "../../utils";
// import './index.css';

// .buttonText {
//   color: white;
// }

interface ResultSchema {
    title: string | null;
    subtitle: string | null;
    category: string;
    link: string
  
  }

const tableHeaders =
  typeof window != "undefined" && window.screen.width > 1000
    ? [{ title: "Type" }, { title: "Name" }, { title: "Location" }]
    : [{ title: "Name" }, { title: "Location" }];

function ResultsDetailsTable({ rows }: { rows: ResultSchema[] }) {
  const navigation = useRouter();
  const resultsPerPage = 15; // Number of results to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const [search,setSearch]=useState('')
  // Calculate the total number of pages based on the total number of results
  const totalPages = Math.ceil(rows.length / resultsPerPage);

  // Get the current subset of rows to display on the current page
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = rows.slice(indexOfFirstResult, indexOfLastResult);

  // Function to handle pagination navigation
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }}
  return (
    <>
      <section className="pt-4 text-gray-600 h-full w-full antialiased" x-data="app">
        <div className="flex h-full w-full flex-row">
          <div className=" w-full h-full rounded-lg border border-gray-200 bg-white shadow-lg">
        
            <div className="font-bold p-3">
            {rows.length} Results Found

            </div>
            <div className="overflow-x-auto p-3 ">
                  {rows.length==0&&<NoResultComponent title={''}></NoResultComponent>}
                  {currentResults.map((row,i) => (
                    <div
                key={i}
                className="mb-2 w-[100%] rounded-lg bg-white text-center shadow-lg"
              >
                <div className=" p-2">
                  <div className="flex flex-row justify-between">
                    <h5 className="text-md mb-2 font-medium text-violet-700 underline">
                      <Link href={`${row.link}`}>{toTitleCase(row.title?row.title.toLowerCase():'')}</Link>
                    </h5>
                    <p className="mb-1 text-xs text-gray-600"></p>
                  </div>
                  <div className="flex flex-row justify-between">
                    <h5 className="text-md mb-2 text-gray-900">
                      {row.subtitle}
                    </h5>
                    <p className="mb-1 text-base text-gray-700"> </p>
                  </div>
                  <div className="flex flex-row justify-between text-sm">
                    <p className="mb-1 text-xs text-violet-400">
                      Category:{" "}
                      {row.category &&
                        row.category.charAt(0).toUpperCase() +
                          row.category
                            .slice(1, row.category.length)
                            .toLowerCase()}
                    </p>

                    <div className="border-gray-300 text-gray-600"></div>
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

export default ResultsDetailsTable;
