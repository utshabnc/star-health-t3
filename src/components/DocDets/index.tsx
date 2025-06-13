import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import ReactStars from 'react-star-rating-component';
import { Fragment, useEffect, useState } from 'react';
import { availableYears, formatMoney, formatName, formatNumber } from '../../utils';
import _ from 'lodash';
import type { DoctorResponse } from '../../server/trpc/router/db';

import Citation from '../Citation';
import { DataDirectoryCategory } from '../../utils/Enums/DataDirectoryCategory.enum';
import BookmarkButton from '../BookmarkButton';
import LocationButton from '../LocationButton';
import { formatFullAddress } from '../../utils';

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
  const isDoctorInCompareList = () => {
    const compareDoctors = JSON.parse(localStorage.getItem('compareDoctors') || '[]');
    return compareDoctors.some((compDoctor: DoctorResponse) => compDoctor.id === doctor.id);
  };

  const [year, setYear] = useState(0);
  const [isCompared, setIsCompared] = useState(isDoctorInCompareList);

  useEffect(() => {
    onChangeYear(year == 0 ? undefined : year);
  }, [year]);

  const numStars = _.mean(
    doctor.reviews?.map((review) => review.rating)
  );

  const numReviews = doctor.reviews?.length ?? 0;
  
  const handleClick = () => {
    const compareDoctors = JSON.parse(localStorage.getItem('compareDoctors') || '[]');
    if (compareDoctors.some((compDoctor: DoctorResponse) => compDoctor.id === doctor.id)) {
      
      return;
    }
    compareDoctors.push(doctor);
    localStorage.setItem('compareDoctors', JSON.stringify(compareDoctors));
    setIsCompared(true);
  };
  
  const removeCompare = () => {
    const compareDoctors = JSON.parse(localStorage.getItem('compareDoctors') || '[]');
    const index = compareDoctors.findIndex((doc: DoctorResponse) => doc.id === doctor.id);
    if (index !== -1) {
      compareDoctors.splice(index, 1);
    }
    localStorage.setItem('compareDoctors', JSON.stringify(compareDoctors));
    setIsCompared(false);
  };


  // THIS WILL FULL FORMAT THE DOCTOR ADDRESS PROPERTIES FOR GOOGLE MAPS CONSUMPTION
  const handleAddress = () => {
    if (doctor !== undefined) {
        const fullAddress = formatFullAddress(
          doctor?.addressLine1,
          doctor?.addressLine2,
          doctor?.city,
          doctor?.state, 
          doctor?.zipCode
        )

      return fullAddress;
    }
  }
  
  const formatttedAddress = doctor !== undefined && handleAddress()

  return (
      <div className="flex flex-col justify-end sm:px-2 lg:px-28">
        <div className="flex flex-row justify-between	items-start">
          <p className="text-2xl font-semibold text-violet-700">
            {formatName(doctor.firstName + " " + doctor.lastName)}
          </p>
          <div className="flex justify-end min-w-[375px]">
            <LocationButton address={formatttedAddress} text="Get Directions" />
            <div className="ml-1">
              <Citation title={formatName(doctor.firstName + " " + doctor.lastName)} />
            </div>
            <div className="ml-1">
              <BookmarkButton title={formatName(doctor.firstName + " " + doctor.lastName)} categoryId={DataDirectoryCategory.Doctors} />
            </div>
            <div className="ml-1">
              <button
                className="ease focus:shadow-outline select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none"
                onClick={isCompared ? removeCompare : handleClick}
              >
                {isCompared ? 'Remove Compare Item' : 'Compare'}
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center space-x-2">
          {numReviews > 0 ?
            <ReactStars
              name="rating"
              editing={false}
              value={numStars}
              starCount={5}
              starColor='#ffd700'
            /> : <><i className='text-black/50'>No Reviews</i></>
          }
          <div className="flex flex-row items-center">
            <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
              {isNaN(numStars) ? '' : numStars.toFixed(1)}
            </p>
            {!isNaN(numStars) && (
              <span className='w-1 h-1 mx-1.5'></span>
            )}
            {/* <Link href={`/doctor/${doctor.id}/reviews`} legacyBehavior>
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
        {doctor.topProducts.length > 0 && (
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
      )}
      {doctor.topProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-gray-500 text-lg"> No transaction records available for {formatName(doctor.firstName + " " + doctor.lastName)}.</p>
        </div>)
      }
      </div>
  );
}