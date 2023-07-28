import Image from "next/image";
import React from "react";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { BsCheck2, BsLightningFill } from "react-icons/bs";
import Logo from "../../assets/Logo.png";
import { useSession, signIn, signOut } from "next-auth/react";

const pricing = () => {
  return (
    <>
      <div className="header-container mx-auto my-0 flex w-[100%] max-w-[1140px] justify-center pb-[50px]">
        <div className="block-column min-w-0 break-words text-center">
          <div className="clear-both h-[60px] leading-tight"></div>
          <h2 className="text-[36px] font-bold">Pricing Options</h2>
        </div>
      </div>

      <div className="container mx-auto my-0 flex w-[100%] max-w-[1140px] justify-center pb-[50px]">
        {/* <div className="relative mx-4 w-[300px] border border-[#d0d0d0] p-[25px] text-center leading-tight md:mb-8 ">
          <h2 className="py-[10px] text-[36px] font-bold">Basic</h2>
          <h5 className="mb-2 py-4 text-[22px] font-bold ">
            Try StarHealth for free
          </h5>
          <p className="mb-[157.8px] font-medium">
            Access healthcare data to learn more about doctors, drugs, companies
            and more
          </p>
          <div className="flex flex-wrap items-center justify-center align-bottom ">
            <div className="button m-0 inline-block w-[205px]  rounded-lg bg-blue-600 p-[18px] text-white">
              <a className="font-medium">REGISTER</a>
            </div>
          </div>
        </div>
        <div className="relative mx-4 w-[300px] border border-[#d0d0d0] p-[25px] text-center leading-tight md:mb-8 ">
          <h2 className="py-[10px] text-[36px] font-bold">Starter</h2>
          <h5 className="mb-2 py-4 text-[22px] font-bold ">$9</h5>
          <p className="mb-[20px] font-medium ">
            / user / month, billed annually
          </p>
          <p className="mb-[20px] font-medium ">
            Track and monitor healthcare data
          </p>
          <p className="mb-[105px] font-medium italic">Best for Individuals</p>
          <div className="flex flex-wrap items-center justify-center ">
            <div className="button m-0 inline-block w-[205px] rounded-lg bg-[#8D47FC] p-[18px] text-white">
              <a className="font-medium">
                <BsLightningFill className="absolute left-[41px] mt-[3px]" />
                TRY STARTER FREE
              </a>
            </div>
          </div>
        </div> */}
        <div className="relative mx-4 flex  w-[300px]  flex-col border border-[#d0d0d0] bg-purple-200 p-[25px] text-center leading-tight md:mb-8">
          <h2 className="py-[10px] text-[36px] font-bold ">Basic </h2>
          <h5 className="mb-2 py-4 text-[22px] font-bold ">$10 / month</h5>
          <p className="mb-[20px] font-medium ">Limited Features</p>
          {/* <p className="mb-[20px] font-medium ">
            Unlock StarHealth&apos;s full suite of tools fueled by proprietary
            data
          </p>
          <p className="mb-[65px] font-medium italic">
            Best for Individuals and Small Teams
          </p> */}
          <div className="mt-auto flex flex-wrap items-center justify-center">
            <div
              className="button m-0 inline-block  w-[205px] cursor-pointer rounded-lg bg-[#8D47FC] p-[18px] text-white"
              onClick={() => signIn("google")}
            >
              <a className=" font-medium">
                <BsLightningFill className="absolute left-[54px] mt-[3px]" />{" "}
                Sign-Up
              </a>
            </div>
          </div>
        </div>
        <div className="relative mx-4 flex  w-[300px]  flex-col border border-[#d0d0d0] bg-purple-400 p-[25px] text-center leading-tight md:mb-8">
          <h2 className="py-[10px] text-[36px] font-bold ">Standard </h2>
          <h5 className="mb-2 py-4 text-[22px] font-bold ">$100 / month</h5>
          {/* <p className="mb-[20px] font-medium ">
            / user / month, billed annually
          </p> */}
          {/* <p className="mb-[20px] font-medium ">
            Unlock StarHealth&apos;s full suite of tools fueled by proprietary
            data
          </p>
          <p className="mb-[65px] font-medium italic">
            Best for Individuals and Small Teams
          </p> */}
          <div className="mt-auto flex flex-wrap items-center justify-center">
            <div
              onClick={() => signIn("google")}
              className="button m-0 inline-block  w-[205px] cursor-pointer rounded-lg bg-[#8D47FC] p-[18px] text-white"
            >
              <a className=" font-medium">
                <BsLightningFill className="absolute left-[54px] mt-[3px]" />{" "}
                Register
              </a>
            </div>
          </div>
        </div>
        <div className="relative mx-4  flex w-[300px] flex-col border   border-[#d0d0d0] bg-purple-600 p-[25px] text-center leading-tight md:mb-8 ">
          <h2 className="py-[10px] text-[36px] font-bold text-white">
            Enterprise
          </h2>
          <h5 className="mb-2 py-4 text-[22px] font-bold text-white">
            Request a Quote
          </h5>
          {/* <p className="mb-[20px] font-medium ">Custom billing</p>
          <p className="mb-[20px] font-medium ">
            A custom solution that scales as teams do
          </p>
          <p className="mb-[125px] font-medium italic">Best for Large Teams</p> */}
          <div className="mt-auto flex flex-wrap items-center justify-center">
            <div
              onClick={() => signIn("google")}
              className="button m-0 inline-block  w-[205px] cursor-pointer rounded-lg bg-purple-800 p-[18px] text-white"
            >
              <a className=" font-medium">
                <BsLightningFill className="absolute left-[57px] mt-[3px]" />
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        id="Features"
        className="section l4 wf-section [rgba(255, 255, 255, 0.65)] bg-[#8345FE] px-[80px] pb-[150px] pt-[40px] font-custom text-customgrey"
      >
        <div className="container mx-auto flex max-w-[1040px] flex-col items-center justify-center">
          <div className="title-wrapper mb-[40px] flex max-w-[900px] flex-col text-center text-white">
            <h2 className="h2-title my-0 flex justify-center whitespace-nowrap bg-transparent pl-0 pt-[40px] text-[4vw] font-[700] leading-[1.1] tracking-[-0.0375em]">
              Comprehensive Healthcare Tool
            </h2>
          </div>
          <div className="features-grid flex w-[100%]   items-stretch gap-x-[40px] gap-y-[40px]">
            <div className="node features-card  col-start-1 row-start-1 row-end-3 flex flex-1 flex-col items-center rounded-[6px] border border-2 border-solid border-bordercolor p-[35px]">
              <div className="features-row mb-[25px] flex flex-col items-start text-blue-500 ">
                {/* <FaPencilRuler size={27} className="mb-[25px]" /> */}
                <div className="fontfeatures-card-title text-center text-[18px] font-[700] leading-[1.25] text-white">
                  StarHealth Data Directory
                </div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">450,000+ Clinical Trials</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">3,000+ Companies</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">3,000+ Companies</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">1,000,000+ Doctors</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">1,500+ Drugs</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">5,000+ Foods</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">26 Genetics & Chromosomes</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">2,000+ Hospitals</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">700+ Insurance Plans</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">200+ Medical Devices</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">
                  10,000+ Opioid Treatment Centers
                </div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">$100,000,000+ Transactions</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">50 States</div>
              </div>
            </div>
            <div className="node features-card col-start-1  row-start-1 row-end-3 flex flex-1 flex-col items-center rounded-[6px] border border-2 border-solid border-bordercolor p-[35px]">
              <div className="features-row mb-[25px] flex flex-col items-start text-blue-500 ">
                {/* <FaPencilRuler size={27} className="mb-[25px]" /> */}
                <div className="fontfeatures-card-title text-center text-[18px] font-[700] leading-[1.25] text-white">
                  Features
                </div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">Bookmarks</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">Citation Generator</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">Comparison Tool</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">Customizable Dashboards</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">Data Analytics</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">Data Visualization</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">Mapping</div>
              </div>

              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">Patient Intake Form</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">
                  Proprietary Insights & Clinical Intelligence
                </div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">Ratings & Reviews</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">Search</div>
              </div>
            </div>
            <div className="node features-card col-start-1 row-start-1 row-end-3 flex flex-1 flex-col items-center rounded-[6px] border-2 border-solid border-bordercolor p-[35px]">
              <div className="features-row mb-[25px] flex flex-col items-start text-blue-500 ">
                {/* <FaPencilRuler size={27} className="mb-[25px]" /> */}
                <div className="fontfeatures-card-title text-center text-[18px] font-[700] leading-[1.25] text-white">
                  Data Partners
                </div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">NIH.gov</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">Community Benefit Insight</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">CMS</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">Data.CMS.gov</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">FDA</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">Medline Plus</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">Open Payments</div>
              </div>
              <div className="check-row mb-[20px] flex flex-row items-center text-white">
                {/* <BsCheck2 size={30} color="#7CFC00" className="mr-2 " /> */}
                <div className="check-text">USDA</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="container mx-auto my-0 flex w-[100%] max-w-[1330px] justify-center pb-[50px] text-[16px] leading-relaxed ">
        <div className="mr-1 w-[37%] break-words p-[25px]">
          <p className="mb-[15px] font-bold">Includes:</p>
          <ul className="font-medium">
            <RiCheckboxCircleFill
              className="absolute mt-[2px]"
              size={22}
              color="#19a319"
            />
            <li className="relative mb-[12px] ml-7">
              Gain access to healthcare data like name, location, specialty,
              payment history, and description
            </li>
            <RiCheckboxCircleFill
              className="absolute mt-[2px]"
              size={22}
              color="#19a319"
            />
            <li className="mb-[12px]  ml-7">
              See key highlights, recent news and activity, and healthcare
              information on specific profiles
            </li>
            <RiCheckboxCircleFill
              className="absolute mt-[2px]"
              size={22}
              color="#19a319"
            />
            <li className="mb-[12px]  ml-7">
              View healthcare profiles or search in the Data Directory
            </li>
          </ul>
        </div>
        <div className="mr-1 break-words p-[25px]">
          <p className="mb-[15px] font-bold">Everything in Basic, plus:</p>
          <ul className="font-medium">
            <RiCheckboxCircleFill
              className="absolute mt-[2px]"
              size={22}
              color="#19a319"
            />
            <li className="relative mb-[12px] ml-7">
              See all doctors, drugs, companies and more healthcare data
            </li>
            <RiCheckboxCircleFill
              className="absolute mt-[2px]"
              size={22}
              color="#19a319"
            />
            <li className="mb-[12px]  ml-7">See 1,000 results per search</li>
            <RiCheckboxCircleFill
              className="absolute mt-[2px]"
              size={22}
              color="#19a319"
            />
            <li className="mb-[12px]  ml-7">
              Monitor up to 1M+ doctors and 3,000 companies
            </li>
          </ul>
        </div>
        <div className="mr-1 break-words p-[25px]">
          <p className="mb-[15px] font-bold leading-relaxed">
            Everything in Starter, plus:
          </p>
          <ul className="font-medium">
            <RiCheckboxCircleFill
              className="absolute mt-[2px]"
              size={22}
              color="#19a319"
            />
            <li className="relative mb-[12px] ml-7">
              Access verified contact data
            </li>
            <RiCheckboxCircleFill
              className="absolute mt-[2px]"
              size={22}
              color="#19a319"
            />
            <li className="mb-[12px]  ml-7">Email healthcare professionals</li>
            <RiCheckboxCircleFill
              className="absolute mt-[2px]"
              size={22}
              color="#19a319"
            />
            <li className="mb-[12px]  ml-7">
              Push healthcare information from StarHealth to your CRM
            </li>
            <RiCheckboxCircleFill
              className="absolute mt-[2px]"
              size={22}
              color="#19a319"
            />
            <li className="mb-[12px]  ml-7">
              Push contacts from StarHealth to Outreach
            </li>
            <RiCheckboxCircleFill
              className="absolute mt-[2px]"
              size={22}
              color="#19a319"
            />
            <li className="mb-[12px]  ml-7">
              Get account recommendations tailored to your interests
            </li>
            <RiCheckboxCircleFill
              className="absolute mt-[2px]"
              size={22}
              color="#19a319"
            />
            <li className="mb-[12px]  ml-7">
              See healthcare searches that are similar to the accounts you care
              about
            </li>
            <RiCheckboxCircleFill
              className="absolute mt-[2px]"
              size={22}
              color="#19a319"
            />
            <li className="mb-[12px]  ml-7">
              Monitor up to 3,000 companies & 1M+ doctors
            </li>
            <RiCheckboxCircleFill
              className="absolute mt-[2px]"
              size={22}
              color="#19a319"
            />
            <li className="mb-[12px]  ml-7">Export results (5k rows/month)</li>
            <RiCheckboxCircleFill
              className="absolute mt-[2px]"
              size={22}
              color="#19a319"
            />
            <li className="mb-[12px]  ml-7">
              Access priority support and chat
            </li>
          </ul>
        </div>
        <div className="mr-1 break-words p-[25px]">
          <p className="mb-[15px] font-bold leading-relaxed">
            Everything in Pro, plus:
          </p>
          <ul className="font-medium">
            <RiCheckboxCircleFill
              className="absolute mt-[2px]"
              size={22}
              color="#19a319"
            />
            <li className="relative mb-[12px] ml-7">
              Access as much information as you need across an entire team
            </li>
            <RiCheckboxCircleFill
              className="absolute mt-[2px]"
              size={22}
              color="#19a319"
            />
            <li className="mb-[12px]  ml-7">
              Explore smarter with CRM-enriched search filters
            </li>
            <RiCheckboxCircleFill
              className="absolute mt-[2px]"
              size={22}
              color="#19a319"
            />
            <li className="mb-[12px]  ml-7">See real-time updates</li>
            <RiCheckboxCircleFill
              className="absolute mt-[2px]"
              size={22}
              color="#19a319"
            />
            <li className="mb-[12px]  ml-7">Gain API access</li>
            <RiCheckboxCircleFill
              className="absolute mt-[2px]"
              size={22}
              color="#19a319"
            />
            <li className="mb-[12px]  ml-7">
              Leverage bulk exports of the full dataset
            </li>
            <RiCheckboxCircleFill
              className="absolute mt-[2px]"
              size={22}
              color="#19a319"
            />
            <li className="mb-[12px]  ml-7">
              Access Customer Success Manager support
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto my-0 flex w-[100%] max-w-[1190px] justify-center pb-[50px] text-[16px] leading-relaxed ">
        <div className="w-[50%] self-center break-words font-medium">
          <h2 className="mb-3 text-[36px] leading-tight">
            Interested in Using StarHealth Data & API?
          </h2>
          <p className="mb-[3px] text-[18px] leading-relaxed">
            With Data Licensing, bring StarHealth&apos;s best-in-class data to
            your users - learn more about the StarHealth&apos;s API services.{" "}
          </p>
          <div>
            <div className="inline-block flex flex-wrap items-center break-words">
              <a className="mt-[30px] flex h-[54px] min-w-[200px] items-center justify-center rounded-[10px] bg-blue-600 text-center text-[14px] leading-[54px] text-white">
                LEARN MORE
              </a>
            </div>
          </div>
        </div>
        <div className="w-[30rem] self-center break-words">
          <Image alt="logo" src={Logo} />
        </div>
      </div>

      <div className="container mx-auto my-0 flex w-[100%] max-w-[1190px] justify-center pb-[50px] text-[16px] leading-relaxed">
        <div className="break-words">
          <h2 className="text-center text-[36px] font-bold leading-tight">
            Plan Comparison
          </h2>
          <div className="clear-both h-[30px]"></div>
          <div className="mb-8 flex max-w-4xl justify-end">
            <div className="mx-7 box-border grow-0 basis-1/4 break-words">
              <div className="">
                <h3 className="mb-[6px] text-center text-[1.875rem] font-bold leading-tight">
                  Starter
                </h3>
                <h2 className="ml-5 w-[180px] text-center text-[19px] font-bold leading-none">
                  $9 / user / month billed annually{" "}
                </h2>
                <div className="mt-5 flex flex-wrap items-center">
                  <div className="m-0 inline-block">
                    <a className="flex h-[48px] w-[210px] items-center justify-center rounded-[10px] bg-[#8D47FC] font-medium uppercase text-white">
                      <BsLightningFill className="mr-[3px] mt-[3px]" />
                      TRY STARTER FREE
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-7 grow-0 basis-1/4 break-words">
              <div className="box-border">
                <h3 className="mb-[6px] text-center text-[1.875rem] font-bold leading-tight">
                  Pro
                </h3>
                <h2 className="ml-5 w-[180px] text-center text-[19px] font-bold leading-none">
                  $19 / user / month billed annually{" "}
                </h2>
                <div className="mt-5 flex flex-wrap items-center ">
                  <div className="m-0 inline-block">
                    <a className="flex h-[48px] w-[210px] items-center justify-center rounded-[10px] bg-[#8D47FC] font-medium uppercase text-white">
                      <BsLightningFill className="mr-[3px] mt-[3px]" />
                      TRY PRO FREE
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-7 grow-0 basis-1/4 break-words">
              <div className="box-border">
                <h3 className="mb-[6px] text-center text-[1.875rem] font-bold leading-tight">
                  Enterprise
                </h3>
                <h2 className="ml-5 w-[180px] pt-[18px] text-center text-[19px] font-bold leading-none">
                  Custom
                </h2>
                <div className="mt-5 flex flex-wrap items-center ">
                  <div className="m-0 inline-block">
                    <a className="flex h-[48px] w-[210px] items-center justify-center rounded-[10px] bg-[#8D47FC] font-medium uppercase text-white">
                      <BsLightningFill className="mr-[3px] mt-[3px]" />
                      CONTACT US
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="box-border">
        <div className="mx-auto max-w-4xl font-bold">
          <div>
            <h4 className="mt-2 border-b-2 border-black pb-2 pl-3 text-[20px] leading-[30px]">
              Highlights
            </h4>
            <div className="mt-3 flex flex-nowrap">
              <div className="min-w-0 break-words text-[15px]">
                <figure className="mb-[1.5rem]">
                  <table className=" table border-collapse">
                    <tbody className="table-row-group align-middle text-gray-500">
                      <tr className="flex h-[60px] items-center">
                        <td>Healthcare Information</td>
                      </tr>
                      <tr className="flex h-[60px] items-center">
                        <td>Account Recommendations</td>
                      </tr>
                      <tr className="flex h-[60px] items-center">
                        <td>Contact Data</td>
                      </tr>
                      <tr className="flex h-[60px] items-center">
                        <td>Engagement Suite</td>
                      </tr>
                    </tbody>
                  </table>
                </figure>
              </div>
              <div className="min-w-0 break-words text-[15px]">
                <figure className="mb-[1.5rem]">
                  <table className=" table border-collapse">
                    <tbody className="table-row-group align-middle text-gray-500">
                      <tr className="flex h-[60px] w-[20rem] items-center justify-center">
                        <td>
                          <BsCheck2 size={40} color="#00d084" />
                        </td>
                      </tr>
                      <tr className="flex h-[60px] w-[20rem] items-center justify-center">
                        <td></td>
                      </tr>
                      <tr className="flex h-[60px] w-[20rem] items-center justify-center">
                        <td></td>
                      </tr>
                      <tr className="flex h-[60px] w-[20rem] items-center justify-center">
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </figure>
              </div>
              <div className="min-w-0 break-words text-[15px]">
                <figure className="mb-[1.5rem]">
                  <table className=" table border-collapse">
                    <tbody className="table-row-group align-middle text-gray-500">
                      <tr className="flex h-[60px] w-[20rem] items-center justify-center">
                        <td>
                          <BsCheck2 size={40} color="#00d084" />
                        </td>
                      </tr>
                      <tr className="flex h-[60px] w-[20rem] items-center justify-center">
                        <td>
                          <BsCheck2 size={40} color="#00d084" />
                        </td>
                      </tr>
                      <tr className="flex h-[60px] items-center justify-center">
                        <td>
                          10 contacts/month <br /> (add-ons available)
                        </td>
                      </tr>
                      <tr className="flex h-[60px] w-[20rem] items-center justify-center">
                        <td>
                          <BsCheck2 size={40} color="#00d084" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </figure>
              </div>
              <div className="min-w-0 break-words text-[15px]">
                <figure className="mb-[1.5rem]">
                  <table className=" table border-collapse">
                    <tbody className="table-row-group align-middle text-gray-500">
                      <tr className="flex h-[60px] w-[20rem] items-center justify-center">
                        <td>
                          <BsCheck2 size={40} color="#00d084" />
                        </td>
                      </tr>
                      <tr className="flex h-[60px] w-[20rem] items-center justify-center">
                        <td>
                          <BsCheck2 size={40} color="#00d084" />
                        </td>
                      </tr>
                      <tr className="flex h-[60px] w-[20rem] items-center justify-center">
                        <td>As many as you need</td>
                      </tr>
                      <tr className="flex h-[60px] w-[20rem] items-center justify-center">
                        <td>
                          <BsCheck2 size={40} color="#00d084" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="box-border">
        <div className="mx-auto max-w-4xl font-bold">
          <div>
            <h4 className="mt-2 border-b-2 border-black pb-2 pl-3 text-[20px] leading-[30px]">
              Features
            </h4>
            <div className="mt-3 flex flex-nowrap">
              <div className="min-w-0 break-words text-[15px]">
                <figure className="mb-[1.5rem]">
                  <table className=" table border-collapse">
                    <tbody className="table-row-group align-middle text-gray-500">
                      <tr className="flex h-[60px] items-center">
                        <td>Unlimited Search Results</td>
                      </tr>
                      <tr className="flex h-[60px] items-center">
                        <td>Saved Lists & Alerts</td>
                      </tr>
                      <tr className="flex h-[60px] items-center">
                        <td>CRM-Enriched Search Filters</td>
                      </tr>
                      <tr className="flex h-[60px] items-center">
                        <td>Notes & Tagging</td>
                      </tr>
                      <tr className="flex h-[60px] items-center">
                        <td>Export to CSV</td>
                      </tr>
                      <tr className="flex h-[60px] items-center">
                        <td>Team Admin Features</td>
                      </tr>
                      <tr className="flex h-[60px] items-center">
                        <td>API & Bulk Data</td>
                      </tr>
                    </tbody>
                  </table>
                </figure>
              </div>
              <div className="min-w-0 break-words text-[15px]">
                <figure className="mb-[1.5rem]">
                  <table className=" table border-collapse">
                    <tbody className="table-row-group align-middle text-gray-500">
                      <tr className="flex h-[60px] w-[20rem] items-center justify-center">
                        <td>
                          <BsCheck2 size={40} color="#00d084" />
                        </td>
                      </tr>
                      <tr className="flex h-[60px] w-[20rem] items-center justify-center">
                        <td>
                          <BsCheck2 size={40} color="#00d084" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </figure>
              </div>
              <div className="min-w-0 break-words text-[15px]">
                <figure className="mb-[1.5rem]">
                  <table className=" table border-collapse">
                    <tbody className="table-row-group align-middle text-gray-500">
                      <tr className="flex h-[60px] w-[20rem] items-center justify-center">
                        <td>
                          <BsCheck2 size={40} color="#00d084" />
                        </td>
                      </tr>
                      <tr className="flex h-[60px] w-[20rem] items-center justify-center">
                        <td>
                          <BsCheck2 size={40} color="#00d084" />
                        </td>
                      </tr>
                      <tr className="flex h-[60px] w-[20rem] items-center justify-center">
                        <td></td>
                      </tr>
                      <tr className="flex h-[60px] w-[20rem] items-center justify-center">
                        <td>
                          <BsCheck2 size={40} color="#00d084" />
                        </td>
                      </tr>
                      <tr className="flex h-[60px] w-[20rem] items-center justify-center">
                        <td>5k / month</td>
                      </tr>
                    </tbody>
                  </table>
                </figure>
              </div>
              <div className="min-w-0 break-words text-[15px]">
                <figure className="mb-[1.5rem]">
                  <table className=" table border-collapse">
                    <tbody className="table-row-group align-middle text-gray-500">
                      <tr className="flex h-[60px] w-[20rem] items-center justify-center">
                        <td>
                          <BsCheck2 size={40} color="#00d084" />
                        </td>
                      </tr>
                      <tr className="flex h-[60px] w-[20rem] items-center justify-center">
                        <td>
                          <BsCheck2 size={40} color="#00d084" />
                        </td>
                      </tr>
                      <tr className="flex h-[60px] w-[20rem] items-center justify-center">
                        <td>
                          <BsCheck2 size={40} color="#00d084" />
                        </td>
                      </tr>
                      <tr className="flex h-[60px] w-[20rem] items-center justify-center">
                        <td>
                          <BsCheck2 size={40} color="#00d084" />
                        </td>
                      </tr>
                      <tr className="flex h-[60px] w-[20rem] items-center justify-center">
                        <td>Unlimited</td>
                      </tr>
                      <tr className="flex h-[60px] w-[20rem] items-center justify-center">
                        <td>
                          <BsCheck2 size={40} color="#00d084" />
                        </td>
                      </tr>
                      <tr className="flex h-[60px] w-[20rem] items-center justify-center">
                        <td>
                          <BsCheck2 size={40} color="#00d084" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12 box-border">
        <div className="mx-auto max-w-4xl font-bold">
          <div>
            <h4 className="mt-2 border-b-2 border-black pb-2 pl-3 text-[20px] leading-[30px]">
              Support
            </h4>
            <div className="mt-3 flex flex-nowrap">
              <div className="min-w-0 break-words text-[15px]">
                <figure className="mb-[1.5rem]">
                  <table className=" table border-collapse">
                    <tbody className="table-row-group align-middle text-gray-500">
                      <tr className="mt-2 flex h-[60px] items-center">
                        <td>Dedicated Success Manager</td>
                      </tr>
                    </tbody>
                  </table>
                </figure>
              </div>
              <div className="min-w-0 break-words text-[15px]">
                <figure className="mb-[1.5rem]">
                  <table className=" table border-collapse">
                    <tbody className="table-row-group align-middle text-gray-500">
                      <tr className="flex h-[60px] w-[20rem] items-center justify-center">
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </figure>
              </div>
              <div className="min-w-0 break-words text-[15px]">
                <figure className="mb-[1.5rem]">
                  <table className=" table border-collapse">
                    <tbody className="table-row-group align-middle text-gray-500">
                      <tr className="flex h-[60px] w-[20rem] items-center justify-center">
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </figure>
              </div>
              <div className="min-w-0 break-words text-[15px]">
                <figure className="mb-[1.5rem]">
                  <table className=" table border-collapse">
                    <tbody className="table-row-group align-middle text-gray-500">
                      <tr className="flex h-[60px] w-[20rem] items-center justify-center">
                        <td>
                          <BsCheck2 size={40} color="#00d084" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="container mx-auto my-0 mt-3 flex w-[100%] max-w-[1300px] justify-center pb-[50px] text-[16px] leading-relaxed">
        <div className="justify-center break-words">
          <div
            className="block-spacer clear-both box-border h-[30px]"
            aria-hidden="true"
          ></div>
          <h2 className="mb-1 w-[1200px] text-center text-[36px] font-bold leading-tight">
            Our Partners
          </h2>
          <figure className="clear-both my-4 flex flex-wrap justify-center">
            <Image alt="logo" src={Logo} className="w-[250px]" />
            <Image alt="logo" src={Logo} className="w-[250px]" />
            <Image alt="logo" src={Logo} className="w-[250px]" />
            <Image alt="logo" src={Logo} className="w-[250px]" />
            <Image alt="logo" src={Logo} className="w-[250px]" />
          </figure>
        </div>
      </div> */}
    </>
  );
};

export default pricing;
