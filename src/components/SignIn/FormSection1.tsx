import type { InputProps } from "../FormComponents/InputFieldProps.model";
import React from "react";

  


const FormSectionA : React.FC<InputProps>  = ({  register , errors}) => {
   
    return (
        <>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
                <div className="col">
                    <label htmlFor="firstName" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">First Name</label>
                        <input
                        {...register('firstName')}
                        type='text'
                        name="firstName"
                        placeholder='John'
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-indigo-500/75 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name"
                           
                        />
                        {errors.firstName && (
                            <p className="text-red-500 pb-2 text-small">{`${errors.firstName.message}`}</p>
                        )}
                </div>
            </div>
            <div className="w-full md:w-1/2 px-3">
                <div className="col">
                    <label htmlFor="lastName" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Last Name</label>
                        <input
                        {...register('lastName')}
                        type='text'
                        name="lastName"
                        placeholder="Doe"
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-indigo-500/75 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name"
                        
                        />
                        {errors.lastName && (
                            <p className="text-red-500 pb-2 text-small">{`${errors.lastName.message}`}</p>
                        )}
                </div>
            </div>
                
            
                <div className="w-full md:w-1/2 px-3">
                    <div className="col">
                        <label htmlFor="dob" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Date of Birth
                        </label>
                        <input
                            {...register("dob")}
                            type="text"
                            name="dob"
                            placeholder="DD/MM/YYYY"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-indigo-500/75 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="grid-dob"
                        />
                        {errors.dob && (
                            <p className="text-red-500 pb-2 text-small">{`${errors.dob.message}`}</p>
                        )}
                    </div>

                </div>
                <div className="w-full md:w-1/2 px-3">
                    <div className="col">
                        <label htmlFor="contactNumber" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Contact Number
                        </label>
                        <input
                            {...register("contactNumber")}
                            type="text"
                            name="contactNumber"
                            placeholder="1234567890"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-indigo-500/75 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="grid-contact-number"
                        />
                        {errors?.contactNumber && (
                            <p className="text-red-500 pb-2 text-small">{`${errors.contactNumber.message}`}</p>
                        )}
                    </div>
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <div className="col">
                        <label htmlFor="address" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Address
                        </label>
                        <input
                            {...register("address")}
                            type="text"
                            name="address"
                            placeholder="123 Main St"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-indigo-500/75 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="grid-address"
                        />
                        {errors.address && (
                            <p className="text-red-500 pb-2 text-small">{`${errors.address.message}`}</p>
                        )}
                    </div>
                </div> 
                <div className="w-full md:w-1/2 px-3">
                    <div className="col">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Gender</label>
                        <div className="flex space-x-4">
                            <label className="inline-flex items-center">
                                <input
                                {...register("gender")}
                                type="radio"
                                value="male"
                                className="form-radio text-indigo-600"
                                />
                                <span className="ml-2">Male</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                {...register("gender")}
                                type="radio"
                                value="female"
                                className="form-radio text-indigo-600"
                                /> 
                                <span className="ml-2">Female</span>
                            </label>
                        </div>
                        {errors.gender && (
                        <p className="text-red-500 pb-2 text-small">{`${errors.gender.message}`}</p>
                        )}
                    </div>
            </div>
            <div className="w-full md:w-1/2 px-3">
          <div className="col">
            <label htmlFor="grid-profession" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Profession/Role
            </label>
            <select
                {...register("profession")}
                name="profession"
                className="block w-full bg-gray-200 text-gray-700 border border-indigo-500/75 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-profession"
            >
                <option value="" disabled selected>Select a profession/role</option>
                {[
                    "Patients",
                    "Providers",
                    "Researchers",
                    "Healthcare Workers",
                    "Insurance",
                    "Administrators",
                    "Public Health",
                    "Government",
                    "Military",
                    "Data Scientists",
                    "IT Services",
                    "Professional Services",
                    "Recruiters",
                    "Marketers",
                    "Writers",
                    "Students",
                    "Educators",
                    "Parents",
                    "Advocacy",
                    "Non-profit",
                ].map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            {errors.profession && (
              <p className="text-red-500 pb-2 text-small">{`${errors.profession.message}`}</p>
            )}
        </div>
      </div>
  
        </>
    )
}

export default FormSectionA;