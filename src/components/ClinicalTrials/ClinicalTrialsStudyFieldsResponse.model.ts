export interface ClinicalTrialsListItem {
  CompletionDate: string[];
  Rank: number;
  BriefTitle: string[];
  OfficialTitle: string[];
  OrgFullName: string[];
  OverallStatus: string[];
  StartDate: string[];
  NCTId: string[];
}

interface StudyFieldsResponse<StudyFieldsType> {
  StudyFields: StudyFieldsType[];
}

export interface ClinicalTrialsStudyFieldsResponse<StudyFieldsType> {
  StudyFieldsResponse: StudyFieldsResponse<StudyFieldsType>;
}
