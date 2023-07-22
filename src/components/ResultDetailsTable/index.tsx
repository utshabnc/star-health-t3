import { capitalize } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { formatName } from "../../utils";
import ResultComponent from "../ResultComponent";
import {
  useCallback,
  useEffect,
  useState,
} from "react";
import NoResultComponent from "../NoResultComponent";
import Search from "../Search";
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
      <section className="py-4 text-gray-600 h-full w-full antialiased" x-data="app">
        <div className="flex h-full w-full flex-row">
          <div className=" w-full h-full overflow-scroll rounded-lg border border-gray-200 bg-white shadow-lg">
        
            <div className="font-bold p-3">
            {rows.length} Number of Results

            </div>
            <div className="overflow-x-auto p-3 ">
                  {rows.length==0&&<NoResultComponent title={''}></NoResultComponent>}
                  {currentResults.map((row,i) => (
                    <div key={i}>
                    <ResultComponent title={row?.title??' '} subtitle={row?.subtitle??' '} category={row?.category??' '} link={row?.link??' '}></ResultComponent>
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
