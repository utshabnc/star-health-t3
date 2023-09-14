import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { useEffect, useState } from "react";
import NoResultComponent from "../NoResultComponent";
import Search from "../Search";
import { toTitleCase } from "../../utils";
import { BsFillTrashFill } from "react-icons/bs";
import { AiOutlineEdit, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { GiMedicinePills } from "react-icons/gi";
import { PiPillFill } from "react-icons/pi";
import { toast } from "react-toastify";
interface DrugSchema {
  id: number;
  brand_name: string;
  manufacturer_name: string;
  userId: string;
  dosge_descrip: string;
  spl_id: string;
}
interface ResultSchema {
  id: any;
  amount: any;
  dateTimeOfLog: any;
  sideEffectFelt: any;
  drugId: any;
  drug: DrugSchema;
}
function DrugDetailsTable({
  rows,
  date,
  editFunction,
}: {
  rows: any[];
  date: any;
  editFunction: any;
}) {
  const [drugJournalEntries, setDrugJournalEntries] =
    useState<ResultSchema[]>(rows);
  const { data: session, status } = useSession();

  const userId = session?.user?.id || "cllxyib7m0000lf08kqeao8nj";
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Initialize state with the dosageList
  useEffect(() => {
    setDrugJournalEntries(rows);
  }, [rows]);
  function deleteDrug(id: any) {
    fetch(`/api/drugJournal/deleteDrug/?key=${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Exercise entry deleted successfully");
          // Perform any additional actions you need after successful deletion

          setDrugJournalEntries((prevEntries: any) =>
            prevEntries.filter((entry: any) => entry.id !== id)
          );
        } else {
          console.error("Failed to delete Exercise entry");
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
              {drugJournalEntries.length} Results Found
            </div>
            <div className="overflow-x-auto p-3">
              {drugJournalEntries.length == 0 && (
                <NoResultComponent title={""}></NoResultComponent>
              )}
              {drugJournalEntries.map((row, i) => (
                <div
                  key={i}
                  className="mb-2 w-[100%] rounded-lg bg-white pt-2 text-center shadow-lg"
                >
                  <div className="flex flex-row justify-between">
                    <div className="ml-2 w-[80%]">
                      <div className="flex  flex-row justify-between ">
                        <h5 className="text-md mb-2 text-left font-medium text-violet-700">
                          {toTitleCase(row.drug.brand_name.toLowerCase())}
                        </h5>
                        <p className="mb-1 text-xs text-gray-600"></p>
                      </div>
                      <div className=" mb-2 mr-4 flex items-center">
                        <div className="flex flex-col items-center"></div>
                        <div className="flex h-full flex-row items-center justify-evenly">
                          <div className="text-md font-semibold text-gray-900">
                            Dosage Taken:
                          </div>
                          <div className=" flex flex-row items-center">
                            <div className="text-md mx-5 flex items-center font-semibold text-violet-700">
                              {row.amount}
                              <PiPillFill
                                className="ml-3 text-2xl font-semibold text-violet-700"
                                size={20}
                              ></PiPillFill>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row justify-between">
                        <h5 className="mb-2 text-sm  text-gray-700">
                          <span className=" font-semibold text-gray-900">
                            {" "}
                            Manufacturer Name:{" "}
                          </span>
                          {row.drug.manufacturer_name}
                        </h5>
                      </div>
                      <div className="flex flex-row justify-between">
                        <h5 className="mb-2 text-sm  text-gray-700">
                          <span className=" font-semibold text-gray-900">
                            {" "}
                            Date:{" "}
                          </span>
                          {new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }).format(new Date(row["dateTimeOfLog"]))}
                        </h5>
                      </div>
                      <div className="flex flex-row justify-between">
                        <h5 className="mb-2 text-sm  text-gray-700">
                          <span className=" font-semibold text-gray-900">
                            {" "}
                            Time:{" "}
                          </span>
                          {new Intl.DateTimeFormat("en-US", {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                            timeZoneName: "short",
                          }).format(new Date(row["dateTimeOfLog"]))}
                        </h5>
                      </div>

                      <div className="flex flex-row justify-between">
                        <h5 className="mb-2 h-[80px]  overflow-y-scroll text-start text-sm text-gray-700">
                          <span className=" font-semibold text-gray-900">
                            {" "}
                            Doasage Description:{" "}
                          </span>
                          {row.drug.dosge_descrip}
                        </h5>
                      </div>
                      <div className="flex flex-row justify-between">
                        <h5 className="mb-2 h-[80px] w-full  overflow-y-scroll text-start text-sm text-gray-700">
                          <span className=" font-semibold text-gray-900">
                            {" "}
                            Side Effects Felt:{" "}
                          </span>
                          {row.sideEffectFelt}
                        </h5>
                      </div>
                    </div>

                    <div className="flex">
                      <button
                        className="flex w-[70px] items-center justify-center bg-blue-600 hover:bg-blue-900 "
                        onClick={() => {
                          editFunction(row);
                        }}
                      >
                        <AiOutlineEdit size={35} color="white"></AiOutlineEdit>
                      </button>
                      <button
                        className="flex  w-[70px] items-center justify-center rounded-r-lg bg-red-600 hover:bg-red-900 "
                        onClick={() => {
                          deleteDrug(row.id);
                        }}
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
export default DrugDetailsTable;
