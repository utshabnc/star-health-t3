import { useEffect, useState } from "react";
import type { FieldValue , FieldValueLegacy} from "./ClinicalTrialsFieldValuesResponse.model";

import { Field } from "./Fields.enum";

export default function ClinicalTrialsFilters(
  {
    Gender,
    Acronym,
    OfficialTitle,
    LocationState,
    LocationCity,
    LocationCountry,
    CollaboratorName,
    LeadSponsorName,
    Condition,
    OverallStatus,
    LocationContactName,
    LocationFacility,
    InterventionName,
    OnSearchExprChange,
  }: {
    Gender: FieldValueLegacy[],
    Acronym: FieldValueLegacy[],
    OfficialTitle: FieldValueLegacy[],
    Condition: FieldValueLegacy[],
    LocationState : FieldValueLegacy[],
    LocationCity : FieldValueLegacy[],
    LocationCountry : FieldValueLegacy[],
    CollaboratorName : FieldValueLegacy[],
    LeadSponsorName : FieldValueLegacy[],
    OverallStatus: FieldValueLegacy[],
    LocationContactName: FieldValueLegacy[],
    LocationFacility: FieldValueLegacy[],
    InterventionName: FieldValueLegacy[],
    OnSearchExprChange: (expr: string) => void,
  }) {
  const [orgFullName, setOrgFullName] = useState<string>('');
  const [overallOfficialName, setOverallOfficialName] = useState<string>('');
  const [overallStatus, setOverallStatus] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [healthyVolunteers, setHealthyVolunteers] = useState<string>('');
  const [searchExpr, setSearchExpr] = useState<string>('');
  const [condition, setCondition] = useState<string>('');
  const [locationState, setLocationState] = useState<string>('');
  const [locationCity, setLocationCity] = useState<string>('');
  const [locationCountry, setLocationCountry] = useState<string>('');
  const [collaboratorName, setCollaboratorName] = useState<string>('');
  const [leadSponsorName, setLeadSponsorName] = useState<string>('');
  const [acronym, setAcronym] = useState<string>('');
  const [officialTitle, setOfficialTitle] = useState<string>('');
  const [locationContactName, setLocationContactName] = useState<string>('');
  const [locationFacility, setLocationFacility] = useState<string>('');
  const [interventionName, setInterventionName] = useState<string>('');

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
    if(condition.length > 1){
      searchExprArr.push(`AREA[${Field.Condition}]${condition}`);
    }
    if(locationState.length > 1){
      searchExprArr.push(`AREA[${Field.LocationState}]${locationState}`);
    }
    if(locationCity.length > 1){
      searchExprArr.push(`AREA[${Field.LocationCity}]${locationCity}`);
    }
    if(locationCountry.length > 1){
      searchExprArr.push(`AREA[${Field.LocationCountry}]${locationCountry}`);
    }
    if(collaboratorName.length > 1){
      searchExprArr.push(`AREA[${Field.CollaboratorName}]${collaboratorName}`);
    }
    if(leadSponsorName.length > 1){
      searchExprArr.push(`AREA[${Field.LeadSponsorName}]${leadSponsorName}`);
    }
    if(acronym.length > 1){
      searchExprArr.push(`AREA[${Field.Acronym}]${acronym}`);
    }
    if(officialTitle.length > 1){
      searchExprArr.push(`AREA[${Field.OfficialTitle}]${officialTitle}`);
    }
    if(locationContactName.length > 1){
      searchExprArr.push(`AREA[${Field.LocationContactName}]${locationContactName}`);
    }
    if(locationFacility.length > 1){
      searchExprArr.push(`AREA[${Field.LocationFacility}]${locationFacility}`);
    }
    if(interventionName.length > 1){
      searchExprArr.push(`AREA[${Field.InterventionName}]${interventionName}`);
    }
    setSearchExpr(searchExprArr.join(' AND '));
  }, [gender, healthyVolunteers,  orgFullName, overallOfficialName, overallStatus, condition, locationState, locationCity, locationCountry, collaboratorName, leadSponsorName, acronym, officialTitle])

  useEffect(() => {
    OnSearchExprChange(searchExpr)
  }, [searchExpr, OnSearchExprChange])


  return (
    <>
      <div className='w-full'>
        <div>
        <p className='text-violet-700 w-20 text-lg  my-2'>
              Filter By:
            </p>
          <div className="filters flex w-full items-center">
           
            <div className="py-2 flex flex-wrap ">
              <input
                type="text"
                placeholder={
                  `Organization`
                }
                className={`
                          bg-violet-100 border border-violet-900 my-2 placeholder:text-violet-800 text-slate-900 w-[20%] p-1 rounded-lg mx-1 hover:bg-violet-300 hover:text-violet-900 cursor-pointer`}
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
                          bg-violet-100 border border-violet-900 my-2 placeholder:text-violet-800 text-slate-900 w-[20%] p-1 rounded-lg mx-1 hover:bg-violet-300 hover:text-violet-900 cursor-pointer`}
                value={overallOfficialName}
                onChange={(e) => {
                  setOverallOfficialName(e.target.value);
                }}
              />
              

              <select
              className='bg-violet-500 my-2 text-white w-[20%] p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer'
              onChange={(e) => {
                setAcronym(e.target.value);
              }}
              >
                {acronym.length < 1 ? <option value="">Acronym</option> : <option value="">-</option>}
                {Acronym?.sort?.((a , b) => a.value.localeCompare(b.value)).map((item, index: number) => (
                  <option key={index} value={item.value}>{item.value}</option>
                ))}
              </select>

              <select
              className='bg-violet-500 my-2 text-white w-[20%] p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer'
              onChange={(e) => {
                setCollaboratorName(e.target.value);
              }}
              >
                {collaboratorName.length < 1 ? <option value="">Collaborator Name</option> : <option value="">-</option>}
                {CollaboratorName?.sort?.((a , b) => a.value.localeCompare(b.value)).map((item, index: number) => (
                  <option key={index} value={item.value}>{item.value}</option>
                ))}
              </select>

              <select
              className='bg-violet-500 my-2 text-white w-[20%] p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer'
              onChange={(e) => {
                setCondition(e.target.value);
              }}
              >
                {condition.length < 1 ? <option value="">Condition</option> : <option value="">-</option>}
                {Condition?.sort?.((a , b) => a.value.localeCompare(b.value)).map((item, index: number) => (
                  <option key={index} value={item.value}>{item.value}</option>
                ))}
              </select>

              <select
                  className='bg-violet-500 my-2 text-white w-[20%] p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer'
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                >
                  {gender.length < 1 ? <option value="">Gender</option> : <option value="">-</option>}
                  {Gender?.map((item, index: number) => (
                    <option key={index} value={item.value} >{item.value[0]?.toUpperCase() + item.value?.slice(1).toLowerCase()}</option>
                  ))}
                </select>
                 <select
                className='bg-violet-500 my-2 text-white w-[20%] p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer'
                onChange={(e) => {
                  setHealthyVolunteers(e.target.value);
                }}
              >
                 <option value="">Healthy Volunteers</option>

                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>

              <select
              className='bg-violet-500 my-2 text-white w-[20%] p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer'
              onChange={(e) => {
                setInterventionName(e.target.value);
              }}
              >
                {interventionName.length < 1 ? <option value="">Intervention Name</option> : <option value="">-</option>}
                {InterventionName?.sort?.((a , b) => a.value.localeCompare(b.value)).map((item, index: number) => (
                  <option key={index} value={item.value}>{item.value}</option>
                
                ))}
              </select> 
              
                 
              
             
               
              
             
              
              <select
              className='bg-violet-500 my-2 text-white w-[20%] p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer'
              onChange={(e) => {
                setOfficialTitle(e.target.value);
              }}
              >
                {officialTitle.length < 1 ? <option value="">Official Title</option> : <option value="">-</option>}
                {OfficialTitle?.sort?.((a , b) => a.value.localeCompare(b.value)).map((item, index: number) => (
                  <option key={index} value={item.value}>{item.value}</option>
                ))}
              </select>
            
              
              <select
              className='bg-violet-500 my-2 text-white w-[20%] p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer'
              onChange={(e) => {
                setLocationCity(e.target.value);
              }}
              >
                {locationCity.length < 1 ? <option value="">Location City</option> : <option value="">-</option>}
                {LocationCity?.sort?.((a , b) => a.value.localeCompare(b.value)).map((item, index: number) => (
                  <option key={index} value={item.value}>{item.value}</option>
                ))}
              </select>
              <select
              className='bg-violet-500 my-2 text-white w-[20%] p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer'
              onChange={(e) => {
                setLocationCountry(e.target.value);
              }}
              >
                {locationCountry.length < 1 ? <option value="">Location Country</option> : <option value="">-</option>}
                {LocationCountry?.sort?.((a,b) => {
                   if (a.value === LocationCountry[0]?.value) {
                    return -1; // Keep the first element at the beginning
                  }
                  if (b.value === LocationCountry[0]?.value) {
                    return 1; // Keep the first element at the beginning
                  }

                  return a.value.localeCompare(b.value)
                
                })
                .map((item, index: number) => (
                  <option key={index} value={item.value}>{item.value}</option>
                ))}
              </select>
              <select
              className='bg-violet-500 my-2 text-white w-[20%] p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer'
              onChange={(e) => {
                setLocationContactName(e.target.value);
              }}
              >
                {locationContactName.length < 1 ? <option value="">Location Contact Name</option> : <option value="">-</option>}
                {LocationContactName?.sort?.((a , b) => a.value.localeCompare(b.value)).map((item, index: number) => (
                  <option key={index} value={item.value}>{item.value}</option>
                
                ))}
              </select>
              <select
              className='bg-violet-500 my-2 text-white w-[20%] p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer'
              onChange={(e) => {
                setLocationFacility(e.target.value);
              }}
              >
                {locationFacility.length < 1 ? <option value="">Location Facility</option> : <option value="">-</option>}
                {LocationFacility?.sort?.((a , b) => a.value.localeCompare(b.value)).map((item, index: number) => (
                  <option key={index} value={item.value}>{item.value}</option>
                
                ))}
              </select> 
              <select
              className='bg-violet-500 my-2 text-white w-[20%] p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer'
              onChange={(e) => {
                setLocationState(e.target.value);
              }}
              >
                {locationState.length < 1 ? <option value="">Location State</option> : <option value="">-</option>}
                {LocationState?.sort?.((a , b) => a.value.localeCompare(b.value)).map((item, index: number) => (
                  <option key={index} value={item.value}>{item.value}</option>
                
                ))}
              </select>
          
              
              <select
              className='bg-violet-500 my-2 text-white w-[20%] p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer'
              onChange={(e) => {
                setLeadSponsorName(e.target.value);
              }}
              >
                {leadSponsorName.length < 1 ? <option value="">Lead Sponsor Name</option> : <option value="">-</option>}
                {LeadSponsorName?.sort?.((a , b) => a.value.localeCompare(b.value)).map((item, index: number) => (
                  <option key={index} value={item.value}>{item.value}</option>
                ))}
              </select>

              <select
                    className='bg-violet-500 my-2 text-white w-[20%] p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer'
                    onChange={(e) => {
                      setOverallStatus(e.target.value);
                    }}
                  >
                    {overallStatus.length < 1 ? <option value="">Status</option> : <option value="">-</option>}
                    {OverallStatus?.sort?.((a , b) => a.value.localeCompare(b.value)).map((item, index: number) => (
                      <option key={index} value={item.value} >{item.value[0]?.toUpperCase() + item?.value?.slice(1).toLowerCase()}</option>
                    ))}
                  </select>

            </div> 
          </div>
        </div>
      </div>
    </>
  )
}
