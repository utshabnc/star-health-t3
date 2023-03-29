// import { type NextPage } from "next";
// import Head from "next/head";
// import Link from "next/link";
// import { signIn, signOut, useSession } from "next-auth/react";
// import { trpc } from "../utils/trpc";
// ***********************************************************************************************************************************************
import { useState } from "react";
import { signIn } from "next-auth/react";
// import { useAllStatesQuery } from './api';
import UnitedStatesHeatmap from "../components/charts/UnitedStatesHeatmap";
import Dropdown from "../components/Dropdown";
import SearchPage from "./SearchPage";
import { drugTypes } from "../utils";
import _ from "lodash";
import data_analytics from "../assets/data_analytics.png";
import ehr from "../assets/ehr.png";
import care_recommender from "../assets/care_recommender.png";
import api from "../assets/api.png";
import ratings_and_reviews from "../assets/ratings_and_reviews.png";
import community from "../assets/community.png";

import doctor from "../assets/doctor.png";
import manufacturer from "../assets/manufacturer.png";
import transactions from "../assets/transactions.png";

import doctors from "../assets/doctors.png";
import companies from "../assets/companies.png";
import states from "../assets/states.png";
import drugs from "../assets/drugs.png";

/* import goodRx from "../assets/GoodRx_logo.svg";
import cms from "../assets/cms.svg";
import fda from "../assets/fda.svg"; */
import fda from "../assets/logos/fda.png";
import cms from "../assets/logos/cms.png";
import openPayments from "../assets/logos/open-payments.png";
import clinicalTrials from "../assets/logos/clinical-trials.png";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import { trpc } from "../utils/trpc";
import { IoIosArrowDroprightCircle, IoIosArrowDropright } from "react-icons/io";
import { FaPencilRuler, FaPaintBrush } from "react-icons/fa";
import { MdPedalBike, MdOutlineAirplanemodeActive } from "react-icons/md";
import { TbLayoutGridAdd } from "react-icons/tb";
import { BsCheck2 } from "react-icons/bs";
import Link from "next/link";
import InfoSection from "../components/InfoSection";
import testTubes from "../assets/logos/test-tubes.png";
import devices from "../assets/logos/devices.png";
import insurance from "../assets/logos/insurance.png";
import payments from "../assets/logos/payments.png";
import insights from "../assets/logos/insights.png";
import dashboard from "../assets/logos/dashboard.png";
import healthcare from "../assets/logos/healthcare.png";
import Map from "../components/Map";

const features = [
  { label: "Data Analytics", img: data_analytics },
  { label: "Healthcare Data", img: healthcare },
  {
    label: "Proprietary Insights & Clinical intelligence",
    img: insights,
  },
];

const info = [
  { label: "API", img: api },
  { label: "Ratings & Reviews", img: ratings_and_reviews },
  { label: "Customizable dashboards", img: dashboard },
];

const data = [
  { label: "1,000,000+ Doctors", img: doctor },
  { label: "3,000+ Companies", img: manufacturer },
  { label: "$100,000,000+ Transactions", img: transactions },
  { label: "50 States", img: states, linkparam: "" },
];

const partners = [
  { label: "", img: openPayments },
  { label: "", img: fda },
  { label: "", img: cms },
  { label: "", img: clinicalTrials },
  /* { label: "", img: cms },
  { label: "", img: fda },
  { label: "", img: goodRx }, */
];

/* const understand = [
  { label: "Doctors", img: doctors, linkparam: "doctors" },
  { label: "Companies", img: companies, linkparam: "manufacturers" },
]; */

const dataDir = [
  {
    label: "450,000+ clinical trials",
    img: testTubes,
    linkparam: "clinical trials",
  },
  {
    label: "200+ medical devices",
    img: devices,
    linkparam: "products",
  },
  { label: "700+ insurance plans", img: insurance, linkparam: "" },
  { label: "1,500+ Drugs", img: drugs, linkparam: "products" },
];

export default function Home() {
  const [drugType, setDrugType] = useState<string>();
  const { data: allStates } = trpc.db.allStates.useQuery({ drugType });
  //   console.log(data)
  const FirstSection = () => (
    <div className="mx-10 flex items-center justify-center pb-20 pt-10 sm:flex-row">
      <div className="flex flex-col sm:w-[50%]">
        <h2 className="mt-10 mb-5 flex justify-center text-center font-custom font-bold leading-tight text-white sm:text-5xl md:text-xl xl:text-8xl ">
          Data-Driven Healthcare
        </h2>
        <p className="mb-12 text-center text-xl text-white md:text-4xl">
          Data - Insights - Statistics
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
        <div className="relative flex items-center justify-center">
          {/* <button type="submit" className='my-4 bg-blue-500 hover:bg-blue-700 text-white text-2xl font-custom py-2 px-4 rounded-full'>
								Sign In
							</button> */}
          <button
            className="lg:w-22 h-12 w-32 rounded bg-emerald-400 px-3 py-1 font-custom text-xl font-medium hover:bg-emerald-500 active:bg-emerald-600"
            onClick={() => signIn("google")}
          >
            Sign In
          </button>
        </div>
        <div className="mx-auto mt-16 flex w-fit items-center justify-center gap-10 rounded-xl bg-white px-10">
          <Image
            src="/logos/open-payments.png"
            alt=""
            width={128}
            height={128}
          />
          <Image src="/logos/fda.png" alt="" width={128} height={128} />
          <Image src="/logos/cms.png" alt="" width={128} height={128} />
          <Image
            src="/logos/clinical-trials.png"
            alt=""
            width={128}
            height={128}
          />
        </div>
      </div>
      {/* <Map /> */}
    </div>
  );

  const Divider = () => <div className=""></div>;
  return (
    <div className="z-0 bg-[#0e1936]">
      <FirstSection />
      <InfoSection
        items={features}
        header="Features"
        textSize="sm:text-[5rem]"
        boxStyle="bg-white"
        textColor="font-custom"
        itemTextSpacing={true}
      />
      <InfoSection
        items={info}
        textColor="font-custom"
        boxStyle="bg-white"
        itemTextSpacing={true}
      />
      <Divider />
      <InfoSection
        items={data}
        header="StarHealth Data Directory"
        arrowButton={false}
        textColor="font-custom"
        boxStyle="bg-white"
        itemTextSpacing={true}
      />
      {/* <InfoSection
        items={understand}
        textColor="font-custom"
        boxStyle="bg-white"
        itemTextSpacing={true}
        linkable={true}
      /> */}
      <InfoSection
        items={dataDir}
        textColor="font-custom"
        boxStyle="bg-white"
        itemTextSpacing={true}
        linkable={true}
      />
      <Divider />
      <InfoSection
        items={partners}
        header="Data Partners"
        textColor="font-custom"
        boxStyle="bg-white"
        linkable={false}
        arrowButton={false}
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
