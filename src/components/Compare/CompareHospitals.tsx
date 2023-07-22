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
  form_990_filed_part_grp_ret_f: string;
  form_990_num_fac_oper: string;
  form_990_name: string;
  form_990_address: string;
  form_990_city: string;
  form_990_state: string;
  form_990_zip: string;
  chrty_care: string;
  unreim_costs: string;
  hlth_prof_educ: string;
  cash_inknd_contrib_comm_grps: string;
  tot_comm_bnfts_tot_func_exp_pct: string;
  chrty_care_tot_func_exp_pct: string;
  unreim_medcd_tot_func_exp_pct: string;
  unreim_costs_tot_func_exp_pct: string;
  comm_hlth_impr_svcs_comm_bnft_oper_tot_func_exp_pct: string;
  hlth_prof_educ_tot_func_exp_pct: string;
}

const CompareHospitals: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  useEffect(() => {
    const loadedHospitals = JSON.parse(localStorage.getItem('compareHospitals') || '[]');
    setHospitals(loadedHospitals);
  }, []);

  const removeHospital = (index: number) => {
    const compareHospitals = JSON.parse(localStorage.getItem('compareHospitals') || '[]');
    compareHospitals.splice(index, 1);
    localStorage.setItem('compareHospitals', JSON.stringify(compareHospitals));
    setHospitals(compareHospitals);
  }

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  function formatPercentage(decimalNumberString: string): string {
    let decimalNumber = parseFloat(decimalNumberString);
    // Assume the input is a ratio and convert it to a percentage
    decimalNumber /= 100;
    return new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2 }).format(decimalNumber);
  }

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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Form 990 Name</th>
              {hospitals.map((hospital, i) => (
                <td className="px-6 py-4 whitespace-nowrap" key={i}>
                {hospital.form_990_name}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Form 990 Address</th>
              {hospitals.map((hospital, i) => (
                <td className="px-6 py-4 whitespace-nowrap" key={i}>
                {hospital.form_990_address}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">City</th>
              {hospitals.map((hospital, i) => (
                <td className="px-6 py-4 whitespace-nowrap" key={i}>
                {hospital.form_990_city}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">State</th>
              {hospitals.map((hospital, i) => (
                <td className="px-6 py-4 whitespace-nowrap" key={i}>
                {hospital.form_990_state}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Zip Code</th>
              {hospitals.map((hospital, i) => (
                <td className="px-6 py-4 whitespace-nowrap" key={i}>
                {hospital.form_990_zip}
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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Number of Facilities Operated (Form 990)</th>
              {hospitals.map((hospital, i) => (
                <td className="px-6 py-4 whitespace-nowrap" key={i}>
                {hospital.form_990_num_fac_oper}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Form 990 Filed - Part of Group Return</th>
              {hospitals.map((hospital, i) => (
                <td className="px-6 py-4 whitespace-nowrap" key={i}>
                {hospital.form_990_filed_part_grp_ret_f}
              </td>
            ))}
          </tr>
          
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Charity Care</th>
            {hospitals.map((hospital, i) => (
              <td className="px-6 py-4 whitespace-nowrap" key={i}>
                {currencyFormatter.format(parseInt(hospital.chrty_care))}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Unreimbursed Costs</th>
            {hospitals.map((hospital, i) => (
              <td className="px-6 py-4 whitespace-nowrap" key={i}>
                {currencyFormatter.format(parseInt(hospital.unreim_costs))}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Health Profession Education</th>
            {hospitals.map((hospital, i) => (
              <td className="px-6 py-4 whitespace-nowrap" key={i}>
                {currencyFormatter.format(parseInt(hospital.hlth_prof_educ))}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Cash & In-Kind Contributions to Community Groups</th>
            {hospitals.map((hospital, i) => (
              <td className="px-6 py-4 whitespace-nowrap" key={i}>
                {currencyFormatter.format(parseInt(hospital.cash_inknd_contrib_comm_grps))}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Total Community Benefits as a Percentage of Total Functional Expenses</th>
            {hospitals.map((hospital, i) => (
              <td className="px-6 py-4 whitespace-nowrap" key={i}>
                {currencyFormatter.format(parseInt(hospital.tot_comm_bnfts_tot_func_exp_pct))}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Charity Care as a Percentage of Total Functional Expenses</th>
            {hospitals.map((hospital, i) => (
              <td className="px-6 py-4 whitespace-nowrap" key={i}>
                {formatPercentage(hospital.chrty_care_tot_func_exp_pct)}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Unreimbursed Medicaid as a Percentage of Total Functional Expenses</th>
            {hospitals.map((hospital, i) => (
              <td className="px-6 py-4 whitespace-nowrap" key={i}>
                {formatPercentage(hospital.unreim_medcd_tot_func_exp_pct)}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Unreimbursed Costs as a Percentage of Total Functional Expenses</th>
            {hospitals.map((hospital, i) => (
              <td className="px-6 py-4 whitespace-nowrap" key={i}>
                {formatPercentage(hospital.unreim_costs_tot_func_exp_pct)}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Community Health Improvement Services and Community Benefit Operations as a Percentage of Total Functional Expenses</th>
            {hospitals.map((hospital, i) => (
              <td className="px-6 py-4 whitespace-nowrap" key={i}>
                {formatPercentage(hospital.comm_hlth_impr_svcs_comm_bnft_oper_tot_func_exp_pct)}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Health Profession Education as a Percentage of Total Functional Expenses</th>
            {hospitals.map((hospital, i) => (
              <td className="px-6 py-4 whitespace-nowrap" key={i}>
                {formatPercentage(hospital.hlth_prof_educ_tot_func_exp_pct)}
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
