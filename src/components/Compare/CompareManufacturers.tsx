import React, { useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/outline';
import Link from 'next/link';

interface Item {
  id: string;
  manufacturerId: string;
  productName: string;
  productType: string;
  year: string;
  totalAmount: number;
  transactionCount: number;
}

interface ManufacturerResponse {
  id: string;
  name: string;
  state: string;
  country: string;
  rank: number;
  totalAmount: number;
  largestPayments: Array<{
    doctor: {
      id: string;
      firstName: string;
      middleName: string;
      lastName: string;
    },
    amount: number;
  }>;
  items: Item[];
}

interface MenuSchema {
  name: string;
  state: string;
  country: string;
  amount: string;
  onChangeYear: (year?: number) => void;
  manufacturer: ManufacturerResponse;
}

const CompareManufacturers: React.FC = () => {
  const [menus, setMenus] = useState<MenuSchema[]>([]);

  useEffect(() => {
    const loadedMenus = JSON.parse(localStorage.getItem('compareMenus') || '[]');
    setMenus(loadedMenus);
  }, []);

  const removeMenu = (index: number) => {
    const compareMenus = JSON.parse(localStorage.getItem('compareMenus') || '[]');
    compareMenus.splice(index, 1);
    localStorage.setItem('compareMenus', JSON.stringify(compareMenus));
    setMenus(compareMenus);
  }

  return (
    <div className="overflow-x-auto">
      {menus.length === 0 ? (
        <div>No manufacturer has been selected for comparison
          <h5 className="text-md mb-2 font-medium text-violet-700 underline w-[75%]">
            <Link href={'https://www.manufacturerDirectory.com'}>Manufacturer Directory</Link>
          </h5>
        </div>
      ) : (
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"></th>
            {menus.map((menu, i) => (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider" key={i}>
                {menu.manufacturer?.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">State</th>
            {menus.map((menu, i) => (
              <td className="px-6 py-4 whitespace-nowrap" key={i}>
                {menu.manufacturer.state}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Country</th>
            {menus.map((menu, i) => (
              <td className="px-6 py-4 whitespace-nowrap" key={i}>
                {menu.manufacturer.country}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Total Amount</th>
            {menus.map((menu, i) => (
              <td className="px-6 py-4 whitespace-nowrap" key={i}>
                {menu.amount}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Most Common Items</th>
            {menus.map((menu, i) => (
              <td className="px-6 py-4 whitespace-nowrap" key={i}>
                {menu.manufacturer.items.slice(0, 3).map((item, j) => (
                  <p key={j}>{item.productName}</p>
                ))}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Remove</th>
            {menus.map((_, i) => (
              <td className="px-6 py-4 whitespace-nowrap" key={i}>
                <TrashIcon className="h-5 w-5 text-gray-500 cursor-pointer" onClick={() => removeMenu(i)} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      )}
    </div>
  );
};

export default CompareManufacturers;
