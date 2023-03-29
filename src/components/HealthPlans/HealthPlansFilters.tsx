import { useEffect, useRef, useState } from "react";
interface HealthPlansFiltersProps {
  params: {
    zipcode: string;
    setZipcode: (zipcode: string) => void;
    healthPlansDataError: string;
    healthPlansData: any[] | undefined;
    setDisplayHealthPlansData: (data: any[] | undefined) => void;
    setHealthPlansData: (data: any[] | undefined) => void;
  };
}

export default function HealthPlansFilters({
  params,
}: HealthPlansFiltersProps) {
  const {
    zipcode,
    setZipcode,
    healthPlansDataError,
    healthPlansData,
    setDisplayHealthPlansData,
    setHealthPlansData,
  } = params;
  const premiumList = healthPlansData?.map((hp: any) => hp?.premium || 0) || [
    0,
  ];
  const issuerList =
    [...new Set(healthPlansData?.map((hp: any) => hp?.issuer?.name))] || [];

  const minNum = Math.min(...premiumList);
  const maxNum = Math.max(...premiumList);
  const progressRef = useRef<HTMLDivElement>(null);
  const [lowprice, setlowprice] = useState<number>(minNum);
  const [highprice, sethighprice] = useState<number>(maxNum);
  const [issuer, setIssuer] = useState<string>("");

  const handleMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value <= highprice) {
      setlowprice(value);
      let displayData = healthPlansData?.filter(
        (i: any) => i?.premium >= value && i?.premium <= highprice
      );
      if (issuer.length)
        displayData = displayData?.filter(
          (i: any) => i?.issuer?.name === issuer
        );
      setDisplayHealthPlansData(displayData);
    }
  };

  const handleHighPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= lowprice) {
      sethighprice(value);

      let displayData = healthPlansData?.filter(
        (i: any) => i?.premium <= value && i?.premium >= lowprice
      );

      if (issuer.length)
        displayData = displayData?.filter(
          (i: any) => i?.issuer?.name === issuer
        );
      setDisplayHealthPlansData(displayData);
    }
  };

  const filterByIssuer = (issuer: string) => {
    setIssuer(issuer);
    if (!issuer.length) {
      setDisplayHealthPlansData(healthPlansData);
    } else {
      const displayData = healthPlansData?.filter(
        (i: any) =>
          i?.issuer?.name === issuer &&
          i?.premium <= highprice &&
          i?.premium >= lowprice
      );
      setDisplayHealthPlansData(displayData);
    }
  };

  useEffect(() => {
    if (progressRef.current != null) {
      progressRef.current.style.left = (minNum / maxNum) * 1 + "%";
      progressRef.current.style.right = 1 - (maxNum / maxNum) * 1 + "%";
    }
    sethighprice(maxNum);
    setlowprice(minNum);
  }, [minNum, maxNum]);

  useEffect(() => {
    setIssuer("");
  }, [zipcode]);

  return (
    <>
      <div className="w-full">
        <div>
          <div className="filters flex w-full items-center">
            <p className="w-100 my-2 w-[12%] text-lg  text-violet-700">
              Search by Zipcode:
            </p>
            <div className="wrap-filters flex w-full items-center py-2">
              <input
                type="text"
                placeholder="Type in Zipcode to See Insurance Data..."
                className={`
                          my-2 mx-1 w-[30%] cursor-pointer rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900`}
                value={zipcode}
                onChange={(e) => {
                  setZipcode(e.target.value);
                  if (e.target.value.length === (5 || 0)) {
                    setHealthPlansData(undefined);
                  }
                }}
              />
              <select
                className="my-2 mx-5 w-[20%] cursor-pointer rounded-lg bg-violet-500 p-1 text-white hover:bg-violet-400 hover:text-violet-900"
                onChange={(e) => {
                  filterByIssuer(e.target.value);
                }}
                placeholder="Issuer"
              >
                <option selected value="">
                  Issuer
                </option>
                {issuerList?.map((item, index: number) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <div className="ml-5 flex flex-row items-center">
                <div className="text-violet-400">${minNum}</div>
                <div className="mb-4 mt-5 w-80 px-5">
                  <div className="slider relative h-1 rounded-md bg-violet-100">
                    <div
                      ref={progressRef}
                      className="progress absolute h-2  rounded"
                    ></div>
                  </div>
                  <div className="range-input relative">
                    <input
                      type="range"
                      value={lowprice}
                      onChange={handleMinPrice}
                      min={minNum}
                      step={1}
                      max={maxNum}
                      name="price-range"
                      id="price-range-low"
                      className="range-min pointer-events-none absolute -top-1 h-1 w-full cursor-pointer appearance-none bg-transparent accent-violet-500"
                    />
                    <input
                      type="range"
                      value={highprice}
                      onChange={handleHighPrice}
                      min={minNum}
                      step={1}
                      max={maxNum}
                      name="price-range"
                      id="price-range-high"
                      className="range-max pointer-events-none absolute -top-1 h-1 w-full cursor-pointer appearance-none bg-transparent accent-violet-500"
                    />
                  </div>
                </div>
                <div className="text-violet-400">${maxNum}</div>
              </div>
            </div>
          </div>
          {healthPlansDataError && (
            <p className="w-100 my-2 text-lg  text-red-700">
              {`zipcode ${healthPlansDataError}`}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
