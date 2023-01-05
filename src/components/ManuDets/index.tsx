import { Fragment, SetStateAction, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import {
  availableYears,
  formatMoney,
  formatName,
  formatNumber,
  formatProductName,
  formatProductType,
} from "../../utils";
import Link from "next/link";
import type { ManufacturerResponse } from "../../server/trpc/router/db";

interface MenuSchema {
  name: string;
  state: string;
  country: string;
  amount: string;
  onChangeYear: (year?: number) => void;
  manufacturer: ManufacturerResponse;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const NUM_MANUFACTURERS = 2471;

export const ManuDets = (schema: MenuSchema) => {
  const d = new Date();
  const [year, setYear] = useState<number>(0);

  useEffect(() => {
    schema.onChangeYear(year == 0 ? undefined : year);
  }, [year]);

  return (
    <>
      <div className="flex flex-col justify-end lg:px-24">
        <p className="text-2xl font-semibold text-violet-700">
          {schema.manufacturer.name}
        </p>
        <p className="text-purp-2 font-semibold sm:text-sm lg:text-xl">
          Company Payments to Doctors: #
          {formatNumber(schema.manufacturer.rank ?? 0)} of{" "}
          {formatNumber(NUM_MANUFACTURERS)}
        </p>
        <p className="text-purp-5 sm:text-xs lg:text-lg">
          {schema.state}, {schema.country}{" "}
        </p>
        <div className="my-1">
          <hr />
        </div>

        <div className="flex flex-col items-center justify-around sm:h-[60px] sm:flex-row">
          <div className="flex">
            <div className="flex flex-row">
              <div className="flex flex-row text-lg font-semibold">
                Payments for:&nbsp;
                <div className="text-violet-700">
                  {year === 0 ? "All Years" : year}
                </div>
              </div>
              <Menu as="div" className="relative text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center bg-white text-sm font-medium text-gray-700">
                    <ChevronDownIcon
                      className="ml-2 mt-1 h-5 w-5"
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
                    <div className="flex justify-center py-1">
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
                            onClick={() => setYear(year)}
                          >
                            All Years
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                    {availableYears.map((year) => (
                      <div key={year} className="flex justify-center py-1">
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
          </div>
          <div className="flex">
            <p className="flex text-lg font-semibold text-gray-800">
              Total Payments to Doctors:&nbsp;
              <p className="text-violet-700">{schema.amount}</p>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1">
          <div className="my-2 mx-1 grid grid-cols-3 rounded-lg border-2 border-violet-400 p-2">
            <div className="flex flex-col ">
              <p className="font flex justify-center text-center  text-sm font-semibold underline sm:text-base">
                Top Paid Doctors
              </p>
              <ul className="flex flex-col items-center">
                {schema.manufacturer.topDoctors
                  .sort((a, b) => b.totalAmount - a.totalAmount)
                  .slice(0, 4)
                  .map((rec) => {
                    return (
                      <li
                        key={rec.doctor.id}
                        className="text-center text-sm sm:text-base "
                      >
                        <Link href={`/doctor/${rec.doctor.id}`} legacyBehavior>
                          <a className="text-purp-2">
                            {formatName(
                              `${rec.doctor.firstName} ${rec.doctor.lastName}`
                            )}
                          </a>
                        </Link>
                        : {formatMoney(rec.totalAmount)}
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className="flex flex-col ">
              <p className="font flex justify-center text-center  text-sm font-semibold underline sm:text-base">
                Largest Payments
              </p>
              <ul className="flex flex-col items-center">
                {schema.manufacturer.largestPayments
                  .sort((a, b) => b.amount - a.amount)
                  .slice(0, 4)
                  .map((rec) => {
                    return (
                      <li
                        key={rec.doctor.id}
                        className="text-center text-sm sm:text-base "
                      >
                        {formatMoney(rec.amount)}
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className="flex flex-col ">
              <p className="font flex justify-center text-center  text-sm font-semibold underline sm:text-base">
                Most Common Items
              </p>
              <ul className="flex flex-col items-center">
                {schema.manufacturer.items
                  .sort((a, b) => b.transactionCount - a.transactionCount)
                  .slice(0, 4)
                  .map((rec) => {
                    return (
                      <li
                        key={rec.id}
                        className="text-center text-sm sm:text-base "
                      >
                        {formatProductType(rec.productType)}:{" "}
                        {formatProductName(rec.productName)} (
                        {formatNumber(rec.transactionCount)})
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
