import Image from "next/image";
import Link from "next/link";
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

      <Link href="/" className="text-linkColor flex items-center gap-x-5 mt-3 hover:text-white hover:fill-white hover:stroke-white">
        <Image
          src="/assets/home.svg"
          alt="Home Logo"
          width={24}
          height={24}
          priority
          className="hover:stroke-white"
        />
        <div className="font-bold text-base">Ana Sayfa</div>
      </Link>
      <Link href="/" className="text-linkColor flex items-center gap-x-5">
        <Image
          src="/assets/search.svg"
          alt="Search Logo"
          width={24}
          height={24}
          priority
          className="logo-hover-color"
        />
        <div className="font-bold text-base">Ara</div>
      </Link>
    </div>
  );
};

export default SideBar;
