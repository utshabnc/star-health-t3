import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
// import ReactStars from 'react-rating-stars-component';
import { Fragment, SetStateAction, useEffect, useState } from 'react';
import { availableYears, formatMoney, formatName, formatNumber } from '../../utils';
import _ from 'lodash';
import type { ProductResponse } from '../../server/trpc/router/db';
import Citation from '../Citation';
import { DataDirectoryCategory } from '../../utils/Enums/DataDirectoryCategory.enum';
import BookmarkButton from '../BookmarkButton';


interface DrugSchema {
  drug: ProductResponse;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onChangeYear: (year?: number) => void;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const DrugDets = ({ drug, onChangeYear }: DrugSchema) => {
  const isDrugInCompareList = () => {
    const compareDrugDevs = JSON.parse(localStorage.getItem('compareDrugDevs') || '[]');
    return compareDrugDevs.some((compDrugDevs: ProductResponse) => compDrugDevs.id === drug.id);
  };
  const [year, setYear] = useState(0);
  const [isCompared, setIsCompared] = useState(isDrugInCompareList);

  useEffect(() => {
    onChangeYear(year == 0 ? undefined : year);
  }, [year]);

  const handleClick = () => {
    const compareDrugDevs = JSON.parse(localStorage.getItem('compareDrugDevs') || '[]');
    if (compareDrugDevs.some((compDrugDevs: ProductResponse) => compDrugDevs.id === drug.id)) {
      
      return;
    }
    compareDrugDevs.push(drug);
    localStorage.setItem('compareDrugDevs', JSON.stringify(compareDrugDevs));
    setIsCompared(true);
  };

  

  const removeCompare = () => {

    const compareDrugDevs = JSON.parse(localStorage.getItem('compareDrugDevs') || '[]');
    const index = compareDrugDevs.findIndex((compDrugDevs: ProductResponse) => compDrugDevs.id === drug.name);
  
    if (index !== -1) {
      compareDrugDevs.splice(index, 1);
    }
    localStorage.setItem('compareDrugDevs', JSON.stringify(compareDrugDevs));
    setIsCompared(false);
  };

  return (
    <>
      <div className="flex flex-col justify-end sm:px-2 lg:px-28">
        <div className="flex flex-row justify-between	items-start">
          <p className="text-2xl font-semibold text-violet-700">
            {formatName(drug.name || "Unknown")}
          </p>
          <div className="flex justify-end min-w-[375px]">
            <Citation title={formatName(drug.name || "Unknown")} />
            <div className="ml-1">
              <BookmarkButton title={formatName(drug.name || "Unknown")} categoryId={DataDirectoryCategory.MedicalDevices} />
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
                  {availableYears.map((year) => (
                    <div key={year} className='py-1 flex justify-center'>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            value={year}
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm w-full overflow-y-auto '
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
              <p className="text-violet-700">{formatMoney(drug.totalAmount)}</p>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
