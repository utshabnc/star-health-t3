import { FieldValues, UseFormRegister, FieldErrors } from "react-hook-form"
import {InputHTMLAttributes} from "react";


export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    register : UseFormRegister<FieldValues>;
    errors   : FieldErrors< FieldValues>;
    
}