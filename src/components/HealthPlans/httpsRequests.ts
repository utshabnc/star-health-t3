import type { Observable } from "rxjs";
import type { AjaxResponse } from "rxjs/ajax";
import { ajax } from "rxjs/ajax";
import type { CMSStateResponse } from "./httpsRequests.model";

const APIKEY = "wSih5VqFSlWFht5qcIDUkjfFM2LSXP5y";

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

export const getListofStates = (): Observable<
  AjaxResponse<CMSStateResponse>
> => {
  return ajax({
    method: "GET",
    url: `https://marketplace.api.healthcare.gov/api/v1/states?year=2019&apikey=${APIKEY}`,
    crossDomain: true,
  });
};
/**
 * Search Location: county fips, zipcode, state information by Zipcode
 * @param zipcode 5 digit zipcode
 * @returns
 */
export const searchLocationByZipcode = (
  zipcode: string
): Observable<AjaxResponse<any>> => {
  return ajax({
    method: "GET",
    url: `https://marketplace.api.healthcare.gov/api/v1/counties/by/zip/${zipcode}?apikey=${APIKEY}`,
    crossDomain: true,
  });
};

export const getHealthPlanDetailById = (id: string): any => {
  return ajax({
    method: "GET",
    url: `https://marketplace.api.healthcare.gov/api/v1/plans/${id}?apikey=${APIKEY}&year=2019`,
    crossDomain: true,
  });
};

export const getHealthPlans = (
  countyfips: string,
  state: string,
  zipcode: string
): any => {
  return ajax({
    method: "POST",
    url: `https://marketplace.api.healthcare.gov/api/v1/plans/search?year=2019&apikey=${APIKEY}`,
    crossDomain: true,
    body: {
      market: "Individual",
      place: {
        countyfips: `${countyfips}`,
        state: `${state}`,
        zipcode: `${zipcode}`,
      },
    },
  });
};
