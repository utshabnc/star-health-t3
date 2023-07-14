import React, { useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/outline';
import Link from 'next/link';

interface Benefit {
  name: string;
  covered: boolean;
  cost_sharings: Array<{
    coinsurance_rate: number;
    coinsurance_options: string;
    copay_amount: number;
    copay_options: string;
    network_tier: string;
    csr: string;
    display_string: string;
  }>;
  explanation: string;
  exclusions: string;
  has_limits: boolean;
  limit_unit: string;
  limit_quantity: number;
}

interface InsurancePlan {
  id: string;
  name: string;
  premium: number;
  premium_w_credit: number;
  ehb_premium: number;
  pediatric_ehb_premium: number;
  aptc_eligible_premium: number;
  metal_level: string;
  type: string;
  state: string;
  benefits: Benefit[];
}

const CompareInsurance: React.FC = () => {
  const [insurancePlans, setInsurancePlans] = useState<InsurancePlan[]>([]);

  useEffect(() => {
    const loadedInsurancePlans = JSON.parse(localStorage.getItem('compareHealthPlans') || '[]');
    console.log(loadedInsurancePlans);
    if (loadedInsurancePlans.length > 0) {
      // set all insurance plans in the state
      setInsurancePlans(loadedInsurancePlans);
    }
  }, []);

  const removeInsurancePlan = (index: number) => {
    let compareInsurancePlans = JSON.parse(localStorage.getItem('compareHealthPlans') || '[]');
    compareInsurancePlans.splice(index, 1);
    localStorage.setItem('compareHealthPlans', JSON.stringify(compareInsurancePlans));
    setInsurancePlans(compareInsurancePlans);
  }

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className="overflow-x-auto">
      {insurancePlans.length === 0 ? (
        <div>No insurance plan has been selected for comparison
          <h5 className="text-md mb-2 font-medium text-violet-700 underline w-[75%]">
            <Link href={'https://www.insuranceDirectory.com'}>Insurance Directory</Link>
          </h5>
        </div>
      ) : (
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"></th>
            {insurancePlans.map((insurancePlan, i) => (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider" key={i}>
                {insurancePlan?.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {insurancePlans[0]?.benefits.map((benefit, i) => (
            <tr key={i}>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">{benefit.name}</th>
              {insurancePlans.map((insurancePlan, j) => (
                <td className="px-6 py-4 whitespace-nowrap" key={j}>
                  {benefit.covered ? "Covered" : "Not covered"}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Remove</th>
            {insurancePlans.map((_, i) => (
              <td className="px-6 py-4 whitespace-nowrap" key={i}>
                <TrashIcon className="h-5 w-5 text-gray-500 cursor-pointer" onClick={() => removeInsurancePlan(i)} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      )}
    </div>
  );
};

export default CompareInsurance;
