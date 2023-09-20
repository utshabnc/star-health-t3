import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { toTitleCase } from "../../utils";
import FoodAutocompleteInput from "../FoodAutoCompleteInput";
import FoodDetailsTable from "../FoodDetailsTable";
import LoadingStarHealth from "../Loading";
import { IconContext } from "react-icons";
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsChevronCompactRight } from "react-icons/bs";
import { MdWaterDrop } from "react-icons/md";
import { flatMap, set, update } from "lodash";
import { toast } from "react-toastify";
import React from "react";
import { error } from "console";
import SubstanceDetailsTable from "../SubstanceDetailsTable";
import { parse } from "path";
const Modal = ({
  open,
  children,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}) => {
  const showHideClassName = open ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-tracker rounded-lg ">{children}</section>
    </div>
  );
};

const SubstanceTracker: React.FC = () => {
  function toISOLocal(d: any) {
    const z = (n: any) => ("0" + n).slice(-2);
    const zz = (n: any) => ("00" + n).slice(-3);
    let off = d.getTimezoneOffset();
    const sign = off > 0 ? "-" : "+";
    off = Math.abs(off);

    return (
      d.getFullYear() +
      "-" +
      z(d.getMonth() + 1) +
      "-" +
      z(d.getDate()) +
      "T" +
      z(d.getHours()) +
      ":" +
      z(d.getMinutes()) +
      ":" +
      z(d.getSeconds()) +
      "." +
      zz(d.getMilliseconds()) +
      sign +
      z((off / 60) | 0) +
      ":" +
      z(off % 60)
    );
  }
  const { data: session, status } = useSession();

  const userId = session?.user?.id || "cllxyib7m0000lf08kqeao8nj";
  const [substanceTrackerData, setSubstanceTrackerData] = useState<any[]>([]);
  const [substanceTrackerDate, setSubstanceTrackerDate] = useState<any>(
    toISOLocal(new Date()).split("T")[0]
  );
  const [entryError, setEntryError] = useState<boolean>(false);
  const [subLimitArr, setSubLimitArr] = useState<any[]>([]);
  const [isDeleteing, setIsDeleteing] = useState(false);
  const [customSubstanceArr, setCustomSubstanceArr] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedSubstance, setSelectedSubstance] = useState<any>(0);
  const [selectedSubstanceLimit, setSelectedSubstanceLimit] = useState<any>(0);

  const [dosageUnitInput, setDosageUnitInput] = useState<any>("");
  const [substancNameInput, setSubstanceNameInput] = useState<any>("");
  const [addSubstanceisLoading, setaddSubstanceisLoading] =
    useState<boolean>(false);
  const [dosageAmount, setDosageAmount] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [methodOfConsumption, setMethodOfConsumption] = useState("");
  const [moodBefore, setMoodBefore] = useState("");
  const [moodAfter, setMoodAfter] = useState("");
  const [addNewSubBtn, setAddNewSubBtn] = useState<boolean>(false);
  const [selectedID, setSelectedID] = useState();

  const [dailyLimit, setDailyLimit] = useState<number>(0);
  const [weeklyLimit, setWeeklyLimit] = useState<number>(0);

  const [saveDailyStatus, setSaveDailyStatus] = useState<boolean>(false);
  const [saveWeeklyStatus, setSaveWeeklyStatus] = useState<boolean>(false);
  const [isNew, setIsNew] = useState<boolean>(false);
  const [selectedListSubstance, setSelectedListSubstance] = useState<any>(0);

  const [substanceList, setSubstanceList] = useState<any>([]);
  useEffect(() => {
    getAllCustomSub();
  }, [openModal]);
  useEffect(() => {
    const UTCFormat = new Date(substanceTrackerDate)
      .toISOString()
      .split("T")[0];

    fetch(
      `/api/substanceTracker/getSubstancesByDate/?userId=${userId}&date=${UTCFormat}`
    ).then((response) => {
      response.json().then((data) => {
        setSubstanceTrackerData(data.substanceTracker);
        setSubLimitArr(data.customSubstancesWithTotal);
      });
    });
  }, [
    substanceTrackerDate,
    addSubstanceisLoading,
    saveDailyStatus,
    saveWeeklyStatus,
    isDeleteing,
  ]);
  const resetAllInputs = () => {
    setIsNew(false);
    setDosageAmount("");
    setDate("");
    setTime("");
    setMethodOfConsumption("");
    setMoodAfter("");
    setMoodBefore("");
    setSubstanceNameInput("");
    setSelectedSubstance(undefined);
    setDosageUnitInput("");
  };
  const getAllCustomSub = () => {
    fetch(`/api/substanceTracker/getAllCustomSub/?userId=${userId}`).then(
      (response) => {
        response.json().then((data) => {
          console.log(data);
          if (!data.customSubstance || data.customSubstance.length == 0) {
            setAddNewSubBtn(true);
          }
          setCustomSubstanceArr(data.customSubstance);
        });
      }
    );
  };
  useEffect(() => {
    fetch(`/api/substanceTracker/getAllData`).then((response) => {
      response.json().then((data) => {
        setSubstanceList(data);
      });
    });
  }, [userId]);
  const editFunction = (substance: any) => {
    setOpenModal(true);
    setSelectedID(substance["id"]);
    setDosageAmount(substance["dosageAmount"] + "");
    const d = toISOLocal(new Date(substance["entryDateTime"])).split("T");
    setDate(d[0] ?? "");
    setTime(d[1] ? d[1].slice(0, -8) : "");
    setMethodOfConsumption(substance["methodOfConsumption"]);
    setMoodAfter(substance["moodAfter"]);
    setMoodBefore(substance["moodBefore"]);
    setSubstanceNameInput("");
    setAddNewSubBtn(false);
    setIsNew(false);
    for (let i = 0; i < subLimitArr.length; i++) {
      if (subLimitArr[i]["substance"] == substance["substance"]) {
        setSelectedSubstance(i);
        break; // Stop the loop once a match is found
      }
    }
    setDosageUnitInput("");
  };
  const saveDaily = async (e: React.FormEvent) => {
    e.preventDefault();
    if (dailyLimit != subLimitArr[selectedSubstanceLimit]["dailylimit"]) {
      const body = {
        id: subLimitArr[selectedSubstanceLimit]["id"],
        dailyLimit: dailyLimit,
      };
      fetch(`/api/substanceTracker/addDailyLimit/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((message: any) => {
        toast(`Successfully Saved New Daily Limit.`, {});
        setSaveDailyStatus(false);
      });
    }
  };
  const saveWeekly = async (e: React.FormEvent) => {
    e.preventDefault();
    if (weeklyLimit != subLimitArr[selectedSubstanceLimit]["weeklylimit"]) {
      const body = {
        id: subLimitArr[selectedSubstanceLimit]["id"],
        weeklyLimit: weeklyLimit,
      };
      fetch(`/api/substanceTracker/addWeeklyLimit/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((message: any) => {
        toast(`Successfully Saved New Weekly Limit.`, {});
        setSaveWeeklyStatus(false);
      });
    }
  };
  const addSubstance = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      date == "" ||
      time == "" ||
      parseFloat(dosageAmount) == 0 ||
      (addNewSubBtn &&
        ((isNew && substancNameInput == "") || dosageUnitInput == "")) ||
      (!addNewSubBtn && subLimitArr.length == 0)
    ) {
      setEntryError(true);

      return;
    }
    setEntryError(false);

    setaddSubstanceisLoading(true);
    const dateTimeInput = `${date}T${time}:00`;
    const UTCFormat = new Date(dateTimeInput).toISOString();
    const body = {
      id: selectedID,
      userId: userId,
      entryDateTime: UTCFormat,
      dosageAmount: parseFloat(dosageAmount),
      methodOfConsumption: methodOfConsumption,
      moodBefore: moodBefore,
      moodAfter: moodAfter,
      isNewSubstance: addNewSubBtn,
      addNewSubstance: {
        substanceName: isNew
          ? substancNameInput
          : substanceList[selectedListSubstance],
        dosageUnit: dosageUnitInput,
      },
      substance: !addNewSubBtn ? subLimitArr[selectedSubstance]["id"] : "",
    };
    try {
      await fetch("/api/substanceTracker/addSubstance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((message: any) => {
        toast(`Successfully added custom Substance.`, {});
        setOpenModal(false);
        setaddSubstanceisLoading(false);
        resetAllInputs();
        // setaddCustomSubstanceStatus(0)
      });
    } catch (error) {
      setEntryError(true);
      console.error("An error occurred while submitting the form", error);
    }
    return;
  };

  return (
    <>
      <section>
        <div className="mb-2">
          <div className="mb-1 font-semibold">
            Pick date to retrieve the Substance Intake for that day
          </div>
          <input
            value={substanceTrackerDate}
            onChange={(e) => {
              setSubstanceTrackerDate(e.target.value);
            }}
            className="rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
            type="date"
          ></input>
        </div>
      </section>
      <section className="mb-3 mt-3">
        {substanceTrackerData && (
          <>
            <div className="mb-3 mt-3 text-center text-3xl font-semibold text-violet-900">
              Overall Consumption
            </div>
            <div>
              <div className="mb-1 font-semibold">
                Pick substance to view consumption summary
              </div>
              <select
                className="w-full rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
                onChange={(e) => {
                  setSelectedSubstanceLimit(e.target.selectedIndex);
                  setDailyLimit(
                    subLimitArr[e.target.selectedIndex]["dailylimit"]
                  );
                  setWeeklyLimit(
                    subLimitArr[e.target.selectedIndex]["weeklylimit"]
                  );
                }}
                value={selectedSubstanceLimit}
              >
                {subLimitArr && subLimitArr.length != 0 ? (
                  subLimitArr.map((option, index) => (
                    <option key={option.substance} value={index}>
                      {option.substance} ({option.dosageUnit})
                    </option>
                  ))
                ) : (
                  <option disabled={true}>
                    No custom Substance. Add new substance to track.
                  </option>
                )}
              </select>
            </div>
            {subLimitArr.length != 0 && (
              <div className="mt-2 flex justify-evenly">
                <div>
                  <div className="flex flex-col items-center">
                    <div className="text-xl font-semibold text-violet-700">
                      Total Daily Consumption
                    </div>
                    <div className="text-2xl font-semibold text-violet-700">
                      {subLimitArr[selectedSubstanceLimit]["totalDosage"]}{" "}
                      {subLimitArr[selectedSubstanceLimit]["dosageUnit"]}
                    </div>
                    <div
                      className={`text-m font-semibold ${
                        subLimitArr[selectedSubstanceLimit]["totalDosage"] -
                          dailyLimit >
                        0
                          ? "text-red-700 "
                          : "text-green-700 "
                      }`}
                    >
                      {" "}
                      {subLimitArr[selectedSubstanceLimit]["totalDosage"] -
                        dailyLimit >
                      0
                        ? "+"
                        : "-"}{" "}
                      {Math.round(
                        Math.abs(
                          parseFloat(
                            subLimitArr[selectedSubstanceLimit]["totalDosage"]
                          ) - dailyLimit
                        )
                      )}{" "}
                      {subLimitArr[selectedSubstanceLimit]["dosageUnit"]}
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-xl font-semibold text-violet-700">
                      Daily Limit
                    </div>
                    <div className="mb-1 flex flex-row items-center">
                      <AiOutlineMinus
                        className="text-2xl font-semibold text-violet-700"
                        size={30}
                        onClick={() => {
                          if (dailyLimit != 0) {
                            setDailyLimit(Math.round(dailyLimit - 1));
                          }
                        }}
                      ></AiOutlineMinus>
                      <div className="mx-5 text-xl font-semibold text-violet-700">
                        {dailyLimit}{" "}
                        {subLimitArr[selectedSubstanceLimit]["dosageUnit"]}
                      </div>
                      <AiOutlinePlus
                        className="text-2xl font-semibold text-violet-700"
                        size={30}
                        onClick={() => {
                          setDailyLimit(Math.round(dailyLimit + 1));
                        }}
                      ></AiOutlinePlus>
                    </div>
                    <button
                      className="ease focus:shadow-outline w-full select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none"
                      onClick={(e) => {
                        setSaveDailyStatus(true);
                        saveDaily(e);
                      }}
                    >
                      Save Daily Limit
                      {saveDailyStatus && (
                        <>
                          <div className="lds-ring">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                          </div>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <div className="flex flex-col items-center">
                    <div className="text-xl font-semibold text-violet-700">
                      Total Weekly Consumption
                    </div>
                    <div className="text-2xl font-semibold text-violet-700">
                      {subLimitArr[selectedSubstanceLimit]["totalWeeklyDosage"]}{" "}
                      {subLimitArr[selectedSubstanceLimit]["dosageUnit"]}
                    </div>
                    <div
                      className={`text-m font-semibold ${
                        subLimitArr[selectedSubstanceLimit][
                          "totalWeeklyDosage"
                        ] -
                          weeklyLimit >
                        0
                          ? "text-red-700 "
                          : "text-green-700 "
                      }`}
                    >
                      {" "}
                      {subLimitArr[selectedSubstanceLimit][
                        "totalWeeklyDosage"
                      ] -
                        weeklyLimit >
                      0
                        ? "+"
                        : "-"}{" "}
                      {Math.round(
                        Math.abs(
                          parseFloat(
                            subLimitArr[selectedSubstanceLimit][
                              "totalWeeklyDosage"
                            ]
                          ) - weeklyLimit
                        )
                      )}{" "}
                      {subLimitArr[selectedSubstanceLimit]["dosageUnit"]}
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-xl font-semibold text-violet-700">
                      Weekly Limit
                    </div>
                    <div className="mb-1 flex flex-row items-center">
                      <AiOutlineMinus
                        className="text-2xl font-semibold text-violet-700"
                        size={30}
                        onClick={() => {
                          if (weeklyLimit != 0) {
                            setWeeklyLimit(Math.round(weeklyLimit - 1));
                          }
                        }}
                      ></AiOutlineMinus>
                      <div className="mx-5 text-xl font-semibold text-violet-700">
                        {weeklyLimit}{" "}
                        {subLimitArr[selectedSubstanceLimit]["dosageUnit"]}{" "}
                      </div>
                      <AiOutlinePlus
                        className="text-2xl font-semibold text-violet-700"
                        size={30}
                        onClick={() => {
                          setWeeklyLimit(Math.round(weeklyLimit + 1));
                        }}
                      ></AiOutlinePlus>
                    </div>
                    <button
                      className="ease focus:shadow-outline w-full select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none"
                      onClick={(e) => {
                        setSaveWeeklyStatus(true);
                        saveWeekly(e);
                      }}
                    >
                      Save Weekly Limit
                      {saveWeeklyStatus && (
                        <>
                          <div className="lds-ring">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                          </div>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </section>

      <button
        onClick={(e) => {
          setOpenModal(true);
          setSelectedID(undefined);
          setDate(substanceTrackerDate);
        }}
        className="ease focus:shadow-outline w-[100%] select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none"
      >
        Add Substance
      </button>
      <section className="mt-2">
        <div>
          <SubstanceDetailsTable
            setIsDeleting={setIsDeleteing}
            setSubstanceData={setSubstanceTrackerData}
            rows={[
              ...(substanceTrackerData?.map((substance: any) => ({
                id: substance["id"] ?? "",
                entryDateTime: substance["entryDateTime"] ?? "",
                date: new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(new Date(substance["entryDateTime"])),
                time: new Intl.DateTimeFormat("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                  timeZoneName: "short",
                }).format(new Date(substance["entryDateTime"])),
                substance: substance["customSubstance"]["substance"] + "" ?? "",
                dosageUnit: substance["customSubstance"]["dosageUnit"] ?? "",
                dosageAmount: substance["dosageAmount"] ?? "",
                methodOfConsumption: substance["methodOfConsumption"] ?? "",
                moodBefore: substance["moodBefore"] ?? "",
                moodAfter: substance["moodAfter"] ?? "",
                userId: substance["userId"] ?? "",
                link: "",
                editFunction: editFunction,
              })) ?? []),
            ]}
          />
        </div>
      </section>
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <section className="">
          <div className="w-100  bg-violet-700 px-4 py-2 text-center text-xl font-bold text-white">
            <div>ADD SUBSTANCE</div>
            <div
              onClick={(e) => {
                if (!addSubstanceisLoading) {
                  setOpenModal(false);
                  resetAllInputs();
                }
              }}
              className="closeFoodModal mr-2 mt-3 justify-end bg-violet-700"
            >
              <AiOutlineClose size={25} color="white"></AiOutlineClose>
            </div>
          </div>
          <div className="ml-2 mr-1">
            {entryError && (
              <div className="text-red-700">Invalid or missing input.</div>
            )}
            <div className="mb-1">
              <div className="mb-1 font-semibold">
                Select Previously Added Substance:
              </div>
              <div className="flex flex-col items-center">
                <div className="flex w-[100%] items-center justify-center">
                  {addNewSubBtn && (
                    <>
                      <button
                        className="ease focus:shadow-outline w-full select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none"
                        onClick={() => {
                          setAddNewSubBtn(false);
                        }}
                      >
                        Select Previously Added Substance
                      </button>
                    </>
                  )}
                  {!addNewSubBtn && (
                    <>
                      <select
                        className="w-full rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
                        onChange={(e) => {
                          setSelectedSubstance(e.target.selectedIndex);
                        }}
                        value={selectedSubstance}
                      >
                        {subLimitArr && subLimitArr.length != 0 ? (
                          subLimitArr.map((option, index) => (
                            <option key={option.substance} value={index}>
                              {option.substance} ({option.dosageUnit})
                            </option>
                          ))
                        ) : (
                          <option disabled={true}>
                            No custom Substance. Add new substance to track.
                          </option>
                        )}
                      </select>
                    </>
                  )}
                </div>
                <div className="my-1 flex w-[5%] items-center justify-center font-semibold">
                  OR
                </div>
                <div className="w-[100%]">
                  {!addNewSubBtn && (
                    <>
                      <button
                        className="ease focus:shadow-outline w-full select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none"
                        onClick={() => {
                          setAddNewSubBtn(true);
                        }}
                      >
                        Add New Substance
                      </button>
                    </>
                  )}
                  {addNewSubBtn && (
                    <>
                      <div className="w-full">
                        <div className="mb-1 ">
                          <div className="mb-1 font-semibold">
                            Substance Name
                          </div>
                          {!isNew && (
                            <>
                              <select
                                className="w-full rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
                                onChange={(e) => {
                                  if (e.target.value == "custom") {
                                    setIsNew(true);
                                  } else {
                                    setSelectedListSubstance(e.target.value);
                                  }
                                }}
                                value={selectedListSubstance}
                              >
                                <option value={"custom"}>
                                  Create your own Substance
                                </option>
                                {substanceList && substanceList.length != 0 ? (
                                  substanceList.map(
                                    (option: any, index: any) => (
                                      <option key={option} value={index}>
                                        {option}
                                      </option>
                                    )
                                  )
                                ) : (
                                  <option disabled={true}>
                                    No custom Substance. Add new substance to
                                    track.
                                  </option>
                                )}
                              </select>
                            </>
                          )}
                          {isNew && (
                            <>
                              <input
                                value={substancNameInput}
                                placeholder="Write your own substance name"
                                onChange={(e) => {
                                  setSubstanceNameInput(e.target.value);
                                }}
                                className="w-full rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-400 hover:bg-violet-300 hover:text-violet-900"
                                type="text"
                              ></input>
                            </>
                          )}
                        </div>
                        <div className="mb-1">
                          <div className="mb-1 font-semibold">
                            Dosage Method
                          </div>
                          <input
                            value={dosageUnitInput}
                            onChange={(e) => {
                              setDosageUnitInput(e.target.value);
                            }}
                            className="w-full rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
                            type="text"
                          ></input>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="mb-1">
              <div className="mb-1 font-semibold">Dosage Amount (Unit):</div>
              <input
                type="number"
                value={dosageAmount}
                className="rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
                onChange={(e) => setDosageAmount(e.target.value)}
              />
            </div>
            <div className="mb-1">
              <div className="mb-1 font-semibold">Date:</div>
              <input
                type="date"
                value={date}
                className="rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="mb-1">
              <div className="mb-1 font-semibold">Time:</div>
              <input
                type="time"
                value={time}
                className="rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="mb-1">
              <div className="mb-1 font-semibold">Method Of Consumption:</div>
              <textarea
                cols={10}
                value={methodOfConsumption}
                maxLength={200}
                className="w-[100%] rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
                onChange={(e) => setMethodOfConsumption(e.target.value)}
              />
            </div>
            <div className="mb-1 flex flex-col justify-between">
              <div className="w-[100%]">
                <div className="mb-1 font-semibold">
                  Your mood before substance intake:
                </div>
                <textarea
                  value={moodBefore}
                  cols={10}
                  maxLength={200}
                  className="w-full rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
                  onChange={(e) => setMoodBefore(e.target.value)}
                />
              </div>
              <div className="w-[100%]">
                <div className="mb-1 font-semibold">
                  Your mood after substance intake:
                </div>
                <textarea
                  value={moodAfter}
                  cols={10}
                  maxLength={200}
                  className="w-full rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
                  onChange={(e) => setMoodAfter(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex w-full py-2">
            <button
              onClick={(e) => {
                addSubstance(e);
              }}
              className="ease focus:shadow-outline mx-2 my-2 w-[100%] select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none"
            >
              Add Substance
              {addSubstanceisLoading && (
                <>
                  <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </>
              )}
            </button>
          </div>
        </section>
      </Modal>
    </>
  );
};
export default SubstanceTracker;
