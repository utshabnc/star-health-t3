import React, { useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/outline';
import Link from 'next/link';

interface TopProduct {
  productName: string;
  amount: number;
}

interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  specialty: string;
  addressLine1: string;
  city: string;
  state: string;
  zipCode: string;
  rank: number;
  totalAmount: number;
  topProducts: TopProduct[];
}

const CompareDoctorsTable: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  // Load doctors from localStorage when component mounts
  useEffect(() => {
    const loadedDoctors = JSON.parse(localStorage.getItem('compareDoctors') || '[]');
    setDoctors(loadedDoctors);
  }, []);

  const removeDoctor = (id: string) => {
    let compareDoctors = JSON.parse(localStorage.getItem('compareDoctors') || '[]');
    compareDoctors = compareDoctors.filter((doctor: Doctor) => doctor.id !== id);
    localStorage.setItem('compareDoctors', JSON.stringify(compareDoctors));
    setDoctors(compareDoctors);
  }

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className="overflow-x-auto">
      {doctors.length === 0 ? (
        <div>No doctors have been selected for comparison
          <h5 className="text-md mb-2 font-medium text-violet-700 underline w-[75%]">
          <Link href={'https://www.starhealth.io/directory'}>Data Directory</Link></h5>
          </div>
      ) : (
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Rank</th>
            {doctors.map((doctor, i) => (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider" key={i}>
                #{doctor.rank}
              </th>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Name</th>
            {doctors.map((doctor) => (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider" key={doctor.id}>
                {doctor.firstName} {doctor.lastName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Specialty</th>
            {doctors.map((doctor) => (
              <td className="px-6 py-4 whitespace-nowrap" key={doctor.id}>
                {doctor.specialty}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Address</th>
            {doctors.map((doctor) => (
              <td className="px-6 py-4 whitespace-nowrap" key={doctor.id}>
                {doctor.addressLine1}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">City</th>
            {doctors.map((doctor) => (
              <td className="px-6 py-4 whitespace-nowrap" key={doctor.id}>
                {doctor.city}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">State</th>
            {doctors.map((doctor) => (
              <td className="px-6 py-4 whitespace-nowrap" key={doctor.id}>
                {doctor.state}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Zip Code</th>
            {doctors.map((doctor) => (
              <td className="px-6 py-4 whitespace-nowrap" key={doctor.id}>
                {doctor.zipCode}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Total Manufacturer Payments</th>
            {doctors.map((doctor) => (
              <td className="px-6 py-4 whitespace-nowrap" key={doctor.id}>
                {currencyFormatter.format(doctor.totalAmount)}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Top products</th>
            {doctors.map((doctor) => (
              <td className="px-6 py-4 whitespace-nowrap" key={doctor.id}>
                {doctor.topProducts.slice(0, 3).map((product, i) => 
                  <div key={i}>{product.productName} ({currencyFormatter.format(product.amount)})</div>
                )}
              </td>
            ))}
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Remove</th>
            {doctors.map((doctor) => (
              <td className="px-6 py-4 whitespace-nowrap" key={doctor.id}>
                <TrashIcon className="h-5 w-5 text-gray-500 cursor-pointer" onClick={() => removeDoctor(doctor.id)} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      )}
    </div>
  );
};

export default CompareDoctorsTable;
