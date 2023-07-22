// import { Link } from 'react-router-dom';
import { SlSocialTwitter } from "react-icons/sl";
import { BsLink45Deg, BsBoxArrowUp } from "react-icons/bs";
import Link from "next/link";

const ShareIcons = () => {

  const copyURI = (evt: any) => {
    evt.preventDefault();
    const parent = evt.target.parentElement
    console.log(parent);
    navigator.clipboard.writeText(parent.getAttribute('href'))
  }

  const generalShare = async () => {
    const shareData = {
      title: "Star Health",
      text: "StarHealth Data Directory",
      url: "https://www.starhealth.io/",
    };

    try {
      await navigator.share(shareData);
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }

  return (
    <div className="footer-social-wrapper m-1 flex w-[10%] items-center justify-around">
        <Link href="https://www.starhealth.io/" onClick={copyURI}>
          <BsLink45Deg size={20} color="white" />
        </Link>
        <BsBoxArrowUp size={18} color="white" onClick={generalShare} />
        <Link href="https://www.twitter.com">
          <SlSocialTwitter size={20} color="white" />
        </Link>
    </div>
  );
}

export default ShareIcons;


