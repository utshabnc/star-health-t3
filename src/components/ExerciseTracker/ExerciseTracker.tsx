import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { toTitleCase } from "../../utils";
import LoadingStarHealth from "../Loading";
import { IconContext } from "react-icons";
import {
  AiOutlineClose,
  AiOutlineLoading3Quarters,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { BsChevronCompactRight } from "react-icons/bs";
import { MdWaterDrop } from "react-icons/md";
import { set, update } from "lodash";
import { toast } from "react-toastify";
import React from "react";
import { error } from "console";
import { duration } from "@mui/material";
import ExerciseDetailsTable from "../ExerciseDetailsTable";
import { custom } from "zod";
import { combineLatest } from "rxjs";
import { FaRunning } from "react-icons/fa";

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

const ExerciseTracker: React.FC = () => {
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

  const [entryError, setEntryError] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [exerciseDuration, setExerciseDuration] = useState<any>("");
  const [exerciseCalories, setExerciseCalories] = useState<any>("");
  const [exerciseUnitVal, setExerciseUnitVal] = useState<any>("");

  const [exerciseIntensity, setExerciseIntensity] = useState<number>(0);
  const intensityLevels = ["Low", "Medium", "High", "Very High"];
  const [addExerciseisLoading, setaddExerciseisLoading] =
    useState<boolean>(false);
  const [customExerciseArr, setCustomExerciseArr] = useState<any[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<any>(0);
  //Custom
  const [exerciseNameInput, setExerciseNameInput] = useState<any>("");
  const [exerciseUnit, setExerciseUnit] = useState<any>(0);
  const exerciseUnitList = ["Calories", "Minutes", "Steps"];
  const [addNewExBtn, setAddNewExBtn] = useState<boolean>(false);
  const [selectedID, setSelectedID] = useState();

  const [exerciseTrackerData, setExerciseTrackerData] = useState<any[]>([]);
  const [exerciseTrackerDate, setExerciseTrackerDate] = useState<any>(
    toISOLocal(new Date()).split("T")[0]
  );

  const [customExerciseGoalsData, setCustomExerciseGoalsData] = useState<any>(
    []
  );
  const [dailyGoal, setDailyGoal] = useState<number>(0);
  const [weeklyGoal, setWeeklyGoal] = useState<number>(0);
  const [monthlyGoal, setMonthlyGoal] = useState<number>(0);

  const [saveDailyStatus, setSaveDailyStatus] = useState<boolean>(false);
  const [saveWeeklyStatus, setSaveWeeklyStatus] = useState<boolean>(false);
  const [saveMonthlyStatus, setSaveMonthlyStatus] = useState<boolean>(false);

  const [selectedExerciseGoal, setSelectedExerciseGoal] = useState<number>(0);
  const [isGettingData, setIsGettingData] = useState<boolean>(false);

  const getAllExercise = () => {
    fetch(`/api/exercise-tracker/getAllCustomExercise/?userId=${userId}`).then(
      (response) => {
        response.json().then((data) => {
          setCustomExerciseArr(data.customExercise);
        });
      }
    );
  };

  const saveDaily = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      dailyGoal != customExerciseGoalsData[selectedExerciseGoal]["dailyGoal"]
    ) {
      const body = {
        id: customExerciseGoalsData[selectedExerciseGoal]["id"],
        dailyGoal: dailyGoal,
      };
      fetch(`/api/exercise-tracker/addDailyGoal/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((message: any) => {
        toast(`Successfully Saved New Daily Goal.`, {});
        setSaveDailyStatus(false);
      });
    }
  };

  const saveWeekly = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      dailyGoal != customExerciseGoalsData[selectedExerciseGoal]["weeklyGoal"]
    ) {
      const body = {
        id: customExerciseGoalsData[selectedExerciseGoal]["id"],
        weeklyGoal: weeklyGoal,
      };
      fetch(`/api/exercise-tracker/addWeeklyGoal/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((message: any) => {
        toast(`Successfully Saved New Weekly Goal.`, {});
        setSaveWeeklyStatus(false);
      });
    }
  };
  const saveMonthly = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      dailyGoal != customExerciseGoalsData[selectedExerciseGoal]["monthlyGoal"]
    ) {
      const body = {
        id: customExerciseGoalsData[selectedExerciseGoal]["id"],
        monthlyGoal: monthlyGoal,
      };
      fetch(`/api/exercise-tracker/addMonthlyGoal/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((message: any) => {
        toast(`Successfully Saved New Monthly Goal.`, {});
        setSaveMonthlyStatus(false);
      });
    }
  };
  useEffect(() => {
    getAllExercise();
  }, [openModal]);
  const editFunction = (exercise: any) => {
    setOpenModal(true);
    setSelectedID(exercise["id"]);
    setExerciseCalories(exercise["calorieBurned"] + "");
    const d = toISOLocal(new Date(exercise["entryDateTime"])).split("T");
    setDate(d[0] ?? "");
    setTime(d[1] ? d[1].slice(0, -8) : "");
    setExerciseUnit(exercise["unit"]);
    setExerciseUnitVal(
      exercise["unit"] === "Calories" || exercise["unit"] === "Minutes"
        ? 0
        : exercise["unitToTrackValue"]
    );
    setExerciseDuration(exercise["duration"]);
    setExerciseIntensity(intensityLevels.indexOf(exercise["intensity"]));
    setExerciseNameInput("");
    setAddNewExBtn(false);
    for (let i = 0; i < customExerciseArr.length; i++) {
      if (
        customExerciseArr[i]["exerciseName"] == exercise["exerciseName"] &&
        customExerciseArr[i]["unitToTrack"] == exercise["unit"]
      ) {
        setSelectedExercise(i);
        break; // Stop the loop once a match is found
      }
    }
  };
  useEffect(() => {
    setIsGettingData(true);
    const UTCFormat = new Date(exerciseTrackerDate).toISOString().split("T")[0];

    fetch(
      `/api/exercise-tracker/getExerciseByDate/?userId=${userId}&date=${UTCFormat}`
    ).then((response) => {
      response.json().then((data) => {
        setExerciseTrackerData(data.exerciseTracker);
        setCustomExerciseGoalsData(data.customExerciseWithTotal);
        setIsGettingData(false);
      });
    });
  }, [
    exerciseTrackerDate,
    addExerciseisLoading,
    saveDailyStatus,
    saveMonthlyStatus,
    saveWeeklyStatus,
  ]);
  const resetAllInputs = () => {
    setSelectedID(undefined);
    setExerciseCalories(0);
    setDate("");
    setTime("");
    setExerciseUnit(0);
    setExerciseUnitVal("Steps");
    setExerciseDuration(0);
    setExerciseIntensity(0);
    setExerciseNameInput("");
    setAddNewExBtn(false);
  };

  const submitExercise = async (e: React.FormEvent) => {
    const dateTimeInput = `${date}T${time}:00`;
    const UTCFormat = new Date(dateTimeInput).toISOString();

    e.preventDefault();
    if (
      date == "" ||
      time == "" ||
      (addNewExBtn &&
        !(exerciseUnitList[exerciseUnit] === "Calories") &&
        !(exerciseUnitList[exerciseUnit] === "Minutes") &&
        parseFloat(exerciseUnitVal) == 0) ||
      parseFloat(exerciseCalories) == 0 ||
      parseFloat(exerciseDuration) == 0 ||
      (addNewExBtn && (exerciseNameInput == "" || exerciseUnit === "")) ||
      (!addNewExBtn && customExerciseArr.length == 0)
    ) {
      setEntryError(true);

      return;
    }
    setEntryError(false);

    setaddExerciseisLoading(true);
    const body = {
      id: selectedID,
      entryDateTime: UTCFormat,
      customExerciseId: !addNewExBtn
        ? customExerciseArr[selectedExercise]["id"]
        : "",
      duration: parseFloat(exerciseDuration),
      intensity: intensityLevels[exerciseIntensity],
      calorieBurned: parseFloat(exerciseCalories),
      unitToTrackValue: parseFloat(exerciseUnitVal),
      userId,
      isNewExercise: addNewExBtn,
      addNewExercise: {
        exerciseName: exerciseNameInput,
        unitToTrack: exerciseUnitList[exerciseUnit],
      },
    };
    try {
      await fetch("/api/exercise-tracker/addExercise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((message: any) => {
        toast(`Successfully added Exercise.`, {});
        setOpenModal(false);
        setaddExerciseisLoading(false);
        resetAllInputs();
        // setaddCustomexerciseStatus(0)
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
            Pick date to retrieve the exercises completed for that day
          </div>
          <div className="flex items-center">
            <input
              value={exerciseTrackerDate}
              onChange={(e) => {
                setExerciseTrackerDate(e.target.value);
              }}
              className="rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
              type="date"
            ></input>
            {isGettingData && (
              <>
                <AiOutlineLoading3Quarters className="spinner ml-2 font-semibold text-violet-600" />
              </>
            )}
          </div>
        </div>
      </section>

      <section className="mb-3 mt-3">
        {exerciseTrackerData && (
          <>
            <div className="mb-3 mt-3 flex items-center justify-center text-center text-3xl font-bold text-violet-900">
              <div className="mr-4">Overall Activity</div>
              <FaRunning></FaRunning>
            </div>
            <div>
              <div className="mb-1 font-semibold">
                Pick Exercise to view summary
              </div>
              <select
                className="w-full rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
                onChange={(e) => {
                  setSelectedExerciseGoal(e.target.selectedIndex);
                  setDailyGoal(
                    customExerciseGoalsData[e.target.selectedIndex]["dailyGoal"]
                  );
                  setWeeklyGoal(
                    customExerciseGoalsData[e.target.selectedIndex][
                      "weeklyGoal"
                    ]
                  );
                  setMonthlyGoal(
                    customExerciseGoalsData[e.target.selectedIndex][
                      "monthlyGoal"
                    ]
                  );
                }}
                value={selectedExerciseGoal}
              >
                {customExerciseGoalsData &&
                customExerciseGoalsData.length != 0 ? (
                  customExerciseGoalsData.map((option: any, index: any) => (
                    <option key={option.exerciseName} value={index}>
                      {option.exerciseName} ({option.unitToTrack})
                    </option>
                  ))
                ) : (
                  <option disabled={true}>
                    No custom execrsie. Add new execrsie to track.
                  </option>
                )}
              </select>
            </div>
            {customExerciseGoalsData && customExerciseGoalsData.length != 0 && (
              <div className="mt-2 flex justify-evenly">
                <div>
                  <div className="flex flex-col items-center">
                    <div className="mb-2 text-xl font-bold text-violet-700 ">
                      Total Daily Workout
                    </div>
                    <div className="text-2xl font-semibold text-violet-700">
                      {
                        customExerciseGoalsData[selectedExerciseGoal][
                          "totalDaily"
                        ]
                      }{" "}
                      {
                        customExerciseGoalsData[selectedExerciseGoal][
                          "unitToTrack"
                        ]
                      }
                    </div>
                    <div
                      className={`text-m font-semibold ${
                        customExerciseGoalsData[selectedExerciseGoal][
                          "totalDaily"
                        ] -
                          dailyGoal >
                        0
                          ? "text-green-700 "
                          : "text-red-700 "
                      }`}
                    >
                      {" "}
                      {customExerciseGoalsData[selectedExerciseGoal][
                        "totalDaily"
                      ] -
                        dailyGoal >
                      0
                        ? "+"
                        : "-"}{" "}
                      {Math.round(
                        Math.abs(
                          parseFloat(
                            customExerciseGoalsData[selectedExerciseGoal][
                              "totalDaily"
                            ]
                          ) - dailyGoal
                        ) * 100
                      ) / 100}{" "}
                      {
                        customExerciseGoalsData[selectedExerciseGoal][
                          "unitToTrack"
                        ]
                      }
                    </div>
                  </div>
                  <div className=" flex flex-col items-center">
                    <div className=" my-2 text-xl font-semibold text-violet-700">
                      Daily Goal
                    </div>
                    <div className="mb-2 flex flex-row items-center">
                      <AiOutlineMinus
                        className="text-2xl font-semibold text-violet-700"
                        size={30}
                        onClick={() => {
                          if (dailyGoal < 0) {
                            setDailyGoal(0);
                          }
                          setDailyGoal(Math.round(dailyGoal - 1));
                        }}
                      ></AiOutlineMinus>
                      <div className="mx-5 text-xl font-semibold text-violet-700">
                        <input
                          value={dailyGoal}
                          onChange={(e) => {
                            if (e.target.value == "") {
                              setDailyGoal(0);
                            } else {
                              if (parseFloat(e.target.value) < 9999999) {
                                setDailyGoal(parseFloat(e.target.value));
                              }
                            }
                          }}
                          className="mr-2 w-[100px] rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
                          type="text"
                        ></input>
                        {
                          customExerciseGoalsData[selectedExerciseGoal][
                            "unitToTrack"
                          ]
                        }
                      </div>
                      <AiOutlinePlus
                        className="text-2xl font-semibold text-violet-700"
                        size={30}
                        onClick={() => {
                          if (dailyGoal < 999999) {
                            setDailyGoal(Math.round(dailyGoal + 1));
                          }
                        }}
                      ></AiOutlinePlus>
                    </div>
                    <button
                      className="ease focus:shadow-outline w-full select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none"
                      onClick={(e) => {
                        if (!saveDailyStatus) {
                          setSaveDailyStatus(true);
                          saveDaily(e);
                        }
                      }}
                    >
                      Save Daily Goal
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
                    <div className="mb-2 text-xl font-bold text-violet-700 ">
                      Total Weekly Workout and Goal
                    </div>
                    <div className="text-2xl font-semibold text-violet-700">
                      {
                        customExerciseGoalsData[selectedExerciseGoal][
                          "totalWeekly"
                        ]
                      }{" "}
                      {
                        customExerciseGoalsData[selectedExerciseGoal][
                          "unitToTrack"
                        ]
                      }
                    </div>
                    <div
                      className={`text-m font-semibold ${
                        customExerciseGoalsData[selectedExerciseGoal][
                          "totalWeekly"
                        ] -
                          weeklyGoal >
                        0
                          ? "text-green-700 "
                          : "text-red-700 "
                      }`}
                    >
                      {" "}
                      {customExerciseGoalsData[selectedExerciseGoal][
                        "totalWeekly"
                      ] -
                        weeklyGoal >
                      0
                        ? "+"
                        : "-"}{" "}
                      {Math.round(
                        Math.abs(
                          parseFloat(
                            customExerciseGoalsData[selectedExerciseGoal][
                              "totalWeekly"
                            ]
                          ) - weeklyGoal
                        ) * 100
                      ) / 100}{" "}
                      {
                        customExerciseGoalsData[selectedExerciseGoal][
                          "unitToTrack"
                        ]
                      }
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="my-2 text-xl font-semibold text-violet-700">
                      Weekly Goal
                    </div>
                    <div className="mb-2 flex flex-row items-center">
                      <AiOutlineMinus
                        className="text-2xl font-semibold text-violet-700"
                        size={30}
                        onClick={() => {
                          if (weeklyGoal < 0) {
                            setWeeklyGoal(0);
                          }
                          setWeeklyGoal(Math.round(weeklyGoal - 1));
                        }}
                      ></AiOutlineMinus>
                      <div className="mx-5 text-xl font-semibold text-violet-700">
                        <input
                          value={weeklyGoal}
                          onChange={(e) => {
                            if (e.target.value == "") {
                              setWeeklyGoal(0);
                            } else {
                              if (parseFloat(e.target.value) < 9999999) {
                                setWeeklyGoal(parseFloat(e.target.value));
                              }
                            }
                          }}
                          className="mr-2 w-[100px] rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
                          type="text"
                        ></input>
                        {
                          customExerciseGoalsData[selectedExerciseGoal][
                            "unitToTrack"
                          ]
                        }{" "}
                      </div>
                      <AiOutlinePlus
                        className="text-2xl font-semibold text-violet-700"
                        size={30}
                        onClick={() => {
                          if (weeklyGoal < 999999) {
                            setWeeklyGoal(Math.round(weeklyGoal + 1));
                          }
                        }}
                      ></AiOutlinePlus>
                    </div>
                    <button
                      className="ease focus:shadow-outline w-full select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none"
                      onClick={(e) => {
                        if (!saveWeeklyStatus) {
                          setSaveWeeklyStatus(true);
                          saveWeekly(e);
                        }
                      }}
                    >
                      Save Weekly Goal
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
                <div>
                  <div className="flex flex-col items-center">
                    <div className="mb-2 text-xl font-bold text-violet-700">
                      Total Monthly Workout and Goal
                    </div>
                    <div className="text-2xl font-semibold text-violet-700">
                      {
                        customExerciseGoalsData[selectedExerciseGoal][
                          "totalMonthly"
                        ]
                      }{" "}
                      {
                        customExerciseGoalsData[selectedExerciseGoal][
                          "unitToTrack"
                        ]
                      }
                    </div>
                    <div
                      className={`text-m font-semibold ${
                        customExerciseGoalsData[selectedExerciseGoal][
                          "totalMonthly"
                        ] -
                          monthlyGoal >
                        0
                          ? "text-green-700 "
                          : "text-red-700 "
                      }`}
                    >
                      {" "}
                      {customExerciseGoalsData[selectedExerciseGoal][
                        "totalMonthly"
                      ] -
                        monthlyGoal >
                      0
                        ? "+"
                        : "-"}{" "}
                      {Math.round(
                        Math.abs(
                          parseFloat(
                            customExerciseGoalsData[selectedExerciseGoal][
                              "totalMonthly"
                            ]
                          ) - monthlyGoal
                        ) * 100
                      ) / 100}{" "}
                      {
                        customExerciseGoalsData[selectedExerciseGoal][
                          "unitToTrack"
                        ]
                      }
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="my-2 text-xl font-semibold text-violet-700">
                      Monthly Goal
                    </div>
                    <div className="mb-2 flex flex-row items-center">
                      <AiOutlineMinus
                        className="text-2xl font-semibold text-violet-700"
                        size={30}
                        onClick={() => {
                          if (monthlyGoal < 0) {
                            setMonthlyGoal(0);
                          }
                          setMonthlyGoal(Math.round(monthlyGoal - 1));
                        }}
                      ></AiOutlineMinus>
                      <div className="mx-5 text-xl font-semibold text-violet-700">
                        <input
                          value={monthlyGoal}
                          onChange={(e) => {
                            if (e.target.value == "") {
                              setMonthlyGoal(0);
                            } else {
                              if (parseFloat(e.target.value) < 9999999) {
                                setMonthlyGoal(parseFloat(e.target.value));
                              }
                            }
                          }}
                          className="mr-2 w-[100px] rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
                          type="text"
                        ></input>
                        {
                          customExerciseGoalsData[selectedExerciseGoal][
                            "unitToTrack"
                          ]
                        }{" "}
                      </div>
                      <AiOutlinePlus
                        className="text-2xl font-semibold text-violet-700"
                        size={30}
                        onClick={() => {
                          if (monthlyGoal < 999999) {
                            setMonthlyGoal(Math.round(monthlyGoal + 1));
                          }
                        }}
                      ></AiOutlinePlus>
                    </div>
                    <button
                      className="ease focus:shadow-outline w-full select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none"
                      onClick={(e) => {
                        if (!saveMonthlyStatus) {
                          setSaveMonthlyStatus(true);
                          saveMonthly(e);
                        }
                      }}
                    >
                      Save Monthly Goal
                      {saveMonthlyStatus && (
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
      <section>
        <button
          onClick={(e) => {
            if (!isGettingData) {
              setOpenModal(true);
              setSelectedID(undefined);
              setDate(exerciseTrackerDate);
            }
          }}
          className=" ease focus:shadow-outline mb-2 w-[100%] select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none"
        >
          Add Exercise
        </button>
      </section>
      <section>
        <ExerciseDetailsTable
          setExerciseData={setExerciseTrackerData}
          rows={[
            ...(exerciseTrackerData?.map((exercise: any) => ({
              id: exercise["id"] ?? "",
              entryDateTime: exercise["entryDateTime"] ?? "",
              date: new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }).format(new Date(exercise["entryDateTime"])),
              time: new Intl.DateTimeFormat("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
                timeZoneName: "short",
              }).format(new Date(exercise["entryDateTime"])),
              exerciseName:
                exercise["customExercise"]["exerciseName"] + "" ?? "",
              unit: exercise["customExercise"]["unitToTrack"] ?? "",
              calorieBurned: exercise["calorieBurned"] ?? "",
              duration: exercise["duration"] ?? "",
              intensity: exercise["intensity"] ?? "",
              unitToTrackValue: exercise["unitToTrackValue"] ?? "",
              userId: exercise["userId"] ?? "",
              link: "",
              editFunction: editFunction,
            })) ?? []),
          ]}
        ></ExerciseDetailsTable>
      </section>

      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <section className="">
          <div className="w-100  bg-violet-700 px-4 py-2 text-center text-xl font-bold text-white">
            <div>ADD EXERCISE</div>
            <div
              onClick={(e) => {
                if (!addExerciseisLoading) {
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
              <div className="mb-1 font-semibold">Type of Exercise:</div>
              <div className="flex flex-col items-center">
                <div className="flex w-[100%] items-center justify-center">
                  {addNewExBtn && (
                    <>
                      <button
                        className="ease focus:shadow-outline w-full select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none"
                        onClick={() => {
                          setAddNewExBtn(false);
                        }}
                      >
                        Select Previously Added Execrsie
                      </button>
                    </>
                  )}
                  {!addNewExBtn && (
                    <select
                      className="w-full rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
                      onChange={(e) => {
                        setSelectedExercise(e.target.selectedIndex);
                      }}
                      value={selectedExercise}
                    >
                      {customExerciseArr && customExerciseArr.length != 0 ? (
                        customExerciseArr.map((option, index) => (
                          <option key={option.exerciseName} value={index}>
                            {option.exerciseName} (Tracking Method:{" "}
                            {option.unitToTrack})
                          </option>
                        ))
                      ) : (
                        <option disabled={true}>
                          No Custom Exercise. Add new exercise to track.
                        </option>
                      )}
                    </select>
                  )}
                </div>
                <div className="my-1 flex w-[5%] flex-col items-center justify-center font-semibold">
                  OR
                </div>
                <div className="w-[100%]">
                  {!addNewExBtn && (
                    <>
                      <button
                        className="ease focus:shadow-outline w-full select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none"
                        onClick={() => {
                          setAddNewExBtn(true);
                        }}
                      >
                        Add New Exercise
                      </button>
                    </>
                  )}
                  {addNewExBtn && (
                    <div className="w-full">
                      <div className="mb-1 ">
                        <div className="mb-1 font-semibold">Exercise Name</div>
                        <input
                          value={exerciseNameInput}
                          onChange={(e) => {
                            setExerciseNameInput(e.target.value);
                          }}
                          className="w-full rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
                          type="text"
                        ></input>
                      </div>
                      <div className="mb-1">
                        <div className="mb-1 font-semibold">
                          How would you like to track your exercise?
                        </div>
                        <select
                          className="w-full rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
                          onChange={(e) => {
                            setExerciseUnit(e.target.selectedIndex);
                          }}
                          value={exerciseUnit}
                        >
                          {exerciseUnitList.map((option, index) => (
                            <option key={option} value={index}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="mb-1">
              <div className="mb-1 font-semibold">Minutes:</div>
              <input
                type="number"
                value={exerciseDuration}
                className="rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
                onChange={(e) => setExerciseDuration(e.target.value)}
              />
            </div>
            <div className="mb-1">
              <div className="mb-1 font-semibold">
                Estimated Calories Burned:
              </div>
              <input
                type="number"
                value={exerciseCalories}
                className="rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
                onChange={(e) => setExerciseCalories(e.target.value)}
              />
            </div>
            {addNewExBtn &&
              !(exerciseUnitList[exerciseUnit] === "Calories") &&
              !(exerciseUnitList[exerciseUnit] === "Minutes") && (
                <div className="mb-1">
                  <div className="mb-1 font-semibold">
                    Number of {exerciseUnitList[exerciseUnit]}:
                  </div>
                  <input
                    type="number"
                    value={exerciseUnitVal}
                    className="rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
                    onChange={(e) => setExerciseUnitVal(e.target.value)}
                  />
                </div>
              )}
            {!addNewExBtn &&
              customExerciseArr[selectedExercise] &&
              !(
                customExerciseArr[selectedExercise]["unitToTrack"] ===
                "Calories"
              ) &&
              !(
                customExerciseArr[selectedExercise]["unitToTrack"] === "Minutes"
              ) && (
                <div className="mb-1">
                  <div className="mb-1 font-semibold">
                    Number of{" "}
                    {customExerciseArr[selectedExercise]["unitToTrack"]}:
                  </div>
                  <input
                    type="number"
                    value={exerciseUnitVal}
                    className="rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
                    onChange={(e) => setExerciseUnitVal(e.target.value)}
                  />
                </div>
              )}

            <div className="mb-1">
              <div className="mb-1 font-semibold">Intensity Level</div>
              <select
                className=" rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
                onChange={(e) => {
                  setExerciseIntensity(e.target.selectedIndex);
                }}
                value={exerciseIntensity}
              >
                {intensityLevels.map((option, index) => (
                  <option key={option} value={index}>
                    {option}
                  </option>
                ))}
              </select>
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
          </div>
          <div className="flex w-full py-2">
            <button
              onClick={(e) => {
                submitExercise(e);
              }}
              className="ease focus:shadow-outline mx-2 my-2 w-[100%] select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none"
            >
              Add Exercise
              {addExerciseisLoading && (
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
export default ExerciseTracker;
