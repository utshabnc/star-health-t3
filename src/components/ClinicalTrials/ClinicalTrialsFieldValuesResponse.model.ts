export interface FieldValue {
  FieldValue: string;
  NStudiesWithValue: number;
  NStudiesFoundWithValue: number;
}

export interface ClinicalTrialsFieldValuesResponse {
  FieldValuesResponse: { FieldValues: FieldValue[] };
}
