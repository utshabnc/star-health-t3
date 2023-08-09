import React, { useEffect, useState } from 'react';
import {GrClose} from 'react-icons/gr'
interface AutocompleteInputProps {
  expr: string,
  setExpr?:React.Dispatch<React.SetStateAction<string>>;
  setFoodItem:React.Dispatch<React.SetStateAction<any>>;
  options: optionItem[];
}
interface optionItem{
  name: string,
  id: string
} 
const FoodAutocompleteInput: React.FC<AutocompleteInputProps> = ({ expr,setExpr,setFoodItem,options }) => {
  const [open,setOpen]=useState(false)
  const [choose,setChoose]=useState(false)
  useEffect(()=>{
    console.log(options)

  },[expr])
const dictionaryMap = new Map();
const dictionary = new Map();
  return (
    <div className="flex flex-col w-[100%] items-start">
                  <input
                    type="text"
                    placeholder={`Search`}
                    className={`
                           w-[100%] cursor-pointer rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900`}
                    value={expr}
                    onChange={(e) => {
                      if (setExpr)
                      {setExpr(e.target.value);}
                      setOpen(true)
                    }}
                    onBlur={(e)=>{if(!choose){setOpen(false);setChoose(false)}}}
                    onFocus={(e)=>{setOpen(true)}}
                  />
                <div>

                {open && expr.length > 0 && (
                  <div className='absolute w-100 z-30'>
                  <div onClick={(e)=>setOpen(false)} className='closeSuggestions justify-end'>
                    <GrClose></GrClose>
                  </div>
                  <ul className="suggestions"                      
                  onMouseEnter={(e)=>setChoose(true)}
                  onMouseLeave={(e)=>setChoose(false)}>
                  { options.length == 0&&(
                              <li className="no-suggestions">
                              <em>No Suggestions Available</em>
                            </li>
                  )}
                  {options?.map((option:optionItem,index)=>(
                      <li key={index} onClick={() => {const val:string=option.name?option.name:'';                 
                      if (setExpr)
                      {setExpr(val);
                      setFoodItem(option)
                      }
                    setOpen(false);setChoose(true)}}>
                      {option.name}
                    </li>
                    ))}
                  </ul>
                  </div>
                )
                }
                </div>
                </div>
  );
};

export default FoodAutocompleteInput;
