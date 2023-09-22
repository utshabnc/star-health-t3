import {ChangeEvent} from 'react';
import { FieldValues, UseFormRegister, FieldErrors } from "react-hook-form"
import {InputHTMLAttributes} from "react";

export interface InputFieldProps {
    label: string;
    name: string;
    placeholder: string;
    type: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    register : UseFormRegister<FormData>;
}

export interface TextAreaProps {
    label: string;
    name: string;
    placeholder: string;
    type: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}
interface SelectOption {
    value : string;
    label: string;
}
export interface SelectProps {
    label: string;
    name: string;
    placeholder: string;
    options : SelectOption[];
    selectedValue: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}



interface RadioGroup {
    value : string;
    label: string;
}

export interface RadioGroupProps {
    label: string;
    name: string;
    options: RadioGroup[];
    selectedValue: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    register : UseFormRegister<FormData>


}

export interface FormData {
    firstName: string,
    lastName: string,
    email: string,
    dob: string,
    contactNumber: string,
    address : string,
    profession: string,
    company: string,
    specialization: string,
    licenseNumber: string,
    insuranceInformation: string,
    gender: string,
    medicalHistory: string,
    educationalBackground: string,
    linkedin: string,
    twitter: string,
    comments: string,
    hashedPassword: string,
}
 

export interface FormDataProps {
    formData: FormData;
    handleInputChange: (name : keyof FormData , value : string) => void;
    register : UseFormRegister<FormData>;
    errors : UseFormRegister<FormData>
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    register : UseFormRegister<FieldValues>;
    errors   : FieldErrors< FieldValues>;
    /*setActiveSection: React.Dispatch<React.SetStateAction<number>>; // Assuming setActiveSection is of type React.Dispatch<number>
    isSubmit : boolean;
    setDisable : React.Dispatch<React.SetStateAction<boolean>>*/
}