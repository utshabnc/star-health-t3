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
  benefits_url: string;
  brochure_url: string;
  formulary_url: string;
}

const CompareInsurance: React.FC = () => {
  const [insurancePlans, setInsurancePlans] = useState<InsurancePlan[]>([]);

  useEffect(() => {
    const loadedInsurancePlans = JSON.parse(localStorage.getItem('compareHealthPlans') || '[]');

    if (loadedInsurancePlans.length > 0) {
      // set all insurance plans in the state
      setInsurancePlans(loadedInsurancePlans);
    }
  }, []);

  const removeInsurancePlan = (index: number) => {
    const compareInsurancePlans = JSON.parse(localStorage.getItem('compareHealthPlans') || '[]');
    compareInsurancePlans.splice(index, 1);
    localStorage.setItem('compareHealthPlans', JSON.stringify(compareInsurancePlans));
    setInsurancePlans(compareInsurancePlans);
  }
  function formatPercentage(decimalNumberString: string): string {
    let decimalNumber = parseFloat(decimalNumberString);
    // Assume the input is a ratio and convert it to a percentage
    decimalNumber /= 100;
    return new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2 }).format(decimalNumber);
  }

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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Name</th>
            {insurancePlans.map((insurancePlan, i) => (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider" key={i}>
                {insurancePlan?.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
        <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">id</th>
            {insurancePlans.map((insurancePlan, i) => (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider" key={i}>
                {insurancePlan?.id}
              </th>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">State</th>
            {insurancePlans.map((insurancePlan, i) => (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider" key={i}>
                {insurancePlan?.state}
              </th>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Type</th>
            {insurancePlans.map((insurancePlan, i) => (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider" key={i}>
                {insurancePlan?.type}
              </th>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Premium</th>
            {insurancePlans.map((insurancePlan, i) => (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider" key={i}>
                {insurancePlan?.premium}
              </th>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Metal Level</th>
            {insurancePlans.map((insurancePlan, i) => (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider" key={i}>
                {insurancePlan?.metal_level}
              </th>
            ))}
          </tr>
        <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Benefits</th>
            {insurancePlans.map((insurancePlan, i) => (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider" key={i}>
                <Link className="text-md mb-2 font-medium text-violet-700 underline w-[75%]"
                 href={insurancePlan.benefits_url}>benefits</Link>
              </th>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Brochure</th>
            {insurancePlans.map((insurancePlan, i) => (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider" key={i}>
                <Link className="text-md mb-2 font-medium text-violet-700 underline w-[75%]"
                href={insurancePlan.brochure_url}>brochure</Link>
              </th>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Formulary</th>
            {insurancePlans.map((insurancePlan, i) => (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider" key={i}>
                <Link className="text-md mb-2 font-medium text-violet-700 underline w-[75%]"
                href={insurancePlan.formulary_url}>formulary</Link>
              </th>
            ))}
          </tr>
          {insurancePlans[0]?.benefits.map((benefit, i) => (
            <React.Fragment key={i}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">{benefit.name}</th>
                {insurancePlans.map((insurancePlan, j) => (
                  <td className="px-6 py-4 whitespace-nowrap" key={j}>
                    {insurancePlan?.benefits[i]?.covered ? "Covered" : "Not covered"}
                    {insurancePlan?.benefits[i]?.cost_sharings.map((costSharing, k) => (
                      <div key={k}>
                        Coinsurance rate: {formatPercentage(String(costSharing.coinsurance_rate))} <br/>
                        Coinsurance options: {costSharing.coinsurance_options} <br/>
                        Copay amount: {costSharing.copay_amount} <br/>
                        Copay options: {costSharing.copay_options} <br/>
                        Network tier: {costSharing.network_tier} <br/>
                        CSR: {costSharing.csr} <br/>
                        Display string: {costSharing.display_string}
                      </div>
                    ))}
                  </td>
                ))}
              </tr>
            </React.Fragment>
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
            }
  export default CompareInsurance;
