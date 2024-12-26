import React from "react";
import Link from "next/link";
import Image from "next/image";
import Home from "../../public/assets/Home";
// import Search from '../../public/assets/Search';
import News from "../../public/assets/News";
import Spotify from "../../public/assets/Spotify";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between w-full">
      <Link href="/" className="flex items-center ml-4">
        <Spotify />
      </Link>

      <div className="grid grid-cols-navbar-layout items-center max-lg:w-[24rem] w-[32rem] justify-stretch">
        <Link
          href="/"
          className="text-linkColor flex items-center gap-x-5 hover:text-white h-12 bg-boxBackgroundColor rounded-3xl p-3"
        >
          <Home />
        </Link>

        <SearchBar />
      </div>

    <div className="flex flex-nowrap gap-2">
      <div className="text-subdued grid place-items-center cursor-pointer"><News /></div>
      <div className="bg-boxBackgroundColor rounded-3xl min-w-12 h-12 grid place-items-center cursor-pointer">
        <div className="bg-blue h-8 leading-8 font-extrabold rounded-3xl text-center align-middle min-w-8">
            O
        </div>
      </div>
    </div>
    </nav>
  );
};

export default Navbar;
