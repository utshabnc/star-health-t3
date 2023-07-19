import React, { useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/outline';
import Link from 'next/link';

interface Synonym {
  synonym: string;
}

interface RelatedHealthCondition {
  name: string;
  'ghr-page': string;
}

interface GeneticInfo {
  'gene-symbol': string;
  name: string;
  'ghr-page': string;
  'text-list': Array<{text: {html: string}}>;
  'related-health-condition-list': Array<{ 'related-health-condition': RelatedHealthCondition }>;
  'synonym-list': Array<Synonym>;
  'db-key-list': Array<any>;
  reviewed: string;
  published: string;
}

const CompareGenetics: React.FC = () => {
  const [geneticData, setGeneticData] = useState<GeneticInfo[]>([]);

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

  const splitAfterTenWords = (str: string): string[] => {
    const words = str.split(' ');
    if (words.length > 10) {
      return [words.slice(0, 10).join(' '), ...splitAfterTenWords(words.slice(10).join(' '))];
    }
    return [str];
  };

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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Description</th>
            {geneticData.map((data, i) => (
              <td className="px-6 py-4 whitespace-nowrap" key={i}>
                {data['text-list'].map((textItem, j) => {
                  const descriptionParts = splitAfterTenWords(textItem.text.html.replace(/<\/?[^>]+(>|$)/g, ""));
                  return (
                    <div key={j}>
                      {descriptionParts.map((part, k) => <div key={k}>{part}</div>)}
                    </div>
                  );
                })}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Related Health Condition</th>
            {geneticData.map((data, i) => (
              <td className="px-6 py-4 whitespace-nowrap" key={i}>
                {data['related-health-condition-list'].map((item, j) => (
                  <div key={j}>
                    <p>{item['related-health-condition'].name}</p>
                    <a href={item['related-health-condition']['ghr-page']} target="_blank" rel="noreferrer">{item['related-health-condition']['ghr-page']}</a>
                  </div>
                ))}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Synonyms</th>
            {geneticData.map((data, i) => (
              <td className="px-6 py-4 whitespace-nowrap" key={i}>
                {data['synonym-list'].map((synonymObj, j) => {
                  const [firstPart, secondPart] = splitAfterTenWords(synonymObj.synonym);
                  return (
                    <div key={j}>
                      <div>{firstPart}</div>
                      {secondPart && <div>{secondPart}</div>}
                    </div>
                  );
                })}
              </td>
            ))}
          </tr>
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
