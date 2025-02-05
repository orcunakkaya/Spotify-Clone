import React from "react";
import Link from "next/link";
import Image from "next/image";
import Home from "../../public/assets/Home";
import News from "../../public/assets/News";
import Spotify from "../../public/assets/Spotify";
import MobileSpotifyLogo from "../../public/assets/MobileSpotifyLogo";
import Library from "../../public/assets/Library";
import Search from "../../public/assets/Search";

import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <>
     <nav className="flex items-center justify-between w-[100%] max-lg:fixed max-lg:bottom-0 max-lg:px-4 h-[72px] max-lg:h-[66px] max-lg:flex-row-reverse">
      <Link href="/" className="flex items-center ml-4">
      <span className="max-lg:hidden"><Spotify /></span>
        <span className="hidden max-lg:block"><MobileSpotifyLogo /></span>
      </Link>

      

      <Link href="/your-library" className="flex-col items-center hidden text-xs max-lg:flex text-linkColor gap-y-1 hover:text-white"><span><Library /></span><span>Kitapligin</span></Link>
      <Link href="/search" className="flex-col items-center hidden text-xs max-lg:flex text-linkColor gap-y-1 hover:text-white"><span><Search /></span><span>Ara</span></Link>

      <div className="grid grid-cols-navbar-layout items-center max-lg:w-[min-content] w-[32rem] justify-stretch">
        <Link
          href="/"
          className="flex items-center h-12 p-3 text-linkColor gap-x-5 hover:text-white bg-boxBackgroundColor rounded-3xl max-lg:p-0 max-lg:bg-transparent max-lg:flex-col max-lg:items-center max-lg:gap-x-0 max-lg:gap-y-1"
        >
          <span className="w-[24px] h-[24px]"><Home /></span>
          
          <div className="hidden text-xs font-normal max-lg:block whitespace-nowrap">Ana Sayfa</div>  
        </Link>

        <span className="max-lg:hidden"><SearchBar /></span>
      </div>

      

      <div className="flex gap-2 flex-nowrap max-lg:hidden">
        <div className="grid cursor-pointer text-subdued place-items-center"><News /></div>
        <div className="grid h-12 cursor-pointer bg-boxBackgroundColor rounded-3xl min-w-12 place-items-center">
          <div className="h-8 font-extrabold leading-8 text-center align-middle bg-blue rounded-3xl min-w-8">
              O
          </div>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;