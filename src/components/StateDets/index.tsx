import { Fragment, SetStateAction, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import {
  availableYears,
  drugTypes,
  formatMoney,
  formatName,
  formatNumber,
  formatProductName,
  formatProductType,
} from "../../utils";
import _ from "lodash";
// import manufacturer, {
//   ManufacturerResponse,
// } from '../../../functions/src/manufacturer';
import Link from "next/link";
import type { StateResponse } from "../../server/trpc/router/db";
import Dropdown from "../Dropdown";
import CountyHeatmap from "../charts/CountyHeatmap";

interface StateSchema {
  onChangeYear: (year?: number) => void;
  drugType?: string;
  year?: string;
  onChangeDrugType: (drugType?: string) => void;
  state: StateResponse;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const StateDets = ({
  state,
  year,
  onChangeYear,
  drugType,
  onChangeDrugType,
}: StateSchema) => {
  const d = new Date();

  console.log("S", state.summaryRank);
  return (
    <>
      <div className="flex flex-col justify-end lg:px-24">
        <div className="flex flex-row justify-between">
          <div>
            <p className="p-1 text-3xl font-semibold text-violet-700">
              {state.name}
            </p>
            <p className="text-purp-2 text-xl font-semibold">
              #{formatNumber(Math.min(state.rank ?? 0, 50))} of{" "}
              {formatNumber(50)} in Company Payments to Doctors
            </p>
            {drugType && (
              <p className="text-purp-2 text-xl font-semibold">
                #{formatNumber(Math.min(state.summaryRank ?? 0, 50))} of{" "}
                {formatNumber(50)} for type: {_.capitalize(drugType)}
              </p>
            )}
          </div>
          <CountyHeatmap
            state={state?.id ?? ""}
            data={state?.counties ?? []}
            width={250}
            height={150}
          />
        </div>
        <div className="my-1">
          <hr />
        </div>

        <div className="mb-3 grid sm:grid-rows-3 lg:h-4 lg:grid-cols-3">
          <Dropdown
            items={drugTypes.map((type) => ({
              value: type,
              label: _.capitalize(type),
            }))}
            label={"Drug Type"}
            value={drugType}
            placeholder={"All"}
            onChange={onChangeDrugType}
          />
          <div className="flex justify-center">
            <div className="flex flex-row">
              <div className="flex flex-row text-lg font-semibold">
                Payments for:&nbsp;
                <div className="text-violet-700">
                  {!year ? "All Years" : year}
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
                            // onClick={() => onChangeear(year)}
                          >
                            All Years
                          </button>
                        )}
                      </Menu.Item>
                    </div>
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
                              onClick={() => onChangeYear(year)}
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
          <div className="flex justify-center pt-1">
            <div className="flex text-lg font-semibold text-gray-800">
              Total Payments:&nbsp;
              <p className="text-violet-700">
                {formatMoney(state.totalAmount)}
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1">
          <div className=" my-2 mx-1 grid grid-cols-2 rounded-lg border-2 border-violet-400 p-2">
            <div className="flex flex-col ">
              <p className="font flex justify-center text-sm font-semibold underline sm:text-base">
                Top Paid Doctors
              </p>
              <ul className="flex flex-col items-center">
                {state.topDoctors
                  .sort((a, b) => b.totalAmount - a.totalAmount)
                  .slice(0, 4)
                  .map((rec) => {
                    return (
                      <li key={rec.doctor.id}>
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
              <p className="font flex justify-center text-sm font-semibold underline sm:text-base">
                Most Common Items
              </p>
              <ul className="flex flex-col items-center">
                {state.topItems
                  .sort((a, b) => b.transactionCount - a.transactionCount)
                  .slice(0, 4)
                  .map((rec, idx) => {
                    return rec.product?.type?.toLowerCase() === "drug" ? (
                      <Link href={`/drug/${rec.product?.id}`}>
                        {formatProductType(rec.product?.type)}:{" "}
                        {
                          <span className="underline">
                            {formatProductName(rec.product?.name)}
                          </span>
                        }{" "}
                        ({formatNumber(rec.transactionCount)})
                      </Link>
                    ) : (
                      // &nbsp;
                      <li key={`${rec.product?.name}-${idx}`}>
                        {formatProductType(rec.product?.type)}:{" "}
                        {formatProductName(rec.product?.name)} (
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
