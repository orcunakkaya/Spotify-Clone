import Image from "next/image";
import Link from "next/link";
import Home from "../../public/assets/Home";
import Search from "../../public/assets/Search";

const SideBar = () => {
  return (
    <div className="bg-boxBackgroundColor rounded-lg py-6 px-3 grid gap-y-2">
      <Link href="/" className="flex items-center">
        <Image
          src="/assets/spotify.svg"
          alt="Spotify Logo"
          width={120}
          height={40}
          priority
        />
      </Link>

      <Link href="/" className="text-linkColor flex items-center gap-x-5 mt-3 hover:text-white">
        {/* <Image
          src="/assets/home.svg"
          alt="Home Logo"
          width={24}
          height={24}
          priority
        /> */}
        <Home />
        <div className="font-bold text-base">Ana Sayfa</div>
      </Link>
      <Link href="/" className="text-linkColor flex items-center gap-x-5 hover:text-white">
        <Search />
        <div className="font-bold text-base">Ara</div>
      </Link>
    </div>
  );
};
export default SideBar;
