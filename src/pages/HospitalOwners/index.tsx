import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ExpansionPanel from "../../components/ExpansionPanel";
import ErrorComponent from "../../components/ErrorComponent";
import type { HospitalOwners } from "../../components/HospitalOwners/HospitalOwners.model";
import type { Owners } from "../../components/HospitalOwners/Owners.model";
import Citation from "../../components/Citation";
import BookmarkButton from "../../components/BookmarkButton";
import { DataDirectoryCategory } from "../../utils/Enums/DataDirectoryCategory.enum";



enum Section {
  hospital = "Hospital",
  owner = "Owner",
}

enum FieldType {
  currency = "currency"
}

type Field = {
  code: string,
  description: string;
  type?: FieldType;
}

interface Sections {
  [Section.hospital]: Field[];
  [Section.owner]: Field[];
}

const HospitalDetails = () => {
  const navigate = useRouter();
  const index = navigate.query?.index as string;
  const blank: HospitalOwners = { "ENROLLMENT_ID": "", "ASSOCIATE_ID": "", "ORGANIZATION_NAME": "", "OWNERS": [] }
  const [data, setData] = useState<HospitalOwners>(blank)
  let keyID = 0;

  const hospitalDataTemplate: Sections = {
    [Section.hospital]: [
      {
        code: "ENROLLMENT_ID",
        description: "Enrollment ID",
      },
      {
        code: "ASSOCIATE_ID",
        description: "Associate ID",
      },
    ],
    [Section.owner]: [
      {
        code: "ASSOCIATE_ID_OWNER",
        description: "Associate ID",
      },
      {
        code: "TYPE_OWNER",
        description: "Type",
      },
      {
        code: "ROLE_TEXT_OWNER",
        description: "Role",
      },
      {
        code: "ROLE_CODE_OWNER",
        description: "Role Code",
      },
      {
        code: "ASSOCIATION_DATE_OWNER",
        description: "Association Date",
      },
      {
        code: "NAME_OWNER",
        description: "Name",
      },
      {
        code: "TITLE_OWNER",
        description: "Title",
      },
      {
        code: "ORGANIZATION_NAME_OWNER",
        description: "Organization Name",
      },
      {
        code: "DOING_BUSINESS_AS_NAME_OWNER",
        description: "Doing Business As Name",
      },
      {
        code: "ADDRESS",
        description: "Address",
      },
      {
        code: "PERCENTAGE_OWNERSHIP",
        description: "Percentage Ownership",
      },
      {
        code: "CREATED_FOR_ACQUISITION_OWNER",
        description: "Created For Acquisition",
      },
      {
        code: "CORPORATION_OWNER",
        description: "Corporation",
      },
      {
        code: "LLC_OWNER",
        description: "LLC",
      },
      {
        code: "MEDICAL_PROVIDER_SUPPLIER_OWNER",
        description: "Medical Provider Supplier",
      },
      {
        code: "MANAGEMENT_SERVICES_COMPANY_OWNER",
        description: "Management Services Company",
      },
      {
        code: "MEDICAL_STAFFING_COMPANY_OWNER",
        description: "Medical Staffing Company",
      },
      {
        code: "HOLDING_COMPANY_OWNER",
        description: "Holding Company",
      },
      {
        code: "INVESTMENT_FIRM_OWNER",
        description: "Investment Firm",
      },
      {
        code: "FINANCIAL_INSTITUTION_OWNER",
        description: "Financial Institution",
      },
      {
        code: "CONSULTING_FIRM_OWNER",
        description: "Consulting Firm",
      },
      {
        code: "FOR_PROFIT_OWNER",
        description: "For-Profit",
      },
      {
        code: "NON_PROFIT_OWNER",
        description: "Non-Profit",
      },
      {
        code: "OTHER_TYPE_OWNER",
        description: "Has Other Type",
      },
      {
        code: "OTHER_TYPE_TEXT_OWNER",
        description: "Other Type",
      },
    ],
  };

  const formatData = (data: HospitalOwners, field: Field, section: Section): string => {

    const fieldValue = data[field.code] ? String(data[field.code]) : '';
    if (fieldValue === "") {
      return "-";
    } else if (!fieldValue) {
      return "";
    }
    switch (section) {
      default:
        const lowerStr = fieldValue.toLowerCase();
        if (lowerStr === 'y') {
          return "Yes";
        } else if (lowerStr === 'n') {
          return "No";
        }
        break;
    }
    return fieldValue;
  }

  const generateUiField = (data: any, field: Field, section: Section, count: number) => {
    if (data.length == 0) {
      return (<></>)
    }
    switch (section == Section.hospital) {
      case false:
        return (
          <tr key={`${section}-${field.code}`} className={count % 2 == 0 ? "bg-violet-100" : ""}>
            <td className="px-4 py-1 whitespace-nowrap text-md text-gray-800">
              {field.description}
            </td>
            <td className="px-4 py-1 whitespace-nowrap text-md text-gray-800">
              {formatData(data, field, section)}
            </td>
          </tr>
        );
      case true:
        return (
          <p
            key={`${section}-${field.code}`}
            className={section == Section.hospital
              ? 'text-purp-2 font-semibold sm:text-sm lg:text-xl mt-2 mb-2'
              : 'text-purp-5 pt-1 sm:text-xs lg:text-lg font-semibold'}>
            {`${field.description}: `}
            <span className="font-normal">
              {formatData(data, field, section)}
            </span>
          </p>
        );
    }
  };

  const generateExpansionPanel = (data: Owners, section: Section): JSX.Element => {
    keyID += 1;
    return (
      <ExpansionPanel
        key={section + keyID}
        title={data.NAME_OWNER || data.ORGANIZATION_NAME_OWNER || section}
        content={
          <>
            {hospitalDataTemplate[section].map((field, count) => {
              return generateUiField(data, field, section, count);
            })}
          </>
        }
      />
    );
  }

  const [isCompared, setIsCompared] = useState(false);

useEffect(() => {
  const isDiseaseInCompareList = () => {
    if (typeof window !== 'undefined') {
      const compareHospitalOwners = JSON.parse(localStorage.getItem('compareHospitalOwners') || '[]');
      return compareHospitalOwners.some((compHospitalOwners: HospitalOwners) => compHospitalOwners.ORGANIZATION_NAME === data.ORGANIZATION_NAME);
    }
    return false;
  };

  setIsCompared(isDiseaseInCompareList());
}, []);

const handleClick = () => {
  if (typeof window !== 'undefined') {
    const compareHospitalOwners = JSON.parse(localStorage.getItem('compareHospitalOwners') || '[]');
    console.log(compareHospitalOwners);
    if (compareHospitalOwners.some((compHospitalOwners: HospitalOwners) => compHospitalOwners.ORGANIZATION_NAME === data.ORGANIZATION_NAME)) {
      return;
    }

    compareHospitalOwners.push(data);

    localStorage.setItem('compareHospitalOwners', JSON.stringify(compareHospitalOwners));
    setIsCompared(true);
  }
};

const removeCompare = () => {
  if (typeof window !== 'undefined') {
    const compareHospitalOwners = JSON.parse(localStorage.getItem('compareHospitalOwners') || '[]');

    const index = compareHospitalOwners.findIndex((compHospitalOwners: HospitalOwners) => compHospitalOwners.ORGANIZATION_NAME === data.ORGANIZATION_NAME);

    if (index !== -1) {
      compareHospitalOwners.splice(index, 1);
    }

    localStorage.setItem('compareHospitalOwners', JSON.stringify(compareHospitalOwners));
    setIsCompared(false);
  }
};


  const generateSection = (section: Section): JSX.Element => {
    switch (section) {
      case Section.hospital:
        return (
          <div className="mt-4 flex">
            <div className="pr-10 w-full">
              <div className="flex flex-row justify-between	items-start">
                <p className="pt-1 text-2xl font-semibold">{data.ORGANIZATION_NAME}</p>
                <div className="flex justify-end min-w-[375px]">
                  <Citation title={data.ORGANIZATION_NAME} />
                  <div className="ml-1">
                    <BookmarkButton title={data.ORGANIZATION_NAME} categoryId={DataDirectoryCategory.HospitalOwners} />
                  </div>
                  <div className="ml-1">
                  <button
                    className="ease focus:shadow-outline select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none"
                    onClick={isCompared ? removeCompare : handleClick}
                  >
                    {isCompared ? 'Remove Compare Item' : 'Compare'}
                  </button>
                </div>
                </div>
                <div className="my-1 mr-8">
                  <hr />
                </div>
                {hospitalDataTemplate[section].map((field) => {
                  return generateUiField(data, field, section, 0);
                })}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <table>
            {
              data.OWNERS.map((count: Owners) => {
                return generateExpansionPanel(count, section)
              })
            }
          </table>
        )
    }

  };

  useEffect(() => {
    const str: string = localStorage.getItem(index) as string;
    setData(JSON.parse(str))
  }, [index])

  return (
    <>
      <div className="bgColor">
        <div className="rounded bg-white p-5">
          <div className="flex flex-row">
            <div>
              <button
                title="goBack"
                onClick={navigate.back}
                className="ease focus:shadow-outline select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-end sm:px-2 lg:px-28">
            {generateSection(Section.hospital)}
            <div className="my-1"><hr /></div>
            {generateSection(Section.owner)}
          </div>
        </div>
      </div>
    </>
  );
};

export default HospitalDetails;
