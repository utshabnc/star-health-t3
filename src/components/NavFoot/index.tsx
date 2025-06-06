import React from "react";
import NavBar from "../NavBar";
import Footer from "../Footer";

// .bgColor {
//   background-color: #f6f6f6;
//   height: 100vh;
// }

interface Props {
  children: React.ReactNode;
}

export const NavFoot = ({ children }: Props) => {
  return (
    <>
      <NavBar />
      <div className="flex min-h-screen flex-col bg-[#f6f6f6]">
        {children} <Footer />
      </div>
    </>
  );
};

export default NavFoot;
