import React, { useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/outline';
import Link from 'next/link';

interface TreatmentCenter {
  id: string;
  npi: string;
  provider_name: string;
  address_line_1: string;
  address_line_2: string | null;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

const CompareOpiodTreatment: React.FC = () => {
  const [treatmentCenters, setTreatmentCenters] = useState<TreatmentCenter[]>([]);

  useEffect(() => {
    const loadedTreatmentCenters = JSON.parse(localStorage.getItem('compareOpioid') || '[]');
    setTreatmentCenters(loadedTreatmentCenters);
  }, []);

  const removeTreatmentCenter = (id: string) => {
    let compareOpioid = JSON.parse(localStorage.getItem('compareOpioid') || '[]');
    compareOpioid = compareOpioid.filter((center: TreatmentCenter) => center.id !== id);
    localStorage.setItem('compareOpioid', JSON.stringify(compareOpioid));
    setTreatmentCenters(compareOpioid);
  }

  return (
    <div className="overflow-x-auto">
      {treatmentCenters.length === 0 ? (
        <div>No treatment center has been selected for comparison
          <h5 className="text-md mb-2 font-medium text-violet-700 underline w-[75%]">
          <Link href={'https://www.starhealth.io/directory'}>Data Directory</Link></h5>
        </div>
      ) : (
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"></th>
            {treatmentCenters.map((center) => (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider" key={center.id}>
                {center.provider_name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Address</th>
            {treatmentCenters.map((center) => (
              <td className="px-6 py-4 whitespace-nowrap" key={center.id}>
                {center.address_line_1} {center.address_line_2}, {center.city}, {center.state} {center.zip}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">City</th>
            {treatmentCenters.map((center) => (
              <td className="px-6 py-4 whitespace-nowrap" key={center.id}>
                {center.city}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">State</th>
            {treatmentCenters.map((center) => (
              <td className="px-6 py-4 whitespace-nowrap" key={center.id}>
                {center.state}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">ZIP</th>
            {treatmentCenters.map((center) => (
              <td className="px-6 py-4 whitespace-nowrap" key={center.id}>
                {center.zip}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">NPI</th>
            {treatmentCenters.map((center) => (
              <td className="px-6 py-4 whitespace-nowrap" key={center.id}>
                {center.npi}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Phone</th>
            {treatmentCenters.map((center) => (
              <td className="px-6 py-4 whitespace-nowrap" key={center.id}>
                {center.phone}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Remove</th>
            {treatmentCenters.map((center) => (
              <td className="px-6 py-4 whitespace-nowrap" key={center.id}>
                <TrashIcon className="h-5 w-5 text-gray-500 cursor-pointer" onClick={() => removeTreatmentCenter(center.id)} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      )}
    </div>
  );
};

export default CompareOpiodTreatment;
