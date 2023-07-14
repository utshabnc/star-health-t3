import React, { useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/outline';
import Link from 'next/link';

interface Hospital {
  hospital_data_id: string;
  data_name: string;
  tot_revenue: string;
  tot_func_exp: string;
  tot_comm_bnfts: string;
  unreim_medcd: string;
  bad_debt: string;
  bad_debt_tot_func_exp_atrb_pat_elig_fncl_asst: string;
  fiscal_yr: string;
}

const CompareHospitals: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  useEffect(() => {
    const loadedHospitals = JSON.parse(localStorage.getItem('compareHospitals') || '[]');
    if (loadedHospitals.length > 0) {
    setHospitals([loadedHospitals.at(loadedHospitals.length - 1)]);
    }
  }, []);

  const removeHospital = (index: number) => {
    let compareHospitals = JSON.parse(localStorage.getItem('compareHospitals') || '[]');
    compareHospitals.splice(index, 1);
    localStorage.setItem('compareHospitals', JSON.stringify(compareHospitals));
    setHospitals(compareHospitals);
  }

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className="overflow-x-auto">
      {hospitals.length === 0 ? (
        <div>No hospital has been selected for comparison
          <h5 className="text-md mb-2 font-medium text-violet-700 underline w-[75%]">
          <Link href={'https://www.starhealth.io/directory'}>Data Directory</Link></h5>
        </div>
      ) : (
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"></th>
            {hospitals.map((hospital, i) => (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider" key={i}>
                {hospital?.data_name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
        <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Fiscal Year</th>
              {hospitals.map((hospital, i) => (
                <td className="px-6 py-4 whitespace-nowrap" key={i}>
                {hospital.fiscal_yr}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Total Revenue</th>
            {hospitals.map((hospital, i) => (
              <td className="px-6 py-4 whitespace-nowrap" key={i}>
                {currencyFormatter.format(parseInt(hospital.tot_revenue))}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Total Functional Expense</th>
            {hospitals.map((hospital, i) => (
              <td className="px-6 py-4 whitespace-nowrap" key={i}>
                {currencyFormatter.format(parseInt(hospital.tot_func_exp))}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Total Community Benefits</th>
            {hospitals.map((hospital, i) => (
              <td className="px-6 py-4 whitespace-nowrap" key={i}>
                {currencyFormatter.format(parseInt(hospital.tot_comm_bnfts))}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Unreimbursed Medicaid</th>
            {hospitals.map((hospital, i) => (
              <td className="px-6 py-4 whitespace-nowrap" key={i}>
                {currencyFormatter.format(parseInt(hospital.unreim_medcd))}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Bad Debt</th>
            {hospitals.map((hospital, i) => (
              <td className="px-6 py-4 whitespace-nowrap" key={i}>
                {currencyFormatter.format(parseInt(hospital.bad_debt))}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Bad Debt/Total Functional Expense Attributable to Patient Eligibility for Financial Assistance</th>
            {hospitals.map((hospital, i) => (
              <td className="px-6 py-4 whitespace-nowrap" key={i}>
                {currencyFormatter.format(parseInt(hospital.bad_debt_tot_func_exp_atrb_pat_elig_fncl_asst))}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Remove</th>
            {hospitals.map((_, i) => (
              <td className="px-6 py-4 whitespace-nowrap" key={i}>
                <TrashIcon className="h-5 w-5 text-gray-500 cursor-pointer" onClick={() => removeHospital(i)} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      )}
    </div>
  );
};

export default CompareHospitals;
