import type { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax'
import type { ClinicalTrialsListItem, ClinicalTrialsStudyFieldsResponse } from './ClinicalTrialsStudyFieldsResponse.model';
import type { Field } from './Fields.enum';

const clinicalTrialsQueryURL = 'https://clinicaltrials.gov/api/query';

export const getClinicalTrialsList = (fields: Field[]):Observable<ClinicalTrialsStudyFieldsResponse<ClinicalTrialsListItem>> => {
  const fieldsToStr = fields.join();
  return ajax.getJSON<ClinicalTrialsStudyFieldsResponse<ClinicalTrialsListItem>>(`${clinicalTrialsQueryURL}/study_fields?min_rnk=1&max_rnk=100&fmt=json&fields=${fieldsToStr}`);
}