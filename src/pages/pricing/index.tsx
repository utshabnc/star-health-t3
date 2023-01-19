import Image from 'next/image'
import React from 'react'
import { RiCheckboxCircleFill } from 'react-icons/ri'
import { BsCheck2, BsLightningFill } from 'react-icons/bs'
import manufacturer from '../../assets/manufacturer.png'

const pricing = () => {
	return (
		<>
				<div className='header-container flex max-w-[1140px] my-0 mx-auto w-[100%] pb-[50px] justify-center'>
					<div className='text-center block-column min-w-0 break-words'>
						<div className='h-[60px] leading-tight clear-both'></div>
						<h2 className='font-bold text-[36px]'>
							Choose The Right Starhealth Solution For You
						</h2>
					</div>
				</div>

				<div className='container flex max-w-[1140px] my-0 mx-auto w-[100%] pb-[50px] justify-center'>
					<div className='p-[25px] mx-4 leading-tight border border-[#d0d0d0] text-center relative md:mb-8 '>
						<h2 className='py-[10px] font-medium text-[36px]'>Basic</h2>
						<h5 className='py-4 mb-2 font-medium text-[22px] '>Try Starhealth for free</h5>
						<p className='mb-[98.2px]'>Access firmographic data to learn more about companies at no cost</p>
						<div className='w-100 flex flex-wrap items-center justify-center align-bottom '>
							<div className='button p-[18px] rounded-lg text-white  bg-blue-600 inline-block m-0 w-[205px]'>
								<a className='font-medium'>REGISTER</a>
							</div>
						</div>
					</div>
					<div className='p-[25px] mx-4 leading-tight border border-[#d0d0d0] text-center relative md:mb-8 '>
						<h2 className='py-[10px] font-medium text-[36px]'>Starter</h2>
						<h5 className='py-4 mb-2 font-medium text-[22px] '>$29</h5>
						<p className='mb-[20px] '>Track and monitor the companies you care about</p>
						<p className='italic mb-[105px]'>Best for Individuals</p>
						<div className='w-100 flex flex-wrap items-center justify-center '>
							<div className='button p-[18px] rounded-lg bg-orange-400 inline-block m-0 w-[205px]'>
								<a className='font-medium ml-2'><BsLightningFill className='absolute mt-[3px] left-[43px]'/>TRY STARTER FREE</a>
							</div>
						</div>
					</div>
					<div className='p-[25px] mx-4 leading-tight border border-[#d0d0d0] text-center relative md:mb-8 '>
						<h2 className='py-[10px] font-medium text-[36px]'>Pro</h2>
						<h5 className='py-4 mb-2 font-medium text-[22px] '>$49</h5>
						<p className='mb-[20px] '>Unlock Starhealth&apos;s full suite of prospecting tools fueled by sales intelligence</p>
						<p className='italic mb-[65.5px]'>Best for Individuals and Small Teams</p>
						<div className='w-100 flex flex-wrap items-center justify-center '>
							<div className='button p-[18px] rounded-lg bg-orange-400 bg-blue-600 inline-block m-0 w-[205px]'>
								<a className='font-medium'><BsLightningFill className='absolute mt-[3px] left-[54px]'/> TRY PRO FREE</a>
							</div>
						</div>
					</div>
					<div className='p-[25px] mx-4 leading-tight border border-[#d0d0d0] text-center relative md:mb-8 '>
						<h2 className='py-[10px] font-medium text-[36px]'>Enterprise</h2>
						<h5 className='py-4 mb-2 font-medium text-[22px] '>Contact Us</h5>
						<p className='mb-[10px] '>Custom billing</p>
						<p className='mb-[20px] '>A custom solution that scales as teams do</p>
						<p className='italic mb-[75px]'>Best for Large Teams</p>
						<div className='w-100 flex flex-wrap items-center justify-center '>
							<div className='button p-[18px] rounded-lg bg-orange-400  bg-blue-600 inline-block m-0 w-[205px]'>
								<a className='font-medium'><BsLightningFill className='absolute mt-[3px] left-[57px]'/>CONTACT US</a>
							</div>
						</div>
					</div>

				</div>

				<div className='container text-[16px] leading-relaxed flex max-w-[1330px] my-0 mx-auto w-[100%] pb-[50px] justify-center '>
						<div className='p-[25px] mr-1 break-words w-[37%]'>
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
						<div className='p-[25px] mr-1 break-words'>
							<p className='font-bold mb-[15px]'>Everything in Basic, plus:</p>
							<ul className=''>
									<RiCheckboxCircleFill className='absolute mt-[2px]' size={22} color='#19a319' />
									<li className='ml-7 relative mb-[12px]'> See all company, investor, and funding data</li>
									<RiCheckboxCircleFill className='absolute mt-[2px]' size={22} color='#19a319' />
									<li className='ml-7  mb-[12px]'>See 1,000 results per search</li>
									<RiCheckboxCircleFill className='absolute mt-[2px]' size={22} color='#19a319' />
									<li className='ml-7  mb-[12px]'>Monitor up to 1,000 companies</li>
									<RiCheckboxCircleFill className='absolute mt-[2px]' size={22} color='#19a319' />
									<li className='ml-7  mb-[12px]'>Import company lists to find prospect accounts automatically</li>
							</ul>
						</div>
						<div className='p-[25px] mr-1 break-words'>
							<p className='font-bold leading-relaxed mb-[15px]'>Everything in Starter, plus:</p>
							<ul className=''>
									<RiCheckboxCircleFill className='absolute mt-[2px]' size={22} color='#19a319' />
									<li className='ml-7 relative mb-[12px]'> Access verified contact data</li>
									<RiCheckboxCircleFill className='absolute mt-[2px]' size={22} color='#19a319' />
									<li className='ml-7  mb-[12px]'>Email decision-makers with intelligent email templates</li>
									<RiCheckboxCircleFill className='absolute mt-[2px]' size={22} color='#19a319' />
									<li className='ml-7  mb-[12px]'>Push company information from Starhealth to your CRM</li>
									<RiCheckboxCircleFill className='absolute mt-[2px]' size={22} color='#19a319' />
									<li className='ml-7  mb-[12px]'>Push contacts from Starhealth to Outreach</li>
									<RiCheckboxCircleFill className='absolute mt-[2px]' size={22} color='#19a319' />
									<li className='ml-7  mb-[12px]'>Get account recommendations tailored to your interests</li>
									<RiCheckboxCircleFill className='absolute mt-[2px]' size={22} color='#19a319' />
									<li className='ml-7  mb-[12px]'>See companies that are similar to the accounts you care about</li>
									<RiCheckboxCircleFill className='absolute mt-[2px]' size={22} color='#19a319' />
									<li className='ml-7  mb-[12px]'>Monitor up to 100,000 companies</li>
									<RiCheckboxCircleFill className='absolute mt-[2px]' size={22} color='#19a319' />
									<li className='ml-7  mb-[12px]'>Export results (5k rows/month)</li>
									<RiCheckboxCircleFill className='absolute mt-[2px]' size={22} color='#19a319' />
									<li className='ml-7  mb-[12px]'>Access priority support and chat</li>
							</ul>
						</div>
						<div className='p-[25px] mr-1 break-words'>
							<p className='font-bold leading-relaxed mb-[15px]'>Everything in Pro, plus:</p>
							<ul className=''>
									<RiCheckboxCircleFill className='absolute mt-[2px]' size={22} color='#19a319' />
									<li className='ml-7 relative mb-[12px]'>Access as many contacts as you need across an entire team</li>
									<RiCheckboxCircleFill className='absolute mt-[2px]' size={22} color='#19a319' />
									<li className='ml-7  mb-[12px]'>Enrich 40+ fields across all accounts in Salesforce</li>
									<RiCheckboxCircleFill className='absolute mt-[2px]' size={22} color='#19a319' />
									<li className='ml-7  mb-[12px]'>Prospect smarter with CRM-enriched search filters</li>
									<RiCheckboxCircleFill className='absolute mt-[2px]' size={22} color='#19a319' />
									<li className='ml-7  mb-[12px]'>See real-time updates</li>
									<RiCheckboxCircleFill className='absolute mt-[2px]' size={22} color='#19a319' />
									<li className='ml-7  mb-[12px]'>Gain API access</li>
									<RiCheckboxCircleFill className='absolute mt-[2px]' size={22} color='#19a319' />
									<li className='ml-7  mb-[12px]'>Leverage bulk exports of the full dataset</li>
									<RiCheckboxCircleFill className='absolute mt-[2px]' size={22} color='#19a319' />
									<li className='ml-7  mb-[12px]'>Access Customer Success Manager support</li>
							</ul>
						</div>
				</div>

				<div className='container text-[16px] leading-relaxed flex max-w-[1190px] my-0 mx-auto w-[100%] pb-[50px] justify-center '>
					<div className='self-center break-words'>
						<h2 className='mb-3 font-medium leading-tight text-[36px]'>Interested in Licensing Starhealth Data? </h2>
						<p className='mb-[3px] text-[18px] leading-relaxed'>With Data Licensing, bring Starhealth&apos;s best-in-class data to your customers. </p>
						<div>
							<div className='flex flex-wrap inline-block items-center break-words'>
								<a className='flex ml-5 bg-blue-600 text-[14px] text-center text-white mt-[30px] rounded-[10px] items-center justify-center h-[54px] leading-[54px] min-w-[200px]'>
									LEARN MORE
								</a>
							</div>
						</div>
					</div>
					<div className='self-center break-words w-[47rem]'>
						<Image alt='manu' src={manufacturer} />
					</div>
				</div>

				<div className='container text-[16px] leading-relaxed flex max-w-[1190px] my-0 mx-auto w-[100%] pb-[50px] justify-center'>
					<div className='break-words'>
						<h2 className='text-center font-medium leading-tight text-[36px]'>Plan Comparison</h2>
						<div className='h-[30px] clear-both'></div>
						<div className='flex justify-end mb-8 max-w-4xl'>
							<div className='box-border mx-7 basis-1/4 grow-0 break-words'>
								<div className=''>
									<h3 className='font-medium text-[1.875rem] text-center leading-tight mb-[6px]'>Starter</h3>
									<h2 className='font-medium text-[19px] text-center w-[165px] leading-none ml-5'>$29 / user / month billed annually </h2>
									<div className='mt-5 flex flex-wrap items-center'>
										<div className='inline-block m-0'>
											<a className='flex bg-orange-500 font-semibold items-center justify-center uppercase rounded-[10px] h-[48px] w-[210px]'>
												<BsLightningFill className='mt-[3px] mr-[3px]'/>
												TRY STARTER FREE
											</a>
										</div>
									</div>
								</div>
							</div>
							<div className='mx-7 basis-1/4 grow-0 break-words'>
								<div className='box-border'>
									<h3 className='font-medium text-[1.875rem] text-center leading-tight mb-[6px]'>Pro</h3>
									<h2 className='font-medium text-[19px] text-center w-[165px] leading-none ml-5'>$49 / user / month billed annually </h2>
									<div className='mt-5 flex flex-wrap items-center '>
										<div className='inline-block m-0'>
											<a className='flex bg-orange-500 font-semibold items-center justify-center uppercase rounded-[10px] h-[48px] w-[210px]'>
												<BsLightningFill className='mt-[3px] mr-[3px]'/>
												TRY PRO FREE
											</a>
										</div>
									</div>
								</div>
							</div>
							<div className='mx-7 basis-1/4 grow-0 break-words'>
								<div className='box-border'>
									<h3 className='font-medium text-[1.875rem] text-center leading-tight mb-[6px]'>Enterprise</h3>
									<h2 className='font-medium text-[19px] text-center w-[165px] leading-none pt-[18px] ml-5'>Custom</h2>
									<div className='mt-5 flex flex-wrap items-center '>
										<div className='inline-block m-0'>
											<a className='flex bg-orange-500 font-semibold items-center justify-center uppercase rounded-[10px] h-[48px] w-[210px]'>
												<BsLightningFill className='mt-[3px] mr-[3px]'/>
												CONTACT US
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>

				<div className='box-border'>
					<div className='max-w-4xl mx-auto font-bold'>
						<div>
							<h4 className='pl-3 pb-2 border-b-2 border-black mt-2 leading-[30px] text-[20px]'>Highlights</h4>
							<div className='mt-3 flex flex-nowrap'>
								<div className='min-w-0 break-words text-[15px]'>
									<figure className='mb-[1.5rem]'>
										<table className=' table border-collapse'>
											<tbody className='table-row-group align-middle text-gray-500'>
												<tr className='flex items-center h-[60px]'><td>Company Information</td></tr>
												<tr className='flex items-center h-[60px]'><td>Account Recommendations</td></tr>
												<tr className='flex items-center h-[60px]'><td>Contact Data</td></tr>
												<tr className='flex items-center h-[60px]'><td>Engagement Suite</td></tr>
											</tbody>
										</table>
									</figure>
								</div>
								<div className='min-w-0 break-words text-[15px]'>
									<figure className='mb-[1.5rem]'>
										<table className=' table border-collapse'>
											<tbody className='table-row-group align-middle text-gray-500'>
												<tr className='flex justify-center items-center h-[60px] w-[25rem]'><td><BsCheck2 size={40} color='#00d084'/></td></tr>
												<tr className='flex justify-center items-center h-[60px] w-[25rem]'><td></td></tr>
												<tr className='flex justify-center items-center h-[60px] w-[25rem]'><td></td></tr>
												<tr className='flex justify-center items-center h-[60px] w-[25rem]'><td></td></tr>
											</tbody>
										</table>
									</figure>
								</div>
								<div className='min-w-0 break-words text-[15px]'>
									<figure className='mb-[1.5rem]'>
										<table className=' table border-collapse'>
											<tbody className='table-row-group align-middle text-gray-500'>
												<tr className='flex justify-center items-center h-[60px] w-[25rem]'><td><BsCheck2 size={40} color='#00d084'/></td></tr>
												<tr className='flex justify-center items-center h-[60px] w-[25rem]'><td><BsCheck2 size={40} color='#00d084'/></td></tr>
												<tr className='flex justify-center items-center h-[60px]'><td>10 contacts/month <br/> (add-ons available)</td></tr>
												<tr className='flex justify-center items-center h-[60px] w-[25rem]'><td><BsCheck2 size={40} color='#00d084'/></td></tr>
											</tbody>
										</table>
									</figure>
								</div>
								<div className='min-w-0 break-words text-[15px]'>
									<figure className='mb-[1.5rem]'>
										<table className=' table border-collapse'>
											<tbody className='table-row-group align-middle text-gray-500'>
												<tr className='flex justify-center items-center h-[60px] w-[25rem]'><td><BsCheck2 size={40} color='#00d084'/></td></tr>
												<tr className='flex justify-center items-center h-[60px] w-[25rem]'><td><BsCheck2 size={40} color='#00d084'/></td></tr>
												<tr className='flex justify-center items-center h-[60px] w-[25rem]'><td>As many as you need</td></tr>
												<tr className='flex justify-center items-center h-[60px] w-[25rem]'><td><BsCheck2 size={40} color='#00d084'/></td></tr>
											</tbody>
										</table>
									</figure>
								</div>
								
							</div>
						</div>
					</div>
				</div>

				<div className='box-border'>
					<div className='max-w-4xl mx-auto font-bold'>
						<div>
							<h4 className='pl-3 pb-2 border-b-2 border-black mt-2 leading-[30px] text-[20px]'>Features</h4>
							<div className='mt-3 flex flex-nowrap'>
								<div className='min-w-0 break-words text-[15px]'>
									<figure className='mb-[1.5rem]'>
										<table className=' table border-collapse'>
											<tbody className='table-row-group align-middle text-gray-500'>
												<tr className='flex items-center h-[60px]'><td>Unlimited Search Results</td></tr>
												<tr className='flex items-center h-[60px]'><td>Saved Lists & Alerts</td></tr>
												<tr className='flex items-center h-[60px]'><td>Salesforce Integration</td></tr>
												<tr className='flex items-center h-[60px]'><td>CRM-Enriched Search Filters</td></tr>
												<tr className='flex items-center h-[60px]'><td>Salesforce Enrichment</td></tr>
												<tr className='flex items-center h-[60px]'><td>Outreach Integration</td></tr>
												<tr className='flex items-center h-[60px]'><td>Notes & Tagging</td></tr>
												<tr className='flex items-center h-[60px]'><td>Export to CSV</td></tr>
												<tr className='flex items-center h-[60px]'><td>Team Admin Features</td></tr>
												<tr className='flex items-center h-[60px]'><td>API & Bulk Data</td></tr>
											</tbody>
										</table>
									</figure>
								</div>
								<div className='min-w-0 break-words text-[15px]'>
									<figure className='mb-[1.5rem]'>
										<table className=' table border-collapse'>
											<tbody className='table-row-group align-middle text-gray-500'>
												<tr className='flex justify-center items-center h-[60px] w-[25rem]'><td><BsCheck2 size={40} color='#00d084'/></td></tr>
												<tr className='flex justify-center items-center h-[60px] w-[25rem]'><td></td></tr>
												<tr className='flex justify-center items-center h-[60px] w-[25rem]'><td></td></tr>
												<tr className='flex justify-center items-center h-[60px] w-[25rem]'><td></td></tr>
											</tbody>
										</table>
									</figure>
								</div>
								<div className='min-w-0 break-words text-[15px]'>
									<figure className='mb-[1.5rem]'>
										<table className=' table border-collapse'>
											<tbody className='table-row-group align-middle text-gray-500'>
												<tr className='flex justify-center items-center h-[60px] w-[25rem]'><td><BsCheck2 size={40} color='#00d084'/></td></tr>
												<tr className='flex justify-center items-center h-[60px] w-[25rem]'><td><BsCheck2 size={40} color='#00d084'/></td></tr>
												<tr className='flex justify-center items-center h-[60px]'><td>10 contacts/month <br/> (add-ons available)</td></tr>
												<tr className='flex justify-center items-center h-[60px] w-[25rem]'><td><BsCheck2 size={40} color='#00d084'/></td></tr>
											</tbody>
										</table>
									</figure>
								</div>
								<div className='min-w-0 break-words text-[15px]'>
									<figure className='mb-[1.5rem]'>
										<table className=' table border-collapse'>
											<tbody className='table-row-group align-middle text-gray-500'>
												<tr className='flex justify-center items-center h-[60px] w-[25rem]'><td><BsCheck2 size={40} color='#00d084'/></td></tr>
												<tr className='flex justify-center items-center h-[60px] w-[25rem]'><td><BsCheck2 size={40} color='#00d084'/></td></tr>
												<tr className='flex justify-center items-center h-[60px] w-[25rem]'><td>As many as you need</td></tr>
												<tr className='flex justify-center items-center h-[60px] w-[25rem]'><td><BsCheck2 size={40} color='#00d084'/></td></tr>
											</tbody>
										</table>
									</figure>
								</div>
								
							</div>
						</div>
					</div>
				</div>

				<div className='box-border mb-16'>
					<div className='max-w-4xl mx-auto font-bold'>
						<div>
							<h4 className='pl-3 pb-2 border-b-2 border-black mt-2 leading-[30px] text-[20px]'>Support</h4>
							<div className='mt-3 flex flex-nowrap'>
								<div className='min-w-0 break-words text-[15px]'>
									<figure className='mb-[1.5rem]'>
										<table className=' table border-collapse'>
											<tbody className='table-row-group align-middle text-gray-500'>
												<tr className='flex items-center h-[60px] mt-2'><td>Dedicated Success Manager</td></tr>
											</tbody>
										</table>
									</figure>
								</div>
								<div className='min-w-0 break-words text-[15px]'>
									<figure className='mb-[1.5rem]'>
										<table className=' table border-collapse'>
											<tbody className='table-row-group align-middle text-gray-500'>
												<tr className='flex justify-center items-center h-[60px] w-[25rem]'><td><BsCheck2 size={40} color='#00d084'/></td></tr>
											</tbody>
										</table>
									</figure>
								</div>
								<div className='min-w-0 break-words text-[15px]'>
									<figure className='mb-[1.5rem]'>
										<table className=' table border-collapse'>
											<tbody className='table-row-group align-middle text-gray-500'>
												<tr className='flex justify-center items-center h-[60px] w-[25rem]'><td><BsCheck2 size={40} color='#00d084'/></td></tr>
											</tbody>
										</table>
									</figure>
								</div>
								<div className='min-w-0 break-words text-[15px]'>
									<figure className='mb-[1.5rem]'>
										<table className=' table border-collapse'>
											<tbody className='table-row-group align-middle text-gray-500'>
												<tr className='flex justify-center items-center h-[60px] w-[25rem]'><td><BsCheck2 size={40} color='#00d084'/></td></tr>
											</tbody>
										</table>
									</figure>
								</div>
								
							</div>
						</div>
					</div>
				</div>

				<div className='mt-3 container text-[16px] leading-relaxed flex max-w-[1300px] my-0 mx-auto w-[100%] pb-[50px] justify-center'>
					<div className='break-words justify-center'>
						<div className='h-[30px] clear-both box-border block-spacer' aria-hidden="true"></div>
						<h2 className='mb-1 text-center font-bold leading-tight text-[36px] w-[1200px]'>Join the Thousands of Brands Using Starhealth for Their Researching and Prospecting Needs</h2>
						<figure className='flex my-4 flex-wrap clear-both justify-center'>
						<Image alt='manu' src={manufacturer} className='w-[250px]' />
						<Image alt='manu' src={manufacturer} className='w-[250px]' />
						<Image alt='manu' src={manufacturer} className='w-[250px]' />
						<Image alt='manu' src={manufacturer} className='w-[250px]' />
						<Image alt='manu' src={manufacturer} className='w-[250px]' />
						</figure>
					</div>
				</div>



		</>

	)
}

export default pricing;
