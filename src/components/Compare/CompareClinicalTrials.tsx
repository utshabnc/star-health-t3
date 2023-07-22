import React, { useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { ClinicalTrialsFullStudyResponse } from '../ClinicalTrials/ClinicalTrialsFullStudyResponse.model';
import { any } from 'zod';

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

interface EligibilityModule {
  EligibilityCriteria: string;
  Gender: string;
  HealthyVolunteers: string;
  MaximumAge: string;
  MinimumAge: string;
}

interface StatusModule {
  // other properties...
  StatusVerifiedDate?: string; // Or whatever type StatusVerifiedDate should be
}

const CompareClinicalTrials: React.FC = () => {
  const [trials, setTrials] = useState<ClinicalTrialsFullStudyResponse[]>([]);

  useEffect(() => {
    let loadedTrials = JSON.parse(localStorage.getItem('compareTrials') || '[]');
    loadedTrials = loadedTrials.filter((trial: ClinicalTrialsFullStudyResponse | null) => trial !== null);
    setTrials(loadedTrials);
  }, []);

  const removeTrial = (id: string) => {
    let compareTrials = JSON.parse(localStorage.getItem('compareTrials') || '[]');
    
    compareTrials = compareTrials.filter((trial: ClinicalTrialsFullStudyResponse) => trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.IdentificationModule.NCTId !== id);
    localStorage.setItem('compareTrials', JSON.stringify(compareTrials));
    setTrials(compareTrials);
  }
  
  const wrapText = (text: string, limit: number) => {
    const words = text.split(' ');
    if (words.length <= limit) {
      return text;
    }
    
    return words.reduce((resultText, word, idx) => {
      return resultText + (idx !== 0 && idx % limit === 0 ? '<br />' : ' ') + word;
    }, '');
  };

  function formatPhoneNumber(phoneNumberString: string) {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    if (!cleaned) {
        return 'N/A';
    }
    const match = cleaned.match(/^(.{1})(.{3})(.{4})$/); // matching any 2 characters instead of only digits
    if (match) {
      return match[1] + '-' + match[2] + '-' + match[3];
    }
    return phoneNumberString;
}

  return (
    <div className="overflow-x-auto">
      {trials.length === 0 ? (
        <div>No trials have been selected for comparison
          <h5 className="text-md mb-2 font-medium text-violet-700 underline w-[75%]">
          <Link href={'https://www.clinicaltrials.com/directory'}>Data Directory</Link></h5>
        </div>
      ) : (
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"></th>
            {trials.map((trial) => (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider" key={trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.IdentificationModule.NCTId}>
                {trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.IdentificationModule.BriefTitle}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Brief Title</th>
            {trials.map((trial) => {
              const nctId = trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.IdentificationModule.NCTId;
              const briefTitle = trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.IdentificationModule.BriefTitle;
              if (nctId && briefTitle) {
                return (
                  <td className="px-6 py-4 whitespace-nowrap" key={nctId}>
                    <div dangerouslySetInnerHTML={{ __html: wrapText(briefTitle, 15) }} />
                  </td>
                );
              } else {
                return null;
              }
            })}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Brief Summary</th>
            {trials.map((trial) => {
              const nctId = trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.IdentificationModule.NCTId;
              const briefSummary = trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.DescriptionModule.BriefSummary;
              if (nctId && briefSummary) {
                return (
                  <td className="px-6 py-4 whitespace-nowrap" key={nctId}>
                    <div dangerouslySetInnerHTML={{ __html: wrapText(briefSummary, 15) }} />
                  </td>
                );
              } else {
                return null;
              }
            })}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Organization Name</th>
            {trials.map((trial) => (
              <td className="px-6 py-4 whitespace-nowrap" key={trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.IdentificationModule.NCTId}>
                {trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.IdentificationModule.Organization.OrgFullName}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Sponsor</th>
            {trials.map((trial) => (
              <td className="px-6 py-4 whitespace-nowrap" key={trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.IdentificationModule.NCTId}>
                {(trial.FullStudiesResponse.FullStudies[0] as any).Study.ProtocolSection.SponsorCollaboratorsModule.LeadSponsor.LeadSponsorName?? 'N/A'}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Overall Status</th>
            {trials.map((trial) => (
              <td className="px-6 py-4 whitespace-nowrap" key={trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.IdentificationModule.NCTId}>
                {trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.StatusModule.OverallStatus}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Start Date</th>
            {trials.map((trial) => (
              <td className="px-6 py-4 whitespace-nowrap" key={trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.IdentificationModule.NCTId}>
                {trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.StatusModule.StartDateStruct.StartDate}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Completion Date</th>
            {trials.map((trial) => (
              <td className="px-6 py-4 whitespace-nowrap" key={trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.IdentificationModule.NCTId}>
                {trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.StatusModule.PrimaryCompletionDateStruct.PrimaryCompletionDate}
              </td>
            ))}
          </tr>
          
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Sponsor Class</th>
            {trials.map((trial) => (
              <td className="px-6 py-4 whitespace-nowrap" key={trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.IdentificationModule.NCTId}>
                {(trial.FullStudiesResponse.FullStudies[0] as any).Study.ProtocolSection.SponsorCollaboratorsModule.LeadSponsor.LeadSponsorClass?? 'N/A'}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Design Info</th>
            {trials.map((trial) => (
              <td className="px-6 py-4 whitespace-nowrap" key={trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.IdentificationModule.NCTId}>
                {trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.DesignModule.DesignInfo.DesignPrimaryPurpose}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Design Allocation</th>
            {trials.map((trial) => (
              <td className="px-6 py-4 whitespace-nowrap" key={trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.IdentificationModule.NCTId}>
                {trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.DesignModule.DesignInfo.DesignAllocation}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Design Purpose</th>
            {trials.map((trial) => (
              <td className="px-6 py-4 whitespace-nowrap" key={trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.IdentificationModule.NCTId}>
                {trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.DesignModule.DesignInfo.DesignPrimaryPurpose}
              </td>
            ))}
          </tr>
          <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Design Description</th>
          {trials.map((trial) => {
              const nctId = trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.IdentificationModule.NCTId;
              const designModule = (trial.FullStudiesResponse.FullStudies[0] as any).Study.ProtocolSection.DesignModule.DesignInfo.DesignMaskingInfo;
              const designdesc = designModule ? designModule.DesignMaskingDescription : null;

              return (
                  <td className="px-6 py-4 whitespace-nowrap" key={nctId ?? ''}>
                      {designdesc ? 
                          <div dangerouslySetInnerHTML={{ __html: wrapText(designdesc, 15) }} /> 
                          : 'N/A'
                      }
                  </td>
              );
          })}
      </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Conditions</th>
            {trials.map((trial) => (
              <td className="px-6 py-4 whitespace-nowrap" key={trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.IdentificationModule.NCTId}>
                {trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.ConditionsModule.ConditionList.Condition}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Arms Group Label</th>
            {trials.map((trial) => {
              const fullStudies = trial.FullStudiesResponse?.FullStudies;
              const study = fullStudies ? fullStudies[0] as any : undefined;
              const armsInterventionsModule = study?.Study?.ProtocolSection?.ArmsInterventionsModule;
              const armGroupList = armsInterventionsModule?.ArmGroupList;
              const armGroups = armGroupList?.ArmGroup;

              if (!armGroups) {
                return null;
              }

              return (
                <td className="px-6 py-4 whitespace-nowrap" key={study?.Study.ProtocolSection.IdentificationModule.NCTId}>
                  {armGroups.map((group: any, index: number) => (
                    <p key={index}>
                      {group?.ArmGroupLabel ?? 'N/A'} --- {group?.ArmGroupType ?? 'N/A'}
                    </p>
                  ))}
                </td>
              );
            })}
          </tr>
                    <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Intervention Drug List</th>
            {trials.map((trial) => {
              const fullStudies = trial.FullStudiesResponse?.FullStudies;
              const study = fullStudies ? fullStudies[0] as any : undefined;
              const armsInterventionsModule = study?.Study?.ProtocolSection?.ArmsInterventionsModule;
              const interventionList = armsInterventionsModule?.InterventionList;
              const IntGroups = interventionList?.Intervention;

              if (!IntGroups) {
                // If IntGroups is undefined, don't render anything for this trial
                return null;
              }

              return (
                <td className="px-6 py-4 whitespace-nowrap" key={study?.Study.ProtocolSection.IdentificationModule.NCTId}>
                  {IntGroups.map((group: any, index: number) => (
                    <p key={index}>
                      {group?.InterventionType ?? 'N/A'} --- {group?.InterventionName ?? 'N/A'}
                    </p>
                  ))}
                </td>
              );
            })}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Enrollment Info</th>
            {trials.map((trial) => (
              <td className="px-6 py-4 whitespace-nowrap" key={trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.IdentificationModule.NCTId}>
                {trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.DesignModule.EnrollmentInfo.EnrollmentCount}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Primary Outcome Measure</th>
            {trials.map((trial) => (
              
              <td className="px-6 py-4 whitespace-nowrap" key={trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.IdentificationModule.NCTId}>
                {(trial.FullStudiesResponse.FullStudies[0] as any).Study.ProtocolSection.OutcomesModule.PrimaryOutcomeList.PrimaryOutcome[0].PrimaryOutcomeMeasure?? 'N/A'}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Volunteer Types</th>
            {trials.map((trial) => (
              <td className="px-6 py-4 whitespace-nowrap" key={trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.IdentificationModule.NCTId}>
                {trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.EligibilityModule.HealthyVolunteers}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Gender(s)</th>
            {trials.map((trial) => (
              <td className="px-6 py-4 whitespace-nowrap" key={trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.IdentificationModule.NCTId}>
                {trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.EligibilityModule.Gender}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Minimum Age</th>
            {trials.map((trial) => (
              <td className="px-6 py-4 whitespace-nowrap" key={trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.IdentificationModule.NCTId}>
                {trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.EligibilityModule.MinimumAge}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Maximum Age</th>
            {trials.map((trial) => (
              <td className="px-6 py-4 whitespace-nowrap" key={trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.IdentificationModule.NCTId}>
                {trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.EligibilityModule.MaximumAge}
              </td>
            ))}
          </tr>
          <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Contact Info</th>
              {trials.map((trial) => {
                const centralContactList = (trial.FullStudiesResponse.FullStudies[0] as any).Study.ProtocolSection.ContactsLocationsModule.CentralContactList;
                const centralContact = centralContactList && centralContactList.CentralContact ? centralContactList.CentralContact[0] : null;
                
                const phoneNumber = centralContact ? centralContact.CentralContactPhone : null;
                const contactName = centralContact ? centralContact.CentralContactName : 'N/A';
                const contactEmail = centralContact ? centralContact.CentralContactEmail : 'N/A';

                return (
                  <td className="px-6 py-4 whitespace-nowrap" key={trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.IdentificationModule.NCTId}>
                    {contactName}
                    <p>
                      Phone: {formatPhoneNumber(phoneNumber ?? 'N/A')}
                    </p>
                    <p>
                      {contactEmail}
                    </p>
                  </td>
                );
              })}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Location Facility</th>
            {trials.map((trial) => {
              const locationList = (trial.FullStudiesResponse.FullStudies[0] as any).Study.ProtocolSection.ContactsLocationsModule.LocationList;
              const location = locationList && locationList.Location ? locationList.Location[0] : null;
              
              const locationFacility = location ? location.LocationFacility : 'N/A';

              return (
                <td className="px-6 py-4 whitespace-nowrap" key={trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.IdentificationModule.NCTId}>
                  {locationFacility}
                </td>
              );
            })}
        </tr>
        <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Location City</th>
              {trials.map((trial) => {
                const locationList = (trial.FullStudiesResponse.FullStudies[0] as any).Study.ProtocolSection.ContactsLocationsModule.LocationList;
                const location = locationList && locationList.Location ? locationList.Location[0] : null;
                
                const locationCity = location ? location.LocationCity : 'N/A';

                return (
                  <td className="px-6 py-4 whitespace-nowrap" key={trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.IdentificationModule.NCTId}>
                    {locationCity}
                  </td>
                );
              })}
          </tr>
          <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Location State</th>
              {trials.map((trial) => {
                const locationList = (trial.FullStudiesResponse.FullStudies[0] as any).Study.ProtocolSection.ContactsLocationsModule.LocationList;
                const location = locationList && locationList.Location ? locationList.Location[0] : null;

                const locationState = location ? location.LocationState : 'N/A';

                return (
                  <td className="px-6 py-4 whitespace-nowrap" key={trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.IdentificationModule.NCTId}>
                    {locationState}
                  </td>
                );
              })}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Location Country</th>
            {trials.map((trial) => {
              const locationList = (trial.FullStudiesResponse.FullStudies[0] as any).Study.ProtocolSection.ContactsLocationsModule.LocationList;
              const location = locationList && locationList.Location ? locationList.Location[0] : null;

              const locationCountry = location ? location.LocationCountry : 'N/A';

              return (
                <td className="px-6 py-4 whitespace-nowrap" key={trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.IdentificationModule.NCTId}>
                  {locationCountry}
                </td>
              );
            })}
        </tr>
        <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Ancestral Conditions</th>
              {trials.map((trial) => {
                const conditionBrowseModule = (trial.FullStudiesResponse.FullStudies[0] as any).Study.DerivedSection.ConditionBrowseModule;
                const conditionAncestorList = conditionBrowseModule && conditionBrowseModule.ConditionAncestorList ? conditionBrowseModule.ConditionAncestorList.ConditionAncestor : null;
                
                return (
                  <td className="px-6 py-4 whitespace-nowrap" key={trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.IdentificationModule.NCTId}>
                    {conditionAncestorList && conditionAncestorList.length > 0 ? (
                      conditionAncestorList.map((conditionAncestor: any, index: string) => (
                        <p key={index}>
                          {conditionAncestor.ConditionAncestorTerm ?? 'N/A'}
                        </p>
                      ))
                    ) : (
                      <p>N/A</p>
                    )}
                  </td>
                );
              })}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Eligibility Criteria</th>
            {trials.map((trial) => {
              const nctId = trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.IdentificationModule.NCTId;
              const eligCriteria = trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.EligibilityModule.EligibilityCriteria;
              if (nctId && eligCriteria) {
                return (
                  <td className="px-6 py-4 whitespace-nowrap" key={nctId}>
                    <div dangerouslySetInnerHTML={{ __html: wrapText(eligCriteria, 15) }} />
                  </td>
                );
              } else {
                return null;
              }
            })}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Remove</th>
            {trials.map((trial) => {
              const nctId = trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.IdentificationModule.NCTId;
              if (nctId) {
                return (
                  <td className="px-6 py-4 whitespace-nowrap" key={nctId}>
                    <TrashIcon className="h-5 w-5 text-gray-500 cursor-pointer" onClick={() => removeTrial(nctId)} />
                  </td>
                );
              } else {
                return null;
              }
            })}
          </tr>
        </tbody>
      </table>
      )}
    </div>
  );
};

export default CompareClinicalTrials;