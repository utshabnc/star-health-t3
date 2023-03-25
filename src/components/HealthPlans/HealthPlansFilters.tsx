import { useEffect, useState } from "react";

export default function ClinicalTrialsFilters({
  MaximumAge,
}: // OnSearchExprChange,
any) {
  const [maximumAge, setMaximumAge] = useState<string>("");
  // const [searchExpr, setSearchExpr] = useState<string>("");

  // useEffect(() => {
  //   const searchExprArr = [];

  //   if (maximumAge.length > 1) {
  //     searchExprArr.push(`AREA[${MaximumAge}]${maximumAge}`);
  //   }

  //   setSearchExpr(searchExprArr.join(" AND "));
  // }, [maximumAge]);

  // useEffect(() => {
  //   OnSearchExprChange(searchExpr);
  // }, [searchExpr, OnSearchExprChange]);

  return (
    <>
      <div className="w-full">
        <div>
          <div className="filters flex w-full items-center">
            <p className="my-2 w-20 text-lg  text-violet-700">Filter By:</p>
            <div className="wrap-filters flex w-full items-center py-2">
              <select
                className="my-2 mx-1 w-[20%] cursor-pointer rounded-lg bg-violet-500 p-1 text-white hover:bg-violet-400 hover:text-violet-900"
                onChange={(e) => {
                  setMaximumAge(e.target.value);
                }}
                placeholder="Maximum Age"
              >
                {maximumAge.length < 1 ? (
                  <option value="">Maximum Age</option>
                ) : (
                  <option value="">-</option>
                )}
                {MaximumAge?.map((item: any, index: number) => (
                  <option key={index} value={item.FieldValue}>
                    {item.FieldValue}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
