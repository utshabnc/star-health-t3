interface CentralContact {
  centralContactEMail: string;
  centralContactName: string;
  centralContactPhone: string;
  centralContactRole: string;
}

interface ConditionsModule {
  conditions: string[];
}

interface DesignInfo {
  designAllocation: string;
  designInterventionModel: string;
  designInterventionModelDescription: string;
  maskingInfo: { masking: string };
  primaryPurpose: string;
}

interface EnrollmentInfo {
  enrollmentCount: string;
  enrollmentType: string;
}

interface DesignModule {
  designInfo: DesignInfo;
  enrollmentInfo: EnrollmentInfo;
  phaseList: { phase: string[] };
  studyType: string;
}

interface OverallOfficial {
  affiliation: string;
  name: string;
  role: string;
}

interface ContactsLocationsModule {
  overallOfficials: OverallOfficial[];
}

interface DescriptionModule {
  briefSummary: string;
  detailedDescription: string;
}

interface EligibilityModule {
  eligibilityCriteria: string;
  gender: string;
  healthyVolunteers: string;
  maximumAge: string;
  minimumAge: string;
}

interface IdentificationModule {
  acronym: string;
  briefTitle: string;
  nctId: string;
  officialTitle: string;
  orgStudyIdInfo: { orgStudyId: string };
  organization: { orgClass: string; fullName: string };
}

interface StatusModule {
  startDateStruct: { date: string; startDateType: string };
  overallStatus: string;
  primaryCompletionDateStruct: {
    date: string;
    primaryCompletionDateType: string;
  };
}

interface ProtocolSection {
  descriptionModule: DescriptionModule;
  identificationModule: IdentificationModule;
  statusModule: StatusModule;
  contactsLocationsModule: ContactsLocationsModule;
  eligibilityModule: EligibilityModule;
  conditionsModule: ConditionsModule;
  designModule: DesignModule;
}

export interface Study {
  derivedSection: object;
  protocolSection: ProtocolSection;
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


// LEGACY API

interface DescriptionModuleLegacy {
  briefSummary: string;
  detailedDescription: string;
}

interface EligibilityModuleLegacy {
  eligibilityCriteria: string;
  sex: string;
  healthyVolunteers: boolean;
  maximumAge: string;
  minimumAge: string;
}

interface DesignInfoLegacy {
  allocation: string;
  interventionModel: string;
  interventionModelDescription: string;
  maskingInfo: { 
    masking: string ;
    whoMasked:  string[];
    maskingDescription: string;
  };
  primaryPurpose: string;
}


interface EnrollmentInfoLegacy {
  count: number;
  type: string;
}


interface DesignModuleLegacy {
  designInfo: DesignInfoLegacy;
  enrollmentInfo: EnrollmentInfoLegacy;
  phases: string[] ;
  studyType: string;
}

interface IdentificationModuleLegacy {
  acronym: string;
  briefTitle: string;
  nctId: string;
  officialTitle: string;
  orgStudyIdInfo: { id: string };
  organization: { class: string; fullName: string };
}

interface StatusModuleLegacy {
  startDateStruct: { date: string; };
  overallStatus: string;
  primaryCompletionDateStruct: {
    date: string;
  };
}

interface ConditionsModuleLegacy {
  conditions: string[];
}

interface ContactsLocationsModuleLegacy {
  CentralContactEMail: string;
  CentralContactName: string;
  CentralContactPhone: string;
  CentralContactRole: string;

  overallOfficials: [ { name: string; affiliation : string;  role : string } ];
}

interface ProtocolSectionLegacy {
  descriptionModule: DescriptionModuleLegacy;
  eligibilityModule: EligibilityModuleLegacy;
  designModule: DesignModuleLegacy;
  identificationModule: IdentificationModuleLegacy;
  statusModule: StatusModuleLegacy;
  conditionsModule: ConditionsModuleLegacy;
  contactsLocationsModule: ContactsLocationsModuleLegacy;
}



export interface SingleStudyLegacy {
  protocolSection: ProtocolSectionLegacy;
}