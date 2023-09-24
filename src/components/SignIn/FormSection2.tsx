

import { FieldValues, UseFormRegister, FieldErrors } from "react-hook-form"
import {InputHTMLAttributes} from "react";


export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    register : UseFormRegister<FieldValues>;
    errors   : FieldErrors< FieldValues>;
    
}
const Section2 : React.FC<InputProps> = ({ register, errors  }) => {
    return (
    <>
      
      <div className="w-full md:w-1/2 px-3">
        <div className="col">
          <label htmlFor="grid-company" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Company
          </label>
          <input
              {...register("company")}
              type="text"
              name="company"
              placeholder="Company"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-indigo-500/75 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-company"
          />
          {errors.company && (
            <p className="text-red-500 pb-2 text-small">{`${errors.company.message}`}</p>
          )}
        </div>
      </div>
      <div className="w-full md:w-1/2 px-3">
        <div className="col">
          <label htmlFor="grid-specialization" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Specialization
          </label>
          <input
              {...register("specialization")}
              type="text"
              name="specialization"
              placeholder="Specialization"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-indigo-500/75 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-specialization"
          />
          {errors.specialization && (
            <p className="text-red-500 pb-2 text-small">{`${errors.specialization.message}`}</p>
          )}
        </div>
      </div>
      <div className="w-full md:w-1/2 px-3">
          <div className="col">
            <label htmlFor="grid-license-number" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                License Number
            </label>
            <input
                {...register("licenseNumber")}
                type="text"
                name="licenseNumber"
                placeholder="License Number"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-indigo-500/75 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-license-number"
            />
            {errors.licenseNumber && (
            <p className="text-red-500 pb-2 text-small">{`${errors.licenseNumber.message}`}</p>
            )}
        </div>
      </div>
      <div className="w-full md:w-1/2 px-3">
        <div className="col">
          <label htmlFor="grid-insurance-information" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Insurance Information
          </label>
          <input
              {...register("insuranceInformation")}
              type="text"
              name="insuranceInformation"
              placeholder="Insurance Information"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-indigo-500/75 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-insurance-information"
          />
          {errors.insuranceInformation && (
            <p className="text-red-500 pb-2 text-small">{`${errors.insuranceInformation.message}`}</p>
          )}
          
        </div>
      </div>
    </>
    )
};
  
export default Section2;
  