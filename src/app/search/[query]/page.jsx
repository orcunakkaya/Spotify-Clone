import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import BackArrow from "../../../../public/assets/BackArrow";
import Image from "next/image";
const Home = async ({ params }) => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/get-token`, {
    method: "POST",
    next: { revalidate: 1800 },
  }); 
  const data = await res.json();
  const token = data.access_token;

  const queryResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify/search?query=${params.query}&type=playlist`,
    {
      method: 'GET',
      headers: {
        Authorization: `${token}`,
      },
    }
  );
  const query = await queryResponse.json();
  const queryFiltered = query.playlists.items.filter(i => i !== null);

  if(!res.ok || !queryResponse.ok) {
    throw new Error(`Hata: ${res.status} - ${res.statusText}`);
  }

  return (
    <div className="p-2 text-white">
      <div className="grid grid-flow-col grid-cols-[auto_1fr] mb-4">
          <Link href={"/search"} className="self-center p-3 text-white"><BackArrow /></Link>
           <SearchBar />
           </div>
        {
          queryFiltered.map((playlist) => (
            <Link href={`/playlist/${playlist.id}`} key={playlist.id} className="grid grid-flow-col grid-cols-[48px_1fr] gap-2 h-16">
                <Image
                    src={playlist.images[0].url}
                    alt={playlist.name}
                    width={48}
                    height={48}
                    className="self-center"
                  />
                  <div className="grid self-center text-start">
                    <div className="whitespace-normal text-ellipsis line-clamp-1">{playlist.name}</div>
                    <div className="text-xs whitespace-normal text-subdued text-ellipsis line-clamp-1">{playlist.owner.display_name}</div>
                  </div>
            </Link>
          ))
        }
    </div>
  )
}

export default Home