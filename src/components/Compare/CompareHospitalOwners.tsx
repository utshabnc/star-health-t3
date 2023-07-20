import React, { useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/outline';
import Link from 'next/link';

interface Owner {
  ASSOCIATE_ID_OWNER: string;
  TYPE_OWNER: string;
  ROLE_CODE_OWNER: string;
  ROLE_TEXT_OWNER: string;
  ASSOCIATION_DATE_OWNER: string;
  NAME_OWNER: string;
  TITLE_OWNER: string;
  ORGANIZATION_NAME_OWNER: string;
  DOING_BUSINESS_AS_NAME_OWNER: string;
  ADDRESS: string;
  PERCENTAGE_OWNERSHIP: string;
  CREATED_FOR_ACQUISITION_OWNER: string;
  CORPORATION_OWNER: string;
  LLC_OWNER: string;
  MEDICAL_PROVIDER_SUPPLIER_OWNER: string;
  MANAGEMENT_SERVICES_COMPANY_OWNER: string;
  MEDICAL_STAFFING_COMPANY_OWNER: string;
  HOLDING_COMPANY_OWNER: string;
  INVESTMENT_FIRM_OWNER: string;
  FINANCIAL_INSTITUTION_OWNER: string;
  CONSULTING_FIRM_OWNER: string;
  FOR_PROFIT_OWNER: string;
  NON_PROFIT_OWNER: string;
  OTHER_TYPE_OWNER: string;
  OTHER_TYPE_TEXT_OWNER: string;
}

interface HospitalOwner {
  ENROLLMENT_ID: string;
  ASSOCIATE_ID: string;
  ORGANIZATION_NAME: string;
  OWNERS: Owner[];
}

const CompareHospitalOwners: React.FC = () => {
  const [hospitalOwners, setHospitalOwners] = useState<HospitalOwner[]>([]);

  useEffect(() => {
    const loadedHospitalOwners = JSON.parse(localStorage.getItem('compareHospitalOwners') || '[]');
    setHospitalOwners(loadedHospitalOwners);
  }, []);

  const removeHospitalOwner = (name: string) => {
    let compareHospitalOwners = JSON.parse(localStorage.getItem('compareHospitalOwners') || '[]');
    compareHospitalOwners = compareHospitalOwners.filter((hospitalOwner: HospitalOwner) => hospitalOwner.ORGANIZATION_NAME !== name);
    localStorage.setItem('compareHospitalOwners', JSON.stringify(compareHospitalOwners));
    setHospitalOwners(compareHospitalOwners);
  }

  

  return (
    <div className="overflow-x-auto">
  {hospitalOwners.length === 0 ? (
    <div>No hospital owners to compare
      <h5 className="text-md mb-2 font-medium text-violet-700 underline w-[75%]">
          <Link href={'https://www.starhealth.io/directory'}>Data Directory</Link></h5>
    </div>
  ) : (
    hospitalOwners.map((hospitalOwner, i) => (
      <table className="min-w-full divide-y divide-gray-200" key={i}>
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner Organization Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LLC Owner</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remove</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {hospitalOwner.OWNERS.map((owner, j) => (
            <tr key={owner.ASSOCIATE_ID_OWNER}>
              <td className="px-6 py-4">{j === 0 ? hospitalOwner.ORGANIZATION_NAME : '-'}</td>
              <td className="px-6 py-4">{owner.ORGANIZATION_NAME_OWNER || '-'}</td>
              <td className="px-6 py-4">{owner.NAME_OWNER || '-'}</td>
              <td className="px-6 py-4">{owner.ROLE_TEXT_OWNER || '-'}</td>
              <td className="px-6 py-4">{owner.ADDRESS || '-'}</td>
              <td className="px-6 py-4">{owner.LLC_OWNER === 'Y' ? 'Yes' : owner.LLC_OWNER === 'N' ? 'No' : '-'}</td>
              <td className="px-6 py-4">
                {j === 0 && (
                  <TrashIcon
                    className="h-5 w-5 text-gray-500 cursor-pointer"
                    onClick={() => removeHospitalOwner(hospitalOwner.ORGANIZATION_NAME)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ))
  )}
</div>
);
};

export default CompareHospitalOwners;