import React, { useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/outline';
import Link from 'next/link';

interface Drug {
  id: string;
  brand_name: string;
  generic_name: string;
  manufacturer_name: string;
  product_type: string;
  effective_time: string;
  route: string;
  purpose: string;
  warnings_and_cautions: string | null;
  adverse_reactions: string | null;
  description: string | null;
  clinical_studies: string | null;
  active_ingredient: string;
  laboratory_tests: string | null;
  instructions_for_use: string | null;
  overdosage: string | null;
  microbiology: string | null;
}

interface DrugResponse {
  drug: Drug;
}

// Helper function to wrap text every 5 words
const wrapText = (text: string, wordsPerLine: number): string => {
  return text.split(' ').map((word, idx) => ((idx + 1) % wordsPerLine === 0 ? `${word}<br/>` : word)).join(' ');
};

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
          {[
            'generic_name',
            'manufacturer_name',
            'effective_time',
            'product_type',
            'route',
            'purpose',
            'warnings_and_cautions',
            'adverse_reactions',
            'description',
            'clinical_studies',
            'active_ingredient',
            'laboratory_tests',
            'instructions_for_use',
            'overdosage',
            'microbiology',
          ].map(property => (
            <tr key={property}>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">{property.replace('_', ' ')}</th>
              {drugs.map((drugResponse) => (
                <td className="px-6 py-4 whitespace-nowrap" key={drugResponse.drug.id}>
                  {
                    ['purpose', 'warnings_and_cautions', 'adverse_reactions', 'description', 'clinical_studies', 'active_ingredient', 'laboratory_tests', 'instructions_for_use', 'overdosage', 'microbiology'].includes(property) ? 
                    <div dangerouslySetInnerHTML={{ __html: wrapText(drugResponse.drug[property as keyof Drug] || 'N/A', 5) }} /> :
                    drugResponse.drug[property as keyof Drug] || 'N/A'
                  }
                </td>
              ))}
            </tr>
          ))}
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
