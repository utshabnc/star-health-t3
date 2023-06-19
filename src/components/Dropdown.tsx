import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment, useEffect, useState } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export type Item = {
  value: string;
  label: string;
};

type Props = {
  items: Item[];
  label: string;
  placeholder: string;
  value: string | undefined;
  onChange: (newValue?: string) => void;
};

const Dropdown = ({ items, label, placeholder, onChange, value }: Props) => {
  return (
    <div className="flex items-center">
      <div className="flex flex-row font-custom text-lg text-violet-700">
        {label}:&nbsp;
      </div>
      <select
        onChange={(e) => onChange(e.target.value)}
        value={value}
        className='bg-violet-500 my-2 text-white p-1 rounded-lg mx-1 hover:bg-violet-400 hover:text-violet-900 cursor-pointer' name="state-filter" id="state-filter">
        <option value={""}>{placeholder}</option>
        {items.map((item, index) => (
          <option key={index} value={item.value}>{item.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
