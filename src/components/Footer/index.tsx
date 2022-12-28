// import { Link } from 'react-router-dom';
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
    <div className='bg-nav bg-[#010139] p-1 mt-20'>
      <div className='flex items-left'>
        <div className={``}>
          <Link href={'/'}>
            <Image src={'/images/Logo.png'} alt={'image'} className='h-8' width={125} height={10} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
