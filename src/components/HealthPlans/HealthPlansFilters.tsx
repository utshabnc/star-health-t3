import { useEffect, useRef, useState } from "react";

export default function HealthPlansFilters({ params }: any) {
  const {
    zipcode,
    setZipcode,
    healthPlansDataError,
    healthPlansData,
    setDisplayHealthPlansData,
  } = params;
  const premiumList = healthPlansData?.map((hp: any) => hp?.premium || 0);
  const minNum = Math.min(...premiumList);
  const maxNum = Math.max(...premiumList);
  const progressRef = useRef<HTMLDivElement>(null);

  const [lowprice, setlowprice] = useState(minNum);
  const [highprice, sethighprice] = useState(maxNum);

  useEffect(() => {
    if (progressRef.current != null) {
      progressRef.current.style.left = (minNum / maxNum) * 1 + "%";
      progressRef.current.style.right = 1 - (maxNum / maxNum) * 1 + "%";
    }
    sethighprice(maxNum);
    setlowprice(minNum);
  }, [minNum, maxNum]);

  const handleMinPrice = (e: any) => {
    if (e.target.value <= highprice) {
      setlowprice(parseInt(e.target.value));
      const displayData = healthPlansData?.filter(
        (i: any) => i?.premium >= e.target.value && i?.premium <= highprice
      );
      setDisplayHealthPlansData(displayData);
    }
  };
  const handleHighPrice = (e: any) => {
    if (e.target.value >= lowprice) {
      sethighprice(parseInt(e.target.value));
      const displayData = healthPlansData?.filter(
        (i: any) => i?.premium <= e.target.value && i?.premium >= lowprice
      );
      setDisplayHealthPlansData(displayData);
    }
  };

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
                className={`
                          my-2 mx-1 w-[30%] cursor-pointer rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900`}
                value={zipcode}
                onChange={(e) => {
                  setZipcode(e.target.value);
                }}
              />
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
