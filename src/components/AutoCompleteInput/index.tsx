import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
interface AutocompleteInputProps {
  expr: string;
  setExpr?: React.Dispatch<React.SetStateAction<string>>;
  setFilterParam?: React.Dispatch<React.SetStateAction<FilterParams>>;
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
const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  expr,
  setExpr,
  setFilterParam,
  options,
}) => {
  const [inputValue, setInputValue] = useState("");
  function levenshteinDistance(a: string, b: string): number {
    const distance: number[][] = Array.from(Array(a.length + 1), () =>
      Array(b.length + 1).fill(0)
    );

    for (let i = 0; i <= a.length; i++) {
      distance ? ([i][0] = i) : 0;
    }

    for (let j = 0; j <= b.length; j++) {
      distance ? ([0][j] = j) : 0;
    }

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        distance
          ? ([i][j] = Math.min(
              distance ? [i - 1][j] ?? 0 + 1 : 1,
              distance ? [i][j - 1] ?? 0 + 1 : 1,
              distance ? [i - 1][j - 1] ?? 0 + cost : cost
            ))
          : 0;
      }
    }

    return distance ? [a.length][b.length] ?? 0 : 0;
  }
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [choose, setChoose] = useState(false);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    const filtered = options.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    const suggestions = options.filter((option) => {
      const distance = levenshteinDistance(
        value.toLowerCase(),
        option.toLowerCase()
      );
      return distance <= 4; // You can adjust the threshold for suggestions
    });
    setFilteredOptions([...suggestions, ...filtered]);
  };
  const dictionaryMap = new Map();
  const handleOptionClick = (option: string) => {
    setInputValue(option);
    setFilteredOptions([]);
  };
  const dictionary = new Map();
  return (
    <div className="flex w-[100%] flex-col items-start">
      <input
        type="text"
        placeholder={`Search`}
        className={`
                          mx-1 my-2 w-[60%] cursor-pointer rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900`}
        value={expr}
        onChange={(e) => {
          if (setExpr) {
            setExpr(e.target.value);
          } else if (setFilterParam) {
            setFilterParam((prev) => {
              return {
                ...prev,
                name: e.target.value,
              };
            });
          }
          setOpen(true);
        }}
        onBlur={(e) => {
          if (!choose) {
            setOpen(false);
            setChoose(false);
          }
        }}
        onFocus={(e) => {
          setOpen(true);
        }}
      />
      <div>
        {open && expr.length > 0 && (
          <div className="w-100 absolute z-30">
            <div
              onClick={(e) => setOpen(false)}
              className="closeSuggestions justify-end"
            >
              <GrClose></GrClose>
            </div>
            <ul
              className="suggestions"
              onMouseEnter={(e) => setChoose(true)}
              onMouseLeave={(e) => setChoose(false)}
            >
              {options.length == 0 && (
                <li className="no-suggestions">
                  <em>No Suggestions Available</em>
                </li>
              )}
              {options?.map((option: any, index) => (
                <li
                  key={index}
                  onClick={() => {
                    const val: string = option ? option : "";
                    if (setExpr) {
                      setExpr(val);
                    } else if (setFilterParam) {
                      setFilterParam((prev) => {
                        return {
                          ...prev,
                          name: val,
                        };
                      });
                    }
                    setOpen(false);
                    setChoose(true);
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AutocompleteInput;
