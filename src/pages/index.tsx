// import { type NextPage } from "next";
// import Head from "next/head";
import Link from "next/link";
// import { signIn, signOut, useSession } from "next-auth/react";
// import { trpc } from "../utils/trpc";
// ***********************************************************************************************************************************************
import { signIn } from "next-auth/react";
import { useState } from "react";
// import { useAllStatesQuery } from './api';
import bookmark from "../assets/logos/bookmark.png";
import data_analytics from "../assets/data_analytics.png";
import ratings_and_reviews from "../assets/ratings_and_reviews.png";

import doctor from "../assets/doctor.png";
import manufacturer from "../assets/manufacturer.png";
import transactions from "../assets/transactions.png";

import Image from "next/image";
import drugs from "../assets/drugs.png";
import datacCms from "../assets/logos/Data-CMS-gov.png";
import usda from "../assets/logos/USDA-Emblem.png";
import citation from "../assets/logos/citations.png";
import clinicalTrials from "../assets/logos/clinical-trials.png";
import cms from "../assets/logos/cms.png";
import Cbenefits from "../assets/logos/community-benefits.png";
import dashboard from "../assets/logos/dashboard.png";
import devices from "../assets/logos/devices.png";
import diseases from "../assets/logos/diseases.png";
import fda from "../assets/logos/fda.png";
import food from "../assets/logos/food.png";
import genetics from "../assets/logos/genetics.png";
import hospital from "../assets/logos/hospital.png";
import insights from "../assets/logos/insights.png";
import insurance from "../assets/logos/insurance.png";
import medlinPlus from "../assets/logos/medlinePlus.png";
import openPayments from "../assets/logos/open-payments.png";
import opioid from "../assets/logos/opioid-treatment.png";
import testTubes from "../assets/logos/test-tubes.png";
import states from "../assets/states.png";
import map from "../assets/logos/mapping.png";
import comparasion from "../assets/logos/comparasion.png";
import visualization from "../assets/logos/visualization.png";
import patient from "../assets/logos/patient.png";
import search from "../assets/logos/search.png";
import InfoSection from "../components/InfoSection";
import { trpc } from "../utils/trpc";

const features = [
  { label: "Bookmarks", img: bookmark },

  { label: "Citation Generator", img: citation },
  {
    label: "Comparison Tool",
    img: comparasion,
  },
  { label: "Customizable dashboards", img: dashboard },
  { label: "Data Analytics", img: data_analytics },
  {
    label: "Data Visualization",
    img: visualization,
  },
  /* {
    label: "Proprietary Insights &\n Clinical intelligence",
    img: insights,
  }, */
  {
    label: "Mapping",
    img: map,
  },
  {
    label: "Patient Intake Form",
    img: patient,
  },
  {
    label: ["Proprietary Insights &", "Clinical intelligence"],
    img: insights,
  },

  { label: "Ratings & Reviews", img: ratings_and_reviews },
  {
    label: "Search",
    img: search,
  },
];

const info = [
  { label: "Bookmarks", img: bookmark },
  { label: "Ratings & Reviews", img: ratings_and_reviews },
  { label: "Customizable dashboards", img: dashboard },
];

const partners = [
  { label: "", img: clinicalTrials },
  { label: "", img: Cbenefits },
  { label: "", img: cms },
  { label: "", img: datacCms },
  { label: "", img: fda },
  { label: "", img: medlinPlus },
  { label: "", img: openPayments },
  { label: "", img: usda },
];

/* const understand = [
  { label: "Doctors", img: doctors, linkparam: "doctors" },
  { label: "Companies", img: companies, linkparam: "manufacturers" },
]; */

const dataDir = [
  {
    label: "450,000+ clinical trials",
    img: testTubes,
    linkparam: "ClinicalTrials",
  },
  { label: "3,000+ Companies", img: manufacturer, linkparam: "Manufacturers" },
  { label: "6,000+ diseases", img: diseases, linkparam: "Diseases" },
  { label: "1,000,000+ Doctors", img: doctor, linkparam: "Doctors" },
  { label: "1,500+ Drugs", img: drugs, linkparam: "Drugs" },

  { label: "5,000+ foods", img: food, linkparam: "Food" },

  { label: "26 genetics & chromosomes", img: genetics, linkparam: "Genetics" },
  { label: "2,000+ hospitals", img: hospital, linkparam: "Hospitals" },
  { label: "700+ insurance plans", img: insurance, linkparam: "Plans" },
  {
    label: "200+ medical devices",
    img: devices,
    linkparam: "Products",
  },
  {
    label: "10,000+ opioid treatment centers",
    img: opioid,
    linkparam: "OpioidTreatmentProviders",
  },
  { label: "50 States", img: states, linkparam: "PaymentsToDoctors" },
  {
    label: "$100,000,000+ Transactions",
    img: transactions,
    linkparam: "Transactions",
  },
];

export default function Home() {
  const [drugType, setDrugType] = useState<string>();
  const { data: allStates } = trpc.db.allStates.useQuery({ drugType });
  console.log(allStates);
  const FirstSection = () => (
    <div className="mx-10 flex items-center justify-center pb-20 pt-10 sm:flex-row ">
      <div className="flex flex-col items-center justify-center sm:w-[100%]">
        <div className="flex min-h-[calc(50vh)] items-center gap-20">
          <div className=" sm:w-[70%]">
            <h2 className="mb-5 mt-10 flex justify-center text-center font-custom font-bold leading-tight text-white sm:text-4xl md:text-4xl xl:text-7xl ">
              Healthcare Data Tool
            </h2>
            <p className="mb-12 text-center text-xl text-white md:text-3xl xl:text-4xl">
              Data | Tooling | Research
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
              <Link
                className="rounded bg-purple-600 px-3 py-8 font-custom text-xl font-medium text-white hover:bg-purple-500 focus:bg-purple-500"
                href="/directory"
              >
                Access Data
              </Link>
            </div>
          </div>
          <div>
            <iframe
              width="720"
              height="405"
              src="https://www.youtube.com/embed/JMG0hYFhH0o?autoplay=1"
              title="StarHealth.io - Comprehensive Healthcare Data Tool"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
              allowFullScreen
            />
          </div>
        </div>

        {/* <div className="mx-auto mt-16 flex w-fit items-center justify-center gap-8 rounded-xl bg-white px-10">
          <Image src={openPayments} alt="" width={108} height={128} />
          <Image src={fda} alt="" width={108} height={128} />
          <Image src={cms} alt="" width={108} height={128} />
          <Image src={usda} alt="" width={108} height={128} />
          <Image src={datacCms} alt="" width={108} height={128} />
          <Image src={clinicalTrials} alt="" width={108} height={128} />
          <Image src={medlinPlus} alt="" width={108} height={128} />
          <Image src={Cbenefits} alt="" width={108} height={128} />
        </div> */}
      </div>
      {/* <Map /> */}
    </div>
  );

  const Divider = () => <div className=""></div>;
  return (
    <div className="z-0 bg-[#0e1936]">
      <FirstSection />
      <InfoSection
        items={dataDir.slice(0, 6)}
        header="StarHealth Data Directory"
        // textSize="sm:text-[5rem]"
        textColor="font-custom"
        boxStyle="bg-white"
        itemTextSpacing={true}
        linkable={true}
      />

      {/* <InfoSection
        items={understand}
        textColor="font-custom"
        boxStyle="bg-white"
        itemTextSpacing={true}
        linkable={true}
      /> */}
      <InfoSection
        items={dataDir.slice(6)}
        textColor="font-custom"
        boxStyle="bg-white"
        itemTextSpacing={true}
        linkable={true}
      />
      <Divider />
      <InfoSection
        items={features.slice(0, 5)}
        header="Features"
        boxStyle="bg-white"
        textColor="font-custom"
        itemTextSpacing={true}
      />
      <InfoSection
        items={features.slice(5)}
        boxStyle="bg-white"
        textColor="font-custom"
        itemTextSpacing={true}
      />
      {/* <InfoSection
        items={info}
        textColor="font-custom"
        boxStyle="bg-white"
        itemTextSpacing={true}
      /> */}
      <Divider />
      <InfoSection
        items={partners}
        header="Data Partners"
        textColor="font-custom"
        boxStyle="bg-white"
      />
      {/* <InfoSection
        items={partners.slice(5)}
        textColor="font-custom"
        boxStyle="bg-white"
      /> */}
      <Divider />
      <div
        id="Features"
        className="section l4 wf-section [rgba(255, 255, 255, 0.65)] bg-[#8345FE] px-[80px] pb-[150px] pt-[40px] font-custom text-customgrey"
      >
        <div className="container mx-auto flex max-w-[1040px] flex-col items-center justify-center">
          <div className="title-wrapper mb-[40px] flex max-w-[900px] flex-col text-center text-white">
            <h2 className="h2-title my-0 bg-transparent pl-0 pt-[40px] text-[4vw] font-[700] leading-[1.1] tracking-[-0.0375em]">
              Use Cases
            </h2>
          </div>
          <div className="features-grid flex w-[100%]   items-stretch gap-x-[40px] gap-y-[40px]">
            <div className="node features-card  col-start-1 row-start-1 row-end-3 flex flex-1 flex-col items-center rounded-[6px] border border-2 border-solid border-bordercolor p-[35px]">
              <div className="features-row mb-[25px] flex flex-col items-start text-blue-500 ">
                {/* <FaPencilRuler size={27} className="mb-[25px]" /> */}
                <div className="fontfeatures-card-title text-center text-[18px] font-[700] leading-[1.25] text-white">
                  Healthcare and Medical
                </div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">Patients</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">Providers</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">Researchers</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">Healthcare Workers</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">Insurance</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">Administrators</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">Public Health</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">Government</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">Military</div>
              </div>
            </div>
            <div className="node features-card  col-start-1 row-start-1 row-end-3 flex flex-1 flex-col items-center rounded-[6px] border border-2 border-solid border-bordercolor p-[35px]">
              <div className="features-row mb-[25px] flex flex-col items-start text-blue-500 ">
                {/* <FaPencilRuler size={27} className="mb-[25px]" /> */}
                <div className="fontfeatures-card-title text-center text-[18px] font-[700] leading-[1.25] text-white">
                  Data, Technology and Services
                </div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">Data Scientists</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">IT Services</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">Professional Services</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">Recruiters</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">Marketers</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">Writers</div>
              </div>
            </div>
            <div className="node features-card  col-start-1 row-start-1 row-end-3 flex flex-1 flex-col items-center rounded-[6px] border border-2 border-solid border-bordercolor p-[35px]">
              <div className="features-row mb-[25px] flex flex-col items-start text-blue-500 ">
                {/* <FaPencilRuler size={27} className="mb-[25px]" /> */}
                <div className="fontfeatures-card-title text-center text-[18px] font-[700] leading-[1.25] text-white">
                  Education, Advocacy, and Non-profit
                </div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">Students</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">Educators</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">Parents</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">Advocacy</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">Non-profit</div>
              </div>
            </div>
          </div>
          {/* <div className="features-grid grid w-[100%] auto-cols-custom grid-cols-custom3 grid-rows-custom2 items-stretch gap-x-[40px] gap-y-[40px]">
            <div className="node features-card col-start-1 row-start-1 row-end-3 rounded-[6px] border border-solid border-bordercolor p-[35px]">
              <div className="features-row mb-[25px] flex flex-col items-start text-blue-500 ">
                <FaPencilRuler size={27} className="mb-[25px]" />
                <div className="fontfeatures-card-title text-[18px] font-[700] leading-[1.25] text-white">
                  Ready to go
                </div>
              </div>
              <div className="feature-card-text bottom-margin mb-[40px] text-[16px] leading-[1.6]">
                The worlds largest database of clinical trials made available
                through a simple API.
              </div>
              <div className="feature-card-text bottom-margin mb-[40px] text-[16px] leading-[1.6]">
                The worlds medical knowledge plugged into your analysis.
              </div>
              <div className="feature-card-text bottom-margin mb-[40px] text-[16px] leading-[1.6]">
                The Medical Board is...
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                <BsCheck2 size={30} color="#7CFC00" className="mr-2 " />
                <div className="check-text">Affordable</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                <BsCheck2 size={30} color="#7CFC00" className="mr-2 " />
                <div className="check-text">Fast and Scalable</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                <BsCheck2 size={30} color="#7CFC00" className="mr-2 " />
                <div className="check-text">Real Time</div>
              </div>
            </div>
            <div className="node features-card col-start-2 row-start-1 row-end-1 rounded-[6px] border border-solid border-bordercolor p-[35px]">
              <div className="features-row mb-[25px] flex flex-col items-start text-blue-500 ">
                <FaPaintBrush size={27} className="mb-[25px]" />
                <div className="fontfeatures-card-title text-[18px] font-[700] leading-[1.25] text-white">
                  Customizable
                </div>
              </div>
              <div className="feature-card-text bottom-margin mb-[40px] text-[16px] leading-[1.6]">
                Mix and match the data points according to your search query to
                generate new results.
              </div>
            </div>
            <div className="node features-card col-start-3 row-start-1 row-end-1 rounded-[6px] border border-solid border-bordercolor p-[35px]">
              <div className="features-row mb-[25px] flex flex-col items-start text-blue-500 ">
                <MdPedalBike size={27} className="mb-[25px]" />
                <div className="fontfeatures-card-title text-[18px] font-[700] leading-[1.25] text-white">
                  Timely
                </div>
              </div>
              <div className="feature-card-text bottom-margin mb-[40px] text-[16px] leading-[1.6]">
                Our service aggregates and cleans large amounts of data in
                seconds.
              </div>
            </div>
            <div className="node features-card col-start-2 row-start-2 row-end-2 rounded-[6px] border border-solid border-bordercolor p-[35px]">
              <div className="features-row mb-[25px] flex flex-col items-start text-blue-500 ">
                <MdOutlineAirplanemodeActive size={27} className="mb-[25px]" />
                <div className="fontfeatures-card-title text-[18px] font-[700] leading-[1.25] text-white">
                  Accessible
                </div>
              </div>
              <div className="feature-card-text bottom-margin mb-[40px] text-[16px] leading-[1.6]">
                Pricing that scales as you do. Individual researchers can use
                our platform for as little as $100/month.
              </div>
            </div>
            <div className="node features-card col-start-3 row-start-2 row-end-2 rounded-[6px] border border-solid border-bordercolor p-[35px]">
              <div className="features-row mb-[25px] flex flex-col items-start text-blue-500 ">
                <TbLayoutGridAdd size={27} className="mb-[25px]" />
                <div className="fontfeatures-card-title text-[18px] font-[700] leading-[1.25] text-white">
                  Current
                </div>
              </div>
              <div className="feature-card-text bottom-margin mb-[40px] text-[16px] leading-[1.6]">
                Our platform pulls the latest research as soon as it is
                published so your query results update in real time.
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
