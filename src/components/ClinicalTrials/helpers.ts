import type { Observable } from "rxjs";
import { ajax } from "rxjs/ajax";
import type { ClinicalTrialsFieldValuesResponse } from "./ClinicalTrialsFieldValuesResponse.model";
import type { ClinicalTrialsFullStudyResponse } from "./ClinicalTrialsFullStudyResponse.model";
import type {
  ClinicalTrialsListItem,
  ClinicalTrialsStudyFieldsResponse,
} from "./ClinicalTrialsStudyFieldsResponse.model";
import { Field } from "./Fields.enum";

const clinicalTrialsQueryURL = "https://clinicaltrials.gov/api/query";

export const getClinicalTrialsList = (
  fields: Field[],
  expr = ""
): Observable<ClinicalTrialsStudyFieldsResponse<ClinicalTrialsListItem>> => {
  const fieldsToStr = fields.join();
  return ajax.getJSON<
    ClinicalTrialsStudyFieldsResponse<ClinicalTrialsListItem>
  >(
    `${clinicalTrialsQueryURL}/study_fields?min_rnk=1&max_rnk=100&fmt=json&fields=${fieldsToStr}&expr=${expr}`
  );
};

export const getClinicalTrialByNCTId = (
  NCTId: string
): Observable<ClinicalTrialsFullStudyResponse> => {
  return ajax.getJSON<ClinicalTrialsFullStudyResponse>(
    `${clinicalTrialsQueryURL}/full_studies?expr=AREA[${Field.NCTId}]${NCTId}&min_rnk=1&max_rnk=1&fmt=json`
  );
};

export const getClinicalTrialFieldValues = (
  fieldValue: Field
): Observable<ClinicalTrialsFieldValuesResponse> => {
  return ajax.getJSON<ClinicalTrialsFieldValuesResponse>(
    `https://clinicaltrials.gov/api/query/field_values?expr=&field=${fieldValue}&fmt=json`
  );
};
