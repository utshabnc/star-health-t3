import React, { useState } from 'react';

interface AutocompleteInputProps {
  expr: string,
  setExpr?:React.Dispatch<React.SetStateAction<string>>;
  setFilterParam?:React.Dispatch<React.SetStateAction<FilterParams>>
  options: string[];
}

export interface FilterParams {
  subject: string;
  state: string;
  city: string;
  zipCode: string;
  specialty: string;
  type: string;
  category: string;
  doctorFilter: string;
  manufacturerFilter: string;
  productFilter: string;
  cursor: string;
  year: string;
  price: PriceFilter;
  name: string;
  drugManufacturer: string;
  drugType: string;
  drugRoute: string;
}
interface PriceFilter {
  min: number;
  max: number;
}
const AutocompleteInput: React.FC<AutocompleteInputProps> = ({ expr,setExpr,setFilterParam,options }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [open,setOpen]=useState(false)
  const [choose,setChoose]=useState(false)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    const filtered = options.filter(option =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleOptionClick = (option: string) => {
    setInputValue(option);
    setFilteredOptions([]);
  };

  return (
    <div className="flex flex-col w-[100%] items-start">
                  <input
                    type="text"
                    placeholder={`Search`}
                    className={`
                          mx-1 my-2 w-[30%] cursor-pointer rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900`}
                    value={expr}
                    onChange={(e) => {
                      if (setExpr)
                      {setExpr(e.target.value);}
                      else{
                        setFilterParam((prev) => {
                          return {
                            ...prev,
                            name: e.target.value,
                          };
                        });
                      }
                      setOpen(true)
                    }}
                    onBlur={(e)=>{if(choose){setOpen(false);setChoose(false)}e}}
                    onFocus={(e)=>{setOpen(true)}}
                  />
                <div>

                {open && expr.length > 0 && (
                  <ul className="suggestions"                      
                  onFocus={(e)=>setOpen(true)}>
                  { options.length == 0&&(
                              <div className="no-suggestions">
                              <em>No suggestions Available</em>
                            </div>
                  )}
                    {options?.map((option:any,index)=>(
                      <li key={index} onClick={() => {const val:string=option?option:'';                 
                      if (setExpr)
                      {setExpr(val);}
                      else{
                        setFilterParam((prev) => {
                          return {
                            ...prev,
                            name:val,
                          };
                        });
                      }setOpen(false);setChoose(true)}}>
                      {option}
                    </li>
                    ))}
                  </ul>
                )}
                </div>
                </div>
  );
};

export default AutocompleteInput;
