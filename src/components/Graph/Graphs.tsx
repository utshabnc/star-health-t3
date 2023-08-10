import { useState, useEffect } from "react";
import { drugTypes } from "../../utils";
import UnitedStatesHeatmap from "../charts/UnitedStatesHeatmap";
import Dropdown from "../Dropdown";
import { useRouter } from 'next/router';
import _ from "lodash";
import { trpc } from "../../utils/trpc";
import LoadingStarHealth from "../Loading";
import { Tab } from "../../utils/Enums/Tab.enum";
import { PayWall } from "../PayWall/PayWall";
import MultiSelect from 'multiselect-react-dropdown';
import { labelStyle, diseaseStyle, genesStyle, labelContainer, conditionStyle } from "./style";

const Graphs = () => {
  const [drugType, setDrugType] = useState<string>();
  const { data: allStates } = trpc.db.allStates.useQuery({ drugType });
  const navigate = useRouter();
  const [selectedTab, setSelectedTab] = useState<Tab>(Tab.PaymentsToDoctors);
  const [diseasesList, setDiseasesList] = useState<Array<{
    url: any;title: { _text: string}
}>>([]);
  const [filteredDisease, setFilteredDisease] = useState<string>('');
  const [removedDisease, setRemovedDisease] = useState<string>('');
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    fetch("/api/genetics/getAll")
    .then(async (response) => {

      const data = await response.json();
      const diseases = data["topic"].filter(
        (topic: any) => topic["title"]["_text"] == "Conditions"
      )[0]["topics"]["topic"];
      setDiseasesList(diseases);

      console.log(`Diseases Loaded`);
      console.log(diseases);
      

    });

  }, [])

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
                id="graphLauncher"
                onClick={
                  () => {
                    setSelectedTab(Tab.DiseasesAndGenetics);
                    setLoading(true);
                  }
                }
                className={`border-b-2 hover:border-zinc-500 ${
                  selectedTab === Tab.DiseasesAndGenetics
                    ? "border-violet-600"
                    : "border-zinc-200"
                }`}
              >
                Diseases & Genetics
              </button>
            </div>
          </div>
          <div className="my-1">
            <hr />
          </div>
          <div style={{ display: `${ selectedTab === Tab.PaymentsToDoctors ? 'block' : 'none' }` }}>
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
          <nav 
            id="diseaseFilterContainer"
            style={{ display: `${ selectedTab === Tab.DiseasesAndGenetics ? 'block' : 'none' }` }}
            >
              Disease Filter: 
                <MultiSelect 
                  options={diseasesList.slice(1).map((disease) => ({
                    link: disease?.url?._text,
                    name: _.capitalize(disease?.title?._text),
                  }))}
                  displayValue="name"
                  showCheckbox={true}
                  onSelect={(list, selItem) => setFilteredDisease(selItem.link)}
                  onRemove={(list, remItem) => {
                    const name = remItem.link.toString().split('/');
                    setRemovedDisease(name[name.length - 1])
                  }}
                  placeholder="Select the Disease"
                  selectedValues={[]}
                />
                <div 
                  id="graphUpdateLoaderContainer"
                  style={{
                    width: '80%',
                    marginLeft: '10.5%',
                    textAlign: 'center',
                  }}
                  >
                  <span 
                      id="graphUpdateLoader" style={{display: 'none'}} 
                      className="loader">Loading</span>
                </div>
                <span id="filteredDisease" style={{display: 'none'}}>{filteredDisease}</span>
                <span id="removedDisease" style={{display: 'none'}}>{removedDisease}</span>
              </nav>
        </div>
        
      </div>
      <div style={{ height: '100%' }}>
        <PayWall />
        <div id="initialLoadingSpinner">
          <LoadingStarHealth />
        </div>
        <div id="headMapPlaceholder" style={{ display: 'none' }}>
          {selectedTab == Tab.PaymentsToDoctors &&
            <div className="w-1/2 m-auto relative">
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
          }
        </div>
          
        {selectedTab == Tab.DiseasesAndGenetics &&
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            height: '100%'
          }}>
            <div id="graphMenu" style={{
              width: '19%',
              height: '100%',
              paddingRight: '5px'
            }}>
              <p>Legend:</p>
              <div style={labelContainer}>
                <div style={{...labelStyle, ...diseaseStyle, float: 'left'}}></div> &nbsp;Disease
              </div>  
              <div style={labelContainer}>
                <span style={{...labelStyle, ...genesStyle, float: 'left'}}></span> &nbsp;Chromosome/Genes
              </div>  
              <div style={labelContainer}>
                <span style={{...labelStyle, ...conditionStyle, float: 'left'}}></span> &nbsp;Related Conditions
              </div>
            </div>
              
            <div id="graphPlaceholder" style={{
              width: '80%',
              height: '100%',
              borderLeft: '1px solid #444444'
            }}>
            </div>
          </div>
        }
        <div id="domLoading" style={{display: 'none'}}>
          <LoadingStarHealth />
        </div>
      </div>
    </div>
  );
};
export default Graphs;
