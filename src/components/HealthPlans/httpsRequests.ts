import type { Observable } from "rxjs";
import { ajax, AjaxResponse } from "rxjs/ajax";
import type { CMSStateResponse } from "./httpsRequests.model";
// export const getClinicalTrialsList = (
//     fields: Field[],
//     expr = ""
//   ): Observable<ClinicalTrialsStudyFieldsResponse<ClinicalTrialsListItem>> => {
//     const fieldsToStr = fields.join();
//     return ajax.getJSON<
//       ClinicalTrialsStudyFieldsResponse<ClinicalTrialsListItem>
//     >(
//       `${clinicalTrialsQueryURL}/study_fields?min_rnk=1&max_rnk=100&fmt=json&fields=${fieldsToStr}&expr=${expr}`
//     );
//   };
// createXHR: function () {
//     return new XMLHttpRequest();
//   }
export const getListofStates = (): Observable<
  AjaxResponse<CMSStateResponse>
> => {
  return ajax({
    method: "GET",
    url: `https://marketplace.api.healthcare.gov/api/v1/states?year=2019&apikey=wSih5VqFSlWFht5qcIDUkjfFM2LSXP5y`,
    crossDomain: true,
  });
};
