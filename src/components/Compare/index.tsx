import React, { useState, useEffect } from 'react';
import CompareClinicalTrials from './CompareClinicalTrials';
import CompareDiseases from './CompareDiseases';
import CompareDoctors from './CompareDoctors';
import CompareDrugs from './CompareDrugs';
import CompareGenetics from './CompareGenetics';
import CompareHospitalOwners from './CompareHospitalOwners';
import CompareHospitals from './CompareHospitals';
import CompareInsurance from './CompareInsurance';
import CompareMedicalDevices from './CompareMedicalDevices';
import CompareManufacturers from './CompareManufacturers';
import CompareOpiodTreatment from './CompareOpiodTreatment';
import CompareFood from './CompareFood';
import CompareTransactions from './CompareTransactions';




const Compare: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  

  const renderCompareComponent = () => {
    switch (selectedCategory) {
      case 'Clinical Trials':
        return <CompareClinicalTrials />;
      case 'Diseases':
        return <CompareDiseases />;
      case 'Doctors':
        return <CompareDoctors />;
      case 'Drugs':
        return <CompareDrugs />;
      case 'Genetics':
        return <CompareGenetics />;
      case 'Food':
        return <CompareFood />;
      case 'Hospitals':
        return <CompareHospitals />;
      case 'Hospital Owners':
        return <CompareHospitalOwners />;
      case 'Insurance':
        return <CompareInsurance />;
      case 'Manufacturers':
        return <CompareManufacturers />;
      case 'Medical Devices':
        return <CompareMedicalDevices />;
      case 'Opioid Treatment':
        return <CompareOpiodTreatment />;
      case 'Transactions':
        return <CompareTransactions />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h1><b>Select a category to begin comparing</b></h1>
      <select
        className='bg-violet-500 my-2 text-white p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer'
        name="state-filter"
        id="state-filter"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">Select a category</option>
        <option value="Clinical Trials">Clinical Trials</option>
        <option value="Diseases">Diseases</option>
        <option value="Doctors">Doctors</option>
        <option value="Drugs">Drugs</option>
        <option value="Food">Food</option>
        <option value="Genetics">Genetics</option>
        <option value="Hospitals">Hospitals</option>
        <option value="Hospital Owners">Hospital Owners</option>
        <option value="Insurance">Insurance</option>
        <option value="Manufacturers">Manufacturers</option>
        <option value="Medical Devices">Medical Devices</option>
        <option value="Opioid Treatment">Opioid Treatment</option>
        <option value="Transactions">Transactions</option>
      </select>
      {renderCompareComponent()}
    </div>
  );
};

export default Compare;

