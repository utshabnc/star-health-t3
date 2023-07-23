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
          Follow and Share!
      </button>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        message="Share"
      >
        <div className='share-icons flex-col'>
          <Image src={ShQrCode} alt="Star Health QR Code" width={100} height={100} />
          <div className="footer-social-wrapper mt-5 flex w-[100%] justify-between">
              <Link href="https://www.starhealth.io/" onClick={copyURI}>
                <BsLink45Deg size={30} color="royalBlue" />
              </Link>
              <Link href="mailto:">
                <HiMail className='cursor-pointer' size={30} color="royalBlue" />
              </Link>
              <a className="twitter-share-button" href="https://twitter.com/intent/tweet?text=Find%20Data-driven%20Health%20Care%20at%20https://www.starhealth.io/" data-size="large" target="_blank" rel="noreferrer">
                <SlSocialTwitter size={26} color="royalBlue" />
              </a>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ShareIcons;
