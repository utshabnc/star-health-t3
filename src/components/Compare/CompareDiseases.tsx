import React, { useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/outline';
import Link from 'next/link';

interface TextData {
  html: string;
}

interface TextList {
  text: TextData;
}

interface Disease {
  name: string;
  "text-list": TextList[];
  "inheritance-pattern-list": Array<any>;
  "related-gene-list": Array<any>;
  "synonym-list": Array<any>;
  reviewed: string;
  published: string;
}

const CompareDiseasesTable: React.FC = () => {
  const [diseases, setDiseases] = useState<Disease[]>([]);

  // Load diseases from localStorage when component mounts
  useEffect(() => {
    const loadedDiseases = JSON.parse(localStorage.getItem('compareDiseases') || '[]');
    setDiseases(loadedDiseases);
  }, []);

  const removeDisease = (name: string) => {
    let compareDiseases = JSON.parse(localStorage.getItem('compareDiseases') || '[]');
    compareDiseases = compareDiseases.filter((disease: Disease) => disease.name !== name);
    localStorage.setItem('compareDiseases', JSON.stringify(compareDiseases));
    setDiseases(compareDiseases);
  }

  const truncateDescription = (html: string) => {
    if (!html) return ""; 
    let sanitized = html.replace(/(<([^>]+)>)/gi, "");
    let words = sanitized.split(' ');
    if (words.length > 20) {
      return words.slice(0, 10).join(' ') + '...';
    } else {
      return sanitized;
    }
  };

  const wrapText = (text: string, limit: number) => {
    const sanitized = truncateDescription(text);
    const words = sanitized.split(' ');
    if (words.length <= limit) {
      return sanitized;
    }
      
    return words.reduce((resultText, word, idx) => {
      return resultText + (idx !== 0 && idx % limit === 0 ? '<br />' : ' ') + word;
    }, '');
  };

  return (
    <div className="overflow-x-auto">
      {diseases.length === 0 ? (
        <div>No diseases to compare
          <h5 className="text-md mb-2 font-medium text-violet-700 underline w-[75%]">
          <Link href={'https://www.starhealth.io/directory'}>Data Directory</Link></h5>
        </div>
      ) : (
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"></th>
            {diseases.map((disease) => (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider" key={disease.name}>
                {disease.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
        <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Description</th>
            {diseases.map((disease) => (
              <td className="px-6 py-4 whitespace-nowrap" key={disease.name} dangerouslySetInnerHTML={{ __html: disease['text-list']?.[0]?.text?.html ? wrapText(disease['text-list'][0].text.html, 20) : 'N/A' }}>
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Inheritance Pattern</th>
            {diseases.map((disease) => (
              <td className="px-6 py-4 whitespace-nowrap" key={disease.name}>
                {disease['inheritance-pattern-list'] && disease['inheritance-pattern-list'].length > 0 ? disease['inheritance-pattern-list'][0]['inheritance-pattern'].memo : 'N/A'}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Related Gene</th>
            {diseases.map((disease) => (
              <td className="px-6 py-4 whitespace-nowrap" key={disease.name}>
                {disease['related-gene-list'] && disease['related-gene-list'].length > 0 ? disease['related-gene-list'][0]['related-gene']['gene-symbol'] : 'N/A'}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Synonyms</th>
            {diseases.map((disease) => (
              <td className="px-6 py-4 whitespace-nowrap" key={disease.name} dangerouslySetInnerHTML={{ __html: wrapText(disease['synonym-list'] && disease['synonym-list'].length > 0 ? disease['synonym-list'].map((synonym: any) => synonym.synonym).join(", ") : 'N/A', 5) }}>
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Reviewed</th>
            {diseases.map((disease) => (
              <td className="px-6 py-4 whitespace-nowrap" key={disease.name}>
                {disease.reviewed}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Published</th>
            {diseases.map((disease) => (
              <td className="px-6 py-4 whitespace-nowrap" key={disease.name}>
                {disease.published}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Remove</th>
            {diseases.map((disease) => (
              <td className="px-6 py-4 whitespace-nowrap" key={disease.name}>
                <TrashIcon className="h-5 w-5 text-gray-500 cursor-pointer" onClick={() => removeDisease(disease.name)} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      )}
    </div>
  );
};

export default CompareDiseasesTable;
