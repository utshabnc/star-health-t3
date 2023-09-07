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
  drug: DrugSchema;
  logs: JSON;
}
function DrugDetailsTable({ rows, date }: { rows: any[]; date: any }) {
  const [drugJournalEntries, setDrugJournalEntries] =
    useState<ResultSchema[]>(rows);
  const { data: session, status } = useSession();

  const userId = session?.user?.id || "cllxyib7m0000lf08kqeao8nj";
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Initialize state with the dosageList
  const [dosageList, setDosageList] = useState<any>({});
  useEffect(() => {
    setDrugJournalEntries(rows);
    let list = {};
    rows &&
      rows.map((row) => {
        // Assuming each 'row' object has a unique 'id' and a 'dosage' property
        list = {
          ...list,
          [row.drug.id]: row.logs.amount == undefined ? 0 : row.logs.amount,
        };
      });
    console.log(list);
    setDosageList(list);
  }, [rows]);
  const addDosage = (id: number) => {
    setDosageList({
      ...dosageList,
      [id]: dosageList[id] + 1,
    });
  };
  const subtractDosage = (id: number) => {
    if (dosageList[id] != 0) {
      setDosageList({
        ...dosageList,
        [id]: dosageList[id] - 1,
      });
    }
  };

  const submitDosage = (id: number) => {
    const body = { userId: userId, date, dosage: dosageList[id], drugId: id };
    console.log(body);
    try {
      fetch("/api/drugJournal/drugLog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((message: any) => {
        toast(`Successfully updated dosage.`, {});
      });
    } catch (error) {
      console.error("An error occurred while submitting the form", error);
    }
    setIsLoading(false);
  };
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
                    <div className="ml-2 w-[60%]">
                      <div className="flex  flex-row justify-between ">
                        <h5 className="text-md mb-2 font-medium text-violet-700">
                          {toTitleCase(row.drug.brand_name.toLowerCase())}
                        </h5>
                        <p className="mb-1 text-xs text-gray-600"></p>
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
                        <h5 className="mb-2 text-start text-sm text-gray-700">
                          <span className=" font-semibold text-gray-900">
                            {" "}
                            Doasage Description:{" "}
                          </span>
                          {row.drug.dosge_descrip}
                        </h5>
                      </div>
                    </div>
                    <div className="mb-3 mr-4 mt-3 flex items-center">
                      <div className="flex flex-col items-center"></div>
                      <div className="mb-3  flex h-full flex-col items-center justify-between">
                        <div className="text-2xl font-bold text-violet-700">
                          Dosage Taken
                        </div>
                        <div className="mb-1 flex flex-row items-center">
                          <AiOutlineMinus
                            className="text-2xl font-bold text-violet-700"
                            size={30}
                            onClick={() => {
                              subtractDosage(row.drug.id);
                            }}
                          ></AiOutlineMinus>
                          <div className="mx-5 flex items-center text-2xl font-semibold text-violet-700">
                            {dosageList[row.drug.id]}
                            <PiPillFill
                              className="ml-1 text-2xl font-semibold text-violet-700"
                              size={30}
                            ></PiPillFill>
                          </div>
                          <AiOutlinePlus
                            className="text-2xl font-bold text-violet-700"
                            size={30}
                            onClick={() => {
                              addDosage(row.drug.id);
                            }}
                          ></AiOutlinePlus>
                        </div>
                        <button
                          className="ease focus:shadow-outline w-full select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none"
                          onClick={(e) => {
                            if (!isLoading) {
                              setIsLoading(true);
                              submitDosage(row.drug.id);
                            }
                          }}
                        >
                          Save Dosage Amount
                        </button>
                      </div>
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
