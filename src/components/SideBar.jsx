import Image from "next/image";
import Link from "next/link";
const SideBar = () => {
  
  return (
    <div className="bg-boxBackgroundColor">
      <Link href='/'>
      <Image
          src="/assets/spotify.svg"
          alt="Spotify Logo"
          width={180}
          height={37}
          priority
        />
      </Link>
      
      <Link href='/'>
        <Image
            src="/assets/home.svg"
            alt="Home Logo"
            width={180}
            height={37}
            priority
          />
          <div>Ana Sayfa</div>
      </Link>
        <Image
          src="/assets/search.svg"
          alt="Search Logo"
          width={180}
          height={37}
          priority
        />
    </div>
  )
}

export default SideBar