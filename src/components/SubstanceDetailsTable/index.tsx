import Link from "next/link";
import { useEffect, useState } from "react";
import NoResultComponent from "../NoResultComponent";
import { toTitleCase } from "../../utils";
import { BsFillTrashFill } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";

interface SubstanceSchema {
  id: string | null;
  entryDateTime: string | null;
  date: string | null;
  time: string | null;
  substance: string | null;
  dosageAmount: number | null;
  dosageUnit: string | null;
  methodOfConsumption: string | null;
  moodBefore: string | null;
  moodAfter: string | null;
  userId: string | null;
  link: string | null;
  editFunction: any | null;
}

function SubstanceDetailsTable({
  rows,
  setSubstanceData,
}: {
  rows: SubstanceSchema[];
  setSubstanceData: any;
}) {
  const [substanceJournalEntries, setSubstanceJournalEntries] =
    useState<SubstanceSchema[]>(rows);

  useEffect(() => {
    setSubstanceJournalEntries(rows);
  }, [rows]);

  function deleteSubstanceEntry(id: any) {
    fetch(`/api/substanceTracker/deleteSubstance/?key=${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Substance entry deleted successfully");
          // Perform any additional actions you need after successful deletion

          setSubstanceData((prevEntries: any) =>
            prevEntries.filter((entry: any) => entry.id !== id)
          );
        } else {
          console.error("Failed to delete substance entry");
          // Handle the error scenario here
        }
      })
      .catch((error) => {
        console.error("An error occurred while making the request", error);
      });
  }

  return (
    <>
      <section className="h-full w-full text-gray-600 antialiased" x-data="app">
        <div className="flex h-full w-full flex-row">
          <div className="h-full w-full rounded-lg bg-white shadow-lg">
            <div className="p-3 font-bold">
              {substanceJournalEntries.length} Results Found
            </div>
            <div className="overflow-x-auto p-3">
              {substanceJournalEntries.length === 0 && (
                <NoResultComponent title={""}></NoResultComponent>
              )}
              {substanceJournalEntries.map((row, i) => (
                <div
                  key={i}
                  className="mb-2 w-[100%] rounded-lg bg-white text-center shadow-lg"
                >
                  <div className="flex flex-row justify-between">
                    <div className="ml-2">
                      <div className="flex flex-row justify-between">
                        <h5 className="mb-2 pt-1 text-lg font-medium text-violet-700">
                          <div>
                            {toTitleCase(
                              row.substance ? row.substance.toLowerCase() : ""
                            )}
                          </div>
                        </h5>
                        <p className="mb-1 text-xs text-gray-600"></p>
                      </div>
                      <div className="flex flex-row justify-between">
                        <h5 className="text-md mb-2 text-gray-900">
                          Dosage Amount: {row.dosageAmount} {row.dosageUnit}
                        </h5>
                      </div>
                      <div className="flex flex-col items-start">
                        <h5 className="text-mdtext-gray-900">
                          Method Of Consumption:
                        </h5>
                        <h4 className="mb-2 text-sm text-gray-400">
                          {row.moodAfter == ""
                            ? "Nothing was Added"
                            : row.methodOfConsumption}
                        </h4>
                      </div>
                      <div className="flex flex-col items-start">
                        <h5 className="text-md text-gray-900">
                          Mood Before Intake:
                        </h5>
                        <h4 className="mb-2 mb-2 text-sm text-gray-400">
                          {row.moodBefore == ""
                            ? "Nothing was Added"
                            : row.moodBefore}
                        </h4>
                      </div>
                      <div className="flex flex-col items-start">
                        <h5 className="text-md text-gray-900">
                          Mood After Intake:
                        </h5>
                        <h4 className="mb-2 text-sm text-gray-400">
                          {row.moodAfter == ""
                            ? "Nothing was Added"
                            : row.moodAfter}
                        </h4>
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
                        onClick={() => deleteSubstanceEntry(row.id)}
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

export default SubstanceDetailsTable;
