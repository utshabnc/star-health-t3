import { useRouter } from "next/router";
import { ChevronDownIcon } from '@heroicons/react/solid';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from "react";
import ExpansionPanel from "../../components/ExpansionPanel";
import LoadingStarHealth from "../../components/Loading";
import type { HospitalData } from "../../components/Hospitals/HospitalData.model";
import ErrorComponent from "../../components/ErrorComponent";
import type { HospitalDataResponse } from "../api/hospitals/[hospital_id]";
import { delay } from "../../utils";

enum Section {
  overview = "Overview",
  medicaid = "Medicaid",
  summary = "Summary",
  financialsAndTaxes = "Financials & Taxes",
  statistics = "Statistics",
  incomeMetrics = "Income Metrics",
}

enum FieldType {
  currency = "currency"
}

type Field = {
  code: string,
  description: string;
  type?: FieldType;
}

interface Sections {
  [Section.overview]: Field[];
  [Section.medicaid]: Field[];
  [Section.summary]: Field[];
  [Section.financialsAndTaxes]: Field[];
  [Section.statistics]: Field[];
  [Section.incomeMetrics]: Field[];
}

const OpioidTreatmentDetails = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [hospitalDetails, setHospitalDetails] = useState<HospitalData[]>();
  const [currentHospitalDetails, setCurrentHospitalDetails] = useState<HospitalData>();
  const [error, setError] = useState<any>();
  const [year, setYear] = useState<string | undefined>("");
  const [availableYears, setAvailableYears] = useState<string[]>([]);


  const navigate = useRouter();
  const hospitalId = navigate.query?.hospital_id as string;

  const hospitalDataTemplate: Sections = {
    [Section.overview]: [
      {
        code: "tot_revenue",
        description: "Total revenue",
        type: FieldType.currency,
      },
      {
        code: "tot_func_exp",
        description: "Total functional expenses",
        type: FieldType.currency,
      },
      {
        code: "hospital_data_id",
        description: "Internal hospital data ID",
      },
      {
        code: "data_ein",
        description: "EIN within data year",
      },
      {
        code: "data_name",
        description: "Hospital name within data year",
      },
      {
        code: "updated_dt",
        description: "Date record was updated",
      },
      {
        code: "form_990_filed_part_grp_ret_f",
        description: "Form 990 was filed as part of a group return",
      },
      {
        code: "form_990_num_fac_oper",
        description: "Form 990 number of facilities operated",
      },
      {
        code: "form_990_name",
        description: "Form 990 name",
      },
    ],
    [Section.medicaid]: [
      {
        code: "st_impl_aca_medcd_exp_cvrg_adlts_w_incs_up_138pct_fpl_f",
        description:
          "State implemented ACA Medicaid expansion covering adults with incomes up to 138% FPL",
      },
      {
        code: "st_inc_elig_prnts_dep_chldrn_enrol_medcd_ltd_76pct_fpl_less_f",
        description:
          "State income eligibility for parents of dependent children enrolling in Medicaid limited to 76% FPL or less",
      },
    ],
    [Section.summary]: [
      {
        code: "hosp_rpt_comm_bldg_actvs_f",
        description: "Did hospital report community building activities?",
      },
      {
        code: "st_law_req_hosp_rpt_comm_bnfts_f",
        description:
          "State law requiring hospital to report community benefits",
      },
      {
        code: "sole_comm_prov_f",
        description: "Sole community provider",
      },
      {
        code: "written_fncl_asst_policy_f",
        description: "Written financial assistance policy",
      },
      {
        code: "used_fed_pov_gdlns_det_elig_free_disc_care_f",
        description:
          "Used federal poverty guidelines to determine eligibility for free or discounted care",
      },
      {
        code: "rpted_credit_agency_f",
        description: "Reported to credit agency",
      },
      {
        code: "filed_lawsuit_f",
        description: "Filed lawsuit",
      },
      {
        code: "placed_liens_resdnc_f",
        description: "Placed liens on residence",
      },
      {
        code: "issued_body_attch_f",
        description: "Issued body attachments",
      },
      {
        code: "chna_cond_comm_hlth_needs_assmt_f",
        description: "Conducted community health needs assessment (CHNA)",
      },
      {
        code: "chna_defined_comm_served_f",
        description: "CHNA defined the community served",
      },
      {
        code: "chna_took_into_acct_input_ppl_rep_broad_intrst_comm_served_f",
        description:
          "CHNA took into account input from persons who represent broad interests of the community served",
      },
      {
        code: "chna_cond_w_mult_hosp_facilities_f",
        description: "CHNA conducted with multiple hospital facilities",
      },
      {
        code: "chna_made_wide_avail_pub_f",
        description: "CHNA made widely available to the public",
      },
      {
        code: "hosp_adp_imp_stg_addr_hlth_needs_comm_f",
        description:
          "Hospital adopted implementation strategy to address health needs of community",
      },
      {
        code: "hosp_exe_imp_stg_addr_hlth_needs_comm_f",
        description:
          "Hospital executed implementation strategy addressing health needs of community",
      },
      {
        code: "hosp_prtcp_dev_commwide_comm_bnft_plan_f",
        description:
          "Hospital participated in development of community-wide community benefit plan",
      },
    ],
    [Section.financialsAndTaxes]: [
      {
        code: "tot_func_exp",
        description: "Total functional expenses",
      },
      {
        code: "tot_revenue",
        description: "Total revenue",
      },
      {
        code: "tot_comm_bnfts",
        description: "Total community benefits",
      },
      {
        code: "chrty_care",
        description: "Charity care",
      },
      {
        code: "unreim_medcd",
        description: "Unreimbursed Medicaid",
      },
      {
        code: "unreim_costs",
        description: "Unreimbursed costs",
      },
      {
        code: "comm_hlth_impr_svcs_comm_bnft_oper",
        description:
          "Community health improvement services and community benefit operations",
      },
      {
        code: "hlth_prof_educ",
        description: "Health professions education",
      },
      {
        code: "subsd_hlth_svcs",
        description: "Subsidized health services",
      },
      {
        code: "rsrch",
        description: "Research",
      },
      {
        code: "cash_inknd_contrib_comm_grps",
        description: "Cash and in-kind contributions to community groups",
      },
      {
        code: "comm_bldg_actvs",
        description: "Community building activities",
      },
      {
        code: "comm_bldg_actvs_physimprvhse",
        description: "Physical improvements and housing",
      },
      {
        code: "comm_bldg_actvs_econdevlp",
        description: "Economic development",
      },
      {
        code: "comm_bldg_actvs_cmntysuprt",
        description: "Community support",
      },
      {
        code: "comm_bldg_actvs_envrnimprv",
        description: "Environmental improvements",
      },
      {
        code: "comm_bldg_actvs_ldrdevlp",
        description:
          "Leadership development and training for community members",
      },
      {
        code: "comm_bldg_actvs_cltnbldg",
        description: "Coalition building",
      },
      {
        code: "comm_bldg_actvs_htlhimprvadvcy",
        description: "Community health improvement advocacy",
      },
      {
        code: "comm_bldg_actvs_wrkfrcdevlp",
        description: "Workforce development",
      },
      {
        code: "comm_bldg_actvs_other",
        description: "Other",
      },
      {
        code: "bad_debt",
        description: "Bad debt",
      },
      {
        code: "bad_debt_tot_func_exp_atrb_pat_elig_fncl_asst",
        description:
          "Bad debt, attributable to patients eligible for financial assistance",
      },
      {
        code: "mdcre_shrtfl",
        description: "Medicare Shortfall (negative value indicates surplus)",
      },
    ],
    [Section.statistics]: [
      {
        code: "comm_bldg_actvs_physimprvhse_pct",
        description:
          "Physical improvements and housing percentage of community building activities",
      },
      {
        code: "comm_bldg_actvs_econdevlp_pct",
        description:
          "Economic development percentage of community building activities",
      },
      {
        code: "comm_bldg_actvs_cmntysuprt_pct",
        description:
          "Community support percentage of community building activities",
      },
      {
        code: "comm_bldg_actvs_envrnimprv_pct",
        description:
          "Environmental improvements percentage of community building activities",
      },
      {
        code: "comm_bldg_actvs_ldrdevlp_pct",
        description:
          "Leadership development and training for community members percentage of community building activities",
      },
      {
        code: "comm_bldg_actvs_cltnbldg_pct",
        description:
          "Coalition building percentage of community building activities",
      },
      {
        code: "comm_bldg_actvs_htlhimprvadvcy_pct",
        description:
          "Community health improvement advocacy percentage of community building activities",
      },
      {
        code: "comm_bldg_actvs_wrkfrcdevlp_pct",
        description:
          "Workforce development percentage of community building activities",
      },
      {
        code: "comm_bldg_actvs_other_pct",
        description: "Other percentage of community building activities",
      },
      {
        code: "tot_comm_bnfts_tot_func_exp_pct",
        description:
          "Total community benefits as % of total functional expenses",
      },
      {
        code: "chrty_care_tot_func_exp_pct",
        description: "Charity care as % of total functional expenses",
      },
      {
        code: "unreim_medcd_tot_func_exp_pct",
        description: "Unreimbursed Medicaid as % of total functional expenses",
      },
      {
        code: "unreim_costs_tot_func_exp_pct",
        description: "Unreimbursed costs as % of total functional expenses",
      },
      {
        code: "comm_hlth_impr_svcs_comm_bnft_oper_tot_func_exp_pct",
        description:
          "Community health improvement services and community benefit operations as % of total functional expenses",
      },
      {
        code: "hlth_prof_educ_tot_func_exp_pct",
        description:
          "Health professions education as % of total functional expenses",
      },
      {
        code: "subsd_hlth_svcs_tot_func_exp_pct",
        description:
          "Subsidized health services as % of total functional expenses",
      },
      {
        code: "rsrch_tot_func_exp_pct",
        description: "Research as % of total functional expenses",
      },
      {
        code: "cash_inknd_contrib_comm_grps_tot_func_exp_pct",
        description:
          "Cash and in-kind contributions to community groups as % of total functional expenses",
      },
      {
        code: "comm_bldg_actvs_tot_func_exp_pct",
        description:
          "Community building activities as % of total functional expenses",
      },
      {
        code: "bad_debt_tot_func_exp_pct",
        description: "Bad debt as % of total functional expenses",
      },
      {
        code: "bad_debt_tot_func_exp_atrb_pat_elig_fncl_asst_pct",
        description:
          "Bad debt as % of total functional expenses, attributable to patients eligible for financial assistance",
      },
      {
        code: "mdcre_shrtfl_tot_func_exp_pct",
        description:
          "Medicare Shortfall as % of total functional expenses (negative value indicates surplus)",
      },
      {
        code: "rat_pat_care_npat_care_comm_bnfts",
        description:
          "Ratio of Patient Care to Non-patient Care Community Benefits",
      },
    ],
    [Section.incomeMetrics]: [
      {
        code: "per_capita_inc_qrt",
        description: "Quartile of per capita income",
      },
      {
        code: "med_hsehld_inc_qrt",
        description: "Quartile of median household income",
      },
      {
        code: "percent_ppl_pov_qrt",
        description: "Quartile of percent persons in poverty",
      },
      {
        code: "percent_ppl_65_yrs_old_without_hlth_insr_qrt",
        description:
          "Quartile of percent persons <65 years old without health insurance",
      },
      {
        code: "unemp_rate_16_yrs_older_qrt",
        description: "Quartile of unemployment rate, 16 years and older",
      },
    ],
  };

  useEffect(() => {
    if (hospitalId) {
      setIsProcessing(true);
      const fetchHospitalData = async (hospitalId: string) => {
        try {
          setIsProcessing(true);
          const response = await fetch(`/api/hospitals/${hospitalId}`);
          const data: HospitalDataResponse = await response.json();
          if (response.status != 200) {
            setError(data);
          } else {
            setHospitalDetails(data.hospitalData);
            setAvailableYears(data.hospitalData.map(hospital => hospital.fiscal_yr))
            setYear(data.hospitalData.at(-1)?.fiscal_yr); // Get last year
            setCurrentHospitalDetails(data.hospitalData.at(-1)); // Get data for last year
          }
        } catch (error) {
          setError(error);
        } finally {
          setIsProcessing(false);
        }
      };
      fetchHospitalData(hospitalId);
    }
    
  }, [hospitalId]);

  const formatData = (data: HospitalData, field: Field, section: Section): string => {
    
    const fieldValue = data[field.code] ? String(data[field.code]) : '';

    if (!fieldValue) {
      return "";
    }

    // Create our currency formatter.
    const currencyFormatter = 
      new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}); 
    // Create our number formatter.
    const numberFormatter = 
      new Intl.NumberFormat('en-US', {maximumFractionDigits: 2, minimumFractionDigits: 2})
    
    switch (section) {
      case Section.financialsAndTaxes:
        return `${currencyFormatter.format(parseFloat(fieldValue))}`;
      case Section.statistics:
        return `${numberFormatter.format(parseFloat(fieldValue))}%`;
    
      default:
        const lowerStr = fieldValue.toLowerCase();
        if (lowerStr === 'y') {
          return "Yes";
        } else if (lowerStr === 'n') {
          return "No";
        } else if (field.type == FieldType.currency) {
          return `${currencyFormatter.format(parseFloat(fieldValue))}`
        }
        break;
    }
    
    return fieldValue;
  }

  const generateUiField = (data: HospitalData, field: Field, section: Section) => {
    return (
      <p 
        key={`${section}-${field.code}`} 
        className={section == Section.overview 
          ? 'text-purp-2 font-semibold sm:text-sm lg:text-xl mt-2 mb-2' 
          : 'text-purp-5 pt-1 sm:text-xs lg:text-lg font-semibold'}>
        {`${field.description}: `}
        <span className="font-normal">
          {formatData(data, field, section)}
        </span>
      </p>
    );
  };

  const generateExpansionPanel = (data:HospitalData, section: Section): JSX.Element  => {
    return (
      <ExpansionPanel
        key={section}
        title={section}
        content={
          <>
            {hospitalDataTemplate[section].map((field) => {
              return generateUiField(data, field, section);
            })}
          </>
        }
      />
    );
  }

  const generateSection = (section: Section): JSX.Element => {
    // if (hospitalDetails && index !== hospitalDetails?.length - 1) return <></> // This way I only return the data for latest fiscal year
    if (!currentHospitalDetails) return <></>
    switch (section) {
      case Section.overview:
        return (
          <div className="mt-4 flex">
            <div className="pr-10">
              <p className="pt-1 text-2xl font-semibold">{section}</p>
              <div className="my-1 mr-8">
                <hr />
              </div>

              {hospitalDataTemplate[section].map((field) => {
                return generateUiField(currentHospitalDetails, field, section);
              })}
            </div>
          </div>
        );

      case Section.medicaid:
        return generateExpansionPanel(currentHospitalDetails, section)
      case Section.summary:
        return generateExpansionPanel(currentHospitalDetails, section)
      case Section.financialsAndTaxes:
          return generateExpansionPanel(currentHospitalDetails, section)
      case Section.statistics:
        return generateExpansionPanel(currentHospitalDetails, section)
      case Section.incomeMetrics:
        return generateExpansionPanel(currentHospitalDetails, section)

    }
  };

  const onChangeYear = async (year: string): Promise<void> => {
    setYear(year);
    setIsProcessing(true);
    await delay(500); // Fake a delay to simulat data loading
    setCurrentHospitalDetails(hospitalDetails?.filter((hospitalData) => hospitalData.fiscal_yr === year).at(0))
    setIsProcessing(false);
  }

  const classNames = (...classes: string[]): string => {
    return classes.filter(Boolean).join(' ');
  }

  if (error && error.service === "Hospitals") {
    return <ErrorComponent>{error.msg}</ErrorComponent>;
  }

  return !hospitalDetails || isProcessing ? (
    <LoadingStarHealth />
  ) : (
    <>
      <div className="bgColor">
        <div className="rounded bg-white p-5">
          <div className="flex flex-row">
            <div>
              <button
                title="goBack"
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
          </div>
          <div className="flex flex-col justify-end sm:px-2 lg:px-28">
            <p className="text-2xl font-semibold text-violet-700">
              {hospitalDetails?.at(0)?.data_name}
            </p>

            <div className="my-1"><hr /></div>

            <div className="flex justify-center items-center py-2">
              <div className="flex flex-row text-lg font-semibold">
                Hospital for:&nbsp;
                <div className="text-violet-700">
                  {year}
                </div>
              </div>
            

              <Menu as="div" className="relative text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center bg-white text-sm font-medium text-gray-700">
                    <ChevronDownIcon
                      className="ml-1 mt-1 h-5 w-5"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 h-56 w-56 origin-top-right divide-y divide-gray-100 overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {availableYears.map((year, i) => (
                      <div key={i} className="flex justify-center py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              value={year}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block w-full overflow-y-auto px-4 py-2 text-sm "
                              )}
                              onClick={() => onChangeYear(year)}
                            >
                              {year}
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>

            {generateSection(Section.overview)}
            <div className="my-1"><hr /></div>
            {generateSection(Section.medicaid)}
            {generateSection(Section.summary)}
            {generateSection(Section.financialsAndTaxes)}
            {generateSection(Section.statistics)}
            {generateSection(Section.incomeMetrics)}

          </div>
        </div>
      </div>
    </>
  );
};

export default OpioidTreatmentDetails;
