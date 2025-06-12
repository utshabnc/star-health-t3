import React, { useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/outline';
import Link from 'next/link';

interface Transaction {
  id: string;
  doctorId: string;
  manufacturerName: string;
  manufacturerId: string;
  amount: number;
  date: string;
  year: string;
  paymentType: string;
  paymentNature: string | null;
  contextualInfo: string;
  manufacturer: {
    name: string;
    id: string;
  };
  doctor: {
    firstName: string;
    lastName: string;
    id: string;
    productName: string;
    productType: string;
  };
}

const CompareTransactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const loadedTransactions = JSON.parse(localStorage.getItem('compareTransactions') || '[]');
    setTransactions(loadedTransactions);
  }, []);

  const removeTransaction = (id: string) => {
    let compareTransactions = JSON.parse(localStorage.getItem('compareTransactions') || '[]');
    compareTransactions = compareTransactions.filter((transaction: Transaction) => transaction.id !== id);
    localStorage.setItem('compareTransactions', JSON.stringify(compareTransactions));
    setTransactions(compareTransactions);
  };

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className="overflow-x-auto">
      {transactions.length === 0 ? (
        <div>No transactions selected for comparison
            <h5 className="text-md mb-2 font-medium text-violet-700 underline w-[75%]">
          <Link href={'https://www.starhealth.io/directory'}>Data Directory</Link></h5>
        </div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">ID</th>
              {transactions.map((transaction) => (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider" key={transaction.id}>
                  {transaction.id}
                </th>
              ))}
              
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Doctor Name</th>
              {transactions.map((transaction) => (
                <td className="px-6 py-4 whitespace-nowrap" key={transaction.id}>
                  {transaction.doctor.firstName} {transaction.doctor.lastName}
                </td>
              ))}
            </tr>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Manufacturer Name</th>
              {transactions.map((transaction) => (
                <td className="px-6 py-4 whitespace-nowrap" key={transaction.id}>
                  {transaction.manufacturer.name}
                </td>
              ))}
            </tr>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Amount</th>
              {transactions.map((transaction) => (
                <td className="px-6 py-4 whitespace-nowrap" key={transaction.id}>
                  {currencyFormatter.format(transaction.amount)}
                </td>
              ))}
            </tr>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Date</th>
              {transactions.map((transaction) => (
                <td className="px-6 py-4 whitespace-nowrap" key={transaction.id}>
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
              ))}
            </tr>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Payment Type</th>
              {transactions.map((transaction) => (
                <td className="px-6 py-4 whitespace-nowrap" key={transaction.id}>
                  {transaction.paymentType}
                </td>
              ))}
            </tr>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Product Name</th>
              {transactions.map((transaction) => (
                <td className="px-6 py-4 whitespace-nowrap" key={transaction.id}>
                  {transaction.doctor.productName}
                </td>
              ))}
            </tr>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"></th>
              {transactions.map((transaction) => (
                <td className="px-6 py-4 whitespace-nowrap" key={transaction.id}>
                  <TrashIcon className="h-5 w-5 text-gray-500 cursor-pointer" onClick={() => removeTransaction(transaction.id)} />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
              }
  export default CompareTransactions;
