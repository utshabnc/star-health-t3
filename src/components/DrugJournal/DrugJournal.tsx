import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { drugTypes, toTitleCase } from "../../utils";
import FoodAutocompleteInput from "../FoodAutoCompleteInput";
import FoodDetailsTable from "../FoodDetailsTable";
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
import DrugDetailsTable from "../DrugDetailTable";
import { setWeekYearWithOptions } from "date-fns/fp";

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
      <section className="modal-drug rounded-lg ">{children}</section>
    </div>
  );
};
const DrugJournal: React.FC = () => {
  const getFormattedCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const { data: session, status } = useSession();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const userId = session?.user?.id || "cllxyib7m0000lf08kqeao8nj";
  const [searchStr, setSearchStr] = useState<any>("");
  const [currentDrug, setCurrentDrug] = useState<any>();
  const [drugList, setDrugList] = useState<any>([]);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [drugLogList, setDrugLogList] = useState<any[]>([]);
  const [isGettingData, setIsGettingData] = useState<boolean>(false);
  const [errorEntry, setErrorEntry] = useState<boolean>(false);
  const [date, setDate] = useState<any>(new Date().toISOString().split("T")[0]);
  const [addNewDrugBtn, setAddNewDrugBtn] = useState<boolean>(false);

  const [drugPrevList, setDrugPrevList] = useState<any>([]);
  const [selectedPrevDrug, setSelectedPrevDrug] = useState<any>(0);

  const [dosageAmount, setDosageAmount] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [time, setTime] = useState("");
  const [sideEffectFlt, setSideEffectFlt] = useState("");
  const [editID, setEditId] = useState();
  useEffect(() => {
    try {
      fetch(`/api/drugJournal/getAllDrugs/?userId=${userId}`).then(
        (response) => {
          response.json().then((data) => {
            if (response.status == 500) {
              setDrugPrevList([]);
            } else {
              setDrugPrevList(data["drugList"]);
            }
          });
        }
      );
    } catch (error) {
      setDrugPrevList([]);
    }
  }, [isAdding]);
  useEffect(() => {
    if (searchStr.length >= 1) {
      const delayDebounceFn = setTimeout(() => {
        try {
          fetch(`/api/drugs/search?exp=${searchStr}`).then((response) => {
            response.json().then((data) => {
              if (response.status == 500) {
                setDrugList([]);
              } else {
                setDrugList(data["drugs"]);
              }
            });
          });
        } catch (error) {
          setDrugList([]);
        }
      }, 250);
      return () => clearTimeout(delayDebounceFn);
    } else {
    }
  }, [searchStr]);

  useEffect(() => {
    try {
      setIsGettingData(true);
      fetch(
        `/api/drugJournal/getDrugLogByDate/?userId=${userId}&date=${date}`
      ).then((response) => {
        response.json().then((data) => {
          setDrugLogList(data["drug"] ? data["drug"] : []);
          setIsGettingData(false);
        });
      });
    } catch (error) {
      console.error("An error occurred while submitting the form", error);
      setIsGettingData(false);
    }
  }, [date, openModal]);
  const editFunction = (drug: any) => {
    setErrorEntry(false);
    setOpenModal(true);
    setAddNewDrugBtn(false);
    setDosageAmount(drug["amount"] + "");
    const d = drug["dateTimeOfLog"].split("T");
    console.log(d);
    setDateInput(d[0]);
    setTime(d[1].slice(0, -8));
    setSideEffectFlt(drug["sideEffectFelt"]);
    setEditId(drug["id"]);
    for (let i = 0; i < drugPrevList.length; i++) {
      if (drugPrevList[i]["brand_name"] == drug["drug"]["brand_name"]) {
        setSelectedPrevDrug(i);
        setCurrentDrug(drug["drug"]);
        break; // Stop the loop once a match is found
      }
    }
    setSearchStr("");
  };

  const resetAllInputs = () => {
    setAddNewDrugBtn(false);
    setDosageAmount("");
    setDateInput(date);
    setTime("");
    setSideEffectFlt("");
    setCurrentDrug(null);
    setSelectedPrevDrug(0);
    setErrorEntry(false);
    setSearchStr("");
  };

  const submitDrug = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      date == "" ||
      time == "" ||
      parseFloat(dosageAmount) == 0 ||
      !currentDrug
    ) {
      setErrorEntry(true);
      return;
    }
    const dateTimeInput = `${dateInput}T${time}:00`;
    const body = {
      id: editID ? editID : null,
      isNewDrug: addNewDrugBtn,
      dosageAmount: parseInt(dosageAmount),
      sideEffect: sideEffectFlt,
      spl_id: currentDrug["id"],
      dateTimeInput: dateTimeInput,
      brand_name: currentDrug["name"],
      manufacturer_name: currentDrug["manufacturer_name"],
      dosge_descrip: currentDrug["dosage"],
      selectedPrevDrug: !addNewDrugBtn
        ? drugPrevList[selectedPrevDrug]["id"]
        : 0,
      userId: userId,
    };
    try {
      setIsAdding(true);
      setErrorEntry(false);
      await fetch("/api/drugJournal/addDrug", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((message: any) => {
        toast(`Successfully added Drug item.`, {});
        setSearchStr("");
        setDate(date);
        setOpenModal(false);
      });
    } catch (error) {
      setErrorEntry(true);
      console.error("An error occurred while submitting the form", error);
    }
    setIsAdding(false);
  };
  return (
    <>
      <section>
        <div className="mb-2">
          <div className="mb-1 font-semibold">
            Pick date to retrieve the Food Journal for that day
          </div>
          <div className="flex items-center">
            <input
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              className="rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
              type="date"
            ></input>
            {isGettingData && (
              <>

                <AiOutlineLoading3Quarters className="spinner  ml-2  font-semibold text-violet-600" />
              </>
            )}
          </div>
        </div>
        <div>
          <button
            onClick={(e) => {
              resetAllInputs();
              setOpenModal(true);
            }}
            className=" ease focus:shadow-outline mb-2 mt-2 w-[100%] select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none"
          >
            Add Medication
          </button>
        </div>
        <Modal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
          }}
        >
          <section className="">
            <div>
              <div className="w-100  bg-violet-700 px-4 py-2 text-center text-xl font-bold text-white">
                <div>Add Medication</div>
                <div
                  onClick={(e) => {
                    setOpenModal(false);
                  }}
                  className="closeFoodModal mr-2 mt-3 justify-end bg-violet-700"
                >
                  <AiOutlineClose size={25} color="white"></AiOutlineClose>
                </div>
              </div>
              {errorEntry && (
                <div className="ml-2 text-red-700">Invalid input</div>
              )}
              <div className="flex p-2">
                <div className="w-[50%]">
                  <div className="flex flex-col items-center">
                    {!addNewDrugBtn && (
                      <div className="w-[100%] ">
                        <div className="mb-1 mt-1 font-semibold">
                          Select Previously Added Drug:
                        </div>
                        <select
                          className="w-full rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
                          onChange={(e) => {
                            setSelectedPrevDrug(e.target.selectedIndex);
                            setCurrentDrug(
                              drugPrevList[e.target.selectedIndex]
                            );
                          }}
                          value={selectedPrevDrug}
                        >
                          {drugPrevList && drugPrevList.length != 0 ? (
                            drugPrevList.map((option: any, index: any) => (
                              <option key={option.brand_name} value={index}>
                                {option.brand_name}
                              </option>
                            ))
                          ) : (
                            <option disabled={true}>
                              No drugs previously added. Add new drug to track.
                            </option>
                          )}
                        </select>
                      </div>
                    )}
                    {addNewDrugBtn && (
                      <div className="w-[100%]">
                        <button
                          className="ease focus:shadow-outline w-full select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none"
                          onClick={() => {
                            setAddNewDrugBtn(false);
                            setCurrentDrug(null);
                          }}
                        >
                          Select Previously Added Drug
                        </button>
                      </div>
                    )}
                    <div className="my-1 flex w-[5%] items-center justify-center font-semibold">
                      OR
                    </div>{" "}
                    {!addNewDrugBtn && (
                      <div className="w-[100%]">
                        <button
                          className="ease focus:shadow-outline w-full select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none"
                          onClick={() => {
                            setAddNewDrugBtn(true);
                            setCurrentDrug(null);
                          }}
                        >
                          Add new Drug
                        </button>
                      </div>
                    )}
                    {addNewDrugBtn && (
                      <div className="w-[100%]">
                        <div className="mb-1 mt-1 font-semibold">
                          Write name of drug to add to your journal to keep
                          record of it
                        </div>
                        <FoodAutocompleteInput
                          expr={searchStr}
                          setExpr={setSearchStr}
                          options={drugList}
                          setFoodItem={setCurrentDrug}
                        ></FoodAutocompleteInput>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="mb-1">
                      <div className="mb-1 font-semibold">Dosage Amount:</div>
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
                        value={dateInput}
                        className="rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
                        onChange={(e) => setDateInput(e.target.value)}
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
                      <div className="mb-1 font-semibold">
                        Any Side Effect Felt:
                      </div>
                      <textarea
                        cols={10}
                        value={sideEffectFlt}
                        maxLength={200}
                        className="w-[100%] rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
                        onChange={(e) => setSideEffectFlt(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="mx-3 ml-2 w-[50%] rounded-lg bg-white bg-white p-2 shadow-lg">
                  <div className="font-bold text-violet-900">
                    Selected Medicaton
                  </div>
                  {currentDrug && (
                    <>
                      <div>
                        <div className="font-semibold text-violet-900">
                          Brand Name:
                        </div>
                        <div className=" text-violet-700">
                          {currentDrug["name"]
                            ? currentDrug["name"]
                            : currentDrug["brand_name"]}
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-violet-900">
                          Manufacturer Name:
                        </div>
                        <div className=" text-violet-700">
                          {currentDrug["manufacturer_name"]}
                        </div>
                      </div>
                      <div>
                        <div className=" font-semibold text-violet-900">
                          Dosage Description:
                        </div>
                        <div className="h-[200px] overflow-y-auto text-violet-700">
                          {currentDrug["dosage"]
                            ? currentDrug["dosage"]
                            : currentDrug["dosge_descrip"]}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="flex w-full px-2 py-2">
                <button
                  onClick={(e) => {
                    if (!isAdding) {
                      setIsAdding(false);
                      submitDrug(e);
                    }
                  }}
                  className=" ease focus:shadow-outline mb-2 mt-2 w-[100%] select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none"
                >
                  Add Medication
                  {isAdding && (
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
          </section>
        </Modal>
      </section>
      <section>
        <DrugDetailsTable
          editFunction={editFunction}
          date={date}
          rows={drugLogList}
        ></DrugDetailsTable>
      </section>
    </>
  );
};
export default DrugJournal;
