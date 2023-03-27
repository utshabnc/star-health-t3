export default function HealthPlansFilters({ params }: any) {
  const { zipcode, setZipcode, healthPlansDataError } = params;
  return (
    <>
      <div className="w-full">
        <div>
          <div className="filters flex w-full items-center">
            <p className="w-100 my-2 text-lg  text-violet-700">
              Search by 5 digit zipcode:
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
