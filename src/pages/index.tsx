// import { type NextPage } from "next";
// import Head from "next/head";
// import Link from "next/link";
// import { signIn, signOut, useSession } from "next-auth/react";
// import { trpc } from "../utils/trpc";
// ***********************************************************************************************************************************************
import { useState } from 'react';
// import { useAllStatesQuery } from './api';
import UnitedStatesHeatmap from '../components/charts/UnitedStatesHeatmap';
import Dropdown from '../components/Dropdown';
// import SearchPage from './SearchPage';
import { drugTypes } from '../utils';
import _ from 'lodash'
import transparent from '../assets/transparent.png';
import mapping from '../assets/mapping.png';
import ratings from '../assets/ratings.png';
import doctor from '../assets/doctor.png';
import money from '../assets/money.png';
import officeBuilding from '../assets/office-building.png';
import doctor2 from '../assets/doctor-2.png';
import company from '../assets/company.png';
import drug from '../assets/drug.png';
import state from '../assets/state.png';
import goodRx from '../assets/GoodRx_logo.svg';
import fda from '../assets/fda.svg';
import cms from '../assets/cms.svg';
import type { StaticImageData } from "next/image";
import Image from "next/image";


const info = [
  { label: 'Rate & Review Doctors', img: ratings },
  { label: 'Transparent Doctor, Company, and Drug Data', img: transparent },
  { label: 'Book a Doctor Appointment', img: mapping },
];

const InfoSection = ({
  items,
  header,
  boxStyle,
  itemTextSpacing = false,
  textColor,
}: {
  items: { label: string; img?: StaticImageData }[];
  header?: string;
  boxStyle?: string;
  textColor?: string;
  itemTextSpacing?: boolean;
}) => {
  return (
    <div
      className={`flex flex-col ${
        boxStyle == null ? 'bg-gray-300 py-4' : boxStyle
      }`}
    >
      {header && (
        <p
          className={`flex text-center text-md sm:text-2xl font-semibold justify-center ${
            'text-' + textColor ?? 'text-violet-700'
          } my-2 mt-8 mb-4`}
        >
          {header}
        </p>
      )}
      <div className='mx-2 sm:mx-20 flex flex-row justify-around'>
        {items.map((item, i) => (
          <div
            className={`flex flex-col items-center ${
              boxStyle ? '' : 'bg-gray-50 rounded-lg shadow-md'
            }   w-[25%] sm:w-[20%] p-1 sm:p-4`}
            key={i}
          >
            {/* <div className='w-[170px] h-[170px]'>
                <img src={item.img} />
              </div> */}
            {item.img && (
              <>
                (
                  <Image src={item.img} alt={'image'} className='sm:w-38 sm:h-32' />
                )
              </>
            )}
            <p
              className={`text-center text-xs lg:text-lg  font-semibold justify-center ${
                'text-' + textColor ?? 'text-violet-700'
              }          ${itemTextSpacing && 'mt-6'}`}
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const data = [
  { label: '1M+ Doctors', img: doctor },
  { label: '2800+ Companiess', img: officeBuilding },
  { label: '$80M Transactions', img: money },
];

const partners = [
  { label: '', img: cms },
  { label: '', img: fda },
  { label: '', img: goodRx },
];

const understand = [
  { label: 'Doctors', img: doctor2 },
  { label: 'Companies', img: company },
  { label: 'States', img: state },
  { label: 'Drugs', img: drug },
];


export default function Home() {
  const [drugType, setDrugType] = useState<string>();
  // const { data: allStates } = useAllStatesQuery({ drugType });

  const FirstSection = () => (
    <div className='flex flex-col sm:flex-row mt-2 sm:mt-8 justify-between'>
      <div className='flex flex-col sm:w-[50%] ml-2 sm:ml-8'>
        <h3 className='flex sm:w-[60%] text-3xl sm:text-6xl text-left font-bold justify-center text-violet-700 my-2 mb-4'>
          Passion for Better Healthcare
        </h3>
        {/* <SearchPage /> */}
      </div>
      <div className='sm:w-[50%] flex flex-col'>
        <h3 className='flex text-md sm:text-xl text-center font-semibold justify-center text-violet-700 mb-4 mt-4 sm:mt-4'>
          Heatmap of Company Payments to Doctors
        </h3>
        <Dropdown
        items={[]}
          // items={drugTypes.map((type) => ({
          //   value: type,
          //   label: _.capitalize(type),
          // }))}
          label={'Drug Type'}
          // value={drugType}
          value={'value'}
          placeholder={'All'}
          // onChange={setDrugType}
          onChange={() => null}
        />
        <div className='w-[75%] h-[75%] self-center'>
          <UnitedStatesHeatmap
            data={[]}
            // data={
            //   allStates
            //     ?.sort((a, b) => b.totalAmount - a.totalAmount)
            //     .slice(0, 50)
            //     .map((rec: { stateId: any; totalAmount: any }) => ({
            //       state: rec.stateId,
            //       value: rec.totalAmount,
            //     })) ?? []
            // }
          />
        </div>
      </div>
    </div>
  );

  const Divider = () => <div className=''></div>;
  return (
    <div
      className='bg-white
     '
    >
      <FirstSection />
      <InfoSection items={info} />
      <Divider />
      <InfoSection
        items={data}
        header='StarHealth Data Directory'
        boxStyle='bg-purp-3'
        textColor='white'
        itemTextSpacing={true}
      />
      <Divider />
      <InfoSection
        items={partners}
        header='Our Partners'
        boxStyle='bg-purp-2'
        textColor='white'
      />

      <Divider />
      <InfoSection
        items={understand}
        header='Understand Healthcare through Data'
        boxStyle='bg-purp-1'
        textColor='white'
      />
    </div>
  );
}