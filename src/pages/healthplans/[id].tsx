import { capitalize } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { catchError, finalize } from "rxjs";
import Citation from "../../components/Citation";
import ExpansionPanel from "../../components/ExpansionPanel";
import { getHealthPlanDetailById } from "../../components/HealthPlans/httpsRequests";
import LoadingStarHealth from "../../components/Loading";
import { formatMoney } from "../../utils";
import BookmarkButton from "../../components/BookmarkButton";
import { DataDirectoryCategory } from "../../utils/Enums/DataDirectoryCategory.enum";

const HealthPlansDetails = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [healthPlanDetail, setHealthPlanDetail] = useState<any>();
  const navigate = useRouter();
  const id = navigate.query.id as string;

  useEffect(() => {
    if (id) {
      setIsProcessing(true);
      getHealthPlanDetailById(id)
        .pipe(
          catchError((error) => {
            console.error("Error fetching getheatlhPlanDetailById:", error);
            return [];
          })
        )
        .pipe(finalize(() => setIsProcessing(false)))
        .subscribe((resp: any) => {
          // console.log(resp?.response, "hpd-data;;;;;");
          setHealthPlanDetail(resp?.response?.plan);
        });
    }
  }, [id]);

  const HealthPlanSummaryJSX = (
    <div className="text-purp-5 flex flex-row whitespace-pre-wrap pt-1 sm:text-xs lg:text-lg">
      <ul className="mb-2 flex grow list-disc flex-col pl-5">
        <li>
          <b>Metal Level</b>: {healthPlanDetail?.metal_level || "-"}
        </li>
        <li>
          <b>Type</b>: {healthPlanDetail?.type || "-"}
        </li>
        <li>
          <b>Market</b>: {healthPlanDetail?.market || "-"}
        </li>
        <li>
          <b>Max child age</b>: {healthPlanDetail?.max_age_child || "-"}
        </li>
        <li>
          <b>HSA Eligible</b>: {healthPlanDetail?.hsa_eligible || "-"}
        </li>
        <li>
          <b>Insurance Market</b>: {healthPlanDetail?.insurance_market || "-"}
        </li>
      </ul>
      <ul className="mb-2 flex grow list-disc flex-col pl-5">
        <li>
          <b>Specialist Referral Required</b>:{" "}
          {healthPlanDetail?.special_referral_required || "-"}
        </li>
        <li>
          <b>Out-of-Pocket Cost (OOPC)</b>:{" "}
          {formatMoney(healthPlanDetail?.oopc)}
        </li>
        <li>
          <b>Tobacco Lookback</b>: {`${healthPlanDetail?.tobacco_lookback}`}
        </li>
        <li>
          <b>Supression State</b>: {`${healthPlanDetail?.suppression_state}`}
        </li>
        <li>
          <b>Guarantee Rate</b>:{" "}
          {capitalize(`${healthPlanDetail?.guaranteed_rate}`)}
        </li>
        <li>
          <b>Simple Choice</b>:{" "}
          {capitalize(`${healthPlanDetail?.simple_choice}`)}
        </li>
      </ul>
      <ul className="mb-2 flex grow list-disc flex-col pl-5">
        <li>
          <b>Is Ineligible</b>:{" "}
          {capitalize(`${healthPlanDetail?.is_ineligible}`)}
        </li>
        <li>
          <b>RX 3mo mail order</b>:{" "}
          {capitalize(`${healthPlanDetail?.rx_3mo_mail_order}`)}
        </li>
        <li>
          <b>Covers nonhyde abortion</b>:{" "}
          {capitalize(`${healthPlanDetail?.covers_nonhyde_abortion}`)}
        </li>
        <li>
          <b>Service area id</b>: {`${healthPlanDetail?.service_area_id}`}
        </li>
      </ul>
    </div>
  );

  const CoverageJSX = (
    <ul className="text-purp-5 list-outside list-disc grid grid-cols-3 whitespace-pre-wrap pl-5 pt-1 sm:text-xs lg:text-lg">
      {healthPlanDetail?.benefits.map((ben: any, index: number) =>
        ben?.covered ? (
          <li className="pr-6" key={index}>
            {ben?.name}
          </li>
        ) : null
      )}
    </ul>
  );

  const DeductibleJSX = (
    <div className="text-purp-5 flex flex-row whitespace-pre-wrap pt-1 sm:text-xs lg:text-lg">
      {healthPlanDetail?.deductibles.map((ded: any, index: number) => (
        <div key={index} className="mb-2 flex grow flex-col">
          <div key={index}>
            <b>Type:</b> {ded?.type}
          </div>
          <div key={index}>
            <b>Family Cost</b>: {ded?.family_cost}
          </div>
          <div key={index}>
            <b>Network Tier</b>: {ded?.network_tier}
          </div>
          <div key={index}>
            <b>Amount</b>: {formatMoney(ded?.amount)}
          </div>
        </div>
      ))}
    </div>
  );

  const EligibleDepedentsJSX = (
    <ul className="text-purp-5 grid grid-cols-3 list-outside list-disc whitespace-pre-wrap pl-5 pt-1 sm:text-xs lg:text-lg">
      {healthPlanDetail?.issuer?.eligible_dependents.map(
        (ben: any, index: number) => (
          <li className="pr-6" key={index}>
            {ben}
          </li>
        )
      )}
    </ul>
  );

  const SBCSJSX = (
    <div className="text-purp-5 flex flex-row whitespace-pre-wrap pt-1 sm:text-xs lg:text-lg">
      <div className="mb-2 flex grow list-disc flex-col">
        <p>
          <b>Baby</b>
        </p>
        <li>
          <b>Coinsurance</b>:{" "}
          {formatMoney(healthPlanDetail?.sbcs?.baby?.coinsurance || 0)}
        </li>
        <li>
          <b>Copay</b>: {formatMoney(healthPlanDetail?.sbcs?.baby?.copay || 0)}
        </li>
        <li>
          <b>Deductible</b>:{" "}
          {formatMoney(healthPlanDetail?.sbcs?.baby?.deductible || 0)}
        </li>
        <li>
          <b>Limit</b>: {formatMoney(healthPlanDetail?.sbcs?.baby?.limit || 0)}
        </li>
      </div>
      <div className="mb-2 flex grow list-disc flex-col">
        <p>
          <b>Diabetes</b>
        </p>
        <li>
          <b>Coinsurance</b>: $
          {formatMoney(healthPlanDetail?.sbcs?.diabetes?.coinsurance || 0)}
        </li>
        <li>
          <b>Copay</b>:{" "}
          {formatMoney(healthPlanDetail?.sbcs?.diabetes?.copay || 0)}
        </li>
        <li>
          <b>Deductible</b>: $
          {formatMoney(healthPlanDetail?.sbcs?.diabetes?.deductible || 0)}
        </li>
        <li>
          <b>Limit</b>:{" "}
          {formatMoney(healthPlanDetail?.sbcs?.diabetes?.limit || 0)}
        </li>
      </div>
      <div className="mb-2 flex grow list-disc flex-col">
        <p>
          <b>Fracture</b>
        </p>
        <li>
          <b>Coinsurance</b>: $
          {formatMoney(healthPlanDetail?.sbcs?.fracture?.coinsurance || 0)}
        </li>
        <li>
          <b>Copay</b>:{" "}
          {formatMoney(healthPlanDetail?.sbcs?.fracture?.copay || 0)}
        </li>
        <li>
          <b>Deductible</b>: $
          {formatMoney(healthPlanDetail?.sbcs?.fracture?.deductible || 0)}
        </li>
        <li>
          <b>Limit</b>:{" "}
          {formatMoney(healthPlanDetail?.sbcs?.fracture?.limit || 0)}
        </li>
      </div>
    </div>
  );

  const expansionPanels = [
    { title: "Summary" || null, content: HealthPlanSummaryJSX },
    { title: "Coverage" || null, content: CoverageJSX },
    { title: "Deductible" || null, content: DeductibleJSX },
    { title: "Eligible Depedents" || null, content: EligibleDepedentsJSX },
    { title: "Summary of Benefits and Coverage" || null, content: SBCSJSX },
  ];

  return isProcessing ? (
    <LoadingStarHealth />
  ) : (
    <>
      <div className="bgColor">
        <div className="rounded bg-white p-5">
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
          </div>
          <div className="flex flex-col justify-end sm:px-2 lg:px-28">

            <div className="flex flex-row justify-between	items-start">
              <p className="text-2xl font-semibold text-violet-700">
                {healthPlanDetail?.name || "-"}
              </p>
              <div className="flex justify-end min-w-[375px]">
                <Citation title={healthPlanDetail?.name || "-"} />
                <div className="ml-1">
                  <BookmarkButton title={healthPlanDetail?.name || "-"} categoryId={DataDirectoryCategory.Insurance} />
                </div>
              </div>
              <div className="my-1">
                <hr />
              </div>
              <div>ID: {healthPlanDetail?.id}</div>
              <div className="mt-4 flex flex-row">
                <div className="pr-10">
                  <p className="pt-1 text-xl font-semibold">Issuer Overview</p>
                  <div className="my-1 mr-8">
                    <hr />
                  </div>
                  <p className="text-purp-2 mt-2 mb-2 font-semibold sm:text-sm lg:text-xl">
                    Name:{" "}
                    <span className="font-normal">
                      {healthPlanDetail?.issuer?.name || "-"}
                    </span>
                  </p>
                  <p className="text-purp-2 mt-2 mb-2 font-semibold sm:text-sm lg:text-xl">
                    State:{" "}
                    <span className="font-normal">
                      {healthPlanDetail?.issuer?.state || "-"}
                    </span>
                  </p>
                  <p className="break-all text-purp-2 mt-2 mb-2 font-semibold sm:text-sm lg:text-xl">
                    Shop URL:{" "}
                    <span className="font-normal">
                      <a
                        style={{ color: "blue" }}
                        rel="noreferrer"
                        target="_blank"
                        href={healthPlanDetail?.issuer?.shop_url}
                      >
                        {healthPlanDetail?.issuer?.shop_url}
                      </a>
                    </span>
                  </p>
                  <p className="text-purp-2 mt-2 mb-2 font-semibold sm:text-sm lg:text-xl">
                    Toll free:{" "}
                    <span className="font-normal">
                      {healthPlanDetail?.issuer?.toll_free || "-"}
                    </span>
                  </p>
                </div>
                <div className="">
                  <p className="pt-1 text-xl font-semibold">Product Overview</p>
                  <div className="my-1 mr-8">
                    <hr />
                  </div>
                  <p className="break-all text-purp-2 mt-2 mb-2 font-semibold sm:text-sm lg:text-xl">
                    Benefit URL:{" "}
                    <span className="font-normal">
                      <a
                        style={{ color: "blue" }}
                        rel="noreferrer"
                        target="_blank"
                        href={healthPlanDetail?.benefits_url}
                      >
                        {healthPlanDetail?.benefits_url}
                      </a>
                    </span>
                  </p>
                  <p className="break-all text-purp-2 mt-2 mb-2 font-semibold sm:text-sm lg:text-xl">
                    Brochure URL:{" "}
                    <span className="font-normal">
                      <a
                        style={{ color: "blue" }}
                        rel="noreferrer"
                        target="_blank"
                        href={healthPlanDetail?.brochure_url}
                      >
                        {healthPlanDetail?.brochure_url}
                      </a>
                    </span>
                  </p>
                  <p className="break-all text-purp-2 mt-2 mb-2 font-semibold sm:text-sm lg:text-xl">
                    Formulary URL:{" "}
                    <span className="font-normal">
                      <a
                        style={{ color: "blue" }}
                        rel="noreferrer"
                        target="_blank"
                        href={healthPlanDetail?.formulary_url}
                      >
                        {healthPlanDetail?.formulary_url}
                      </a>
                    </span>
                  </p>
                </div>
              </div>
              <div className="my-1">
                <hr />
              </div>
              {expansionPanels.map((panel, index) => {
                if (panel.content) {
                  return (
                    <ExpansionPanel
                      key={`${panel.title}-${index}`}
                      title={panel?.title || null}
                      content={panel?.content || null}
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HealthPlansDetails;
