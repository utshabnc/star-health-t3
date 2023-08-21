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

interface StatusModule {
  overallStatus : string;
  startDateStruct : {
    date : string;
  };
  completionDateStruct : {
    date : string;
  };
}

interface IdentificationModule {
  nctId : string;
  officialTitle : string;
  briefTitle : string;
  organization : {
    fullName : string;
  }
}
export interface ClinicalTrialStudy {
  protocolSection : {
    statusModule : StatusModule;
    identificationModule : IdentificationModule;
  };
}

export interface ClinicalTrialStudies<ClinicalTrialStudy> {
 studies : [ClinicalTrialStudy]
}