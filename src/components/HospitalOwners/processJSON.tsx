import {HospitalOwners} from "./HospitalOwners.model";
import {Owners} from "./Owners.model";
import { capitalizeWords } from "../../utils";

import * as https from 'https';

const url = "https://data.cms.gov/data-api/v1/dataset/029c119f-f79c-49be-9100-344d31d10344/data";

export let data: any;

export default async function getData() {
    data=""
    let jsonObj
    await https.get(url, (res: any) => {
        let body = "";
        res.on("data", (chunk: any) => {
            body += chunk;
        });

        res.on("end", () => {
            try {
                jsonObj = JSON.parse(body);
                jsonObj = processJSONObject(jsonObj);
                data = jsonObj;

            } catch (error: any) {
                console.error(error.message);
            }
        });

        }).on("error", (error: any) => {
            console.error(error.message);
        });
}

const restructuredData: any = [];

function processJSONObject(data: any) {
    const hospitalNames: any = []
    for (let i=0; i<data.length; i+=1) {
        if (hospitalNames.includes(data[i]["ORGANIZATION NAME"])) {
            continue;
        }
        hospitalNames.push(data[i]["ORGANIZATION NAME"]);
    }
    hospitalNames.sort()

    for (let x=0; x<hospitalNames.length; x+=1) {
        const owners = [];
        for (let i=0; i<data.length; i+=1) {
            if (data[i]["ORGANIZATION NAME"] === hospitalNames[x]) {
                owners.push({
                    "ASSOCIATE_ID_OWNER": data[i]["ASSOCIATE ID - OWNER"],
                    "TYPE_OWNER": data[i]["TYPE - OWNER"],
                    "ROLE_CODE_OWNER": data[i]["ROLE CODE - OWNER"],
                    "ROLE_TEXT_OWNER": capitalizeWords(data[i]["ROLE TEXT - OWNER"]),
                    "ASSOCIATION_DATE_OWNER": data[i]["ASSOCIATION DATE - OWNER"],
                    "NAME_OWNER": capitalizeWords(data[i]["FIRST NAME - OWNER"]+" "+data[i]["MIDDLE NAME - OWNER"]+" "+data[i]["LAST NAME - OWNER"]),
                    "TITLE_OWNER": capitalizeWords(data[i]["TITLE - OWNER"]),
                    "ORGANIZATION_NAME_OWNER": capitalizeWords(data[i]["ORGANIZATION NAME - OWNER"]),
                    "DOING_BUSINESS_AS_NAME_OWNER": capitalizeWords(data[i]["DOING BUSINESS AS NAME - OWNER"]),
                    "ADDRESS": data[i]["ADDRESS LINE 1 - OWNER"] == "" ? "-" : capitalizeWords(data[i]["ADDRESS LINE 1 - OWNER"]+", "+data[i]["ADDRESS LINE 2 - OWNER"]+", "+data[i]["CITY - OWNER"]+", "+data[i]["STATE - OWNER"]+", "+data[i]["ZIP CODE - OWNER"]),
                    "PERCENTAGE_OWNERSHIP": data[i]["PERCENTAGE OWNERSHIP"],
                    "CREATED_FOR_ACQUISITION_OWNER": data[i]["CREATED FOR ACQUISITION - OWNER"],
                    "CORPORATION_OWNER": data[i]["CORPORATION - OWNER"],
                    "LLC_OWNER": data[i]["LLC - OWNER"],
                    "MEDICAL_PROVIDER_SUPPLIER_OWNER": data[i]["MEDICAL PROVIDER SUPPLIER - OWNER"],
                    "MANAGEMENT_SERVICES_COMPANY_OWNER": data[i]["MANAGEMENT SERVICES COMPANY - OWNER"],
                    "MEDICAL_STAFFING_COMPANY_OWNER": data[i]["MEDICAL STAFFING COMPANY - OWNER"],
                    "HOLDING_COMPANY_OWNER": data[i]["HOLDING COMPANY - OWNER"],
                    "INVESTMENT_FIRM_OWNER": data[i]["INVESTMENT FIRM - OWNER"],
                    "FINANCIAL_INSTITUTION_OWNER": data[i]["FINANCIAL INSTITUTION - OWNER"],
                    "CONSULTING_FIRM_OWNER": data[i]["CONSULTING FIRM - OWNER"],
                    "FOR_PROFIT_OWNER": data[i]["FOR PROFIT - OWNER"],
                    "NON_PROFIT_OWNER": data[i]["NON PROFIT - OWNER"],
                    "OTHER_TYPE_OWNER": data[i]["OTHER TYPE - OWNER"],
                    "OTHER_TYPE_TEXT_OWNER": data[i]["OTHER TYPE TEXT - OWNER"] 
                });
            }
        }

        for (let i=0; i<data.length; i+=1) {
            if (data[i]["ORGANIZATION NAME"] === hospitalNames[x]) {
                restructuredData.push({
                    "ENROLLMENT_ID": data[i]["ENROLLMENT ID"],
                    "ASSOCIATE_ID": data[i]["ASSOCIATE ID"],
                    "ORGANIZATION_NAME": capitalizeWords(data[i]["ORGANIZATION NAME"]),
                    "OWNERS": owners
                });
                break;
            }
        }

    }
    return restructuredData;
}

getData()
