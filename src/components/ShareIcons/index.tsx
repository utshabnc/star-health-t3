import React from 'react';
import { SlSocialTwitter } from "react-icons/sl";
import { BsLink45Deg, BsBoxArrowUp } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from 'next/image';
import Modal from "../Modal"

// IMAGE ASSETS
import ShQrCode from "../../assets/starHealth-share.jpg";

const ShareIcons = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const copyURI = (evt: any) => {
    evt.preventDefault();

    const parent = evt.target.parentElement

    if (evt.target.hasAttribute('href')) {
      navigator.clipboard.writeText(evt.target.getAttribute('href'))
    } else {
      navigator.clipboard.writeText(parent.getAttribute('href'))
    }

    toast('Link https://www.starhealth.io/ added to clipboard!', { hideProgressBar: true, autoClose: 2000, type: 'success' })
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

  return (
    <>
      <button
        className="text-white underline"
        onClick={() => setIsOpen(true)}>
          Share
      </button>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        message="Share"
      >
        <div className='share-icons flex-col w-3/4 m-auto'>
          <Image src={ShQrCode} alt="Star Health QR Code" className='w-full' />
          <div className="footer-social-wrapper mt-5 flex w-full justify-between flex-col content-center">
              <button
                className="ease w-full mx-auto leading-loose mt-2 focus:shadow-outline select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none flex justify-center"
                onClick={copyURI}
              >
                <BsLink45Deg className='mr-1' size={30} color="white" />
                Copy Embed
              </button>
              <Link href="mailto:">
                <button
                  className="ease w-full mx-auto mt-2 leading-loose focus:shadow-outline select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none flex justify-center"
                >
                  <HiMail className='cursor-pointer mr-2' size={30} color="white" />
                  Email
                </button>
              </Link>
              <Link className="twitter-share-button" href="https://twitter.com/intent/tweet?text=Find%20Data-driven%20Health%20Care%20at%20https://www.starhealth.io/" data-size="large" target="_blank" rel="noreferrer">
                <button
                  className="ease w-full mx-auto mt-2 leading-loose focus:shadow-outline select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none flex justify-center"
                  onClick={copyURI}
                >
                  <SlSocialTwitter className='mr-2' size={26} color="white" />
                  Share
                </button>
              </Link>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ShareIcons;
