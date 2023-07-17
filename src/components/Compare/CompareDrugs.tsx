import React, { useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/outline';
import Link from 'next/link';

interface Drug {
  id: string;
  brand_name: string;
  generic_name: string;
  manufacturer_name: string;
  product_type: string;
}

interface DrugResponse {
  drug: Drug;
}

const CompareDrugs: React.FC = () => {
  const [drugs, setDrugs] = useState<DrugResponse[]>([]);

  useEffect(() => {
    const loadedDrugs = JSON.parse(localStorage.getItem('compareDrugs') || '[]');
    setDrugs(loadedDrugs);
  }, []);

  const removeDrug = (id: string) => {
    let compareDrugs = JSON.parse(localStorage.getItem('compareDrugs') || '[]');
    compareDrugs = compareDrugs.filter((drugResponse: DrugResponse) => drugResponse.drug.id !== id);
    localStorage.setItem('compareDrugs', JSON.stringify(compareDrugs));
    setDrugs(compareDrugs);
  }

  return (
    <div className="overflow-x-auto">
      {drugs.length === 0 ? (
        <div>No drugs has been selected for comparison
          <h5 className="text-md mb-2 font-medium text-violet-700 underline w-[75%]">
          <Link href={'https://www.starhealth.io/directory'}>Data Directory</Link></h5>
          </div>
      ) : (
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"></th>
            {drugs.map((drugResponse) => (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider" key={drugResponse.drug.id}>
                {drugResponse.drug.brand_name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Generic Name</th>
            {drugs.map((drugResponse) => (
              <td className="px-6 py-4 whitespace-nowrap" key={drugResponse.drug.id}>
                {drugResponse.drug.generic_name}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Manufacturer</th>
            {drugs.map((drugResponse) => (
              <td className="px-6 py-4 whitespace-nowrap" key={drugResponse.drug.id}>
                {drugResponse.drug.manufacturer_name}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Product Type</th>
            {drugs.map((drugResponse) => (
              <td className="px-6 py-4 whitespace-nowrap" key={drugResponse.drug.id}>
                {drugResponse.drug.product_type}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Remove</th>
            {drugs.map((drugResponse) => (
              <td className="px-6 py-4 whitespace-nowrap" key={drugResponse.drug.id}>
                <TrashIcon className="h-5 w-5 text-gray-500 cursor-pointer" onClick={() => removeDrug(drugResponse.drug.id)} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      )}
    </div>
  );
};

export default CompareDrugs;
