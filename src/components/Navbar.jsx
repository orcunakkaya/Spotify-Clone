import React from "react";
import Link from "next/link";
import Image from "next/image";
import Home from "../../public/assets/Home";
import Search from '../../public/assets/Search';
import News from "../../public/assets/News";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between w-full">
      <Link href="/" className="flex items-center ml-4">
        <Image
          src="/assets/spotify.svg"
          alt="Spotify Logo"
          width={120}
          height={40}
          priority
        />
      </Link>

      <div className="grid grid-cols-navbar-layout items-center max-lg:w-[24rem] w-[32rem] justify-stretch">
        <Link
          href="/"
          className="text-linkColor flex items-center gap-x-5 hover:text-white h-12 bg-boxBackgroundColor rounded-3xl p-3"
        >
          <Home />
        </Link>

        <div className="relative rounded-3xl shadow-sm bg-boxBackgroundColor h-12 w-max">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-linkColor sm:text-sm hover:text-white"><Search /></span>
          </div>
          <input
            type="text"
            name="price"
            id="price"
            className="block bg-boxBackgroundColor w-full rounded-3xl border-0 py-1.5 h-12 pl-9 pr-4 text-linkColor placeholder:linkColor sm:text-sm sm:leading-6 indent-3"
            placeholder="Ne çalmak istiyorsun?"
          />
        </div>
      </div>

    <div className="flex flex-nowrap gap-2">
      <div className="text-subdued grid place-items-center"><News /></div>
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
