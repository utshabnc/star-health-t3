import { Dispatch, SetStateAction, useMemo} from "react";
import { useEffect, useState } from "react";
import type { OpioidTreatmentProvider } from "./OpioidTreatmentProvider.model";
import Image from "next/image";

import cms from "../../assets/logos/cms.png";

interface OpioidTreatmentProvidersFiltersProps {
  params: {
    opioidTreatmentProvidersData?: OpioidTreatmentProvider[];
    setOpioidTreatmentProvidersData: Dispatch<SetStateAction<OpioidTreatmentProvider[]>>;
    setIsApiProcessing: Dispatch<SetStateAction<boolean>>;
  };
}

export default function OpioidTreatmentProvidersFilters({ params }: OpioidTreatmentProvidersFiltersProps) {
  const { opioidTreatmentProvidersData, setOpioidTreatmentProvidersData, setIsApiProcessing } = params;

  const allZipCodes: string[] = []
  
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
  // const [OpioidTreatmentProviderIds, setOpioidTreatmentProviderIds] = useState<string[]>([]);

  useEffect(() => {
    if (opioidTreatmentProvidersData && opioidTreatmentProvidersData.length > 1) {
      setDataIsAvailable(true);
    }
  }, [opioidTreatmentProvidersData])


  useEffect(() => {
    if (searchStr) {
      const delayDebounceFn = setTimeout(() => {
        const filteredData = opioidTreatmentProvidersData?.filter((opioidTreatmentProvider: OpioidTreatmentProvider) => {
          return (
            opioidTreatmentProvider.provider_name?.toLowerCase().includes(searchStr.toLowerCase())
          );
        });
        setOpioidTreatmentProvidersData(filteredData || []);
      }, 250);
      return () => clearTimeout(delayDebounceFn);
    } else {
      setOpioidTreatmentProvidersData(opioidTreatmentProvidersData || []);
    }
  }, [searchStr]);

  // useEffect(() => {
  //   if (searchStr) {
  //     const delayDebounceFn = setTimeout(() => {
  //       setIsApiProcessing(true);
  //       fetchAllOpioidTreatmentProviders()
  //         .then(allOpioidTreatmentProviderData => {
  //           const matchedOpioidTreatmentProviders = allOpioidTreatmentProviderData.filter(opioidTreatmentProvider =>
  //             opioidTreatmentProvider.provider_name.toLowerCase().includes(searchStr.toLowerCase())
  //           );
  
  //           setOpioidTreatmentProvidersData(matchedOpioidTreatmentProviders);
  //           setIsApiProcessing(false);
  //         })
  //         .catch(error => {
  //           setError(error);
  //           setIsApiProcessing(false);
  //         })
  //     }, 3000)

  //     return () => clearTimeout(delayDebounceFn)
  //   }
  // }, [searchStr])

  const fetchDataByState = async (state: string): Promise<OpioidTreatmentProvider[]> => {
    const response = await fetch(`/api/opioid-treatment-providers/getByState?state=${state}`);
    const data = await response.json();
    return data.opioidTreatmentProviders;
  };
  
  const fetchAllOpioidTreatmentProviders = async (): Promise<OpioidTreatmentProvider[]> => {
    const response = await fetch(`/api/opioid-treatment-providers/getAll`);
    const data = await response.json();
    return data.opioidTreatmentProviders;
  }

  const onSelectState = async (state: string) => {
    setSelectedState(state);

    try {
      setIsApiProcessing(true);
      const opioidTreatmentProviderDataByState = await fetchDataByState(state);
      setOpioidTreatmentProvidersData(opioidTreatmentProviderDataByState);
      setIsApiProcessing(false);

      // 2. Generate the cities array for that state (for the dropdown)
      const cities = new Set<string>();
      for (const opioidTreatmentProvider of opioidTreatmentProviderDataByState) {
        if (opioidTreatmentProvider.state === state) {
          cities.add(opioidTreatmentProvider.city?.toLowerCase() || "");
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
      const opioidTreatmentProviderDataByState = await fetchDataByState(selectedState);
      const opioidTreatmentProviderDataByCity = opioidTreatmentProviderDataByState.filter(
        (opioidTreatmentProviders: OpioidTreatmentProvider) =>
        opioidTreatmentProviders.city?.toLowerCase() === city.toLowerCase()
      );
      setOpioidTreatmentProvidersData(opioidTreatmentProviderDataByCity);
      setIsApiProcessing(false);
    } catch (error) {
      setIsApiProcessing(false);
      setError(error);
    }
  };
  
  const onSelectOpioidTreatmentProviderId = async (opioidTreatmentProviderId: string) => {
    // Clear State and City when opioidTreatmentProviderId is selected
    setSelectedState("");

    try {
      setIsApiProcessing(true);
      const allOpioidTreatmentProviderData = await fetchAllOpioidTreatmentProviders();
      const OpioidTreatmentProviderDataById = allOpioidTreatmentProviderData.filter(
        (opioidTreatmentProvider: OpioidTreatmentProvider) =>
        opioidTreatmentProvider.id?.toLowerCase() === opioidTreatmentProviderId.toLowerCase()
      );
      setOpioidTreatmentProvidersData(OpioidTreatmentProviderDataById);
      setIsApiProcessing(false);
    } catch (error) {
      setIsApiProcessing(false);
      setError(error);
    }
  };


  const opioidTreatmentProviderIds = useMemo(() => {
    if (dataIsAvailable)
      return opioidTreatmentProvidersData?.map(opioidTreatmentProviderIds => opioidTreatmentProviderIds.id)
    }, [dataIsAvailable]); 

  return (
    <>
      <div className="w-full">
        <div>
          <div className="filters flex w-full items-center">
            <p className="my-2 w-20 text-lg text-violet-700">Filter By:</p>
            <div className="wrap-filters flex w-full items-center py-2">
            <select
                title="Zip Code"
                className="my-2 mr-5 w-[20%] cursor-pointer rounded-lg bg-violet-500 p-1 text-white hover:bg-violet-400 hover:text-violet-900"
                // onChange={(e) => onSelectZipCode(e.target.value)}
                placeholder="Issuer"
              >
                <option selected disabled value="">
                  Zip Code
                </option>
                {allZipCodes?.map((item, index: number) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>

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
            </div>
          </div>
          <div className="my-1">
            <hr />
          </div>
          <p className="p-1 text-xs font-semibold text-violet-900">
            Search for Opioid Treatment Providers
          </p>
          <div className="flex justify-between w-[100%] items-center gap-3">
            <input
              type="text"
              placeholder="Search"
              className="mx-1 my-2 w-[30%] cursor-pointer rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
              value={searchStr}
              onChange={(e) => setSearchStr(e.target.value)}
            />

            <Image
              src={cms}
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
