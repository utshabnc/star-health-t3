import { useEffect, useState } from "react";
import type { FieldValue , FieldValueLegacy} from "./ClinicalTrialsFieldValuesResponse.model";

import { Field } from "./Fields.enum";

export default function ClinicalTrialsFilters(
  {
    Gender,
    HealthyVolunteers,
    MaximumAge,
    MinimumAge,
    OverallStatus,
    OnSearchExprChange,
  }: {
    Gender: FieldValueLegacy[],
    HealthyVolunteers: FieldValueLegacy[],
    MinimumAge: FieldValueLegacy[],
    MaximumAge: FieldValueLegacy[],
    OverallStatus: FieldValueLegacy[],
    OnSearchExprChange: (expr: string) => void,
  }) {
  const [orgFullName, setOrgFullName] = useState<string>('');
  const [overallOfficialName, setOverallOfficialName] = useState<string>('');
  const [overallStatus, setOverallStatus] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [healthyVolunteers, setHealthyVolunteers] = useState<string>('');
  const [minimumAge, setMinimumAge] = useState<string>('');
  const [maximumAge, setMaximumAge] = useState<string>('');
  const [searchExpr, setSearchExpr] = useState<string>('');

  useEffect(() => {
    //Search Expression
    const searchExprArr = [];
    if (orgFullName.length > 1) {
      searchExprArr.push(`AREA[${Field.OrgFullName}]${orgFullName}`);
    }
    if (overallOfficialName.length > 1) {
      searchExprArr.push(`(AREA[${Field.OverallOfficialName}]${overallOfficialName} OR AREA[${Field.CentralContactName}]${overallOfficialName})`);
    }
    if (overallStatus.length > 1) {
      searchExprArr.push(`AREA[${Field.OverallStatus}]${overallStatus}`);
    }
    if (gender.length > 1) {
      searchExprArr.push(`AREA[${Field.Gender}]${gender}`);
    }
    if (healthyVolunteers.length > 1) {
      searchExprArr.push(`AREA[${Field.HealthyVolunteers}]${healthyVolunteers}`);
    }
    if (minimumAge.length > 1) {
      searchExprArr.push(`AREA[${Field.MinimumAge}]${minimumAge}`);
    }
    if (maximumAge.length > 1) {
      searchExprArr.push(`AREA[${Field.MaximumAge}]${maximumAge}`);
    }

    setSearchExpr(searchExprArr.join(' AND '));
  }, [gender, healthyVolunteers, maximumAge, minimumAge, orgFullName, overallOfficialName, overallStatus])

  useEffect(() => {
    OnSearchExprChange(searchExpr)
  }, [searchExpr, OnSearchExprChange])


  return (
    <>
      <div className='w-full'>
        <div>
          <div className="filters flex w-full items-center">
            <p className='text-violet-700 w-20 text-lg  my-2'>
              Filter By:
            </p>
            <div className="wrap-filters flex w-full items-center py-2">
              <input
                type="text"
                placeholder={
                  `Organization`
                }
                className={`
                          bg-violet-100 border border-violet-900 my-2 placeholder:text-violet-800 text-slate-900 w-[30%] p-1 rounded-lg mx-1 hover:bg-violet-300 hover:text-violet-900 cursor-pointer`}
                value={orgFullName}
                onChange={(e) => {
                  setOrgFullName(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder={
                  `Contact`
                }
                className={`
                          bg-violet-100 border border-violet-900 my-2 placeholder:text-violet-800 text-slate-900 w-[30%] p-1 rounded-lg mx-1 hover:bg-violet-300 hover:text-violet-900 cursor-pointer`}
                value={overallOfficialName}
                onChange={(e) => {
                  setOverallOfficialName(e.target.value);
                }}
              />
              <select
                className='bg-violet-500 my-2 text-white w-[20%] p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer'
                onChange={(e) => {
                  setOverallStatus(e.target.value);
                }}
                placeholder="Status"
              >
                {overallStatus.length < 1 ? <option value="">Status</option> : <option value="">-</option>}
                {OverallStatus?.map((item, index: number) => (
                  <option key={index} value={item.value}>{item.value}</option>
                ))}
              </select>
              <select
                className='bg-violet-500 my-2 text-white w-[20%] p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer'
                onChange={(e) => {
                  setGender(e.target.value);
                }}
                placeholder="Gender"
              >
                {gender.length < 1 ? <option value="">Gender</option> : <option value="">-</option>}
                {Gender?.map((item, index: number) => (
                  <option key={index} value={item.value}>{item.value}</option>
                ))}
              </select>
              <select
                className='bg-violet-500 my-2 text-white w-[20%] p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer'
                onChange={(e) => {
                  setHealthyVolunteers(e.target.value);
                }}
                placeholder="Healthy Volunteers"
              >
                 <option value="">Healthy Volunteers</option>

                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              {/**<select
                className='bg-violet-500 my-2 text-white w-[20%] p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer'
                onChange={(e) => {
                  setMinimumAge(e.target.value);
                }}
                placeholder="Minimum Age"
              >
                {minimumAge.length < 1 ? <option value="">Minimum Age</option> : <option value="">-</option>}
                {MinimumAge?.map((item, index: number) => (
                  <option key={index} value={item.FieldValue}>{item.FieldValue}</option>
                ))}
              </select>
              <select
                className='bg-violet-500 my-2 text-white w-[20%] p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer'
                onChange={(e) => {
                  setMaximumAge(e.target.value);
                }}
                placeholder="Maximum Age"
              >
                {maximumAge.length < 1 ? <option value="">Maximum Age</option> : <option value="">-</option>}
                {MaximumAge?.map((item, index: number) => (
                  <option key={index} value={item.FieldValue}>{item.FieldValue}</option>
                ))}
                </select>**/}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
