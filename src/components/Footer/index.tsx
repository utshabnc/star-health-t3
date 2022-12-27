// import { Link } from 'react-router-dom';
import { FaFacebookSquare  } from 'react-icons/fa'
import { SlSocialTwitter } from 'react-icons/sl'
import { BsInstagram } from 'react-icons/bs'
import Image from 'next/image';
import Link from 'next/link';
import styles from './index.module.css';

// --- index.module.css ---
// .Header {
//   color: white;
// }

// .smallText {
//   color: rgb(156 163 175);
// }

const footLinks = [
  { text: 'About Us', url: '/About' },
  { text: 'Privacy Policy', url: '/Privacy' },
  { text: 'FAQs', url: '/Faqs' },
];

const year = new Date().getFullYear();

function Footer() {
  return (
    <div className='bg-nav bg-[#010139] p-1 leading-normal font-custom'>
				<div className='container flex justify-center	my-4 ml-auto mr-auto flex-col items-center'>
					<div className='font-custom text-white grid auto-cols-custom grid-cols-custom grid-rows-custom'>
						<div className='node flex flex-col justify-between items-start'>
							<div className='footer-column m-5 w-[50%]'>
								<p>Starhealth - Organizing the worlds medical knowledge</p>
							</div>

							<div className='m-3 w-[40%] flex footer-social-wrapper justify-around items-center'>
								<Link href='https://www.facebook.com'>
									<FaFacebookSquare size={30} />
								</Link>
								<Link href='https://www.twitter.com'>
									<SlSocialTwitter size={30} />
								</Link>
								<Link href='https://www.instagram.com'>
									<BsInstagram size={30} />
								</Link>
							</div>
						</div>

						<div className='node mt-2 grid auto-cols-custom grid-cols-custom2 grid-rows-custom'>
							<div className='footer-column flex-col text-white grid grid-cols-1 items-start justify-between'>
								<div className='footer-title mb-2.5 font-bold'>Company</div>
								<Link href='/' className='my-1 text-sm'>Home</Link>
								<Link href='/' className='my-1 text-sm'>Features</Link>
								<Link href='/' className='my-1 text-sm'>Contact</Link>
							</div>
							<div className='footer-column flex-col text-white grid grid-cols-1'>
								<Link href='/' className='my-1 text-sm items-center mt-10'>Privacy Policy</Link>
								<Link href='/' className='my-1 text-sm mb-10'>Terms of Use</Link>
							</div>
						</div>
					</div>
					
					<div className='m-[92px]  flex text-white footer-bottom justify-center border-b border-solid border-bordercolor py-2.5'>
						{/* <Link href='/'>
							<Image src={'/images/Logo.png'} alt={'image'} className='h-8' width={125} height={10} />
						</Link> */}
						<div className=''>
							<p className=''>
									StarHealth Inc. | All Rights Reserved 2022
							</p>
						</div>
					</div>
				</div>
		</div>
  );
}

export default Footer;
