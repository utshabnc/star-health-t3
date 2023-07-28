import { useState } from "react";
import { drugTypes } from "../utils";
import UnitedStatesHeatmap from "./charts/UnitedStatesHeatmap";
import Dropdown from "./Dropdown";
import { useRouter } from 'next/router';
import _ from "lodash";
import { trpc } from "../utils/trpc";
import LoadingStarHealth from "./Loading";
import { Tab } from "../utils/Enums/Tab.enum";
import { PayWall } from "./PayWall/PayWall";

const Graphs = () => {
  const [drugType, setDrugType] = useState<string>();
  const { data: allStates } = trpc.db.allStates.useQuery({ drugType });
  const navigate = useRouter();
  const [selectedTab, setSelectedTab] = useState<Tab>(Tab.PaymentsToDoctors);


  if (!allStates) {
    return (
      <LoadingStarHealth />
    );
  }

  return (
    <div className="bg-white p-5 pb-44 w-full h-full">
      <div className="flex flex-row">
        <div>
          <button
            onClick={navigate.back}
            className="ease focus:shadow-outline select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </button>
        </div>
        <div className="flex w-full flex-col justify-end px-8 pb-10">
          <div className="flex justify-between">
            <p className="flex text-2xl font-semibold text-violet-700">
              StarHealth Data Visualization
            </p>
            <div className="flex gap-2">
              {/* Map tab */}
              <button
                onClick={() => setSelectedTab(Tab.PaymentsToDoctors)}
                className={`border-b-2 hover:border-zinc-500 ${
                  selectedTab === Tab.PaymentsToDoctors
                    ? "border-violet-600"
                    : "border-zinc-200"
                }`}
              >
                Company Payments to Doctors
              </button>
            </div>
            <div className="flex gap-2">
              {/* Diseases and Genetics tab */}
              <button
                onClick={() => setSelectedTab(Tab.DiseasesAndGenetics)}
                className={`border-b-2 hover:border-zinc-500 ${
                  selectedTab === Tab.DiseasesAndGenetics
                    ? "border-violet-600"
                    : "border-zinc-200"
                }`}
              >
                Deseases & Genetics
              </button>
            </div>
          </div>
          <div className="my-1">
            <hr />
          </div>
          <Dropdown
            items={drugTypes.map((type) => ({
              value: type,
              label: _.capitalize(type),
            }))}
            label={"Filter Map By Drug Type"}
            value={drugType}
            placeholder={"All"}
            onChange={setDrugType}
          />
        </div>
      </div>
      <div className="w-1/2 m-auto relative">
        <PayWall />
        {selectedTab == Tab.PaymentsToDoctors &&
          <UnitedStatesHeatmap
            data={
              allStates
                ?.sort((a, b) => b.totalAmount - a.totalAmount)
                .slice(0, 50)
                .map((rec: { stateId: any; totalAmount: any }) => ({
                  state: rec.stateId,
                  value: rec.totalAmount,
                })) ?? []
            }
          />
        }
        {selectedTab == Tab.DiseasesAndGenetics &&
          <div>
            This is the Graph Visualization placeholder
            to hold Diseases and Genesis Graph
          </div>
        }
      </div>
    </div>
  );
};
export default Graphs;
