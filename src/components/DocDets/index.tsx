import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
// import ReactStars from 'react-rating-stars-component';
import { Fragment, useEffect, useState } from 'react';
import { availableYears, formatMoney, formatName, formatNumber } from '../../utils';
// import { DoctorResponse } from '../../../functions/src/doctor';
import _ from 'lodash';
import type { DoctorResponse } from '../../server/trpc/router/db';

interface DocSchema {
  doctor: DoctorResponse;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onChangeYear: (year?: number) => void;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const NUM_DOCTORS = 1267275;

export const DocDets = ({ doctor, onChangeYear }: DocSchema) => {
  const [year, setYear] = useState(0);

  useEffect(() => {
    onChangeYear(year == 0 ? undefined : year);
  }, [year]);

  // const numStars = _.mean(
  //   doctor.reviews?.map((review) => review.rating)
  // );

  // console.log({ numStars });

  // const numReviews = doctor.reviews?.length ?? 0;

  return (
    <>
      <div className="flex flex-col justify-end sm:px-2 lg:px-28">
        <p className="text-2xl font-semibold text-violet-700">
          {formatName(doctor.firstName + " " + doctor.lastName)}
        </p>
        <div className="flex flex-row items-center space-x-2">
          {/* <ReactStars
            edit={false}
            value={numStars}
            isHalf={true}
            count={5}
            // size={screen.width > 1000 ? 24 : 15}
            size={24}
            activeColor='#ffd700'
          /> */}
          <div className="flex flex-row items-center">
            <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
              {/* {isNaN(numStars) ? '' : numStars.toFixed(1)} */}
            </p>
            {/* {!isNaN(numStars) && (
              <span className='w-1 h-1 mx-1.5'></span>
            )} */}
            {/* <Link to={`/doctor/${doctor.id}/reviews`} legacyBehavior>
              <a className='text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white'>
                {numReviews} {numReviews === 1 ? 'review' : 'reviews'}
              </a>
            </Link> */}
          </div>
        </div>
        <p className="text-purp-2 font-semibold sm:text-sm lg:text-xl">
          Payments Received: #{formatNumber(doctor.rank ?? 0)} of{" "}
          {formatNumber(NUM_DOCTORS)}
        </p>
        <p className="text-purp-5 pt-1 sm:text-xs lg:text-lg">
          Specialty: {doctor.specialty}
        </p>
        <p className="text-purp-5 pt-1 sm:text-xs lg:text-lg">
          Location:{" "}
          {doctor.addressLine1 + ", " + doctor.city + ", " + doctor.state}
        </p>
        <div className="my-1">
          <hr />
        </div>
        <div className="flex flex-col items-center justify-around sm:h-[60px] sm:flex-row">
          <div className="flex">
            <div className="flex flex-row text-lg font-semibold">
              Payments for:&nbsp;
              <div className="text-violet-700">
                {year || "All Years"}
              </div>
            </div>
            <Menu as="div" className="relative text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center bg-white text-sm font-medium text-gray-700">
                  <ChevronDownIcon
                    className="ml-1 mt-1 h-5 w-5"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 h-56 w-56 origin-top-right divide-y divide-gray-100 overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        value={0}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block w-full overflow-y-auto px-4 py-2 text-sm "
                        )}
                        onClick={() => setYear(0)}
                      >
                        {"All Years"}
                      </button>
                    )}
                  </Menu.Item>
                  {availableYears.map((year, i) => (
                    <div key={i} className="flex justify-center py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            value={year}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block w-full overflow-y-auto px-4 py-2 text-sm "
                            )}
                            onClick={() => setYear(year)}
                          >
                            {year}
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <div className="flex">
            <p className="flex text-lg font-semibold text-gray-800">
              Pay from Manufacturers:&nbsp;
              <p className="text-violet-700">{formatMoney(doctor.totalAmount)}</p>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
