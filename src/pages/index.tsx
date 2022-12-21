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
import SearchPage from './SearchPage';
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
import { trpc } from '../utils/trpc';


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
        boxStyle == null ? "bg-gray-300 h-96 py-16" : boxStyle
      }`}
    >
      {header && (
        <p
          className={`text-md flex justify-center text-center font-semibold sm:text-2xl ${
            "text-" + textColor ?? "text-violet-700"
          } my-2 mt-8 mb-4`}
        >
          {header}
        </p>
      )}
      <div className="mx-2 flex flex-row justify-around sm:mx-20">
        {items.map((item, i) => (
          <div
            className={`flex flex-col items-center border-bordercolor border-[1px] rounded-[6px] ${
              boxStyle ? "" : "rounded-lg bg-gray-50 shadow-md"
            }   w-[25%] p-1 sm:w-[20%] sm:p-4`}
            key={i}
          >
            {item.img && (
              <>
                {typeof window != "undefined" && window.screen.width > 640 ? (
                  <Image
                    src={item.img}
                    alt={item.label}
                    className=""
                    style={{ height: 150, width: 150 }}
                  />
                ) : (
                  <Image
                    src={item.img}
                    alt={item.label}
										className="z-10"
                    style={{ height: 125, width: 125 }}
                  />
                )}
              </>
            )}
            <p
              className={`justify-center text-center text-xs  font-semibold lg:text-lg ${
                "text-" + textColor ?? "text-violet-700"
              }          ${itemTextSpacing && "mt-6"}`}
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
  const { data: allStates } = trpc.db.allStates.useQuery({ drugType })

  const FirstSection = () => (
		<div className='mb-20'>
				<h3 className='flex text-6xl font-bold justify-center font-custom text-white py-10 '>
						Passion for Better Healthcare
				</h3>

			<div className='flex flex-col sm:flex-row mt-2 sm:mt-8 justify-between'>
        <div className='flex flex-col sm:w-[45%]'>
					{/* <div className='w-[100%] h-[100%]'> */}
							<h3 className='flex text-md sm:text-xl text-center font-semibold justify-center font-custom text-white mb-6 sm:mt-4'>
										Heatmap of Company Payments to Doctors
							</h3>
							<div className='mb-4'>
							<Dropdown
									items={drugTypes.map((type) => ({
										value: type,
										label: _.capitalize(type),
									}))}
									label={'Filter Map By Drug Type'}
									value={drugType}
									placeholder={'All'}
									onChange={setDrugType}
							/>
							</div>
						 <div className='w-[85%] h-[85%] self-center bg-white rounded-3xl'>
								<UnitedStatesHeatmap
									data={
										allStates
											?.sort((a, b) => b.totalAmount - a.totalAmount)
											.slice(0, 50)
											.map((rec: { stateId: any; totalAmount: any }) => ({
												state: rec.stateId,
												value: rec.totalAmount,
											})) ?? []
									}
								/>
							</div>
					{/* </div> */}
				
				</div>
			<div className='sm:w-[55%] flex flex-col my-10'>
					<div className='flex justify-center'>
						{/* <SearchPage />	 */}
						<input className='w-[500px] h-14 mx-2 px-4 rounded-full' type="text" placeholder="Search for Doctor, Company, or Drug Data" id="search" name="search" required />
					</div>
					<div>
						<p className='flex mx-4 px-4 text-white font-custom my-10 text-xl'>
							About our company yadaya dayada.....yadayadayada yadayadayad ayadayadayadayada yadayadayadayad ayada yadayadayada yadayada yadayadayadayaday adayadayadayadayadaya dayada yadaya daya dayadayada.
						</p>
					</div>
					<div className='flex justify-center '>
						<form action="/" method="post">
							<div>
								<input className='w-44 h-14 mx-2 px-4 rounded-full' type="text" placeholder="Your Name" id="name" name="name" required />
								<input className='w-96 h-14 mx-2 px-4 rounded-full' type="text" placeholder="Your Email" id="email" name="email" required />
								<button type="submit" className='h-12 bg-blue-500 hover:bg-blue-700 text-white font-custom py-2 px-4 rounded-full'>
									Join Waitlist
								</button>
							</div>

						</form>
					</div>

				
			</div>



	
   


    </div>
		</div>
    
  );


  const Divider = () => <div className=''></div>;
  return (
    <div
      className='bg-[#0e1936] z-0'
    >
      <FirstSection />
      <InfoSection 
				items={info} 
				boxStyle='bg-[#0e1936] h-96 py-16'
				textColor='white font-custom'
			/>
      <Divider />
      <InfoSection
        items={data}
        header='StarHealth Data Directory'
        boxStyle='bg-[#0e1936] '
        textColor='white font-custom'
        itemTextSpacing={true}
      />
      <Divider />
      <InfoSection
        items={partners}
        header='Our Partners'
        boxStyle='bg-[#0e1936] '
        textColor='white font-custom'
      />

      <Divider />
      <InfoSection
        items={understand}
        header='Understand Healthcare through Data'
        boxStyle='bg-[#0e1936] pb-16'
        textColor='white font-custom'
      />
    </div>
  );
}