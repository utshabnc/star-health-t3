import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { catchError, finalize } from "rxjs";
import ExpansionPanel from "../../components/ExpansionPanel";
import { getHealthPlanDetailById } from "../../components/HealthPlans/httpsRequests";
import LoadingStarHealth from "../../components/Loading";

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
          console.log(resp?.response, "hpd-data;;;;;");
          setHealthPlanDetail(resp?.response?.plan);
        });
    }
  }, [id]);

  const HealthPlanSummaryJSX = (
    <div className="text-purp-5 flex flex-col whitespace-pre-wrap pt-1 sm:text-xs lg:text-lg">
      <div className="mb-2 flex flex-col">
        {/* <div>Premium: {healthPlanDetail?.premium || "-"}</div> */}
        <div>Metal Level: {healthPlanDetail?.metal_level || "-"}</div>
        <div>Type: {healthPlanDetail?.type || "-"}</div>
        <div>Market: {healthPlanDetail?.market || "-"}</div>
      </div>
    </div>
  );

  const CoverageJSX = (
    <div className="text-purp-5 flex flex-col whitespace-pre-wrap pt-1 sm:text-xs lg:text-lg">
      <div className="mb-2 flex flex-col">
        {healthPlanDetail?.benefits.map((ben: any, index: number) =>
          ben?.covered ? <div key={index}>{ben?.name}</div> : null
        )}
      </div>
    </div>
  );

  const DeductibleJSX = (
    <div className="text-purp-5 flex flex-col whitespace-pre-wrap pt-1 sm:text-xs lg:text-lg">
      {healthPlanDetail?.deductibles.map((ded: any, index: number) => (
        <div key={index} className="mb-2 flex flex-col">
          <div key={index}>Type: {ded?.type}</div>
          <div key={index}>Family cost: {ded?.family_cost}</div>
          <div key={index}>Network Tier: {ded?.network_tier}</div>
          <div key={index}>Amount: {ded?.amount}</div>
        </div>
      ))}
    </div>
  );

  const expansionPanels = [
    { title: "Summary" || null, content: HealthPlanSummaryJSX },
    { title: "Coverage" || null, content: CoverageJSX },
    { title: "Deductible" || null, content: DeductibleJSX },
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
            <p className="text-2xl font-semibold text-violet-700">
              {healthPlanDetail?.name || "-"}
            </p>
            <div className="my-1">
              <hr />
            </div>
            <div className="mt-4 flex flex-row">
              <div className="flex-auto">
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
                <p className="text-purp-2 mt-2 mb-2 font-semibold sm:text-sm lg:text-xl">
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
              <div className="flex-auto">
                <p className="pt-1 text-xl font-semibold">Product Overview</p>
                <div className="my-1 mr-8">
                  <hr />
                </div>
                <p className="text-purp-2 mt-2 mb-2 font-semibold sm:text-sm lg:text-xl">
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
                <p className="text-purp-2 mt-2 mb-2 font-semibold sm:text-sm lg:text-xl">
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
                <p className="text-purp-2 mt-2 mb-2 font-semibold sm:text-sm lg:text-xl">
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
      {/* <div>HEllO</div> */}
    </>
  );
};

export default HealthPlansDetails;
