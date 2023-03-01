import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { formatMoney } from '../../utils';
import { trpc } from '../../utils/trpc';
import Filters from '../../components/Filters';
import DirectoryCards from '../../components/DirectoryCards';
import { debounce } from 'lodash';
import { AiOutlineLoading3Quarters } from "react-icons/ai/index";

import type { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { finalize, tap } from 'rxjs/operators'
import { Tab } from '../../utils/Enums/Tab.enum';
import ClinicalTrialsComponent from '../../components/ClinicalTrials';
import { getClinicalTrialFieldValues, getClinicalTrialsList } from '../../components/ClinicalTrials/helpers';
import { Field } from '../../components/ClinicalTrials/Fields.enum';
import type { ClinicalTrialsListItem, ClinicalTrialsStudyFieldsResponse } from '../../components/ClinicalTrials/ClinicalTrialsStudyFieldsResponse.model';
import ClinicalTrialsFilters from '../../components/ClinicalTrials/ClinicalTrialsFilters';
import type { ClinicalTrialsFieldValuesResponse, FieldValue } from '../../components/ClinicalTrials/ClinicalTrialsFieldValuesResponse.model';

interface PriceFilter {
  min: number,
  max: number
}

export interface FilterParams {
  subject: string,
  state: string,
  city: string,
  zipCode: string,
  specialty: string,
  type: string,
  category: string,
  doctorFilter: string,
  manufacturerFilter: string,
  productFilter: string,
  cursor: string,
  year: string,
  price: PriceFilter,
  name: string,
  drugManufacturer: string,
  drugType: string,
  drugRoute: string,
}

export default function Directory() {
  const progressRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const navigate = useRouter();

  const [filterParams, setFilterParams] = useState<FilterParams>({
    subject: navigate.query.tab as string ?? "transactions",
    state: '',
    city: '',
    zipCode: '',
    specialty: '',
    type: '',
    category: '',
    doctorFilter: "",
    manufacturerFilter: '',
    productFilter: '',
    cursor: '',
    year: '',
    price: { min: 0, max: 5000 },
    name: "",
    drugManufacturer: '',
    drugType: '',
    drugRoute: ''
  })
  const { data } = trpc.db.directory.useQuery({
    altName: searchRef?.current?.value,
    subject: filterParams.subject,
    state: filterParams.state,
    city: filterParams.city,
    zipCode: filterParams.zipCode,
    specialty: filterParams.specialty,
    type: filterParams.type,
    category: filterParams.category,
    doctorFilter: filterParams.doctorFilter,
    manufacturerFilter: filterParams.manufacturerFilter,
    productFilter: filterParams.productFilter,
    cursor: filterParams.cursor,
    year: filterParams.year,
    drugManufacturer: filterParams.drugManufacturer,
    drugType: filterParams.drugType,
    drugRoute: filterParams.drugRoute,
    // name: filterParams.name
  });
  const [search, setSearch] = useState<string>();
  const [selectedTab, setSelectedTab] = useState<Tab>(Tab.Transactions);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [clinicalTrialsData, setClinicalTrialsData] = useState<ClinicalTrialsStudyFieldsResponse<ClinicalTrialsListItem>>({} as ClinicalTrialsStudyFieldsResponse<ClinicalTrialsListItem>);
  const [clinicalTrialSearchKeywordExpr, setClinicalTrialSearchKeywordExpr] = useState<string>('');
  const [clinicalTrialSearchExpr, setClinicalTrialSearchExpr] = useState<string>('');
  const [clinicalTrialOverallStatusFilters, setClinicalTrialOverallStatusFilters] = useState<FieldValue[]>([] as FieldValue[]);
  const [clinicalTrialGenderFilters, setClinicalTrialGenderFilters] = useState<FieldValue[]>([] as FieldValue[]);
  const [clinicalTrialHealthyVolunteersFilters, setClinicalTrialHealthyVolunteersFilters] = useState<FieldValue[]>([] as FieldValue[]);
  const [clinicalTrialMinimumAgeFilters, setClinicalTrialMinimumAgeFilters] = useState<FieldValue[]>([] as FieldValue[]);
  const [clinicalTrialMaximumAgeFilters, setClinicalTrialMaximumAgeFilters] = useState<FieldValue[]>([] as FieldValue[]);
  const { query: querySearch } = useRouter();
  const defaultClinicalTrialFields: Field[] = [
    Field.BriefTitle,
    Field.StartDate,
    Field.CompletionDate,
    Field.OfficialTitle,
    Field.OrgFullName,
    Field.NCTId,
    Field.OverallStatus
  ];

  const { data: searchResults, refetch: fetchSearchResults, isLoading: searchLoad } = trpc.db.directory.useQuery({
    name: filterParams.name,
    subject: filterParams.subject,
    price: {
      min: filterParams.price.min,
      max: filterParams.price.max
    },
    state: filterParams.state,
    city: filterParams.city,
    specialty: filterParams.specialty,
    zipCode: filterParams.zipCode,
    year: filterParams.year,
    drugManufacturer: filterParams.drugManufacturer,
    drugType: filterParams.drugType,
    drugRoute: filterParams.drugRoute,

  }, { enabled: false });

  useEffect(() => {
    const searchParam = querySearch["search"] as string;
    if (searchParam) {
      setFilterParams(prev => {
        return {
          ...prev,
          search: searchParam
        }
      });
    }
  }, [querySearch]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const clinicalTrialsSearch = useCallback(
    debounce((expr: string) => {
      setIsProcessing(true);
      const getClinicalTrialsListRequest: Observable<ClinicalTrialsStudyFieldsResponse<ClinicalTrialsListItem>> = getClinicalTrialsList(defaultClinicalTrialFields, expr);
      getClinicalTrialsListRequest.pipe(
        finalize(() => setIsProcessing(false))
      ).subscribe((data: ClinicalTrialsStudyFieldsResponse<ClinicalTrialsListItem>) => {
        setClinicalTrialsData(data);
      });
    }, 1000),
    []
  );

  useEffect(() => {
    let searchExpr = '';
    if (clinicalTrialSearchKeywordExpr.length > 1) {
      searchExpr = `${clinicalTrialSearchKeywordExpr} AND ${clinicalTrialSearchExpr}`;
    } else {
      searchExpr = clinicalTrialSearchExpr;
    }
    clinicalTrialsSearch(searchExpr);
  }, [clinicalTrialsSearch, clinicalTrialSearchKeywordExpr, clinicalTrialSearchExpr])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((search: string) => {
      if (search.length < 2 && !filterParams.price) return;
      fetchSearchResults();
    }, 1000),
    []
  );

  useEffect(() => {
    debouncedSearch(filterParams.name ?? "");
  }, [filterParams.name, filterParams.price, filterParams.drugManufacturer, filterParams.drugRoute, filterParams.drugType]);

  const handleMinPrice = (e: any) => {
    if (e.target.value >= filterParams.price.max) {
      setFilterParams((prev: any) => {
        return {
          ...prev,
          price: {
            min: filterParams.price.min,
            max: parseInt(e.target.value)

          }
        }
      })
      return
    }
    setFilterParams((prev: any) => {
      return {
        ...prev,
        price: {
          min: parseInt(e.target.value),
          max: filterParams.price.max

        }
      }
    })
  }

  const handleMaxPrice = (e: any) => {
    if (e.target.value <= filterParams.price.min) {
      setFilterParams((prev: any) => {
        return {
          ...prev,
          price: {
            max: filterParams.price.max,
            min: parseInt(e.target.value)

          }
        }
      })
      return
    }

    setFilterParams((prev: any) => {
      return {
        ...prev,
        price: {
          max: parseInt(e.target.value),
          min: filterParams.price.min

        }
      }
    })
  }


  useEffect(() => {
    if (progressRef.current != null) {
      progressRef.current.style.left = (filterParams.price.min / 5000) * 10 + "%"
      progressRef.current.style.right = 10 - (filterParams.price.max / 5000) * 10 + "%"

    }

  }, [filterParams.price.min, filterParams.price.max])

  if (!data) {
    return (
      <>
        <div className="bgColor">
          <div
            style={{
              height: "800px",
            }}
            className="rounded bg-white p-5"
          >
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

              <div className="flex w-11/12 justify-center">
                <div className="flex flex-col">
                  <p className="p-1 text-2xl font-semibold text-violet-700"></p>

                  <div className="mx-auto mt-48 max-w-2xl">
                    <svg
                      role="status"
                      className="mr-2 inline h-20 w-20 animate-spin fill-purple-600 text-gray-200 dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </div>
                  <p className="flex justify-center pt-2 text-lg font-semibold text-violet-700 sm:text-2xl">
                    Loading StarHealth Data...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="p-5 rounded bg-white h-screen pb-44">
        <div className="flex flex-row">
          <div>
            <button
              onClick={navigate.back}
              className="border border-violet-700 bg-violet-700 text-white rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-violet-900 focus:outline-none focus:shadow-outline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </button>
          </div>
          <div className='w-full flex flex-col justify-end px-8 pb-10'>
            <div className="wrap-opt flex justify-between">
              <div className='w-[60%] flex items-center gap-5'>
                <p className='text-violet-700 text-2xl font-semibold flex'>
                  StarHealth Data Directory
                </p>
                {(searchLoad && (filterParams.subject === "transactions" || filterParams.name !== "") || isProcessing) && <AiOutlineLoading3Quarters className='text-violet-600 font-semibold spinner' />}
              </div>
              <div className='flex gap-2'>
                <button onClick={() => {
                  setSelectedTab(Tab.Transactions);
                  setFilterParams(prev => {
                    return {
                      ...prev,
                      subject: "transactions",
                      cursor: ""

                    }
                  })
                  setFilterParams(prev => {
                    return {
                      ...prev,
                      name: ""
                    }
                  })

                }}
                  className={`border-b-2 hover:border-zinc-500 ${selectedTab === Tab.Transactions ? "border-violet-600" : "border-zinc-200"}`}>
                  Transactions
                </button>
                <button onClick={() => {
                  setSelectedTab(Tab.Manufacturers);
                  setFilterParams(prev => {
                    return {
                      ...prev,
                      subject: "manufacturers",
                      cursor: ""

                    }
                  })
                  setFilterParams(prev => {
                    return {
                      ...prev,
                      name: ""
                    }
                  })
                }} className={`border-b-2 hover:border-zinc-500 ${selectedTab === Tab.Manufacturers ? "border-violet-600" : "border-zinc-200"}`}>
                  Manufacturers
                </button>
                <button onClick={() => {
                  setSelectedTab(Tab.Doctors);
                  setFilterParams(prev => {
                    return {
                      ...prev,
                      subject: "doctors",
                      cursor: ""


                    }
                  })
                  setFilterParams(prev => {
                    return {
                      ...prev,
                      name: ""
                    }
                  })
                }} className={`border-b-2 hover:border-zinc-500 ${selectedTab === Tab.Doctors ? "border-violet-600" : "border-zinc-200"}`}>
                  Doctors
                </button>
                <button onClick={(e) => {
                  setSelectedTab(Tab.Products);
                  setFilterParams(prev => {
                    return {
                      ...prev,
                      subject: "products",
                      cursor: ""


                    }
                  })
                  setFilterParams(prev => {
                    return {
                      ...prev,
                      name: ""
                    }
                  })
                }} className={`border-b-2 hover:border-zinc-500 ${selectedTab === Tab.Products ? "border-violet-600" : "border-zinc-200"}`}>
                  Products
                </button>
                <button onClick={(e) => {
                  setSelectedTab(Tab.Drugs);
                  setFilterParams(prev => {
                    return {
                      ...prev,
                      subject: "drugs",
                      cursor: ""


                    }
                  })
                  setFilterParams(prev => {
                    return {
                      ...prev,
                      name: ""
                    }
                  })
                }} className={`border-b-2 hover:border-zinc-500 ${selectedTab === Tab.Drugs ? "border-violet-600" : "border-zinc-200"}`}>
                  Drugs
                </button>
                <button onClick={() => {
                  setSelectedTab(Tab.ClinicalTrials);
                  setIsProcessing(true);

                  // Gather requests for filters
                  const getClinicalTrialsListRequest: Observable<ClinicalTrialsStudyFieldsResponse<ClinicalTrialsListItem>> = getClinicalTrialsList(defaultClinicalTrialFields);
                  const filterRequests = [
                    Field.OverallStatus,
                    Field.Gender,
                    Field.HealthyVolunteers,
                    Field.MinimumAge,
                    Field.MaximumAge,
                  ].map((field: Field) => getClinicalTrialFieldValues(field).pipe(
                    tap((data: ClinicalTrialsFieldValuesResponse) => {
                      switch (field) {
                        case Field.OverallStatus: {
                          setClinicalTrialOverallStatusFilters(data.FieldValuesResponse.FieldValues);
                          break;
                        }
                        case Field.Gender: {
                          setClinicalTrialGenderFilters(data.FieldValuesResponse.FieldValues);
                          break;
                        }
                        case Field.HealthyVolunteers: {
                          setClinicalTrialHealthyVolunteersFilters(data.FieldValuesResponse.FieldValues);
                          break;
                        }
                        case Field.MinimumAge: {
                          setClinicalTrialMinimumAgeFilters(data.FieldValuesResponse.FieldValues);
                          break;
                        }
                        case Field.MaximumAge: {
                          setClinicalTrialMaximumAgeFilters(data.FieldValuesResponse.FieldValues);
                          break;
                        }
                      }
                    })
                  ));

                  // Execute filter requests all together
                  forkJoin([
                    getClinicalTrialsListRequest.pipe(
                      tap((data: ClinicalTrialsStudyFieldsResponse<ClinicalTrialsListItem>) => {
                        setClinicalTrialsData(data);
                      })
                    ),
                    ...filterRequests
                  ]).pipe(
                    finalize(() => setIsProcessing(false))
                  ).subscribe();

                }} className={`border-b-2 hover:border-zinc-500 ${selectedTab === Tab.ClinicalTrials ? "border-violet-600" : "border-zinc-200"}`}>
                  Clinical Trials
                </button>
              </div>
            </div>
            <div className='my-1'>
              <hr />
            </div>
            {
              selectedTab === Tab.ClinicalTrials ? (
                <>
                  <div>
                    <ClinicalTrialsFilters
                      Gender={clinicalTrialGenderFilters}
                      HealthyVolunteers={clinicalTrialHealthyVolunteersFilters}
                      MinimumAge={clinicalTrialMinimumAgeFilters}
                      MaximumAge={clinicalTrialMaximumAgeFilters}
                      OverallStatus={clinicalTrialOverallStatusFilters}
                      OnSearchExprChange={(expr: string) => {
                        setClinicalTrialSearchExpr(expr);
                      }}
                    />
                    <div className='my-1'>
                      <hr />
                    </div>
                    <p className='text-xs p-1 text-violet-900 font-semibold'>Search for clinical trials</p>
                    <div className='flex items-center gap-3 w-[100%]'>
                      <input
                        type="text"
                        placeholder={
                          `Search`
                        }
                        className={`
                          bg-violet-100 border border-violet-900 my-2 placeholder:text-violet-800 text-slate-900 w-[30%] p-1 rounded-lg mx-1 hover:bg-violet-300 hover:text-violet-900 cursor-pointer`}
                        value={clinicalTrialSearchKeywordExpr}
                        onChange={(e) => {
                          setClinicalTrialSearchKeywordExpr(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Filters search={search} setSearch={setSearch} data={data} filterParams={filterParams} setFilterParams={setFilterParams} />
                  {
                    "data" && (
                      <>
                        <div className=''>
                          <p className='text-xs p-1 text-violet-900 font-semibold'>{`Search for ${filterParams.subject} by ${filterParams.subject === "payment" ? "product" : "name"}`}</p>
                          <div className='flex items-center gap-3 w-[100%]'>

                            <input
                              type="text"
                              placeholder={
                                `Search`
                              }
                              className={`
                          bg-violet-100 border border-violet-900 my-2 placeholder:text-violet-800 text-slate-900 w-[30%] p-1 rounded-lg mx-1 hover:bg-violet-300 hover:text-violet-900 cursor-pointer`}
                              value={filterParams.name}
                              onChange={(e) => {
                                setFilterParams(prev => {
                                  return {
                                    ...prev,
                                    name: e.target.value
                                  }
                                })
                              }
                              }
                            />

                            <div className='flex flex-col ml-5 items-center'>
                              {filterParams.subject === "transactions" && <div className='mb-4 w-80 mt-5'>
                                <div className="slider relative h-1 rounded-md bg-violet-100">
                                  <div ref={progressRef} className="progress absolute h-2  rounded">

                                  </div>
                                </div>
                                <div className="range-input relative">

                                  <input
                                    type="range" value={filterParams.price.min}
                                    onChange={handleMinPrice}
                                    min={0}
                                    step={10}
                                    max={5000}
                                    name="price-range" id="price-range-low" className='range-min accent-violet-500 absolute w-full -top-1 h-1 bg-transparent appearance-none pointer-events-none cursor-pointer' />
                                  <input
                                    type="range" value={filterParams.price.max}
                                    onChange={handleMaxPrice}
                                    min={0}
                                    step={10}
                                    max={5000}
                                    name="price-range" id="price-range-high" className='range-max accent-violet-500 absolute w-full -top-1 h-1 bg-transparent appearance-none cursor-pointer pointer-events-none' />
                                </div>
                              </div>}
                            </div>
                            {filterParams.subject === "transactions" && <div className='flex gap-5 text-violet-400'>
                              <p>{formatMoney(filterParams.price.min)}</p>
                              <p>To</p>
                              <p>{formatMoney(filterParams.price.max)}</p>

                            </div>}
                          </div>

                        </div>
                      </>
                    )
                  }
                </>
              )
            }

          </div>
        </div>
        <div className="flex w-full h-[90%] justify-center">
          <div className='flex min-h-[100%] flex-col overflow-scroll w-[95%] ml-5 p-1'>
            {
              selectedTab === Tab.ClinicalTrials ? (
                <ClinicalTrialsComponent data={clinicalTrialsData} />
              ) : (
                <DirectoryCards search={search as string} searchResults={searchResults} filterParams={filterParams} data={data} />
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}
