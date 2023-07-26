// import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from "react";
// import { useUser } from '../../hooks';
// import { signIn, signOut } from '../../firebase';
import { debounce } from "lodash";
// import { useLazySearchQuery } from '../../api';
// import '../../index.css';
import SearchPage from "../../pages/SearchPage";
import Image from "next/image";
import ShareIcons from "../ShareIcons";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { HiOutlineSearch } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
// import { GoThreeBars } from "react-icons/go";
import { VscMenu } from "react-icons/vsc";

// --- index.module.css ---
// .title {
//   margin-left: 72px;
// }

function NavBar() {
  // const [user, loading] = useUser();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [search, setSearch] = useState<string>("");
  const navigate = useRouter();
  const session = useSession();
  const [width, setWidth] = useState<number>(
    typeof window != "undefined" ? window?.innerWidth : 0
  );

  const open = false;

  const onSearch = () => {
    navigate.push(`/?search=${search}`);
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window?.innerWidth);
    });
  }, []);

  return (
    <>
      <nav
        className={`bg-nav relative h-full w-[100%] bg-[#010139] p-5 pb-14 pt-12 md:p-2`}
      >
        <div className="flex flex-1 items-center">
          <div className={`hidden md:block`}>
            <Link href={"/"}>
              <Image
                src={"/images/Logo.png"}
                alt="logo"
                className="h-12"
                width={175}
                height={10}
              />
            </Link>
          </div>
          {/* Mobile */}
          <div className={`md:hidden`}>
            <Link href={"/"}>
              <Image
                src={"/favicon.ico"}
                alt="logo"
                className=""
                width={140}
                height={140}
              />
            </Link>
          </div>

          <div
            style={{ position: "absolute", left: 5 }}
            className="flex flex-row items-center md:ml-2  md:max-w-[100px]"
          ></div>

          <div className="relative hidden items-center justify-center md:flex">
            <div className="absolute mr-[22rem]">
              <HiOutlineSearch size={21} />
            </div>
            <div>
              <SearchPage setSearchVar={setSearch} />
            </div>
          </div>

          {/* <div className="relative flex items-center justify-center md:hidden">
            <div className="absolute mr-[57rem]">
              <HiOutlineSearch size={70} />
            </div>
            <div >
            <SearchPage setSearchVar={setSearch}/>
            </div> */}
          {/* </div> */}

          <div
            style={{
              minWidth: width > 1000 ? 400 : 100,
              position: "absolute",
              right: "10px",
            }}
            className={`flex flex-row items-center justify-end space-x-2 ${
              session?.status === "loading" && "opacity-0"
            }`}
          >
            {typeof window !== "undefined" &&
              width > 1000 &&
              session?.data?.user && (
                <p
                  className={`text-white   ${!session == null && "opacity-0"} `}
                >
                  {/* Signed in as {session?.data?.user?.email} */}
                </p>
              )}

            {/* <Link href='/' className='w-30 lg:w-22 text-white font-custom font-medium hover:text-blue-600 rounded px-3 py-1'>Clients</Link> */}
            <Link
              href={"/directory"}
              className="w-30 md:w-22 hidden rounded px-3 py-1 font-custom font-medium 
							text-white hover:text-blue-300 md:block"
            >
              Data Directory
            </Link>
            <Link
              href={"/visualization"}
              className="w-30 md:w-22 hidden rounded px-3 py-1 font-custom font-medium 
							text-white hover:text-blue-300 md:block"
            >
              Data Visualization
            </Link>

            <Link
              href={"/pricing"}
              className="w-30 md:w-22 hidden rounded px-3 py-1 font-custom font-medium 
							text-white hover:text-blue-300 md:block"
            >
              Pricing
            </Link>
            <Link
              href={"/profile"}
              className="w-30 md:w-22 hidden rounded px-3 py-1 font-custom font-medium 
            text-white hover:text-blue-300 md:block"
            >
              Profile
            </Link>
            <Link
              href={"/search"}
              className="w-30 md:w-22 hidden rounded px-3 py-1 font-custom font-medium 
							text-white hover:text-blue-300 md:block"
            >
              Search
            </Link>
            {/* <Link href='/' className='w-30 lg:w-22 text-white font-custom font-medium hover:text-blue-600 rounded px-3 py-1'>Contact</Link>	 */}
            {session?.data?.user ? (
              <button
                className="w-30 hidden h-9 rounded bg-purple-600 px-3 py-1 font-custom font-medium text-white hover:bg-emerald-500 active:bg-emerald-600 lg:block"
                type="button"
                onClick={() => signOut()}
              >
                Sign out
              </button>
            ) : (
              <button
                className="w-30 hidden h-9 rounded bg-purple-600 px-3 py-1 font-custom font-medium text-white hover:bg-emerald-500 active:bg-emerald-600 lg:block"
                onClick={() => signIn("google")}
              >
                Sign In
              </button>
            )}
            <button
              className="p-2 pr-6 md:hidden"
              onClick={() => setNavbarOpen((prev) => !prev)}
            >
              <span className="sr-only">Open main menu</span>

              {navbarOpen ? (
                <IoMdClose size={110} color="white" />
              ) : (
                <VscMenu size={110} color="white" />
              )}
            </button>
          </div>
        </div>
        {/* Mobile */}
        <div className="md:hidden">
          {navbarOpen ? (
            <div className="flex flex-col gap-y-12 px-2 pb-8 pt-20 text-center font-custom">
              <>
                <Link
                  href={"/visualization"}
                  className="text-[2.7rem] font-medium 
												text-white hover:text-blue-300"
                  onClick={() => setNavbarOpen((prev) => !prev)}
                >
                  Data Visualization
                </Link>
                <Link
                  href={"/directory"}
                  className="text-[2.7rem] font-medium 
												text-white hover:text-blue-300"
                  onClick={() => setNavbarOpen((prev) => !prev)}
                >
                  Data Directory
                </Link>
                <Link
                  href={"/pricing"}
                  className="text-[2.7rem] font-medium 
												text-white hover:text-blue-300"
                  onClick={() => setNavbarOpen((prev) => !prev)}
                >
                  Pricing
                </Link>
                <Link
                  href={"/profile"}
                  className="text-[2.7rem] font-medium 
												text-white hover:text-blue-300"
                  onClick={() => setNavbarOpen((prev) => !prev)}
                >
                  Profile
                </Link>
                {session?.data?.user ? (
                  <div>
                    <button
                      className="h-[130px] w-[320px] rounded bg-emerald-400 px-3 py-1 font-custom text-[2.7rem] font-medium hover:bg-emerald-500 active:bg-emerald-600"
                      type="button"
                      onClick={() => signOut()}
                    >
                      Sign out
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      className="h-[130px] w-[320px] rounded bg-emerald-400 px-3 py-1 font-custom text-[2.7rem] font-medium hover:bg-emerald-500 active:bg-emerald-600"
                      onClick={() => signIn("google")}
                    >
                      Sign In
                    </button>
                  </div>
                )}
              </>
            </div>
          ) : (
            <></>
          )}
        </div>
      </nav>
      {navigate.pathname !== "/" && (
        <div className="sub-nav flex w-full justify-center bg-royalBlue">
          <ShareIcons />
        </div>
      )}
    </>
  );
}

export default NavBar;
