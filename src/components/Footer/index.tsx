// import { Link } from 'react-router-dom';
import { FaDivide, FaFacebookSquare } from "react-icons/fa";
import { SlSocialTwitter } from "react-icons/sl";
import { BsInstagram } from "react-icons/bs";
import Logo from "../../assets/Logo.png";
import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";

// --- index.module.css ---
// .Header {
//   color: white;
// }

// .smallText {
//   color: rgb(156 163 175);
// }

const footLinks = [
  { text: "About Us", url: "/About" },
  { text: "Privacy Policy", url: "/Privacy" },
  { text: "FAQs", url: "/Faqs" },
];

const year = new Date().getFullYear();

function Footer() {
  return (
    <div className="bg-nav bg-[#010139] p-1 font-custom leading-normal">
      <div className="container mt-9 ml-auto	mr-auto flex flex-col items-center justify-center">
        <div className="grid auto-cols-custom grid-cols-custom grid-rows-custom font-custom text-white">
          <div className="node flex flex-col items-start justify-between">
            <div className="footer-column m-5 w-[50%]">
              <Link
                href={{
                  pathname: "/",
                }}
              >
                <Image
                  src={Logo}
                  alt="Logo"
                  className="ml-[-1.5rem] w-[100px] rounded-md "
                />
              </Link>
              <p className="leading-relaxed">
                Empowering people through accessible healthcare data
              </p>
            </div>

            <div className="footer-social-wrapper m-1 mt-2 flex w-[40%] items-center justify-around">
              <Link href="https://www.facebook.com">
                <FaFacebookSquare size={30} />
              </Link>
              <Link href="https://www.twitter.com">
                <SlSocialTwitter size={30} />
              </Link>
              <Link href="https://www.instagram.com">
                <BsInstagram size={30} />
              </Link>
            </div>
          </div>

          <div className="node mt-3 grid auto-cols-custom grid-cols-custom2 grid-rows-custom">
            <div className="footer-column grid grid-cols-1 flex-col items-start justify-between text-white">
              <div className="footer-title mb-2.5 font-bold">Company</div>
              <Link href="/" className="my-1 text-sm">
                Home
              </Link>
              <Link href="/directory" className="my-1 text-sm">
                Data Directory
              </Link>
              <Link href="/pricing" className="my-1 text-sm">
                Pricing
              </Link>
              {/* <Link href='/' className='my-1 text-sm'>Contact</Link> */}
            </div>
            <div className="footer-column grid grid-cols-1 flex-col text-white">
              <Link
                href="/privacy-policy"
                className="mt-[3.9rem] items-center text-sm"
              >
                Privacy Policy
              </Link>
              <Link href="/terms-and-conditions" className="mb-12 text-sm">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom  m-[92px] flex justify-center border-b border-solid border-bordercolor py-2.5 text-white">
          {/* <Link href='/'>
							<Image src={'/images/Logo.png'} alt={'image'} className='h-8' width={125} height={10} />
						</Link> */}

          <div>
            <p className="">StarHealth Inc. | All Rights Reserved 2022</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
