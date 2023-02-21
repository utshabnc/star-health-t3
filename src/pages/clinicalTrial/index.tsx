import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { finalize } from "rxjs";
import { getClinicalTrialByOfficialTitle } from "../../components/ClinicalTrials/helpers";
import type { ClinicalTrialsFullStudyResponse } from '../../components/ClinicalTrials/ClinicalTrialsFullStudyResponse.model';
import ExpansionPanel from "../../components/ExpansionPanel";

const ClinicalTrialDetails = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [clinicalTrialData, setClinicalTrialData] = useState<ClinicalTrialsFullStudyResponse>();
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  const navigate = useRouter();
  const officialTitle = navigate.query?.officialTitle as string;
  console.log(officialTitle);


  useEffect(() => {
    if (isInitialLoad && officialTitle) {
      setIsInitialLoad(false);
      setIsProcessing(true);
      const clinicalTrialRequest = getClinicalTrialByOfficialTitle(officialTitle);
      clinicalTrialRequest.pipe(
        finalize(() => setIsProcessing(false))
      ).subscribe((data: ClinicalTrialsFullStudyResponse) => {
        setClinicalTrialData(data);
      });
    }

  }, [isInitialLoad, officialTitle]);

  const expansionPanels = [
    { title: 'Arms Interventions' || null, content: <div>TODO: Arms Interventions</div> },
    { title: 'Conditions' || null, content: <div>TODO: Conditions</div> },
    { title: 'Contacts' || null, content: <div>TODO: Contacts</div> },
    { title: 'Description' || null, content: <div>TODO: Description</div> },
    { title: 'Design' || null, content: <div>TODO: Design</div> },
    { title: 'Eligibility' || null, content: <div>TODO: Eligibility</div> },
    { title: 'IPD Sharing' || null, content: <div>TODO: IPD Sharing</div> },
    { title: 'Identification' || null, content: <div>TODO: Identification</div> },
    { title: 'Outcomes' || null, content: <div>TODO: Outcomes</div> },
    { title: 'Oversight' || null, content: <div>TODO: Oversight</div> },
    { title: 'Sponsor and Collaborators' || null, content: <div>TODO: Sponsor and Collaborators</div> },
    { title: 'Status' || null, content: <div>TODO: Status</div> },
  ]

  return (
    isProcessing ? (
      <>
        <div className="bgColor">
          <div
            style={{
              height: "800px",
            }}
            className="rounded bg-white p-5"
          >
            <div className="flex flex-row">
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
    ) : (
      <>
        <div className="flex flex-col justify-end sm:px-2 lg:px-28">
          <p className="text-2xl font-semibold text-violet-700">
            {clinicalTrialData?.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.IdentificationModule.OfficialTitle || '-'}
          </p>

          <p className="text-purp-2 font-semibold sm:text-sm lg:text-xl">
            Organization: {clinicalTrialData?.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.IdentificationModule.Organization.OrgFullName || '-'}
          </p>
          <p className="text-purp-5 pt-1 sm:text-xs lg:text-lg">
            {clinicalTrialData?.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.DescriptionModule.BriefSummary || '-'}
          </p>
          <p className="text-purp-5 pt-1 sm:text-xs text-violet-700">
            Start Date: {clinicalTrialData?.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.StatusModule.StartDateStruct.StartDate || '-'}
          </p>
          <div className="my-1">
            <hr />
          </div>
          {expansionPanels.map((panel, index) => {
            if (panel.content) {
              return (
                <ExpansionPanel key={`${panel.title}-${index}`} title={panel?.title || null} content={panel?.content || null} />
              )
            }
          })}
        </div>
      </>
    )
  )
};

export default ClinicalTrialDetails;
