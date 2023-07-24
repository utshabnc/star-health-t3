import React from 'react';
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
// import { SlSocialTwitter } from "react-icons/sl";
import { BsLink45Deg } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import { FaShare } from "react-icons/fa";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from 'next/image';
import Modal from "../Modal"


const ShareIcons = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  let href = '';

  const copyURI = (evt: any) => {
    evt.preventDefault();
    
    navigator.clipboard.writeText(window.location.href)
    toast(`Link ${window.location.href} added to clipboard!`, { hideProgressBar: true, autoClose: 2000, type: 'success' })
  }

  // const generalShare = async (evt: any) => {
  //   evt.preventDefault();

  //   const shareData = {
  //     title: "Star Health",
  //     text: "StarHealth Data Directory",
  //     url: "https://www.starhealth.io/",
  //   };

  //   try {
  //     await navigator.share(shareData);
  //   } catch (err) {
  //     console.log(`Error: ${err}`);
  //   }
  // }

  if (typeof window !== "undefined") {
    href = window?.location?.href;
  }

  return (
    <>
      <button
        className="text-white underline flex p-1"
        onClick={() => setIsOpen(true)}>
          Share
          <FaShare className='pt-1' size={20} color="white" />
      </button>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        message="Share"
      >
        <div className='share-icons flex-col w-3/4 m-auto'>
          <QRCode
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={href}
            viewBox={`0 0 300 300`}
            fgColor={'#6d28d9'}
          />
          {/* <Image src={ShQrCode} alt="Star Health QR Code" className='w-full' /> */}
          <div className="footer-social-wrapper mt-5 flex w-full justify-between flex-col content-center">
              <button
                className="ease w-full mx-auto leading-loose mt-2 focus:shadow-outline select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none flex justify-center"
                onClick={copyURI}
              >
                <BsLink45Deg className='mr-1' size={30} color="white" />
                Copy Embed
              </button>
              <Link href={`mailto:?subject=Star Health Data&body=Please take a look at this healthcare data from Star Health at the following link ${href}`} rel="noopener noreferrer">
                <button
                  className="ease w-full mx-auto mt-2 leading-loose focus:shadow-outline select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none flex justify-center"
                >
                  <HiMail className='cursor-pointer mr-2' size={30} color="white" />
                  Email
                </button>
              </Link>
              {/* <Link className="twitter-share-button" href="https://twitter.com/intent/tweet?text=Find%20Data-driven%20Health%20Care%20at%20https://www.starhealth.io/" data-size="large" target="_blank" rel="noreferrer">
                <button
                  className="ease w-full mx-auto mt-2 leading-loose focus:shadow-outline select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none flex justify-center"
                  onClick={copyURI}
                >
                  <SlSocialTwitter className='mr-2' size={26} color="white" />
                  Share
                </button>
              </Link> */}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ShareIcons;
