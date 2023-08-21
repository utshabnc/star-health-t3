//  Deprecated

import type { Observable } from "rxjs";
import { ajax } from "rxjs/ajax";
import type { ClinicalTrialsFieldValuesResponse } from "./ClinicalTrialsFieldValuesResponse.model";
import type { ClinicalTrialsFullStudyResponse } from "./ClinicalTrialsFullStudyResponse.model";
import type {
  ClinicalTrialsListItem,
  ClinicalTrialsStudyFieldsResponse,
} from "./ClinicalTrialsStudyFieldsResponse.model";
import { Field } from "./Fields.enum";
import type {  ClinicalTrialStudies , ClinicalTrialStudy} from "./ClinicalTrialsStudyFieldsResponse.model";
import type { ClinicalTrialsFieldValuesResponseLegacy, FieldValueLegacy } from "./ClinicalTrialsFieldValuesResponse.model";
import type { SingleStudyLegacy } from '../../components/ClinicalTrials/ClinicalTrialsFullStudyResponse.model';
import { useQuery } from "react-query";

const clinicalTrialsQueryURL = "https://classic.clinicaltrials.gov/api/v2";

export const getClinicalTrialsList = (
  fields: Field[],
  expr = ""
): Observable<ClinicalTrialStudies<ClinicalTrialStudy>> => {
  const fieldsToStr = fields.join();
  return ajax.getJSON<
  ClinicalTrialStudies<ClinicalTrialStudy>
  >(
    `${clinicalTrialsQueryURL}/studies?format=json&pageSize=100&fields=${fieldsToStr}&query.term=${expr}` , 
    {
      origin: "http://localhost:3000", // Replace this with your allowed origin(s), or "*" to allow all origins
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      crossOrgin : "true"
    }
  );
};

export const getClinicalTrialByNCTId = (
  NCTId: string,
  
): Observable<SingleStudyLegacy> => {
  return ajax.getJSON<SingleStudyLegacy>(
    `${clinicalTrialsQueryURL}/studies/${NCTId}?format=json`,
    {
      origin: "http://localhost:3000", // Replace this with your allowed origin(s), or "*" to allow all origins
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      crossOrgin : "true"
    }
  );
};


export const getClinicalTrialFieldValues = (
  fieldValue: Field
): Observable<ClinicalTrialsFieldValuesResponseLegacy> => {
  return ajax.getJSON<ClinicalTrialsFieldValuesResponseLegacy>(
    `${clinicalTrialsQueryURL}/stats/fieldValues/${fieldValue}`,
    {
      origin: "http://localhost:3000", // Replace this with your allowed origin(s), or "*" to allow all origins
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      crossOrgin : "true",
      "Access-Control-Allow-Origin" : "*",
    }
  );
};


