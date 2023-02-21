import type { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax'
import type { ClinicalTrialsFullStudyResponse } from './ClinicalTrialsFullStudyResponse.model';
import type { ClinicalTrialsListItem, ClinicalTrialsStudyFieldsResponse } from './ClinicalTrialsStudyFieldsResponse.model';
import type { Field } from './Fields.enum';

const clinicalTrialsQueryURL = 'https://clinicaltrials.gov/api/query';

export const getClinicalTrialsList = (fields: Field[], expr = ''):Observable<ClinicalTrialsStudyFieldsResponse<ClinicalTrialsListItem>> => {
  const fieldsToStr = fields.join();
  return ajax.getJSON<ClinicalTrialsStudyFieldsResponse<ClinicalTrialsListItem>>(`${clinicalTrialsQueryURL}/study_fields?min_rnk=1&max_rnk=100&fmt=json&fields=${fieldsToStr}&expr=${expr}`);
}

export const getClinicalTrialByOfficialTitle = (officialTitle: string):Observable<ClinicalTrialsFullStudyResponse> => {
  return ajax.getJSON<ClinicalTrialsFullStudyResponse>(`${clinicalTrialsQueryURL}/full_studies?expr=${officialTitle}&min_rnk=1&max_rnk=1&fmt=json`);
}
