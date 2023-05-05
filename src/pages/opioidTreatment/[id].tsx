import { useState,useEffect, useMemo, Fragment, SetStateAction } from 'react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { trpc } from '../../utils/trpc';
import type { OpioidTreatmentProvider } from '../../components/OpioidTreatmentProviders/OpioidTreatmentProvider.model';
import PhoneNumber from "../../components/PhoneNumber";

const OpioidTreatmentProviderDetails = () => {
  const navigate = useRouter();
  const id = navigate.query.id as string;

  const [opioidTreatmentProvider, setOpioidTreatmentProvider] = useState<OpioidTreatmentProvider | null | undefined>(null);

  const query = useMemo(() => ({ id }), [id]);
  const { data } = trpc.db.opioidTreatment.useQuery(query);

  useEffect(() => {
    setOpioidTreatmentProvider(data);
  }, [data]);

  // Loading Screen
  if (!opioidTreatmentProvider) {
    return (
      <>
        <div className='bgColor'>
          <div
            style={{
              height: '800px',
            }}
            className='p-3 rounded bg-white'
          >
            <div className='flex flex-row'>
              <div>
                <button
                  onClick={navigate.back}
                  className='border border-violet-700 bg-violet-700 text-white rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-violet-900 focus:outline-none focus:shadow-outline'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6 '
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'
                    />
                  </svg>
                </button>
              </div>
              <div className='flex justify-center w-11/12'>
                <div className='flex flex-col'>
                  <div className='max-w-2xl mx-auto mt-48'>
                    <svg
                      role='status'
                      className='inline h-20 w-20 animate-spin mr-2 text-gray-200 dark:text-gray-600 fill-purple-600'
                      viewBox='0 0 100 101'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                        fill='currentColor'
                      />
                      <path
                        d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                        fill='currentFill'
                      />
                    </svg>
                  </div>
                  <p className='flex font-semibold text-violet-700 justify-center text-lg sm:text-2xl pt-2'>
                    Loading StarHealth Data...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }


  return (
    <>
      <div className=' bgColor'>
        <div className='p-3 rounded bg-white'>
          <div className='flex flex-row'>
            <div>
              <button
                onClick={navigate.back}
                className='border border-violet-700 bg-violet-700 text-white rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-violet-900 focus:outline-none focus:shadow-outline'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6 '
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className='flex flex-col justify-end lg:px-24'>
            <p className='text-violet-700 text-2xl font-semibold'>
                {opioidTreatmentProvider.provider_name}
            </p>
            <p className='text-gray-500 text-sm'>
            <div>
                      <div className="flex flex-row justify-between">
                        <div className="flex flex-col">
                        <h5 className="text-md mb-2 text-gray-900">
                        {opioidTreatmentProvider.address_line_1}
                        <br />
                        {opioidTreatmentProvider.address_line_2 !== "" &&
                          opioidTreatmentProvider.address_line_2 !== undefined &&
                          opioidTreatmentProvider.address_line_2 !== null && (
                            <>
                              {opioidTreatmentProvider.address_line_2}
                              <br />
                            </>
                        )}
                        {opioidTreatmentProvider.city}, {opioidTreatmentProvider.state} {opioidTreatmentProvider.zip}
                      </h5>
                            <div className="text-md mb-2 text-gray-900 text-left">
                              <PhoneNumber phone={opioidTreatmentProvider.phone} />
                            </div>
                            <div className="text-md mb-2 text-gray-900 text-left">
                              NPI: {opioidTreatmentProvider.npi}
                            </div>
                          </div>
                        {/* </div> */}
                      </div>
                    </div>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OpioidTreatmentProviderDetails;
