import React, { useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { ClinicalTrialsFullStudyResponse, Study } from '../ClinicalTrials/ClinicalTrialsFullStudyResponse.model';
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
  const [trials, setTrials] = useState<Study[]>([]);

  useEffect(() => {
    console.log('Loading trials from localStorage...');
    let loadedTrials = JSON.parse(localStorage.getItem('compareTrials') || '[]');
    loadedTrials = loadedTrials.filter((trial: Study | null) => trial !== null);
    setTrials(loadedTrials);
  }, []);

  const removeTrial = (id: string) => {
    let compareTrials = JSON.parse(localStorage.getItem('compareTrials') || '[]');
    
    compareTrials = compareTrials.filter((trial: Study) => trial.protocolSection.identificationModule.nctId !== id);
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider" key={trial.protocolSection.identificationModule.nctId}>
                {trial?.protocolSection.identificationModule.nctId}&nbsp;
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Brief Title</th>
            {trials.map((trial) => {
              const nctId = trial?.protocolSection.identificationModule.nctId;
              const briefTitle = trial?.protocolSection.identificationModule.briefTitle;
              if (briefTitle) {
                return (
                  <td className="px-6 py-4 whitespace-nowrap" key={nctId}>
                    <div dangerouslySetInnerHTML={{ __html: wrapText(briefTitle, 15) }} />
                  </td>
                );
              } else {
                return (
                  <td key={nctId}>&nbsp;</td>
                );
              }
            })}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Brief Summary</th>
            {trials.map((trial) => {
              const nctId = trial?.protocolSection.identificationModule.nctId;
              const briefSummary = trial?.protocolSection.descriptionModule.briefSummary;
              if (briefSummary) {
                return (
                  <td className="px-6 py-4 whitespace-nowrap" key={nctId}>
                    <div dangerouslySetInnerHTML={{ __html: wrapText(briefSummary, 15) }} />
                  </td>
                );
              } else {
                return (
                  <td key={nctId}>&nbsp;</td>
                );
              }
            })}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Organization Name</th>
            {trials.map((trial) => (
              <td className="px-6 py-4 whitespace-nowrap" key={trial.protocolSection.identificationModule.nctId}>
                {trial.protocolSection.identificationModule.organization.fullName}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Sponsor</th>
            {trials.map((trial) => (
              <td className="px-6 py-4 whitespace-nowrap" key={trial.protocolSection.identificationModule.nctId}>
                N/A
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Overall Status</th>
            {trials.map((trial) => (
              <td className="px-6 py-4 whitespace-nowrap" key={trial.protocolSection.identificationModule.nctId}>
                {trial.protocolSection.statusModule.overallStatus}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Start Date</th>
            {trials.map((trial) => (
              <td className="px-6 py-4 whitespace-nowrap" key={trial.protocolSection.identificationModule.nctId}>
                {trial.protocolSection.statusModule.startDateStruct.date}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Completion Date</th>
            {trials.map((trial) => (
              <td className="px-6 py-4 whitespace-nowrap" key={trial.protocolSection.identificationModule.nctId}>
                {trial.protocolSection.statusModule.primaryCompletionDateStruct.date}
              </td>
            ))}
          </tr>
          
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Sponsor Class</th>
            {trials.map((trial) => (
              <td className="px-6 py-4 whitespace-nowrap" key={trial.protocolSection.identificationModule.nctId}>
                N/A
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Design Info</th>
            {trials.map((trial) => (
              <td className="px-6 py-4 whitespace-nowrap" key={trial.protocolSection.identificationModule.nctId}>
                {trial.protocolSection.designModule.designInfo.primaryPurpose}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Design Purpose</th>
            {trials.map((trial) => (
              <td className="px-6 py-4 whitespace-nowrap" key={trial.protocolSection.identificationModule.nctId}>
                {trial.protocolSection.designModule.designInfo.primaryPurpose}
              </td>
            ))}
          </tr>
          <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Design Description</th>
          {trials.map((trial) => {
              const nctId = trial.protocolSection.identificationModule.nctId;
              const designModule = trial.protocolSection.designModule.designInfo.maskingInfo;
              const designdesc = designModule ? designModule.masking : null;

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
              <td className="px-6 py-4 whitespace-nowrap" key={trial.protocolSection.identificationModule.nctId}>
                {trial.protocolSection.conditionsModule.conditions}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Enrollment Info</th>
            {trials.map((trial) => (
              <td className="px-6 py-4 whitespace-nowrap" key={trial.protocolSection.identificationModule.nctId}>
                {trial.protocolSection.designModule.enrollmentInfo?.enrollmentCount}
              </td>
            ))}
          </tr>

          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Gender(s)</th>
            {trials.map((trial) => (
              <td className="px-6 py-4 whitespace-nowrap" key={trial.protocolSection.identificationModule.nctId}>
                {trial.protocolSection.eligibilityModule.gender}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Minimum Age</th>
            {trials.map((trial) => (
              <td className="px-6 py-4 whitespace-nowrap" key={trial.protocolSection.identificationModule.nctId}>
                {trial.protocolSection.eligibilityModule.minimumAge}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Maximum Age</th>
            {trials.map((trial) => (
              <td className="px-6 py-4 whitespace-nowrap" key={trial.protocolSection.identificationModule.nctId}>
                {trial.protocolSection.eligibilityModule.maximumAge}
              </td>
            ))}
          </tr>
          <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Contact Info</th>
              {trials.map((trial) => {
                const centralContactList = trial.protocolSection.contactsLocationsModule;
                const centralContact = centralContactList && centralContactList.overallOfficials ? centralContactList.overallOfficials[0] : null;
                
                const name = centralContact ? centralContact.name : null;
                const affiliation = centralContact ? centralContact.affiliation : 'N/A';
                const role = centralContact ? centralContact.role : 'N/A';

                return (
                  <td className="px-6 py-4 whitespace-nowrap" key={trial.protocolSection.identificationModule.nctId}>
                    {name}
                    <p>
                      Affiliation: {affiliation}
                    </p>
                    <p>
                      Role: {role}
                    </p>
                  </td>
                );
              })}
          </tr>

          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Eligibility Criteria</th>
            {trials.map((trial) => {
              const nctId = trial.protocolSection.identificationModule.nctId;
              const eligCriteria = trial.protocolSection.eligibilityModule.eligibilityCriteria;
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
              const nctId = trial.protocolSection.identificationModule.nctId;
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