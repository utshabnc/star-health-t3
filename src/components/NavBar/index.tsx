// import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
// import { useUser } from '../../hooks';
// import { signIn, signOut } from '../../firebase';
import { debounce } from 'lodash';
// import { useLazySearchQuery } from '../../api';
// import '../../index.css';
import SearchPage from '../../pages/SearchPage';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { HiOutlineSearch  } from 'react-icons/hi'

// --- index.module.css ---
// .title {
//   margin-left: 72px;
// }



function NavBar() {
  // const [user, loading] = useUser();
  const [search, setSearch] = useState<string>('');
  const navigate = useRouter();
  const session = useSession();
  const [width, setWidth] = useState<number>(typeof window != "undefined" ? window?.innerWidth : 0)
  
  const onSearch = () => {
    navigate.push(`/?search=${search}`);
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window?.innerWidth)
    })
  }, [])

  return (
    <>
      <nav className={`bg-nav bg-[#010139] ${navigate.asPath === "/" ? "p-1" : "p-7"} relative`}>
        <div className='flex-1 flex items-center'>
          {navigate.asPath === '/' && (
            <div className={``}>
              <Link href={'/'}>
                <Image src={'/images/Logo.png'} alt='logo' className='h-12' width={175} height={10} />
              </Link>
            </div>
          )}

          <div
            style={{ position: 'absolute', left: 5 }}
            className='flex flex-row lg:ml-2 lg:max-w-[100px]  items-center'
          >
            {navigate.asPath !== '/' && (
              <>
                <SearchPage
                  buttonSmall
                  buttonPlaceholder={(width <= 640) ? 'Search' : undefined}
                />
              </>
            )}
          </div>

					<div className='flex relative justify-center items-center'>
						<div className='absolute mr-[22rem]' >
							<HiOutlineSearch size={21} />
						</div>
						<SearchPage />	
					</div>

          <div
            style={{
              minWidth: width > 1000 ? 400 : 100,
              position: 'absolute',
              right: "10px"
            }}
            className={`flex flex-row justify-end items-center space-x-2 ${
              session?.status === "loading" && 'opacity-0'
            }`}
          >
            {(typeof window !== "undefined" && width) > 1000 && session?.data?.user && (
              <p className={`text-white   ${!session == null && 'opacity-0'} `}>
                Signed in as {session?.data?.user?.email}
              </p>
            )}

						{/* <Link href='/' className='w-30 lg:w-22 text-white font-custom font-medium hover:text-blue-600 rounded px-3 py-1'>Clients</Link> */}


						{navigate.asPath !== "/directory" && 
							<Link href={"/directory"} className='w-30 lg:w-22 text-white font-custom font-medium hover:text-blue-300 
							 rounded px-3 py-1'>
								Data Directory
							</Link>
						}
						<Link href='/' className='w-30 lg:w-22 text-white font-custom font-medium hover:text-blue-600 rounded px-3 py-1'>Contact</Link>	
						{session?.data?.user ? (
              <button
                className='w-30 lg:w-22 font-custom font-medium bg-emerald-400 hover:bg-emerald-500 active:bg-emerald-600  rounded px-3 py-1'
                type='button'
                onClick={() => signOut()}
              >
                Sign out
              </button>
            ) : (
              <button
                className='w-30 lg:w-22 font-custom font-medium bg-emerald-400 hover:bg-emerald-500 active:bg-emerald-600 rounded px-3 py-1'
                onClick={() => signIn("google")}
              >
                Sign In
              </button>
            )}

          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
