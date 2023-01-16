import Image from 'next/image'
import React from 'react'
import { RiCheckboxCircleFill } from 'react-icons/Ri'
import manufacturer from '../../assets/manufacturer.png'

const SubscriptionPage = () => {
	return (
		<>
				<div className='header-container flex max-w-[1140px] my-0 mx-auto w-[100%] pb-[50px] justify-center'>
					<div className='text-center block-column min-w-0 break-words'>
						<div className='h-[60px] leading-tight clear-both'></div>
						<h2 className='font-medium text-[36px]'>
							Choose The Right Crunchbase Solution For You
						</h2>
					</div>
				</div>

				<div className='container flex max-w-[1140px] my-0 mx-auto w-[100%] pb-[50px] justify-center'>
					<div className='p-[25px] mx-4 leading-tight border border-[#d0d0d0] text-center relative md:mb-8 '>
						<h2 className='py-[10px] font-medium text-[36px]'>Basic</h2>
						<h5 className='py-4 mb-2 font-medium text-[22px] '>Try Crunchbase for free</h5>
						<p className='mb-[15px] '>Access firmographic data to learn more about companies at no cost</p>
						<div className='w-100 flex flex-wrap items-center justify-center '>
							<div className='button p-[18px] rounded-lg text-white  bg-blue-600 inline-block m-0 w-[80%]'>
								<a className='font-medium'>REGISTER</a>
							</div>
						</div>
					</div>
					<div className='p-[25px] mx-4 leading-tight border border-[#d0d0d0] text-center relative md:mb-8 '>
						<h2 className='py-[10px] font-medium text-[36px]'>Starter</h2>
						<h5 className='py-4 mb-2 font-medium text-[22px] '>$29</h5>
						<p className='mb-[15px] '>Access firmographic data to learn more about companies at no cost</p>
						<div className='w-100 flex flex-wrap items-center justify-center '>
							<div className='button p-[18px] rounded-lg bg-orange-400 inline-block m-0 w-[80%]'>
								<a className='font-medium'>TRY STARTER FREE</a>
							</div>
						</div>
					</div>
					<div className='p-[25px] mx-4 leading-tight border border-[#d0d0d0] text-center relative md:mb-8 '>
						<h2 className='py-[10px] font-medium text-[36px]'>Pro</h2>
						<h5 className='py-4 mb-2 font-medium text-[22px] '>$49</h5>
						<p className='mb-[15px] '>Access firmographic data to learn more about companies at no cost</p>
						<div className='w-100 flex flex-wrap items-center justify-center '>
							<div className='button p-[18px] rounded-lg bg-orange-400 bg-blue-600 inline-block m-0 w-[80%]'>
								<a className='font-medium'>TRY PRO FREE</a>
							</div>
						</div>
					</div>
					<div className='p-[25px] mx-4 leading-tight border border-[#d0d0d0] text-center relative md:mb-8 '>
						<h2 className='py-[10px] font-medium text-[36px]'>Enterprise</h2>
						<h5 className='py-4 mb-2 font-medium text-[22px] '>Contact Us</h5>
						<p className='mb-[15px] '>Access firmographic data to learn more about companies at no cost</p>
						<div className='w-100 flex flex-wrap items-center justify-center '>
							<div className='button p-[18px] rounded-lg bg-orange-400  bg-blue-600 inline-block m-0 w-[80%]'>
								<a className='font-medium'>CONTACT US</a>
							</div>
						</div>
					</div>

				</div>

				<div className='container text-[16px] leading-relaxed flex max-w-[1190px] my-0 mx-auto w-[100%] pb-[50px] justify-center '>
						<div className='p-[25px] mx-2 break-words'>
							<p className='font-bold leading-relaxed mb-[15px]'>Includes:</p>
							<ul className=''>
									<RiCheckboxCircleFill className='absolute mt-[2px]' size={22} color='#19a319' />
									<li className='ml-7 relative mb-[12px]'> Gain access to data like name, location, industry, and description</li>
									<RiCheckboxCircleFill className='absolute mt-[2px]' size={22} color='#19a319' />
									<li className='ml-7  mb-[12px]'>See key highlights, recent news and activity, and firmographic information on company profiles</li>
									<RiCheckboxCircleFill className='absolute mt-[2px]' size={22} color='#19a319' />
									<li className='ml-7  mb-[12px]'>View company profiles or search for companies in the Quick Search bar</li>
							</ul>
						</div>
						<div className='p-[25px] mx-2 break-words'>
							<p className='font-bold mb-[15px]'>Includes:</p>
							<ul className=''>
									<RiCheckboxCircleFill className='absolute mt-[2px]' size={22} color='#19a319' />
									<li className='ml-7 relative mb-[12px]'> Gain access to data like name, location, industry, and description</li>
									<RiCheckboxCircleFill className='absolute mt-[2px]' size={22} color='#19a319' />
									<li className='ml-7  mb-[12px]'>See key highlights, recent news and activity, and firmographic information on company profiles</li>
									<RiCheckboxCircleFill className='absolute mt-[2px]' size={22} color='#19a319' />
									<li className='ml-7  mb-[12px]'>View company profiles or search for companies in the Quick Search bar</li>
							</ul>
						</div>
						<div className='p-[25px] mx-2 break-words'>
							<p className='font-bold leading-relaxed mb-[15px]'>Includes:</p>
							<ul className=''>
									<RiCheckboxCircleFill className='absolute mt-[2px]' size={22} color='#19a319' />
									<li className='ml-7 relative mb-[12px]'> Gain access to data like name, location, industry, and description</li>
									<RiCheckboxCircleFill className='absolute mt-[2px]' size={22} color='#19a319' />
									<li className='ml-7  mb-[12px]'>See key highlights, recent news and activity, and firmographic information on company profiles</li>
									<RiCheckboxCircleFill className='absolute mt-[2px]' size={22} color='#19a319' />
									<li className='ml-7  mb-[12px]'>View company profiles or search for companies in the Quick Search bar</li>
							</ul>
						</div>
						<div className='p-[25px] mx-2 break-words'>
							<p className='font-bold leading-relaxed mb-[15px]'>Includes:</p>
							<ul className=''>
									<RiCheckboxCircleFill className='absolute mt-[2px]' size={22} color='#19a319' />
									<li className='ml-7 relative mb-[12px]'> Gain access to data like name, location, industry, and description</li>
									<RiCheckboxCircleFill className='absolute mt-[2px]' size={22} color='#19a319' />
									<li className='ml-7  mb-[12px]'>See key highlights, recent news and activity, and firmographic information on company profiles</li>
									<RiCheckboxCircleFill className='absolute mt-[2px]' size={22} color='#19a319' />
									<li className='ml-7  mb-[12px]'>View company profiles or search for companies in the Quick Search bar</li>
							</ul>
						</div>
				</div>

				<div className='container text-[16px] leading-relaxed flex max-w-[1190px] my-0 mx-auto w-[100%] pb-[50px] justify-center '>
					<div className='self-center break-words'>
						<h2 className='font-medium leading-tight text-[36px]'>Interested in Licensing Crunchbase Data? </h2>
						<p className='mb-[15px] text-[18px] leading-relaxed'>With Data Licensing, bring Crunchbase’s best-in-class data to your customers. </p>
						<div>
							<div className='flex flex-wrap inline-block items-center break-words'>
								<a className='flex ml-5 bg-blue-600 text-[14px] text-center text-white mt-[30px] rounded-[10px] items-center justify-center h-[54px] leading-[54px] min-w-[200px]'>
									LEARN MORE
								</a>
							</div>
						</div>
					</div>
					<div className='self-center break-words'>
						<Image src={manufacturer} />
					</div>
				</div>



		</>

	)
}

export default SubscriptionPage;
