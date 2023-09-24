import { debounce } from "lodash";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai/index";
import DirectoryCards from "../../components/DirectoryCards";
import Filters from "../../components/Filters";
import { formatMoney } from "../../utils";
import { trpc } from "../../utils/trpc";
import { toTitleCase } from "../../utils";

import type { Observable } from "rxjs";
import { forkJoin } from "rxjs";
import { catchError, finalize, tap } from "rxjs/operators";
import ClinicalTrialsComponent from "../../components/ClinicalTrials";
import type {
  ClinicalTrialsFieldValuesResponse,
  ClinicalTrialsFieldValuesResponseLegacy,
  FieldValueLegacy,
  FieldValue,
} from "../../components/ClinicalTrials/ClinicalTrialsFieldValuesResponse.model";
import type {  ClinicalTrialStudies , ClinicalTrialStudy} from "../../components/ClinicalTrials/ClinicalTrialsStudyFieldsResponse.model";

import ClinicalTrialsFilters from "../../components/ClinicalTrials/ClinicalTrialsFilters";
import AutocompleteInput from "../../components/AutoCompleteInput";
import type {
  ClinicalTrialsListItem,
  ClinicalTrialsStudyFieldsResponse,
} from "../../components/ClinicalTrials/ClinicalTrialsStudyFieldsResponse.model";
import { Field } from "../../components/ClinicalTrials/Fields.enum";
import {
  getClinicalTrialFieldValues,
  getClinicalTrialsList,
} from "../../components/ClinicalTrials/helpers";
import { Tab } from "../../utils/Enums/Tab.enum";

import Image from "next/image";
import clinicalTrials from "../../assets/logos/clinical-trials.png";
import cms from "../../assets/logos/cms.png";
import cmsDataLogo from "../../assets/logos/cms_data.svg";
import fda from "../../assets/logos/fda.png";
import openPayments from "../../assets/logos/open-payments.png";
import ErrorComponent from "../../components/ErrorComponent";
import type { Food } from "../../components/Food/Food.model";
import FoodsComponent from "../../components/Food/Foods";
import FoodsFilters from "../../components/Food/FoodsFilter";
import DiseasesFilters from "../../components/Genetics/DiseasesFilter";
import type { Genetic } from "../../components/Genetics/Genetic.model";
import GeneticsComponent from "../../components/Genetics/Genetics";
import GeneticsFilters from "../../components/Genetics/GeneticsFilters";
import HealthPlansFilters from "../../components/HealthPlans/HealthPlansFilters";
import HealthPlansList from "../../components/HealthPlans/HealthPlansList";
import {
  getHealthPlans,
  searchLocationByZipcode,
} from "../../components/HealthPlans/httpsRequests";
import HospitalOwnersComponent from "../../components/HospitalOwners/HospitalOwners";
import type { HospitalOwners } from "../../components/HospitalOwners/HospitalOwners.model";
import HospitalOwnersFilters from "../../components/HospitalOwners/HospitalOwnersFilters";
import * as HospitalOwnerData from "../../components/HospitalOwners/processJSON";
import type { Hospital } from "../../components/Hospitals/Hospital.model";
import HospitalsComponent from "../../components/Hospitals/Hospitals";
import HospitalsFilters from "../../components/Hospitals/HospitalsFilters";
import LoadingStarHealth from "../../components/Loading";
import { id } from "date-fns/locale";


import { useSession, signIn } from "next-auth/react";
import React, {FormEvent} from "react";
import GoogleSignInButton from "../../components/SignIn/GoogleSignIn";
import EmailSignInButton from "../../components/SignIn/EmailSignIn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues } from "react-hook-form"
import FormSectionA from "../../components/SignIn/FormSection1";
import FormSectionB from "../../components/SignIn/FormSection2";
import FormSectionC from "../../components/SignIn/FormSection3";
import { signUpSchema } from "../../components/SignIn/SignIn";
import { personalSchema } from "../../components/SignIn/SignIn";
import { professionalInfo } from "../../components/SignIn/SignIn";
import { addionalInfoSchema } from "../../components/SignIn/SignIn";

interface PriceFilter {
  min: number;
  max: number;
}

export interface FilterParams {
  subject: string;
  state: string;
  city: string;
  zipCode: string;
  specialty: string;
  type: string;
  category: string;
  doctorFilter: string;
  manufacturerFilter: string;
  productFilter: string;
  cursor: string;
  year: string;
  price: PriceFilter;
  name: string;
  drugManufacturer: string;
  drugType: string;
  drugRoute: string;
}

export default function Directory() {
  const progressRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useRouter();

  const [filterParams, setFilterParams] = useState<FilterParams>({
    subject: (navigate.query.tab as string) ?? "transactions",
    state: "",
    city: "",
    zipCode: "",
    specialty: "",
    type: "",
    category: "",
    doctorFilter: "",
    manufacturerFilter: "",
    productFilter: "",
    cursor: "",
    year: "",
    price: { min: 0, max: 5000 },
    name: "",
    drugManufacturer: "",
    drugType: "",
    drugRoute: "",
  });
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
  const [zipcode, setZipcode] = useState<string>("");
  const [error, setError] = useState<any>();
  const [healthPlansData, setHealthPlansData] = useState<Array<any>>();
  const [displayHealthPlansData, setDisplayHealthPlansData] =
    useState<Array<any>>();
  const [isApiProcessing, setIsApiProcessing] = useState<boolean>(false);
  const [healthPlansDataError, setHealthPlansDataError] = useState<string>("");
  const [search, setSearch] = useState<string>();
  const [selectedTab, setSelectedTab] = useState<Tab>(Tab.Transactions);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [clinicalTrialsData, setClinicalTrialsData] = useState<
  ClinicalTrialStudies<ClinicalTrialStudy>
  >({} as ClinicalTrialStudies<ClinicalTrialStudy>);
  const [hospitalsData, setHospitalsData] = useState<Hospital[]>(
    [] as Hospital[]
  );
  const [hospitalOwnersData, setHospitalOwnersData] = useState<
    HospitalOwners[]
  >([] as HospitalOwners[]);
  const [clinicalTrialSearchKeywordExpr, setClinicalTrialSearchKeywordExpr] =
    useState<string>("");
  const [clinicalTrialSearchExpr, setClinicalTrialSearchExpr] =
    useState<string>("");
  const [
    clinicalTrialOverallStatusFilters,
    setClinicalTrialOverallStatusFilters,
  ] = useState<FieldValueLegacy[]>([] as FieldValueLegacy[]);
  const [clinicalTrialGenderFilters, setClinicalTrialGenderFilters] = useState<
    FieldValueLegacy[]
  >([] as FieldValueLegacy[]);


    const [clinicalTrialAcronymFilters, setClinicalTrialAcronymFilters] =
    useState<FieldValueLegacy[]>([] as FieldValueLegacy[]);

    const [clinicalTrialOfficialTitleFilters, setClinicalTrialOfficialTitleFilters] =
    useState<FieldValueLegacy[]>([] as FieldValueLegacy[]);

    const [clinicalTrialConditionFilters, setClinicalTrialConditionFilters] =
    useState<FieldValueLegacy[]>([] as FieldValueLegacy[]);

    const [clinicalTrialLocationStateFilters, setClinicalTrialLocationStateFilters] =
    useState<FieldValueLegacy[]>([] as FieldValueLegacy[]);

    const [clinicalTrialLocationCityFilters, setClinicalTrialLocationCityFilters] =
    useState<FieldValueLegacy[]>([] as FieldValueLegacy[]);

    const [clinicalTrialLocationCountryFilters, setClinicalTrialLocationCountryFilters] =
    useState<FieldValueLegacy[]>([] as FieldValueLegacy[]);

    const [clinicalTrialCollaboratorNameFilters, setClinicalTrialCollaboratorNameFilters] =
    useState<FieldValueLegacy[]>([] as FieldValueLegacy[]);

    const [clinicalTrialLeadSponsorNameFilters, setClinicalTrialLeadSponsorNameFilters] =
    useState<FieldValueLegacy[]>([] as FieldValueLegacy[]);


    const [locationContactNameFilters, setLocationContactNameFilters] = 
    useState<FieldValueLegacy[]>([] as FieldValueLegacy[]);

    const [locationFacilityFilters, setLocationFacilityFilters] =
    useState<FieldValueLegacy[]>([] as FieldValueLegacy[]);

    const [interventionNameFilters, setInterventionNameFilters] =
    useState<FieldValueLegacy[]>([] as FieldValueLegacy[]);
  const [genetics, setGenetics] = useState<Genetic[]>([] as Genetic[]);
  const [filteredGenetics, setFilteredGenetics] = useState<Genetic[]>(
    [] as Genetic[]
  );
  const [diseases, setDiseases] = useState<Genetic[]>([] as Genetic[]);
  const [filteredDiseases, setFilteredDiseases] = useState<Genetic[]>(
    [] as Genetic[]
  );
  const [food, setFood] = useState<Food[]>([] as Food[]);
  const [filteredFood, setFilteredFood] = useState<Food[]>([] as Food[]);
  const { query: querySearch } = useRouter();
  const defaultClinicalTrialFields: Field[] = [
    Field.BriefTitle,
    Field.StartDate,
    Field.CompletionDate,
    Field.OfficialTitle,
    Field.OrgFullName,
    Field.NCTId,
    Field.OverallStatus,
  ];


  const {
    data: searchResults,
    refetch: fetchSearchResults,
    isLoading: searchLoad,
  } = trpc.db.directory.useQuery(
    {
      name: filterParams.name,
      subject: filterParams.subject,
      price: {
        min: filterParams.price.min,
        max: filterParams.price.max,
      },
      state: filterParams.state,
      city: filterParams.city,
      specialty: filterParams.specialty,
      zipCode: filterParams.zipCode,
      year: filterParams.year,
      drugManufacturer: filterParams.drugManufacturer,
      drugType: filterParams.drugType,
      drugRoute: filterParams.drugRoute,
    },
    { enabled: false }
  );

  /* makes sure user on the right tab when press back btn */
  useEffect(() => {
    const curTab = localStorage.getItem("curDirTab");
    if (curTab) {
      const { tab, subject } = JSON.parse(curTab);
      setSelectedTab(tab);
      setFilterParams((prev) => {
        return {
          ...prev,
          subject,
          cursor: "",
          name: "",
        };
      });
    } else {
      localStorage.setItem(
        "curDirTab",
        JSON.stringify({ tab: selectedTab, subject: "transactions" })
      );
      setSelectedTab(Tab.Transactions);
      setFilterParams((prev) => {
        return {
          ...prev,
          subject: "transactions",
          cursor: "",
          name: "",
        };
      });
    }
  }, []);

  const handleTabClick = (tab: Tab, subject: string) => {
    if (tab !== Tab.ClinicalTrials && tab !== Tab.Hospitals) {
      setFilterParams((prev) => {
        return {
          ...prev,
          subject,
          cursor: "",
          name: "",
        };
      });
    }
    setSelectedTab(tab);
    localStorage.setItem("curDirTab", JSON.stringify({ tab, subject }));
  };

 

  useEffect(() => {
    const searchParam = querySearch["search"] as string;
    if (searchParam) {
      setFilterParams((prev) => {
        return {
          ...prev,
          search: searchParam,
        };
      });
    }
  }, [querySearch]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const clinicalTrialsSearch = useCallback(
    debounce( async (expr: string) => {
      setIsProcessing(true);
      
     try {
      const response = await fetch(`/api/clinical-trial/all-trials?fields=${defaultClinicalTrialFields.join(",")}&expr=${expr}`);
      const data = await response.json();
      if(response.status != 200) {
        setError(data);
      } else {
        setClinicalTrialsData(data);
      }
     }
     catch(error) {
      setError(error);
     }
     finally {
      setIsProcessing(false);
     }
    }, 1000),
    []
  );

  useEffect(() => {
    if (selectedTab == Tab.Diseases) {
      const fetchDiseases = async () => {
        try {
          setIsApiProcessing(true);
          const response = await fetch("/api/genetics/getAll");
          const data = await response.json();
          const diseases = data["topic"].filter(
            (topic: any) => topic["title"]["_text"] == "Conditions"
          )[0]["topics"]["topic"];
          diseases.forEach((disease: any) => {
            disease["url"] = disease["url"] ? disease["url"]["_text"] : "";
            disease["title"] = disease["title"]
              ? disease["title"]["_text"]
              : "";
            disease["type"] = "condition";
            disease["other_names"] = disease["other_names"]
              ? disease["other_names"]["other_name"]
              : [];
          });
          setDiseases(diseases);
          setFilteredDiseases(diseases);
        } catch (error) {
          console.log(error);
        } finally {
          setIsApiProcessing(false);
        }
      };
      fetchDiseases();
    }
  }, [selectedTab]);

  useEffect(() => {
    if (selectedTab == Tab.Genetics) {
      const fetchGenetics = async () => {
        try {
          setIsApiProcessing(true);
          const response = await fetch("/api/genetics/getAll");
          const data = await response.json();
          const genes = data["topic"].filter(
            (topic: any) => topic["title"]["_text"] == "Genes"
          )[0]["topics"]["topic"];
          const chromosomes = data["topic"].filter(
            (topic: any) => topic["title"]["_text"] == "Chromosomes"
          )[0]["topics"]["topic"];
          genes.forEach((gene: any) => {
            gene["url"] = gene["url"] ? gene["url"]["_text"] : "";
            gene["title"] = gene["title"] ? gene["title"]["_text"] : "";
            gene["type"] = "gene";
            gene["other_names"] = gene["other_names"]
              ? gene["other_names"]["other_name"]
              : [];
          });
          chromosomes.forEach((chromosome: any) => {
            chromosome["url"] = chromosome["url"]
              ? chromosome["url"]["_text"]
              : "";
            chromosome["title"] = chromosome["title"]
              ? chromosome["title"]["_text"].length < 13
                ? chromosome["title"]["_text"].replace(
                    "Chromosome ",
                    "Chromosome 0"
                  )
                : chromosome["title"]["_text"]
              : "";
            chromosome["type"] = "chromosome";
            chromosome["other_names"] = chromosome["other_names"]
              ? chromosome["other_names"]["other_name"]
              : [];
          });

          let allGenetics = genes.concat(chromosomes);
          allGenetics = allGenetics.sort((a: any, b: any) => {
            if (a["title"] < b["title"]) {
              return -1;
            } else {
              return 1;
            }
          });
          setGenetics(allGenetics);
          setFilteredGenetics(allGenetics);
        } catch (error) {
          console.log(error);
        } finally {
          setIsApiProcessing(false);
        }
      };
      fetchGenetics();
    }
  }, [selectedTab]);

  useEffect(() => {
    if (selectedTab == Tab.Hospitals) {
      const fetchHospitals = async () => {
        try {
          setIsApiProcessing(true);
          const response = await fetch("/api/hospitals/getAll");
          const data = await response.json();
          if (response.status != 200) {
            setError(data);
          } else {
            setHospitalsData(data.hospitals);
          }
        } catch (error) {
          setError(error);
        } finally {
          setIsApiProcessing(false);
        }
      };
      fetchHospitals();
    }
  }, [selectedTab]);


  useEffect(() => {
    if (selectedTab == Tab.ClinicalTrials) {
      const fetchClinicalTrials = async () => {
        try {
          setIsApiProcessing(true);
          const response = await fetch(`/api/clinical-trial/all-trials?fields=${defaultClinicalTrialFields.join(",")}`);
          const data = await response.json();
          if (response.status != 200) {
            setError(data);
          } else {
            setClinicalTrialsData(data);
          }
        } catch (error) {
          setError(error);
        } finally {
          setIsApiProcessing(false);
        }
      };
      fetchClinicalTrials();
      loadFilterData()
    }
  }, [selectedTab])

  const getClinicalTrialFieldValuesRequest = async (field :  Field) => {
    try {
      const response = await fetch(`/api/clinical-trial/getFieldValues?fieldValue=${field}`);
      const data = await response.json();
      if (response.status != 200) {
        setError(data);
      }
      else {
        return data;
      }
    }
    catch (error) {
      setError(error);
    }
  }

  const loadFilterData = async () => {
    const filterRequests = [
      Field.OverallStatus,
      Field.Gender,
      Field.HealthyVolunteers,
      Field.MinimumAge,
      Field.MaximumAge,
      Field.Acronym,
      Field.OfficialTitle,
      Field.Condition,
      Field.LocationState,
      Field.LocationCity,
      Field.LocationCountry,
      Field.CollaboratorName,
      Field.LeadSponsorName,
      Field.LocationContactName,
      Field.LocationFacility,
      Field.InterventionName
    ].map((field : Field) => getClinicalTrialFieldValuesRequest(field));

    const filterResponses = await Promise.all(filterRequests);
   

    filterResponses.forEach((data , index) => {
      const field  = [
        Field.OverallStatus,
        Field.Gender,
        Field.HealthyVolunteers,
        Field.MinimumAge,
        Field.MaximumAge,
        Field.Acronym,
        Field.OfficialTitle,
        Field.Condition,
        Field.LocationState,
        Field.LocationCity,
        Field.LocationCountry,
        Field.CollaboratorName,
        Field.LeadSponsorName ,
        Field.LocationContactName,
        Field.LocationFacility,
        Field.InterventionName
      ][index]

      switch (field) {
        case Field.OverallStatus:
          setClinicalTrialOverallStatusFilters(data.topValues)
        break;
        case Field.Gender:
          setClinicalTrialGenderFilters(data.topValues)
        break;
        case Field.Acronym:
          setClinicalTrialAcronymFilters(data.topValues)
        break;
        case Field.OfficialTitle:
          setClinicalTrialOfficialTitleFilters(data.topValues)
        break;
        case Field.Condition:
          setClinicalTrialConditionFilters(data.topValues)
        break;
        case Field.LocationState:
          setClinicalTrialLocationStateFilters(data.topValues)
        break;
        case Field.LocationCity:
          setClinicalTrialLocationCityFilters(data.topValues)
        break;
        case Field.LocationCountry:
          setClinicalTrialLocationCountryFilters(data.topValues)
        break;
        case Field.CollaboratorName:
          setClinicalTrialCollaboratorNameFilters(data.topValues)
        break;
        case Field.LeadSponsorName:
          setClinicalTrialLeadSponsorNameFilters(data.topValues)
        break;
        case Field.LocationContactName:
          setLocationContactNameFilters(data.topValues)
        break;
        case Field.LocationFacility:
          setLocationFacilityFilters(data.topValues)
        break;
        case Field.InterventionName:
          setInterventionNameFilters(data.topValues)
        break;
      }
    })
    
  }

  useEffect(() => {
    if (selectedTab == Tab.HospitalOwners) {
      const data = HospitalOwnerData.data;
    }
  }, [selectedTab, isApiProcessing, hospitalOwnersData]);

  useEffect(() => {
    if (selectedTab == Tab.HospitalOwners) {
      const fetchHospitals = async () => {
        try {
          setIsApiProcessing(true);
          const response = await HospitalOwnerData.default();
          const data: HospitalOwners[] = await HospitalOwnerData.data;
          setHospitalOwnersData(data);
        } catch (error) {
          setError(error);
        } finally {
          setIsApiProcessing(false);
        }
      };
      fetchHospitals();
    }
  }, []);

  useEffect(() => {
    if (selectedTab == Tab.Food) {
      const fetchFood = async () => {
        try {
          setIsApiProcessing(true);
          const response = await fetch(`/api/food/search/apple`);
          const data = await response.json();
          if (response.status != 200) {
            setError(data);
          } else {
            setFood(data["foods"]);
            setFilteredFood(data["foods"]);
          }
        } catch (error) {
          setError(error);
        } finally {
          setIsApiProcessing(false);
        }
      };
      fetchFood();
      console.log(food);
    }
  }, [selectedTab]);

  useEffect(() => {
    let searchExpr = "";
    if (clinicalTrialSearchKeywordExpr.length > 1) {
      if (clinicalTrialSearchExpr.length > 1) {
        searchExpr = `${clinicalTrialSearchKeywordExpr} AND ${clinicalTrialSearchExpr}`;
      } else {

        searchExpr = clinicalTrialSearchKeywordExpr;

      }
    } else {
      searchExpr = clinicalTrialSearchExpr;

    }

    clinicalTrialsSearch(searchExpr);
  }, [
    clinicalTrialsSearch,
    clinicalTrialSearchKeywordExpr,
    clinicalTrialSearchExpr,
  ]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((search: string) => {
      if (search.length < 2 && !filterParams.price) return;
      fetchSearchResults();
    }, 1000),
    []
  );
  const returnDoctorNames = (list: any[]) => {
    const output: any = [];
    if (list === undefined) {
      return [];
    }
    list.forEach((element: any) => {
      output.push(
        toTitleCase((element.firstName + " " + element.lastName).toLowerCase())
      );
    });
    return output;
  };
  const returnNamesOfClincalNames = (list: any[], name: string) => {
    const output: any = [];
    if (list === undefined) {
      return [];
    }
    list.forEach((element: any) => {
      output.push(element.protocolSection.identificationModule[name]);
    });
    return output;
  };
  const returnNamesOfObjects = (searchObj: any, tab: string) => {
    const output: any = [];
    if (searchObj === undefined) {
      return [];
    }
    let name = "";
    let list = [];
    if (tab == Tab.Drugs) {
      name = "brand_name";
      list = searchObj["drugs"];
    }
    if (tab == Tab.Manufacturers) {
      name = "name";
      list = searchObj["manufacturers"];
    }
    if (tab == Tab.Products) {
      name = "name";
      list = searchObj["products"];
    }
    if (tab == Tab.OpioidTreatmentProviders) {
      name = "provider_name";
      list = searchObj["opioidTreatmentProviders"];
    }
    if (tab == Tab.Doctors) {
      return returnDoctorNames(searchObj["doctors"]);
    }
    if (tab == Tab.Transactions) {
      list = searchObj["payments"];
      console.log(list);
      list.forEach((element: any) => {
        output.push(toTitleCase(element.product.name.toLowerCase()));
      });
      return output;
    }
    console.log(list);
    list.forEach((element: any) => {
      output.push(toTitleCase(element[name].toLowerCase()));
    });
    return output;
  };
  useEffect(() => {
    if (zipcode.length === 5) {
      setHealthPlansDataError("");
      setIsProcessing(true);
      searchLocationByZipcode(zipcode)
        .pipe(
          catchError((error) => {
            console.error("Error fetching searchStateByZipcode data:", error);
            return [];
          })
        )
        .pipe(finalize(() => setIsProcessing(false)))
        .subscribe((resp: any) => {
          // console.log(resp?.response?.counties[0], ">>>");
          if (!resp?.response?.counties.length) {
            setHealthPlansDataError("does not exist");
            return [];
          }

          const { fips, state, zipcode } = resp?.response?.counties[0];
          getHealthPlans(fips, state, zipcode)
            .pipe(
              catchError((err) => {
                setHealthPlansDataError(err?.response?.message);
                return [];
              })
            )
            .subscribe((resp: any) => {
              if (resp?.status == 200) {
                setHealthPlansData(resp?.response?.plans);
                setDisplayHealthPlansData(resp?.response?.plans);
              }
            });
        });
    }

    // reset if no zipcode was entered
    if (zipcode.length === 0) {
      setHealthPlansData(undefined);
      setDisplayHealthPlansData(undefined);
    }
  }, [zipcode]);

  useEffect(() => {
    debouncedSearch(filterParams.name ?? "");
  }, [
    filterParams.name,
    filterParams.price,
    filterParams.drugManufacturer,
    filterParams.drugRoute,
    filterParams.drugType,
    debouncedSearch,
  ]);

  const handleMinPrice = (e: any) => {
    if (e.target.value >= filterParams.price.max) {
      setFilterParams((prev: any) => {
        return {
          ...prev,
          price: {
            min: filterParams.price.min,
            max: parseInt(e.target.value),
          },
        };
      });
      return;
    }
    setFilterParams((prev: any) => {
      return {
        ...prev,
        price: {
          min: parseInt(e.target.value),
          max: filterParams.price.max,
        },
      };
    });
  };

  const handleMaxPrice = (e: any) => {
    if (e.target.value <= filterParams.price.min) {
      setFilterParams((prev: any) => {
        return {
          ...prev,
          price: {
            max: filterParams.price.max,
            min: parseInt(e.target.value),
          },
        };
      });
      return;
    }

    setFilterParams((prev: any) => {
      return {
        ...prev,
        price: {
          max: parseInt(e.target.value),
          min: filterParams.price.min,
        },
      };
    });
  };

  useEffect(() => {
    if (progressRef.current != null) {
      progressRef.current.style.left =
        (filterParams.price.min / 5000) * 10 + "%";
      progressRef.current.style.right =
        10 - (filterParams.price.max / 5000) * 10 + "%";
    }
  }, [filterParams.price.min, filterParams.price.max]);



  //Custom Sign In Logic
  const {data : session, status , update} = useSession();
  const [showEmailSignUp, setShowEmailSignUp] = useState<boolean>(false);
  const [isEmailSent , setIsEmailSent] = useState<boolean>(false)
  const [showLogin, setShowLogin] = useState<boolean>(false)
  const [loginErrors, setLoginErrors] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [registerErrors, setRegisterErrors] = useState<boolean>(false)
  const [activeSection, setActiveSection] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [emailSignIn, setEmailSignIn] = useState<Record<string , string>>({
    customFirstName : '',
    customLastName : '',
    customEmail : '',
    customPassword : '',
    message : ''
  })
  const [emailLogin, setEmailLogin] = useState<Record<string , string>>({
    loginEmail : '',
    loginPassword : '',
    message :'',
  })
  const [customMessages,setCustomMessages]=useState<Array<{ 
    message: string,
   
  
  }>>([])
  const schemas = [personalSchema, professionalInfo, addionalInfoSchema]


  const router = useRouter()
  const {
    register , 
    watch,
    handleSubmit, 
    getValues, 
    trigger,
    unregister,
    formState : { errors }, 
    reset
  } = useForm({
    resolver : zodResolver(signUpSchema),
    mode : "onSubmit"
  })

  const {login} = router.query;


  const onSubmit =  async (data : FieldValues) => {

 
    try{
      const response = await fetch("/api/update-auth/update-user-field",{
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          userId :  session?.user?.id,
          formData : data
        })
      })
      if(!response.ok){
        console.log("Registration couldn't be completed sucessfully")
      }
      else {

        const newSession = {
          ...session,
          user: {
            ...session?.user,
            isRegistered: true
          },
        };
    
        await update(newSession);
        
      }
    }
    catch(error) {
      console.log(error)
    }
  }



  useEffect(() => {
    setProgress((activeSection * 2) * 25)
  }, [activeSection])

  


  const handleEmailSignUp = () => {
    setShowEmailSignUp(true)
  }

  const handleshowLogin = () => {
    setShowLogin(true)
  }
 



   // Email Verification
   const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      setEmailSignIn({
        ...emailSignIn,
        [e.target.name] : e.target.value
      })
   }

   const handleEmailSubmitForm = async (e : FormEvent) => {
    e.preventDefault()

    try {
     
      setCustomMessages([])
      setIsSubmitting(true)
      const response = await fetch('/api/register/register', {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          firstName : emailSignIn.customFirstName,
          lastName : emailSignIn.customLastName,
          email : emailSignIn.customEmail,
          password : emailSignIn.customPassword
        })
      })
      if(!response.ok) {
        setIsSubmitting(false)
        const errorResponse = await response.json()
        if(errorResponse.message){
          const errorMessage = errorResponse.message
          console.log(errorMessage)
          setRegisterErrors(true)
          setEmailSignIn({
            ...emailSignIn,
            message : errorMessage as string
          })
        }
        else {
          console.log(errorResponse.errors)
          setCustomMessages(errorResponse.errors)
        }
        
      }
      else{
      
        setEmailSignIn({
          ...emailSignIn,
          message : 'Success'
        })
        setIsEmailSent(true)
      }

    }
    catch(error : any) {
      console.log('catch errors ',error)
    }
    finally {
      setIsSubmitting(false)
    }
    
  
  }


  // handle Email Login
  const handleEmailLoginChange = (e : React.ChangeEvent<HTMLInputElement>) => {
   setEmailLogin({
    ...emailLogin,
    [e.target.name] : e.target.value
   })

  }

  const handleEmailLoginForm = async (e : FormEvent) => {
    e.preventDefault()
  
    const result = await signIn('credentials',{
      email : emailLogin.loginEmail,
      password : emailLogin.loginPassword,
      redirect : false
    })

 
  
    if(result) {
      if (result.error) {
        // Handle login error here
        setEmailLogin({
          ...emailLogin,
          message : result.error as string,
        })
        setLoginErrors(true)
      } else {
        // If login is successful, the session will be updated automatically
        setEmailLogin({
          ...emailLogin,
          message : 'Login Successful. You will now be redirected'
        })
        setLoginErrors(false)
        delayReload('/directory',3000)
      }
    }
  }
  const delayReload = (url : string, milliseconds : number) => {
    setTimeout(() => {
      window.location.href = url;
    },milliseconds)
  }

  const handlePrevious = (e : FormEvent) => {
    if (activeSection === 0) {
      return;
    }
    setActiveSection((prev) => prev - 1);
  }

  const handleNext = async (e : FormEvent) => {
    e.preventDefault()
    let fieldKeys = Object.keys(getValues())

    const fieldSchema = schemas[activeSection]
    if(fieldSchema) {
      fieldKeys = Object.keys(fieldSchema.shape)
     
    }


    const isValid = await trigger(fieldKeys)
      if(isValid){
        setActiveSection((prev) => prev + 1)
      }
    } 


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
              {/* Loading Component */}
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
      <div className="min-h-screen rounded bg-white p-5 pb-44">
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
            <div className="wrap-opt flex justify-between">
              <div className="flex w-[60%] items-center gap-5">
                <p className="flex text-2xl font-semibold text-violet-700">
                  StarHealth Data Directory
                </p>
                {((searchLoad &&
                  (filterParams.subject === "transactions" ||
                    filterParams.name !== "")) ||
                  isProcessing) && (
                  <AiOutlineLoading3Quarters className="spinner font-semibold text-violet-600" />
                )}
              </div>
              <div className="flex gap-2">
                {/* clinical trials tab */}
                <button
                  onClick={() => {
                    handleTabClick(Tab.ClinicalTrials, "");
                    setIsProcessing(true);
                    loadFilterData();
                    
                  }}
                  className={`whitespace-nowrap border-b-2 hover:border-zinc-500 ${
                    selectedTab === Tab.ClinicalTrials
                      ? "border-violet-600"
                      : "border-zinc-200"
                  }`}
                >
                  <span>Clinical Trials</span>
                </button>

                {/* diseases tab */}
                <button
                  onClick={() => {
                    handleTabClick(Tab.Diseases, "diseases");
                  }}
                  className={`border-b-2 hover:border-zinc-500 ${
                    selectedTab === Tab.Diseases
                      ? "border-violet-600"
                      : "border-zinc-200"
                  }`}
                >
                  Diseases
                </button>

                {/* doctors tab */}
                <button
                  onClick={() => {
                    handleTabClick(Tab.Doctors, "doctors");
                  }}
                  className={`border-b-2 hover:border-zinc-500 ${
                    selectedTab === Tab.Doctors
                      ? "border-violet-600"
                      : "border-zinc-200"
                  }`}
                >
                  Doctors
                </button>

                {/* drugs tab */}
                <button
                  onClick={(e) => {
                    handleTabClick(Tab.Drugs, "drugs");
                  }}
                  className={`border-b-2 hover:border-zinc-500 ${
                    selectedTab === Tab.Drugs
                      ? "border-violet-600"
                      : "border-zinc-200"
                  }`}
                >
                  Drugs
                </button>

                {/* food tab */}
                <button
                  onClick={() => {
                    handleTabClick(Tab.Food, "food");
                  }}
                  className={`border-b-2 hover:border-zinc-500 ${
                    selectedTab === Tab.Food
                      ? "border-violet-600"
                      : "border-zinc-200"
                  }`}
                >
                  Food
                </button>

                {/* genetics tab */}
                <button
                  onClick={() => {
                    handleTabClick(Tab.Genetics, "genetics");
                  }}
                  className={`border-b-2 hover:border-zinc-500 ${
                    selectedTab === Tab.Genetics
                      ? "border-violet-600"
                      : "border-zinc-200"
                  }`}
                >
                  Genetics
                </button>

                {/* Hospitals Tab */}
                <button
                  onClick={() => {
                    handleTabClick(Tab.Hospitals, "hospitals");
                  }}
                  className={`border-b-2 hover:border-zinc-500 ${
                    selectedTab === Tab.Hospitals
                      ? "border-violet-600"
                      : "border-zinc-200"
                  }`}
                >
                  Hospitals
                </button>

                {/* Hospital Owners Tab */}
                <button
                  onClick={() => {
                    handleTabClick(Tab.HospitalOwners, "hospitals");
                  }}
                  className={`whitespace-nowrap border-b-2 hover:border-zinc-500 ${
                    selectedTab === Tab.HospitalOwners
                      ? "border-violet-600"
                      : "border-zinc-200"
                  }`}
                >
                  Hospital Owners
                </button>

                {/* insurance plans tab goes here */}
                <button
                  onClick={() => {
                    setSelectedTab(Tab.Plans);
                    setFilterParams((prev) => {
                      return {
                        ...prev,
                        subject: "plans",
                        cursor: "",
                      };
                    });
                    setFilterParams((prev) => {
                      return {
                        ...prev,
                        name: "",
                      };
                    });
                    setHealthPlansData(undefined);
                    setDisplayHealthPlansData(undefined);
                    setZipcode("");
                    // searchLocationByZipcode(zipcode)
                    //   .pipe(
                    //     catchError((error) => {
                    //       console.error(
                    //         "Error fetching searchStateByZipcode data:",
                    //         error
                    //       );
                    //       return [];
                    //     })
                    //   )
                    //   .pipe(finalize(() => setIsProcessing(false)))
                    //   .subscribe((resp: any) => {
                    //     const { fips, state, zipcode } =
                    //       resp?.response?.counties[0];
                    //     getHealthPlans(fips, state, zipcode).subscribe(
                    //       (resp: any) => {
                    //         if (resp?.status == 200) {
                    //           setHealthPlansData(resp?.response?.plans);
                    //           setDisplayHealthPlansData(resp?.response?.plans);
                    //         }
                    //       }
                    //     );
                    //   });
                  }}
                  className={`border-b-2 hover:border-zinc-500 ${
                    selectedTab === Tab.Plans
                      ? "border-violet-600"
                      : "border-zinc-200"
                  }`}
                >
                  Insurance
                </button>

                {/* manufactures tab */}
                <button
                  onClick={() => {
                    handleTabClick(Tab.Manufacturers, "manufacturers");
                  }}
                  className={`border-b-2 hover:border-zinc-500 ${
                    selectedTab === Tab.Manufacturers
                      ? "border-violet-600"
                      : "border-zinc-200"
                  }`}
                >
                  Manufacturers
                </button>

                {/* medical devices tab */}
                <button
                  onClick={(e) => {
                    handleTabClick(Tab.Products, "products");
                  }}
                  className={`w-max border-b-2 hover:border-zinc-500 ${
                    selectedTab === Tab.Products
                      ? "border-violet-600"
                      : "border-zinc-200"
                  }`}
                >
                  <span>Medical</span> <span>Devices</span>
                </button>

                {/* Opioid Treatment Providers Tab */}
                <button
                  onClick={() => {
                    handleTabClick(
                      Tab.OpioidTreatmentProviders,
                      "opioidTreatmentProviders"
                    );
                  }}
                  className={`w-max border-b-2 hover:border-zinc-500 ${
                    selectedTab === Tab.OpioidTreatmentProviders
                      ? "border-violet-600"
                      : "border-zinc-200"
                  }`}
                >
                  Opioid Treatment
                </button>

                {/* transactions tab */}
                <button
                  onClick={() => {
                    handleTabClick(Tab.Transactions, "transactions");
                  }}
                  className={`border-b-2 hover:border-zinc-500 ${
                    selectedTab === Tab.Transactions
                      ? "border-violet-600"
                      : "border-zinc-200"
                  }`}
                >
                  Transactions
                </button>
              </div>
            </div>
            <div className="my-1">
              <hr />
            </div>
            {selectedTab === Tab.ClinicalTrials && (
              <div className="relative">
                <ClinicalTrialsFilters
                  Gender={clinicalTrialGenderFilters}
                  Acronym={clinicalTrialAcronymFilters}
                  OfficialTitle={clinicalTrialOfficialTitleFilters}
                  Condition={clinicalTrialConditionFilters}
                  LocationState={clinicalTrialLocationStateFilters}
                  LocationCity={clinicalTrialLocationCityFilters}
                  LocationCountry={clinicalTrialLocationCountryFilters}
                  CollaboratorName={clinicalTrialCollaboratorNameFilters}
                  LeadSponsorName={clinicalTrialLeadSponsorNameFilters}
                  OverallStatus={clinicalTrialOverallStatusFilters}
                  LocationContactName={locationContactNameFilters}
                  LocationFacility={locationFacilityFilters}
                  InterventionName={interventionNameFilters}
                  OnSearchExprChange={(expr: string) => {
                    setClinicalTrialSearchExpr(expr);
                  }}
                />
                <div className="my-1">
                  <hr />
                </div>
                <p className="p-1 text-xs font-semibold text-violet-900">
                  Search for clinical trials
                </p>
                <div className="flex w-[100%] items-center gap-3">
                  <AutocompleteInput
                    expr={clinicalTrialSearchKeywordExpr}
                    setExpr={setClinicalTrialSearchKeywordExpr}
                    options={returnNamesOfClincalNames(
                      clinicalTrialsData.studies
                        ? clinicalTrialsData.studies
                        : [],
                      "briefTitle"
                    )}
                  ></AutocompleteInput>
                </div>
                <Image
                  src={clinicalTrials}
                  alt=""
                  width={128}
                  height={128}
                  className="absolute -bottom-10 right-0 object-contain"
                />
              </div>
            )}
            {selectedTab == Tab.Plans && (
              <div className="flex flex-col items-end">
                <HealthPlansFilters
                  params={{
                    zipcode,
                    setZipcode,
                    healthPlansDataError,
                    healthPlansData,
                    setHealthPlansData,
                    setDisplayHealthPlansData,
                  }}
                />

                <Image
                  src={cms}
                  alt=""
                  width={128}
                  height={128}
                  className=" object-contain"
                />
              </div>
            )}
            {selectedTab == Tab.Hospitals && (
              <div className="flex flex-col items-end">
                <HospitalsFilters
                  params={{
                    hospitalsData,
                    setHospitalsData,
                    setIsApiProcessing,
                  }}
                />
              </div>
            )}
            {selectedTab == Tab.HospitalOwners && (
              <div className="flex flex-col items-end">
                <HospitalOwnersFilters
                  params={{
                    hospitalOwnersData,
                    setHospitalOwnersData,
                    setIsApiProcessing,
                  }}
                />
              </div>
            )}
            {selectedTab == Tab.Genetics && (
              <div className="flex flex-col items-end">
                <GeneticsFilters
                  params={{
                    genetics,
                    setFilteredGenetics,
                    setIsApiProcessing,
                  }}
                />
              </div>
            )}

            {selectedTab == Tab.Diseases && (
              <div className="flex flex-col items-end">
                <DiseasesFilters
                  params={{
                    diseases,
                    setFilteredDiseases,
                    setIsApiProcessing,
                  }}
                />
              </div>
            )}

            {selectedTab == Tab.Food && (
              <div className="flex flex-col items-end">
                <FoodsFilters
                  params={{
                    setFilteredFood,
                    setFood,
                    setIsApiProcessing,
                    food,
                  }}
                />
              </div>
            )}

            {selectedTab !== Tab.ClinicalTrials &&
              selectedTab !== Tab.Plans &&
              selectedTab !== Tab.Hospitals &&
              selectedTab !== Tab.HospitalOwners &&
              selectedTab !== Tab.Genetics &&
              selectedTab !== Tab.Diseases &&
              selectedTab !== Tab.Food && (
                <>
                  <Filters
                    search={search}
                    setSearch={setSearch}
                    data={data}
                    filterParams={filterParams}
                    setFilterParams={setFilterParams}
                  />
                  {"data" && (
                    <>
                      <div className="relative">
                        <p className="p-1 text-xs font-semibold text-violet-900">{`Search for
                            ${
                              filterParams.subject ===
                              "opioidTreatmentProviders"
                                ? "Opioid Treatment Providers"
                                : filterParams.subject
                            } by ${
                          filterParams.subject === "opioidTreatmentProviders" ||
                          filterParams.subject === "payment"
                            ? "name"
                            : "product"
                        }`}</p>
                        <div className="flex w-[100%] items-center gap-3">
                          <AutocompleteInput
                            expr={filterParams.name ? filterParams.name : ""}
                            setFilterParam={setFilterParams}
                            options={
                              searchResults
                                ? returnNamesOfObjects(
                                    searchResults,
                                    selectedTab
                                  )
                                : []
                            }
                          ></AutocompleteInput>

                          <div className="ml-5 flex flex-col items-center">
                            {filterParams.subject === "transactions" && (
                              <div className="mb-4 mt-5 w-80">
                                <div className="slider relative h-1 rounded-md bg-violet-100">
                                  <div
                                    ref={progressRef}
                                    className="progress absolute h-2  rounded"
                                  ></div>
                                </div>
                                <div className="range-input relative">
                                  <input
                                    type="range"
                                    value={filterParams.price.min}
                                    onChange={handleMinPrice}
                                    min={0}
                                    step={10}
                                    max={5000}
                                    name="price-range"
                                    id="price-range-low"
                                    className="range-min pointer-events-none absolute -top-1 h-1 w-full cursor-pointer appearance-none bg-transparent accent-violet-500"
                                  />
                                  <input
                                    type="range"
                                    value={filterParams.price.max}
                                    onChange={handleMaxPrice}
                                    min={0}
                                    step={10}
                                    max={5000}
                                    name="price-range"
                                    id="price-range-high"
                                    className="range-max pointer-events-none absolute -top-1 h-1 w-full cursor-pointer appearance-none bg-transparent accent-violet-500"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                          {filterParams.subject === "transactions" && (
                            <div className="flex gap-5 text-violet-400">
                              <p>{formatMoney(filterParams.price.min)}</p>
                              <p>To</p>
                              <p>{formatMoney(filterParams.price.max)}</p>
                            </div>
                          )}
                        </div>
                        {(selectedTab === Tab.Doctors ||
                          selectedTab === Tab.Manufacturers ||
                          selectedTab === Tab.Transactions ||
                          selectedTab === Tab.Products) && (
                          <div className="absolute bottom-0 right-0 flex gap-10">
                            <Image
                              src={cms}
                              alt=""
                              width={128}
                              height={128}
                              className=" object-contain"
                            />
                            <Image
                              src={openPayments}
                              alt=""
                              width={128}
                              height={128}
                              className=" object-contain"
                            />
                          </div>
                        )}
                        {(selectedTab === Tab.Doctors ||
                          selectedTab === Tab.Manufacturers ||
                          selectedTab === Tab.Transactions ||
                          selectedTab === Tab.Products) && (
                          <div className="absolute bottom-0 right-0 flex gap-10">
                            <Image
                              src={cms}
                              alt=""
                              width={128}
                              height={128}
                              className=" object-contain"
                            />
                            <Image
                              src={openPayments}
                              alt=""
                              width={128}
                              height={128}
                              className=" object-contain"
                            />
                          </div>
                        )}
                        {selectedTab === Tab.OpioidTreatmentProviders && (
                          <Image
                            src={cmsDataLogo}
                            alt=""
                            width={128}
                            height={128}
                            className="absolute bottom-0 right-0 object-contain"
                          />
                        )}
                        {selectedTab === Tab.Drugs && (
                          <Image
                            src={fda}
                            alt=""
                            width={128}
                            height={128}
                            className="absolute bottom-0 right-0 object-contain"
                          />
                        )}
                      </div>
                    </>
                  )}
                </>
              )}
          </div>
        </div>
        <div className="relative flex h-[100%] w-full justify-center">

          <div className="ml-5 flex min-h-[100%] w-[95%] flex-col overflow-scroll p-1">
            {isApiProcessing && <LoadingStarHealth />}
            {selectedTab === Tab.ClinicalTrials && (
              <ClinicalTrialsComponent data={clinicalTrialsData} />
            )}
            {selectedTab === Tab.Hospitals && (
              <HospitalsComponent data={hospitalsData} />
            )}
            {selectedTab === Tab.Hospitals &&
              error?.service === "Hospitals" && (
                <ErrorComponent>{error.msg}</ErrorComponent>
              )}
            {selectedTab === Tab.Plans && (
              <HealthPlansList plans={displayHealthPlansData} />
            )}
            {selectedTab === Tab.HospitalOwners && (
              <HospitalOwnersComponent results={hospitalOwnersData} />
            )}
            {selectedTab === Tab.Genetics && (
              <GeneticsComponent data={filteredGenetics} />
            )}
            {selectedTab === Tab.Diseases && (
              <GeneticsComponent data={filteredDiseases} />
            )}
            {selectedTab === Tab.Food && (
              <>
                <FoodsComponent data={filteredFood} />
              </>
            )}
            {selectedTab !== Tab.ClinicalTrials &&
              selectedTab !== Tab.Plans &&
              selectedTab !== Tab.Hospitals &&
              selectedTab !== Tab.HospitalOwners &&
              selectedTab !== Tab.Genetics &&
              selectedTab !== Tab.Diseases &&
              selectedTab !== Tab.Food && (
                <DirectoryCards
                  search={search as string}
                  searchResults={searchResults}
                  filterParams={filterParams}
                  data={data}
                />
              )}
          </div>
        </div>
      </div>
    </>
  );
}