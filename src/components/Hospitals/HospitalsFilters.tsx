import { Dispatch, SetStateAction, useMemo} from "react";
import { useEffect, useState } from "react";
import type { Hospital } from "./Hospital.model";
import Image from "next/image";

import { toTitleCase } from "../../utils";
import cbi from '../../assets/logos/community-benefits.png';
import AutocompleteInput from "../AutoCompleteInput";
interface HospitalsFiltersProps {
  params: {
    state?: string;
    name?: string;
    hospitalsData?: Hospital[];
    setHospitalsData: Dispatch<SetStateAction<Hospital[]>>;
    setIsApiProcessing: Dispatch<SetStateAction<boolean>>;
  };
}

export default function HospitalsFilters({ params }: HospitalsFiltersProps) {
  const { hospitalsData, setHospitalsData, setIsApiProcessing } = params;

  const allStates: string[] = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  const [cities, setCities] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState("");
  const [searchStr, setSearchStr] = useState("");
  const [dataIsAvailable, setDataIsAvailable] = useState(false);
  const [error, setError] = useState<any>("");
  // const [hospitalIds, setHospitalIds] = useState<string[]>([]);

  useEffect(() => {
    if (hospitalsData && hospitalsData.length > 1) {
      setDataIsAvailable(true);
    }
  }, [hospitalsData])

  useEffect(() => {
    if (searchStr) {
      const delayDebounceFn = setTimeout(() => {
        setIsApiProcessing(true);
        fetchAllHospitals()
          .then(allHospitalData => {
            const matchedHospitals = allHospitalData.filter(hospital =>
              hospital.name.toLowerCase().includes(searchStr.toLowerCase())
            );
  
            setHospitalsData(matchedHospitals);
            setIsApiProcessing(false);
          })
          .catch(error => {
            setError(error);
            setIsApiProcessing(false);
          })
      }, 3000)

      return () => clearTimeout(delayDebounceFn)
    }
  }, [searchStr])

  const fetchDataByState = async (state: string): Promise<Hospital[]> => {
    const response = await fetch(`/api/hospitals/getByState?state=${state}`);
    const data = await response.json();
    return data.hospitals;
  };
  
  const fetchAllHospitals = async (): Promise<Hospital[]> => {
    const response = await fetch(`/api/hospitals/getAll`);
    const data = await response.json();
    return data.hospitals;
  }

  const onSelectState = async (state: string) => {
    setSelectedState(state);

    try {
      setIsApiProcessing(true);
      const hospitalDataByState = await fetchDataByState(state);
      setHospitalsData(hospitalDataByState);
      setIsApiProcessing(false);

      // 2. Generate the cities array for that state (for the dropdown)
      const cities = new Set<string>();
      for (const hospital of hospitalDataByState) {
        if (hospital.state === state) {
          cities.add(hospital.city);
        }
      }
      // Sort cities alphabetically
      setCities(Array.from(cities).sort((a, b) => (a < b ? -1 : 1)));

    } catch (error) {
      setIsApiProcessing(false);
      setError(error);
    }

  };

  const onSelectCity = async (city: string) => {
    try {
      setIsApiProcessing(true);
      const hospitalDataByState = await fetchDataByState(selectedState);
      const hospitalDataByCity = hospitalDataByState.filter(
        (hospital: Hospital) =>
          hospital.city.toLowerCase() === city.toLowerCase()
      );
      setHospitalsData(hospitalDataByCity);
      setIsApiProcessing(false);
    } catch (error) {
      setIsApiProcessing(false);
      setError(error);
    }
  };
  
  const onSelectHospitalId = async (hospitalId: string) => {
    // Clear State and City when hospitalId is selected
    setSelectedState("");

    try {
      setIsApiProcessing(true);
      const allHospitalData = await fetchAllHospitals();
      const hospitalDataById = allHospitalData.filter(
        (hospital: Hospital) =>
          hospital.hospital_id.toLowerCase() === hospitalId.toLowerCase()
      );
      setHospitalsData(hospitalDataById);
      setIsApiProcessing(false);
    } catch (error) {
      setIsApiProcessing(false);
      setError(error);
    }
  };

  const returnHospitalsNames =(list:any[])=>{
    var output = []
    if ( list === undefined)
    {
      return[]
    }
    list.forEach((element:any) => {
      output.push(toTitleCase((element.name).toLowerCase()))
    });
    return output
  }
  const hospitalIds = useMemo(() => {
    if (dataIsAvailable)
      return hospitalsData?.map(hospital => hospital.hospital_id)
    }, [dataIsAvailable]); 

  return (
    <>
      <div className="w-full">
        <div>
          <div className="filters flex w-full items-center">
            <p className="my-2 w-20 text-lg text-violet-700">Filter By:</p>
            <div className="wrap-filters flex w-full items-center py-2">
              <select
                title="State"
                className="my-2 mr-5 w-[20%] cursor-pointer rounded-lg bg-violet-500 p-1 text-white hover:bg-violet-400 hover:text-violet-900"
                onChange={(e) => onSelectState(e.target.value)}
                placeholder="Issuer"
              >
                <option selected disabled value="">
                  State
                </option>
                {allStates?.map((item, index: number) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <select
                className="my-2 mr-5 w-[20%] cursor-pointer rounded-lg bg-violet-500 p-1 text-white hover:bg-violet-400 hover:text-violet-900"
                onChange={(e) => onSelectCity(e.target.value)}
                placeholder="Issuer"
              >
                <option selected disabled value="">
                  City
                </option>
                {cities?.map((item, index: number) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <select
                className="my-2 mr-5 w-[20%] cursor-pointer rounded-lg bg-violet-500 p-1 text-white hover:bg-violet-400 hover:text-violet-900"
                onChange={(e) => onSelectHospitalId(e.target.value)}
                placeholder="Issuer"
              >
                <option selected disabled value="">
                  Hospital ID
                </option>
                {hospitalIds?.map((hospitalId, index: number) => (
                  <option key={index} value={hospitalId}>
                    {hospitalId}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="my-1">
            <hr />
          </div>
          <p className="p-1 text-xs font-semibold text-violet-900">
            Search for hospitals
          </p>
          <div className="flex justify-between w-[100%] items-center gap-3">
          <AutocompleteInput expr={searchStr} setExpr={setSearchStr} options={returnHospitalsNames(hospitalsData?hospitalsData:[])}></AutocompleteInput>

            <Image
              src={cbi}
              alt=""
              width={128}
              height={128}
              className="bottom-0 right-0 object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
}
