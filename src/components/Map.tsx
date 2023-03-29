import { useState } from "react";
import { drugTypes } from "../utils";
import UnitedStatesHeatmap from "./charts/UnitedStatesHeatmap";
import Dropdown from "./Dropdown";
import _ from "lodash";
import { trpc } from "../utils/trpc";

const Map = () => {
  const [drugType, setDrugType] = useState<string>();
  const { data: allStates } = trpc.db.allStates.useQuery({ drugType });

  return (
    <div className="flex flex-col sm:w-[50%]">
      <div className="h-[100%] w-[100%]">
        <h3 className="text-md mb-6 flex justify-center text-center font-custom font-semibold text-white sm:mt-4 sm:text-xl">
          Heatmap of Company Payments to Doctors
        </h3>
        <div className="mb-4">
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
        <div className="ml-20 h-[80%] w-[80%]">
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
        </div>
      </div>
    </div>
  );
};
export default Map;
