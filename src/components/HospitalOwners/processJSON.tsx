import {HospitalOwners} from "./HospitalOwners.model";
import {Owners} from "./Owners.model";

const https = require('https');

const url = "https://data.cms.gov/data-api/v1/dataset/029c119f-f79c-49be-9100-344d31d10344/data";

export var data: any;

export default async function getData() {
    var jsonObj
    await https.get(url, (res: any) => {
        let body = "";
        res.on("data", (chunk: any) => {
            body += chunk;
        });

        res.on("end", () => {
            try {
                jsonObj = JSON.parse(body);
                jsonObj = processJSONObject(jsonObj);
                // console.log(data[1]["ORGANIZATION NAME"])
                data = jsonObj;

            } catch (error: any) {
                console.error(error.message);
            };
        });

        }).on("error", (error: any) => {
            console.error(error.message);
        });
}

var restructuredData: any = [];
// var restructuredList: HospitalOwners[] = [];

function processJSONObject(data: any) {
    var hospitalNames: any = []
    for (let i=0; i<data.length; i+=1) {
        if (hospitalNames.includes(data[i]["ORGANIZATION NAME"])) {
            continue;
        }
        hospitalNames.push(data[i]["ORGANIZATION NAME"]);
    }

    for (let x=0; x<hospitalNames.length; x+=1) {
        var owners = [];
        // var ownerList: Owners[] = [];
        for (let i=0; i<data.length; i+=1) {
            if (data[i]["ORGANIZATION NAME"] === hospitalNames[x]) {
                // ownerList.push({
                //     ASSOCIATE_ID_OWNER: data[i]["ASSOCIATE ID - OWNER"],
                //     TYPE_OWNER: data[i]["TYPE - OWNER"],
                //     ROLE_CODE_OWNER: data[i]["ROLE CODE - OWNER"],
                //     ROLE_TEXT_OWNER: data[i]["ROLE TEXT - OWNER"],
                //     ASSOCIATION_DATE_OWNER: data[i]["ASSOCIATION DATE - OWNER"],
                //     FIRST_NAME_OWNER: data[i]["FIRST NAME - OWNER"],
                //     MIDDLE_NAME_OWNER: data[i]["MIDDLE NAME - OWNER"],
                //     LAST_NAME_OWNER: data[i]["LAST NAME - OWNER"],
                //     TITLE_OWNER: data[i]["TITLE - OWNER"],
                //     ORGANIZATION_NAME_OWNER: data[i]["ORGANIZATION NAME - OWNER"],
                //     DOING_BUSINESS_AS_NAME_OWNER: data[i]["DOING BUSINESS AS NAME - OWNER"],
                //     ADDRESS_LINE_1_OWNER: data[i]["ADDRESS LINE 1 - OWNER"],
                //     ADDRESS_LINE_2_OWNER: data[i]["ADDRESS LINE 2 - OWNER"],
                //     CITY_OWNER: data[i]["CITY - OWNER"],
                //     STATE_OWNER: data[i]["STATE - OWNER"],
                //     ZIP_CODE_OWNER: data[i]["ZIP CODE - OWNER"],
                //     PERCENTAGE_OWNERSHIP: data[i]["PERCENTAGE OWNERSHIP"],
                //     CREATED_FOR_ACQUISITION_OWNER: data[i]["CREATED FOR ACQUISITION - OWNER"],
                //     CORPORATION_OWNER: data[i]["CORPORATION - OWNER"],
                //     LLC_OWNER: data[i]["LLC - OWNER"],
                //     MEDICAL_PROVIDER_SUPPLIER_OWNER: data[i]["MEDICAL PROVIDER SUPPLIER - OWNER"],
                //     MANAGEMENT_SERVICES_COMPANY_OWNER: data[i]["MANAGEMENT SERVICES COMPANY - OWNER"],
                //     MEDICAL_STAFFING_COMPANY_OWNER: data[i]["MEDICAL STAFFING COMPANY - OWNER"],
                //     HOLDING_COMPANY_OWNER: data[i]["HOLDING COMPANY - OWNER"],
                //     INVESTMENT_FIRM_OWNER: data[i]["INVESTMENT FIRM - OWNER"],
                //     FINANCIAL_INSTITUTION_OWNER: data[i]["FINANCIAL INSTITUTION - OWNER"],
                //     CONSULTING_FIRM_OWNER: data[i]["CONSULTING FIRM - OWNER"],
                //     FOR_PROFIT_OWNER: data[i]["FOR PROFIT - OWNER"],
                //     NON_PROFIT_OWNER: data[i]["NON PROFIT - OWNER"],
                //     OTHER_TYPE_OWNER: data[i]["OTHER TYPE - OWNER"],
                //     OTHER_TYPE_TEXT_OWNER: data[i]["OTHER TYPE TEXT - OWNER"]
                // })
                owners.push({
                    "ASSOCIATE_ID_OWNER": data[i]["ASSOCIATE ID - OWNER"],
                    "TYPE_OWNER": data[i]["TYPE - OWNER"],
                    "ROLE_CODE_OWNER": data[i]["ROLE CODE - OWNER"],
                    "ROLE_TEXT_OWNER": data[i]["ROLE TEXT - OWNER"],
                    "ASSOCIATION_DATE_OWNER": data[i]["ASSOCIATION DATE - OWNER"],
                    "FIRST_NAME_OWNER": data[i]["FIRST NAME - OWNER"],
                    "MIDDLE_NAME_OWNER": data[i]["MIDDLE NAME - OWNER"],
                    "LAST_NAME_OWNER": data[i]["LAST NAME - OWNER"],
                    "TITLE_OWNER": data[i]["TITLE - OWNER"],
                    "ORGANIZATION_NAME_OWNER": data[i]["ORGANIZATION NAME - OWNER"],
                    "DOING_BUSINESS_AS_NAME_OWNER": data[i]["DOING BUSINESS AS NAME - OWNER"],
                    "ADDRESS_LINE_1_OWNER": data[i]["ADDRESS LINE 1 - OWNER"],
                    "ADDRESS_LINE_2_OWNER": data[i]["ADDRESS LINE 2 - OWNER"],
                    "CITY_OWNER": data[i]["CITY - OWNER"],
                    "STATE_OWNER": data[i]["STATE - OWNER"],
                    "ZIP_CODE_OWNER": data[i]["ZIP CODE - OWNER"],
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
                // restructuredList.push({
                //     ENROLLMENT_ID: data[i]["ENROLLMENT ID"],
                //     ASSOCIATE_ID: data[i]["ASSOCIATE ID"],
                //     ORGANIZATION_NAME: data[i]["ORGANIZATION NAME"],
                //     OWNERS: ownerList
                // })
                restructuredData.push({
                    "ENROLLMENT_ID": data[i]["ENROLLMENT ID"],
                    "ASSOCIATE_ID": data[i]["ASSOCIATE ID"],
                    "ORGANIZATION_NAME": data[i]["ORGANIZATION NAME"],
                    "OWNERS": owners
                });
                break;
            }
        }

    }
    return restructuredData;
}

console.log("data: "+getData())
