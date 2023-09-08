import Link from "next/link";
import { useEffect, useState } from "react";
import NoResultComponent from "../NoResultComponent";
import { toTitleCase } from "../../utils";
import { BsFillTrashFill } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { router } from "../../server/trpc/trpc";

interface ExerciseSchema {
  id: string | null;
  entryDateTime: string | null;
  date: string | null;
  time: string | null;
  exerciseName: string | null;
  calorieBurned: number | null;
  duration: number | null;
  unitToTrackValue: number | null;
  unit: string | null;
  intensity: string | null;
  userId: string | null;
  link: string | null;
  editFunction: any | null;
}

function ExerciseDetailsTable({
  rows,
  setExerciseData,
}: {
  rows: ExerciseSchema[];
  setExerciseData: any;
}) {
  const [exerciseJournalEntries, setExerciseJournalEntries] =
    useState<ExerciseSchema[]>(rows);

  useEffect(() => {
    setExerciseJournalEntries(rows);
  }, [rows]);

  function deleteExerciseEntry(id: any) {
    fetch(`/api/exercise-tracker/deleteExercise/?key=${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Exercise entry deleted successfully");
          // Perform any additional actions you need after successful deletion

          setExerciseData((prevEntries: any) =>
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
      <section className="h-full w-full text-gray-600 antialiased" x-data="app">
        <div className="flex h-full w-full flex-row">
          <div className="h-full w-full rounded-lg bg-white shadow-lg">
            <div className="p-3 font-bold">
              {exerciseJournalEntries.length} Results Found
            </div>
            <div className="overflow-x-auto p-3">
              {exerciseJournalEntries.length === 0 && (
                <NoResultComponent title={""}></NoResultComponent>
              )}
              {exerciseJournalEntries.map((row, i) => (
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
                              row.exerciseName
                                ? row.exerciseName.toLowerCase()
                                : ""
                            )}
                          </div>
                        </h5>
                        <p className="mb-1 text-xs text-gray-600"></p>
                      </div>
                      <div className="flex flex-row justify-between">
                        <h5 className="text-md mb-2 text-gray-900">
                          Calories Burned: {row.calorieBurned} Calories
                        </h5>
                      </div>
                      <div className="flex flex-row justify-between">
                        <h5 className="text-md mb-2 text-gray-900">
                          Duration: {row.duration} Minutes
                        </h5>
                      </div>
                      {!(row.unit === "Calories") &&
                        !(row.unit === "Minutes") && (
                          <div className="flex flex-row justify-between">
                            <h5 className="text-md mb-2 text-gray-900">
                              {row.unit}: {row.unitToTrackValue} {row.unit}
                            </h5>
                          </div>
                        )}
                      <div className="flex flex-row justify-between">
                        <h5 className="text-md mb-2 text-gray-900">
                          Intensity Level: {row.intensity}
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
                        onClick={() => deleteExerciseEntry(row.id)}
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

export default ExerciseDetailsTable;
