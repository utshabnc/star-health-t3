import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { toTitleCase } from "../../utils";
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
      <section className="modal-main rounded-lg ">{children}</section>
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
  const userId = session?.user?.id || "cllxyib7m0000lf08kqeao8nj";
  const [searchStr, setSearchStr] = useState<any>("");
  const [currentDrug, setCurrentDrug] = useState<any>();
  const [drugList, setDrugList] = useState<any>([]);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [drugLogList, setDrugLogList] = useState<any[]>([]);
  const [isGettingData, setIsGettingData] = useState<boolean>(false);
  const [errorEntry, setErrorEntry] = useState<boolean>(false);
  const [date, setDate] = useState<any>(new Date().toISOString().split("T")[0]);
  useEffect(() => {
    if (searchStr.length >= 3) {
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
          setDrugLogList(data["drug"]);
          setIsGettingData(false);
        });
      });
    } catch (error) {
      console.error("An error occurred while submitting the form", error);
      setIsGettingData(false);
    }
  }, [date]);
  const submitDrug = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentDrug) {
      setErrorEntry(true);
      return;
    }
    const body = {
      spl_id: currentDrug["id"],
      brand_name: currentDrug["name"],
      manufacturer_name: currentDrug["manufacturer_name"],
      dosge_descrip: currentDrug["dosage"],
      userId: userId,
    };
    console.log(body);
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
        setCurrentDrug(undefined);
      });
    } catch (error) {
      setErrorEntry(true);
      console.error("An error occurred while submitting the form", error);
    }
    console.log(currentDrug);
    setIsAdding(false);
  };
  return (
    <>
      <section>
        {errorEntry && (
          <div className="text-red-700">Medication not selected</div>
        )}
        <div className="mb-1 mt-1 font-semibold">
          Write name of drug to add to your journal to keep record of it
        </div>
        <FoodAutocompleteInput
          expr={searchStr}
          setExpr={setSearchStr}
          options={drugList}
          setFoodItem={setCurrentDrug}
        ></FoodAutocompleteInput>
        {currentDrug && (
          <div className="m-3 rounded-lg bg-white bg-white p-2 shadow-lg">
            <div className="font-bold text-violet-900">Selected Medicaton</div>
            <div>
              <div className="font-semibold text-violet-900">Brand Name:</div>
              <div className=" text-violet-700">{currentDrug["name"]}</div>
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
              <div className="font-semibold text-violet-900">
                Dosage Description:
              </div>
              <div className=" text-violet-700">{currentDrug["dosage"]}</div>
            </div>
          </div>
        )}
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
      </section>
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
                <AiOutlineLoading3Quarters className="spinner font-semibold text-violet-600" />
              </>
            )}
          </div>
        </div>
      </section>
      <section>
        <DrugDetailsTable date={date} rows={drugLogList}></DrugDetailsTable>
      </section>
    </>
  );
};
export default DrugJournal;
