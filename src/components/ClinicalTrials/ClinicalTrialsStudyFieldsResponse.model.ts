export interface ClinicalTrialsListItem {
  Rank: number;
  BriefTitle: string[];
  OfficialTitle: string[];
  OrgFullName: string[];
  StartDate: string[];
  NCTId: string[];
}


interface StudyFieldsResponse<StudyFieldsType> {
  StudyFields: StudyFieldsType[];
}

export interface ClinicalTrialsStudyFieldsResponse<StudyFieldsType> {
  StudyFieldsResponse: StudyFieldsResponse<StudyFieldsType>
}
