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

const CompareClinicalTrials: React.FC = () => {
  const [trials, setTrials] = useState<ClinicalTrialsFullStudyResponse[]>([]);

  useEffect(() => {
    let loadedTrials = JSON.parse(localStorage.getItem('compareTrials') || '[]');
    loadedTrials = loadedTrials.filter((trial: ClinicalTrialsFullStudyResponse | null) => trial !== null);
    console.log(loadedTrials)
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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Overall Status</th>
            {trials.map((trial) => (
              <td className="px-6 py-4 whitespace-nowrap" key={trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.IdentificationModule.NCTId}>
                {trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.StatusModule.OverallStatus}
              </td>
            ))}
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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Design Info</th>
            {trials.map((trial) => (
              <td className="px-6 py-4 whitespace-nowrap" key={trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.IdentificationModule.NCTId}>
                {trial.FullStudiesResponse.FullStudies[0]?.Study.ProtocolSection.DesignModule.DesignInfo.DesignPrimaryPurpose}
              </td>
            ))}
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