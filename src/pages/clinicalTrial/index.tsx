import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { finalize } from "rxjs";
import { getClinicalTrialByNCTId } from "../../components/ClinicalTrials/helpers";
import type { ClinicalTrialsFullStudyResponse } from '../../components/ClinicalTrials/ClinicalTrialsFullStudyResponse.model';
import ExpansionPanel from "../../components/ExpansionPanel";
import { MailIcon, OfficeBuildingIcon, PhoneIcon, UserIcon } from '@heroicons/react/solid';
import Citation from "../../components/Citation";
import BookmarkButton from "../../components/BookmarkButton";
import { DataDirectoryCategory } from "../../utils/Enums/DataDirectoryCategory.enum";
import type { SingleStudyLegacy } from '../../components/ClinicalTrials/ClinicalTrialsFullStudyResponse.model';
import NoResultComponent from "../../components/NoResultComponent";

const ClinicalTrialDetails = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [clinicalTrialData, setClinicalTrialData] = useState<SingleStudyLegacy>();
  const [isCompared, setIsCompared] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useRouter();

  const NCTId = navigate.query?.NCTId as string;


  useEffect(() => {
    console.log(isError);
  
    if (NCTId) {
      setIsProcessing(true);
  
      fetch(`/api/clinical-trial/clinical-trial?NCTId=${NCTId}`)
        .then((res) => {
          if (!res.ok) {
           setIsError(true);
          }
          return res.json();
        })
        .then((data) => {
          setClinicalTrialData(data);
        })
        .catch((error) => {
          setIsError(true); // Network or other fetch error
          console.log('An Error occurred: ', error);
        })
        .finally(() => {
          setIsProcessing(false);
        });
    }
  }, [NCTId]);
  



 
  

  const SummaryJSX = clinicalTrialData?.protocolSection?.descriptionModule?.briefSummary ?
  <div className="text-purp-5 pt-1 sm:text-xs lg:text-lg whitespace-pre-wrap">
    {clinicalTrialData?.protocolSection?.descriptionModule?.briefSummary || '-'}
  </div> :
  <div>-</div>;

const DescriptionJSX =
  clinicalTrialData?.protocolSection?.descriptionModule ?
    <div className="flex-col">
      <div className="whitespace-pre-wrap text-purp-5 pt-1 sm:text-xs lg:text-lg">
        {clinicalTrialData?.protocolSection?.descriptionModule?.detailedDescription || '-'}
      </div>
    </div> :
    <div>-</div>;

const EligibilityJSX =
  clinicalTrialData?.protocolSection?.eligibilityModule ?
    <div className="flex flex-col whitespace-pre-wrap text-purp-5 pt-1 sm:text-xs lg:text-lg">
      <div className="mb-2 flex flex-col">
        <div>Gender: {clinicalTrialData?.protocolSection?.eligibilityModule?.sex || '-'}</div>
        <div>Healthy Volunteers : {clinicalTrialData?.protocolSection?.eligibilityModule?.healthyVolunteers ? 'Yes' : 'No' || '-'}</div>
        <div>Min Age: {clinicalTrialData?.protocolSection?.eligibilityModule?.minimumAge || '-'}</div>
        <div>Max Age: {clinicalTrialData?.protocolSection?.eligibilityModule?.maximumAge || '-'}</div>
      </div>
      <div>
        {clinicalTrialData?.protocolSection.eligibilityModule.eligibilityCriteria || '-'}
      </div>
    </div> :
    <div>-</div>;

const DesignJSX = clinicalTrialData?.protocolSection?.designModule ?
  <div className="flex flex-col whitespace-pre-wrap text-purp-5 pt-1 sm:text-xs lg:text-lg">
    <div className="mb-2 flex flex-col">
      <div><span className="font-semibold">Description:</span> {clinicalTrialData?.protocolSection?.designModule?.designInfo?.interventionModelDescription || '-'}</div>
      <div><span className="font-semibold">Study Type:</span> {clinicalTrialData?.protocolSection?.designModule?.studyType || '-'}</div>
      <div><span className="font-semibold">Primary Purpose:</span> {clinicalTrialData?.protocolSection?.designModule?.designInfo?.primaryPurpose || '-'}</div>
      <div><span className="font-semibold">Allocation:</span> {clinicalTrialData?.protocolSection?.designModule?.designInfo?.allocation || '-'}</div>
      <div><span className="font-semibold">Intervention Model:</span> {clinicalTrialData?.protocolSection?.designModule?.designInfo?.interventionModel || '-'}</div>
      <div><span className="font-semibold">Masking:</span> {clinicalTrialData?.protocolSection.designModule?.designInfo?.maskingInfo?.maskingDescription || '-'}</div>
      <div><span className="font-semibold">Enrollment Count:</span> {clinicalTrialData?.protocolSection?.designModule?.enrollmentInfo?.count || '-'}</div>
      <div><span className="font-semibold">Enrollment Type:</span> {clinicalTrialData?.protocolSection?.designModule?.enrollmentInfo?.type || '-'}</div>
      <div><span className="font-semibold">Phase:</span> {clinicalTrialData?.protocolSection?.designModule?.phases.join(', ') || '-'}</div>
    </div>
  </div> :
  <div>-</div>;

const expansionPanels = [
  { title: 'Summary' || null, content: SummaryJSX },
  { title: 'Description' || null, content: DescriptionJSX },
  { title: 'Eligibility' || null, content: EligibilityJSX },
  { title: 'Design' || null, content: DesignJSX },
]



useEffect(() => {
  const isTrialInCompareList = () => {
    if (typeof window !== 'undefined' && clinicalTrialData) {
      const compareTrials = JSON.parse(localStorage.getItem('compareTrials') || '[]');
      return compareTrials.some((compTrial: SingleStudyLegacy) => compTrial?.protocolSection.identificationModule?.briefTitle === clinicalTrialData?.protocolSection.identificationModule?.briefTitle);
    }
    
    return false;
  };

  setIsCompared(isTrialInCompareList());
}, [clinicalTrialData]);

const handleClick = () => {
  if (typeof window !== 'undefined') {
    const compareTrials = JSON.parse(localStorage.getItem('compareTrials') || '[]');
    console.log(compareTrials);
    if (compareTrials.some((compTrial: SingleStudyLegacy) => compTrial?.protocolSection.identificationModule?.briefTitle === clinicalTrialData?.protocolSection.identificationModule?.briefTitle)) {
      return;
    }
    
    compareTrials.push(clinicalTrialData);

    localStorage.setItem('compareTrials', JSON.stringify(compareTrials));
    setIsCompared(true);
  }
};

const removeCompare = () => {
  if (typeof window !== 'undefined' && clinicalTrialData) {
    const compareTrials = JSON.parse(localStorage.getItem('compareTrials') || '[]');

    const index = compareTrials.findIndex((compTrial: SingleStudyLegacy) => compTrial?.protocolSection.identificationModule?.briefTitle === clinicalTrialData?.protocolSection.identificationModule?.briefTitle);

    if (index !== -1) {
      compareTrials.splice(index, 1);
    }

    localStorage.setItem('compareTrials', JSON.stringify(compareTrials));
    setIsCompared(false);
  }
};

if (!NCTId ) {
  return <NoResultComponent title="Clinical Trail" />;
}

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
  ) : !isError ? (
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
                {clinicalTrialData?.protocolSection?.identificationModule?.briefTitle || '-'}
              </p>
              <div className="flex justify-end min-w-[375px]">
              <div>
                  <Citation title={clinicalTrialData?.protocolSection?.identificationModule?.briefTitle || '-'} />
                </div> 
                <div className="ml-1">
                  <BookmarkButton title={clinicalTrialData?.protocolSection?.identificationModule?.briefTitle || ''} categoryId={DataDirectoryCategory.ClinicalTrials} />
                </div>
                <div className="ml-1">
                <button
                  className="ease focus:shadow-outline select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none"
                  onClick={isCompared ? removeCompare : handleClick}
                >
                  {isCompared ? 'Remove Compare' : 'Compare'}
                </button>
              </div>
              </div>
            </div>
            <div className="my-1">
              <hr />
            </div>
            <div className="flex flex-row mt-4">
              <div className="flex-auto">
                <p className="text-xl font-semibold pt-1">
                  Overview
                </p>
                <div className="my-1 mr-8">
                  <hr />
                </div>
                <p className="text-purp-2 font-semibold sm:text-sm lg:text-xl mt-2 mb-2">
                  Organization: <span className="font-normal">{clinicalTrialData?.protocolSection?.identificationModule?.organization?.fullName || '-'}</span>
                </p>
                <p className="text-purp-2 font-semibold sm:text-sm lg:text-xl mt-2 mb-2">
                  Status: <span className="font-normal">{clinicalTrialData?.protocolSection?.statusModule?.overallStatus || '-'}</span>
                </p>
                <p className="text-purp-2 font-semibold sm:text-sm lg:text-xl mt-2 mb-2">
                  Start Date: <span className="font-normal">{clinicalTrialData?.protocolSection?.statusModule?.startDateStruct?.date || '-'}</span>
                </p>
                <p className="text-purp-2 font-semibold sm:text-sm lg:text-xl mt-2 mb-2">
                  Completion Date: <span className="font-normal">{clinicalTrialData?.protocolSection?.statusModule?.primaryCompletionDateStruct?.date || '-'}</span>
                </p>
                <p className="text-purp-2 font-semibold sm:text-sm lg:text-xl mt-2 mb-2">
                  Completion Date Status: <span className="font-normal">{clinicalTrialData?.protocolSection?.statusModule?.primaryCompletionDateStruct?.date || '-'}</span>
                </p>
                <p className="text-purp-2 font-semibold sm:text-sm lg:text-xl mt-2 mb-2">
                  Conditions: {
                    clinicalTrialData?.protocolSection?.conditionsModule?.conditions?.length ?
                      <span className="font-normal">{clinicalTrialData?.protocolSection?.conditionsModule?.conditions.join(', ')}</span> :
                      '-'
                  }
                </p>
              </div>
              <div className="flex-auto">
                <div className="flex-col text-purp-5 pt-1 sm:text-xs lg:text-lg ">
                  <p className="text-xl font-semibold">
                    Contact Info
                  </p>
                  <div className="my-1">
                    <hr />
                  </div>
                  {clinicalTrialData?.protocolSection?.contactsLocationsModule?.overallOfficials?.map((official, index) => {
                    return <div key={index} className="flex flex-row mb-2">
                      <div className="flex-auto">{official.name}</div>
                      <div className="flex flex-col w-[50%]">
                        <div className="flex flex-row items-center">
                          <UserIcon className="h-4 w-4 mr-1" />
                          {official?.role || '-'}
                        </div>
                        <div className="flex flex-row items-center">
                          <OfficeBuildingIcon className="h-4 w-4 mr-1" />
                          {official?.affiliation || '-'}
                        </div>
                      </div>
                    </div>
                  })}
                  {/*{clinicalTrialData?.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.ContactsLocationsModule.CentralContactList?.CentralContact.map((contact, index) => {
                    return <div key={index} className="flex flex-row mb-2">
                      <div className="flex-auto">{contact.CentralContactName}</div>
                      <div className="flex flex-col w-[50%]">
                        <div className="flex flex-row items-center">
                          <UserIcon className="h-4 w-4 mr-1" />
                          {contact?.CentralContactRole || '-'}
                        </div>
                        <div className="flex flex-row items-center">
                          <MailIcon className="h-4 w-4 mr-1" />
                          {contact?.CentralContactEMail || '-'}
                        </div>
                        <div className="flex flex-row items-center">
                          <PhoneIcon className="h-4 w-4 mr-1" />
                          {contact?.CentralContactPhone || '-'}
                        </div>
                      </div>
                    </div>
                  })}*/}
                </div>
              </div>
            </div>
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
        </div>
      </div>
    </>
  ) : (
    <>
    <NoResultComponent title="Clinical Trail" />
    </>
  )
)
};

export default ClinicalTrialDetails;