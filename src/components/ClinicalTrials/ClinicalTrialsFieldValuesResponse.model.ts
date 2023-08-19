import { Field } from './Fields.enum';
export interface FieldValue {
  FieldValue: string;
  NStudiesWithValue: number;
  NStudiesFoundWithValue: number;
}

export interface ClinicalTrialsFieldValuesResponse {
  FieldValuesResponse: { FieldValues: FieldValue[] };
}

// Legacy API

export interface FieldValueLegacy {
  value : string;
  studiesCount : number;
}




export interface ClinicalTrialsFieldValuesResponseLegacy {
  topValues :  FieldValueLegacy[] ;
  
}