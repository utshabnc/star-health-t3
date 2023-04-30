import {Owners} from "./Owners.model";

export interface HospitalOwners {
    [key: string]: any;
    ENROLLMENT_ID:              string;
    ASSOCIATE_ID:               string;
    ORGANIZATION_NAME:          string;
    OWNERS:                     Owners[];
  }
  