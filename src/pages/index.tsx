// import { type NextPage } from "next";
// import Head from "next/head";
// import Link from "next/link";
// import { signIn, signOut, useSession } from "next-auth/react";
// import { trpc } from "../utils/trpc";
// ***********************************************************************************************************************************************
import { useState } from 'react';
import { signIn } from 'next-auth/react';
// import { useAllStatesQuery } from './api';
import UnitedStatesHeatmap from '../components/charts/UnitedStatesHeatmap';
import Dropdown from '../components/Dropdown';
import SearchPage from './SearchPage';
import { drugTypes } from '../utils';
import _ from 'lodash'
import data_analytics from '../assets/data_analytics.png'
import ehr from '../assets/ehr.png'
import care_recommender from '../assets/care_recommender.png'
import api from '../assets/api.png'
import ratings_and_reviews from '../assets/ratings_and_reviews.png'
import community from '../assets/community.png'

import doctor from '../assets/doctor.png';
import manufacturer from '../assets/manufacturer.png';
import transactions from '../assets/transactions.png';

import doctors from '../assets/doctors.png';
import companies from '../assets/companies.png';
import states from '../assets/states.png';
import drugs from '../assets/drugs.png';


import goodRx from '../assets/GoodRx_logo.svg';
import fda from '../assets/fda.svg';
import cms from '../assets/cms.svg';
import type { StaticImageData } from "next/image";
import Image from "next/image";
import { trpc } from '../utils/trpc';
import { IoIosArrowDroprightCircle, IoIosArrowDropright } from 'react-icons/io';
import { FaPencilRuler, FaPaintBrush } from 'react-icons/fa';
import { MdPedalBike, MdOutlineAirplanemodeActive } from 'react-icons/md';
import { TbLayoutGridAdd } from 'react-icons/tb';
import { BsCheck2 } from 'react-icons/bs';
import Link from 'next/link';


const features = [
  { label: 'Data Analytics', img: data_analytics },
  { label: 'EMR & EHR', img: ehr },
  { label: 'Care Recommender', img: care_recommender },
	
];

const info = [
  { label: 'API', img: api },
  { label: 'Ratings & Reviews', img: ratings_and_reviews },
  { label: 'Community', img: community },
];

const data = [
  { label: '1,000,000+ Doctors', img: doctor },
  { label: '3,000+ Companies', img: manufacturer },
  { label: '$100,000,000+ Transactions', img: transactions },
];

const partners = [
  { label: '', img: cms },
  { label: '', img: fda },
  { label: '', img: goodRx },
];

const understand = [
  { label: 'Doctors', img: doctors, linkparam: 'doctors' },
  { label: 'Companies', img: companies, linkparam: 'manufacturers' },
  { label: 'States', img: states, linkparam: '' },
  { label: 'Drugs', img: drugs, linkparam: 'products' },
];

const InfoSection = ({
  items,
  header,
  boxStyle,
  itemTextSpacing = false,
	arrowButton = true,
  textColor,
	textSize = 'sm:text-5xl',
	linkable = false,
}: {
  items: { label: string; img?: StaticImageData; linkparam?:string; }[];
  header?: string;
  boxStyle?: string;
  textColor?: string;
  textSize?: string;
  itemTextSpacing?: boolean;
  arrowButton?: boolean;
  linkable?: boolean;

}) => {
  return (
    <div
      className={`flex flex-col py-4 pb-24 ${
        boxStyle == null ? "bg-[#0e1936]" : boxStyle
      }`}
    >
      {header && (
        <p
          className={`text-md flex justify-center text-center font-semibold ${textSize} pb-20 ${
            "text-" + textColor ?? "text-violet-700"
          } my-2 mt-8 mb-4`}
        >
          {header}
        </p>
      )}

				<div className="mx-2 flex flex-row justify-around sm:mx-2">
						{items.map((item, i) => (

							// <div key={i} className='relative w-full gap-4 rounded-md bg-white px-6 py-12'>
							
								<div
									className={`flex flex-col items-center border-bordercolor border-[1.5px] rounded-[6px] shadow-md relative w-full rounded-md bg-white px-6 py-8  ${
										boxStyle ? "" : "rounded-lg bg-[#0e1936] "
									} ${ itemTextSpacing ? 'h-[17.188rem]' : 'h-[13.8rem]'} 
									p-1 sm:w-[27%] md:w-[25.5%] xl:w-[21%] sm:p-3`}
									key={i}
								>
								{item.img && (
									<>
											{linkable ? (
												<Link
													href={{
													pathname: item.linkparam != '' ? '/directory' : '/',
													query: { tab: item.linkparam },
													}}>
													<Image
														src={item.img}
														alt={item.label}
														className=""
														style={{ height: 185, width: 185 }}
													/>
												</Link>

											) : (
												<Image
												src={item.img}
												alt={item.label}
												className=""
												style={{ height: 185, width: 185 }}
												/>
											)}						

									</>
								)}
								{linkable ? (		
									<Link
									href={{
									pathname: '/directory',
									query: { tab: item.linkparam },
									}}>						
										<div className='group absolute bottom-0 translate-y-[2rem] translate-x-[-2rem]'>
											{arrowButton ? (<IoIosArrowDroprightCircle color='#0e1936' size={60}/>) : ('')}
										</div>
									</Link>)
									: (
										<div className='group absolute bottom-0 translate-y-[2rem]'>
										{arrowButton ? (<IoIosArrowDroprightCircle color='#0e1936' size={60}/>) : ('')}
										</div>
									)
								}

								{linkable ? (			
									<Link
									href={{
									pathname: '/directory',
									query: { tab: item.linkparam },
									}}>					
										<p
											className={`justify-center text-xs  font-semibold lg:text-lg ${
												"text-" + textColor ?? "text-violet-700"
											}          ${itemTextSpacing && "mt-0"}`}
										>
										{item.label}
										</p>
									</Link>)
								: (								
									<p
										className={`justify-center text-xs  font-semibold lg:text-lg ${
											"text-" + textColor ?? "text-violet-700"
										}          ${itemTextSpacing && "mt-0"}`}
									>
									{item.label}
									</p>)
								}

							</div>

						))}
      </div>
    </div>
  );
};



export default function Home() {
  const [drugType, setDrugType] = useState<string>();
  const { data: allStates } = trpc.db.allStates.useQuery({ drugType })

  const FirstSection = () => (
		<div className='mb-20'>

			<div className='flex flex-col sm:flex-row justify-between mx-10 pt-10'>
        <div className='flex flex-col sm:w-[50%]'>
						<h2 className='flex text-center sm:text-5xl md:text-xl xl:text-8xl leading-tight font-bold justify-center font-custom text-white mt-10 mb-5 '>
								Future of Healthcare
						</h2>
						<p className='text-white text-center text-xl md:text-4xl mb-12'>
							Data - Care - Web3
						</p>
						{/* <div className='container-for-form mt-12 mb-11'>
							<form action="/" method="post">
								<div className='relative flex items-center justify-center'>
									<input className='w-44 h-14 mx-2 px-4 rounded-full' type="text" placeholder="Your Name" id="name" name="name" required />
									<input className='w-[24rem] h-14 mx-2 px-4 rounded-full' type="text" placeholder="Your Email" id="email" name="email" required />
									<button type="submit" className='absolute h-[3.15rem] ml-[26.3rem] bg-blue-500 hover:bg-blue-700 text-white font-custom py-2 px-4 rounded-full'>
										Create Account
									</button>
								</div>
							</form>
						</div> */}
						<div className='relative flex items-center justify-center'>
							{/* <button type="submit" className='my-4 bg-blue-500 hover:bg-blue-700 text-white text-2xl font-custom py-2 px-4 rounded-full'>
								Sign In
							</button> */}
							<button
                className='w-32 h-12 lg:w-22 text-xl font-custom font-medium bg-emerald-400 hover:bg-emerald-500 active:bg-emerald-600 rounded px-3 py-1'
                onClick={() => signIn("google")}
              >
                Sign In
              </button>
						</div>

				</div>
				<div className='sm:w-[50%] flex flex-col my-10'>
						
						<div className='w-[100%] h-[100%]'>
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
								<div className='w-[80%] h-[80%] ml-20'>
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
				items={features} 
				header='Features'
				textSize='sm:text-[5rem]'
				boxStyle='bg-white'
				textColor='font-custom'
				itemTextSpacing={true}
			/>
      <InfoSection 
				items={info} 
				textColor='font-custom'
				boxStyle='bg-white'
				itemTextSpacing={true}
			/>
      <Divider />
      <InfoSection
        items={data}
        header='StarHealth Data Directory'
				arrowButton={false}
        textColor='font-custom'
				boxStyle='bg-white'
        itemTextSpacing={true}
      />
			<InfoSection
        items={understand}
        textColor='font-custom'
				boxStyle='bg-white'
				itemTextSpacing={true}
				linkable={true}
      />
			<Divider />
      <InfoSection
        items={partners}
        header='Data Partners'
        textColor='font-custom'
				boxStyle='bg-white'
      />
			<Divider />
			{/* <div id='Features' className='section l4 wf-section text-customgrey [rgba(255, 255, 255, 0.65)] font-custom px-[80px] pt-[40px] pb-[150px]'>
				<div className='container max-w-[1040px] flex mx-auto flex-col justify-center items-center'>
					<div className='flex max-w-[900px] text-white title-wrapper flex-col mb-[40px] text-center'>
						<h2 className='h2-title my-0 pt-[40px] bg-transparent pl-0 text-[4vw] tracking-[-0.0375em] leading-[1.1] font-[700]'>
							High-Powered Tools
						</h2>
						<p className='max-w-[640px] my-0 px-[25px] text-[18px]'>
								Built to help you command research data - whether you’re part of a small research team or a large organization
						</p>
					</div>
					<div className='features-grid grid w-[100%] items-stretch auto-cols-custom gap-x-[40px] gap-y-[40px] grid-cols-custom3 grid-rows-custom2'>
						<div className='node p-[35px] col-start-1 row-start-1 row-end-3 border-solid border border-bordercolor rounded-[6px] features-card'>
							<div className='text-blue-500 flex mb-[25px] flex-col items-start features-row '>
								<FaPencilRuler size={27} className='mb-[25px]' />
								<div className='font-[700] text-white text-[18px] leading-[1.25] fontfeatures-card-title'>
									Ready to go
								</div>
							</div>
							<div className='mb-[40px] text-[16px] leading-[1.6] feature-card-text bottom-margin'>
								The worlds largest database of clinical trials made available through a simple API.
							</div>
							<div className='mb-[40px] text-[16px] leading-[1.6] feature-card-text bottom-margin'>
								The worlds medical knowledge plugged into your analysis.
							</div>
							<div className='mb-[40px] text-[16px] leading-[1.6] feature-card-text bottom-margin'>
								The Medical Board is...
							</div>
							<div className='text-white flex mb-[20px] flex-row items-center check-row'>
								<BsCheck2 size={30} color='#7CFC00' className='mr-2 ' />
								<div className='check-text'>
									Affordable
								</div>
							</div>
							<div className='text-white flex mb-[20px] flex-row items-center check-row'>
								<BsCheck2 size={30} color='#7CFC00' className='mr-2 ' />
								<div className='check-text'>
										Fast and Scalable
								</div>
							</div>
							<div className='text-white flex mb-[20px] flex-row items-center check-row'>
								<BsCheck2 size={30} color='#7CFC00' className='mr-2 ' />
								<div className='check-text'>
										Real Time
								</div>
							</div>
						</div>
						<div className='node p-[35px] col-start-2 row-start-1 row-end-1 border-solid border border-bordercolor rounded-[6px] features-card'>
							<div className='text-blue-500 flex mb-[25px] flex-col items-start features-row '>
								<FaPaintBrush size={27} className='mb-[25px]' />
								<div className='font-[700] text-white text-[18px] leading-[1.25] fontfeatures-card-title'>
									Customizable
								</div>
							</div>
							<div className='mb-[40px] text-[16px] leading-[1.6] feature-card-text bottom-margin'>
								Mix and match the data points according to your search query to generate new results.
							</div>
						</div>
						<div className='node p-[35px] col-start-3 row-start-1 row-end-1 border-solid border border-bordercolor rounded-[6px] features-card'>
							<div className='text-blue-500 flex mb-[25px] flex-col items-start features-row '>
								<MdPedalBike size={27} className='mb-[25px]' />
								<div className='font-[700] text-white text-[18px] leading-[1.25] fontfeatures-card-title'>
									Timely
								</div>
							</div>
							<div className='mb-[40px] text-[16px] leading-[1.6] feature-card-text bottom-margin'>
								Our service aggregates and cleans large amounts of data in seconds.
							</div>
						</div>
						<div className='node p-[35px] col-start-2 row-start-2 row-end-2 border-solid border border-bordercolor rounded-[6px] features-card'>
							<div className='text-blue-500 flex mb-[25px] flex-col items-start features-row '>
								<MdOutlineAirplanemodeActive size={27} className='mb-[25px]' />
								<div className='font-[700] text-white text-[18px] leading-[1.25] fontfeatures-card-title'>
									Accessible
								</div>
							</div>
							<div className='mb-[40px] text-[16px] leading-[1.6] feature-card-text bottom-margin'>
								Pricing that scales as you do. Individual researchers can use our platform for as little as $100/month.
							</div>
						</div>
						<div className='node p-[35px] col-start-3 row-start-2 row-end-2 border-solid border border-bordercolor rounded-[6px] features-card'>
							<div className='text-blue-500 flex mb-[25px] flex-col items-start features-row '>
								<TbLayoutGridAdd size={27} className='mb-[25px]' />
								<div className='font-[700] text-white text-[18px] leading-[1.25] fontfeatures-card-title'>
									Current
								</div>
							</div>
							<div className='mb-[40px] text-[16px] leading-[1.6] feature-card-text bottom-margin'>
								Our platform pulls the latest research as soon as it is published so your query results update in real time.
							</div>
						</div>

					</div>

				</div>

			</div> */}

    </div>
  );
}