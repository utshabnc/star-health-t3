import React, { useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/outline';
import { formatNumber } from '../../utils';
import Link from 'next/link';

interface Manufacturer {
  manufacturerName: string;
  amount: number;
  count: number;
}

interface Transaction {
  doctorName: string;
  amount: number;
}

interface DeviceResponse {
  id: string;
  type: string;
  name: string;
  category: string;
  topManufacturers: Manufacturer[];
  transactionsSummary: Transaction[];
}

const CompareMedicalDevices: React.FC = () => {
  const [devices, setDevices] = useState<DeviceResponse[]>([]);

  useEffect(() => {
    const loadedDevices = JSON.parse(localStorage.getItem('compareDrugDevs') || '[]');
    setDevices(loadedDevices);
  }, []);

  const removeDevice = (id: string) => {
    let compareDevices = JSON.parse(localStorage.getItem('compareDrugDevs') || '[]');
    compareDevices = compareDevices.filter((device: DeviceResponse) => device.id !== id);
    localStorage.setItem('compareDrugDevs', JSON.stringify(compareDevices));
    setDevices(compareDevices);
  }
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  // Function to get top 3 transactions by amount
  const getTopTransactions = (transactions: Transaction[]) => {
    return transactions.sort((a, b) => b.amount - a.amount).slice(0, 3);
  }
  return (
    <div className="overflow-x-auto">
      {devices.length === 0 ? (
        <div>No devices have been selected for comparison
          <h5 className="text-md mb-2 font-medium text-violet-700 underline w-[75%]">
            <Link href={'https://www.starhealth.io/directory'}>Data Directory</Link></h5>
        </div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"></th>
              {devices.map((device) => (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider" key={device.id}>
                  {device.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Device Type</th>
              {devices.map((device) => (
                <td className="px-6 py-4 whitespace-nowrap" key={device.id}>
                  {device.type}
                </td>
              ))}
            </tr>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Device Category</th>
              {devices.map((device) => (
                <td className="px-6 py-4 whitespace-nowrap" key={device.id}>
                  {device.category}
                </td>
              ))}
            </tr>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Top Manufacturers</th>
              {devices.map((device) => (
                <td className="px-6 py-4 whitespace-nowrap" key={device.id}>
                  {device.topManufacturers.map((manufacturer, index) => (
                    <p key={index}>{manufacturer.manufacturerName} - Amount: {currencyFormatter.format(manufacturer.amount)} - Count: {manufacturer.count}</p>
                  ))}
                </td>
              ))}
            </tr>
            <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Top Transactions</th>
            {devices.map((device) => (
              <td className="px-6 py-4 whitespace-nowrap" key={device.id}>
                {getTopTransactions(device.transactionsSummary).map((transaction, index) => (
                  <p key={index}>
                    {transaction.doctorName ? `${transaction.doctorName} - Amount: ${currencyFormatter.format(transaction.amount)}` : `Total Amount From Doctors: ${currencyFormatter.format(transaction.amount)}`}
                  </p>
                ))}
              </td>
            ))}
          </tr>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Remove</th>
              {devices.map((device) => (
                <td className="px-6 py-4 whitespace-nowrap" key={device.id}>
                  <TrashIcon className="h-5 w-5 text-gray-500 cursor-pointer" onClick={() => removeDevice(device.id)} />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );}
  export default CompareMedicalDevices;