import React, { useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/outline';
import Link from 'next/link';

interface GeneticInfo {
  'gene-symbol': string;
  name: string;
  'ghr-page': string;
  'text-list': Array<any>;
  'related-health-condition-list': Array<any>;
  'synonym-list': Array<any>;
  'db-key-list': Array<any>;
  reviewed: string;
  published: string;
}

const CompareGenetics: React.FC = () => {
  const [geneticData, setGeneticData] = useState<GeneticInfo[]>([]);

  // Load genetic data from localStorage when component mounts
  useEffect(() => {
    const loadedGeneticData = JSON.parse(localStorage.getItem('compareGenetics') || '[]');
    setGeneticData(loadedGeneticData);
  }, []);

  const removeGeneticData = (index: number) => {
    let compareGenetics = JSON.parse(localStorage.getItem('compareGenetics') || '[]');
    compareGenetics = compareGenetics.filter((_: GeneticInfo, i: number) => i !== index);
    localStorage.setItem('compareGenetics', JSON.stringify(compareGenetics));
    setGeneticData(compareGenetics);
  }

  return (
    <div className="overflow-x-auto">
      {geneticData.length === 0 ? (
        <div>No genetics has been selected for comparison
          <h5 className="text-md mb-2 font-medium text-violet-700 underline w-[75%]">
          <Link href={'https://www.starhealth.io/directory'}>Data Directory</Link></h5>
          </div>
      ) : (
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"></th>
            {geneticData.map((data, i) => (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider" key={i}>
                {data['gene-symbol']}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Name</th>
            {geneticData.map((data, i) => (
              <td className="px-6 py-4 whitespace-nowrap" key={i}>
                {data.name}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">GHR Page</th>
            {geneticData.map((data, i) => (
              <td className="px-6 py-4 whitespace-nowrap" key={i}>
                <a href={data['ghr-page']} target="_blank" rel="noreferrer">{data['ghr-page']}</a>
              </td>
            ))}
          </tr>
          {/* Add more rows as needed */}
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Remove</th>
            {geneticData.map((_, i) => (
              <td className="px-6 py-4 whitespace-nowrap" key={i}>
                <TrashIcon className="h-5 w-5 text-gray-500 cursor-pointer" onClick={() => removeGeneticData(i)} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      )}
    </div>
  );
};

export default CompareGenetics;
