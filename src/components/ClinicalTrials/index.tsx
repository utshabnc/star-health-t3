import Link from "next/link";
import type { ClinicalTrialsListItem, ClinicalTrialsStudyFieldsResponse } from "./ClinicalTrialsStudyFieldsResponse.model";
import NoResultComponent from "../NoResultComponent";
import type {  ClinicalTrialStudies , ClinicalTrialStudy} from "./ClinicalTrialsStudyFieldsResponse.model";


export default function ClinicalTrialsComponent({ data }: { data: ClinicalTrialStudies<ClinicalTrialStudy> }) {
  return (
    <>
    {!data.studies &&
<NoResultComponent title="Clinical Trail"></NoResultComponent>}
      {data.studies?.map((study: ClinicalTrialStudy, index: number) => {
        return (
          <div key={index} className="mb-2 w-[100%] rounded-lg bg-white shadow-lg">
            <div className="p-2">
              <div className="flex flex-row justify-between">
                <div className="flex-auto">
                  <h5 className="text-md mb-2 font-medium text-violet-700 underline w-[75%]">
                    <Link
                      href={`/clinicalTrial/?NCTId=${study?.protocolSection?.identificationModule?.nctId || ''}`}
                    >{study?.protocolSection?.identificationModule?.briefTitle|| '-'}</Link>
                  </h5>
                  <div className="flex flex-row justify-between w-[75%]">
                    <h5 className="text-md mb-2 text-gray-900">
                      {study?.protocolSection?.identificationModule?.officialTitle || '-'}
                    </h5>
                    <p className="mb-1 text-base text-gray-700"> </p>
                  </div>
                  <div className="flex flex-row justify-between text-sm">
                    <p className="mb-1 text-xs text-violet-400">
                      Organization:{" "}
                      {study?.protocolSection?.identificationModule?.organization?.fullName || '-'}
                    </p>
                    <div className="border-gray-300 text-gray-600"></div>
                  </div>
                </div>
                <div className="w-[25%]">
                  <div className="flex flex-col">
                    <p className="mb-1 text-gray-600 text-sm text-right">
                      Start Date: {study?.protocolSection?.statusModule?.startDateStruct?.date || '-'}
                      <br />
                    </p>
                    <p className="mb-1 text-gray-600 text-sm text-right">
                      Completion Date: {study?.protocolSection?.statusModule?.completionDateStruct?.date  || '-'}
                      <br />
                    </p>
                    <p className="mb-1 text-gray-600 text-sm text-right">
                      Status: {study?.protocolSection?.statusModule?.overallStatus || '-'}
                      <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
