interface CentralContact {
  CentralContactEMail: string;
  CentralContactName: string;
  CentralContactPhone: string;
  CentralContactRole: string;
}

interface ConditionsModule {
  ConditionList: { Condition: string[] };
}

interface DesignInfo {
  DesignAllocation: string;
  DesignInterventionModel: string;
  DesignInterventionModelDescription: string;
  DesignMaskingInfo: { DesignMasking: string };
  DesignPrimaryPurpose: string;
}

interface EnrollmentInfo {
  EnrollmentCount: string;
  EnrollmentType: string;
}

interface DesignModule {
  DesignInfo: DesignInfo;
  EnrollmentInfo: EnrollmentInfo;
  PhaseList: { Phase: string[] };
  StudyType: string;
}

interface OverallOfficial {
  OverallOfficialAffiliation: string;
  OverallOfficialName: string;
  OverallOfficialRole: string;
}

interface ContactsLocationsModule {
  CentralContactList: { CentralContact: CentralContact[] };
  OverallOfficialList: { OverallOfficial: OverallOfficial[] };
}

interface DescriptionModule {
  BriefSummary: string;
  DetailedDescription: string;
}

interface EligibilityModule {
  EligibilityCriteria: string;
  Gender: string;
  HealthyVolunteers: string;
  MaximumAge: string;
  MinimumAge: string;
}

interface IdentificationModule {
  Acronym: string;
  BriefTitle: string;
  NCTId: string;
  OfficialTitle: string;
  OrgStudyIdInfo: { OrgStudyId: string };
  Organization: { OrgClass: string; OrgFullName: string };
}

interface StatusModule {
  StartDateStruct: { StartDate: string; StartDateType: string };
  OverallStatus: string;
  PrimaryCompletionDateStruct: {
    PrimaryCompletionDate: string;
    PrimaryCompletionDateType: string;
  };
}

interface ProtocolSection {
  DescriptionModule: DescriptionModule;
  IdentificationModule: IdentificationModule;
  StatusModule: StatusModule;
  ContactsLocationsModule: ContactsLocationsModule;
  EligibilityModule: EligibilityModule;
  ConditionsModule: ConditionsModule;
  DesignModule: DesignModule;
}

interface Study {
  DerivedSection: object;
  ProtocolSection: ProtocolSection;
}

export interface FullStudy {
  Rank: number;
  Study: Study;
}

interface FullStudiesResponse {
  APIVrs: string;
  DataVrs: Date;
  Expression: string;
  FullStudies: FullStudy[];
  MaxRank: number;
  MinRank: number;
  NStudiesAvail: number;
  NStudiesFound: number;
  NStudiesReturned: number;
}

export interface ClinicalTrialsFullStudyResponse {
  FullStudiesResponse: FullStudiesResponse;
}
