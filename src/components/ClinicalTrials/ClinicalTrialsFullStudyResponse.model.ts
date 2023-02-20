interface DescriptionModule {
  BriefSummary: string;
}

interface IdentificationModule {
  Acronym: string;
  BriefTitle: string;
  NCTId: string;
  OfficialTitle: string;
  OrgStudyIdInfo: { OrgStudyId: string };
  Organization: { OrgClass: string; OrgFullName: string };
}

// TODO: lots of good info in here
interface StatusModule {
  StartDateStruct: { StartDate: string; StartDateType: string; }
}

// TODO: add the other fields that we are interested in here
interface ProtocolSection {
  DescriptionModule: DescriptionModule;
  IdentificationModule: IdentificationModule;
  StatusModule: StatusModule;
}

interface Study {
  DerivedSection: object;
  ProtocolSection: ProtocolSection;
}

export interface FullStudy {
  Rank: number;
  Study: Study
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
  NStudiesReturned: number
}


export interface ClinicalTrialsFullStudyResponse {
  FullStudiesResponse: FullStudiesResponse;
}
