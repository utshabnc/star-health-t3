import Link from "next/link";
import type { ClinicalTrialsListItem, ClinicalTrialsStudyFieldsResponse } from "./ClinicalTrialsStudyFieldsResponse.model";
import NoResultComponent from "../NoResultComponent";

export default function ClinicalTrialsComponent({ data }: { data: ClinicalTrialsStudyFieldsResponse<ClinicalTrialsListItem> }) {
  return (
    <>
    {!data.StudyFieldsResponse?.StudyFields &&
<NoResultComponent title="Clinical Trail"></NoResultComponent>}
      {data.StudyFieldsResponse?.StudyFields?.map((study: ClinicalTrialsListItem, index: number) => {
        return (
          <div key={index} className="mb-2 w-[100%] rounded-lg bg-white shadow-lg">
            <div className="p-2">
              <div className="flex flex-row justify-between">
                <div className="flex-auto">
                  <h5 className="text-md mb-2 font-medium text-violet-700 underline w-[75%]">
                    <Link
                      href={`/clinicalTrial/?NCTId=${study?.NCTId[0] || ''}`}
                    >{study?.BriefTitle[0] || '-'}</Link>
                  </h5>
                  <div className="flex flex-row justify-between w-[75%]">
                    <h5 className="text-md mb-2 text-gray-900">
                      {study?.OfficialTitle[0] || '-'}
                    </h5>
                    <p className="mb-1 text-base text-gray-700"> </p>
                  </div>
                  <div className="flex flex-row justify-between text-sm">
                    <p className="mb-1 text-xs text-violet-400">
                      Organization:{" "}
                      {study?.OrgFullName[0] || '-'}
                    </p>
                    <div className="border-gray-300 text-gray-600"></div>
                  </div>
                </div>
                <div className="w-[25%]">
                  <div className="flex flex-col">
                    <p className="mb-1 text-gray-600 text-sm text-right">
                      Start Date: {study?.StartDate[0] || '-'}
                      <br />
                    </p>
                    <p className="mb-1 text-gray-600 text-sm text-right">
                      Completion Date: {study?.CompletionDate[0] || '-'}
                      <br />
                    </p>
                    <p className="mb-1 text-gray-600 text-sm text-right">
                      Status: {study?.OverallStatus[0] || '-'}
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
