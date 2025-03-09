import MusicCard from "@/components/MusicCard";
import Time from "../../../../public/assets/Time";
import PlaylistPagesHeader from "@/components/PlaylistPagesHeader/PlaylistPagesHeader";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

export const revalidate = 0;

const Home = async ({ params }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("spotify_api_token")?.value;

  let playList = {};

  try {
    const playListResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify/get-playlist/${params.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
        cache: "no-store",
      }
    );

    if(!playListResponse.ok) {
        if(playListResponse.status === 401) {
            throw new Error(`Authorization Error`);
        }
        throw new Error(playListResponse.error);
    }

    playList = await playListResponse.json();
    
  } catch (error) {
    if(error.message === "Authorization Error") {
        return redirect("/login");
    }else{
        notFound();
    }
  }

  return (
    <div className="text-white">
      <PlaylistPagesHeader
        playlist={{
          title: playList?.name ?? "",
          playListImage: playList?.images ? playList?.images[0].url : null,
          playListCount: playList?.tracks?.items?.length ?? 0,
          hiddenOptions: false,
          uris: playList?.tracks?.items?.map((music) => music.track.uri),
          id: playList?.id ?? "",
        }}
        name={playList?.owner?.display_name ?? ""}
      />
      <div className="grid items-center h-8 px-4 mb-4 border border-transparent text-subdued gap-x-4 grid-cols-custom-layout max-2xl:grid-cols-custom-layout-md max-xl:grid-cols-custom-layout-sm border-b-hoverBackgroundColor">
        <span>#</span>
        <div className="text-sm">Title</div>
        <div></div>
        <div className="text-sm max-xl:hidden">Album</div>
        <div className="text-sm max-2xl:hidden">Date added</div>
        <div className="relative flex items-center">
          <div className="absolute left-2">
            <Time />
          </div>
        </div>
      </div>
      {playList?.tracks?.items?.map((music, index) => (
        <MusicCard
          key={index}
          music={{
            image: music?.track?.album?.images[0]?.url
              ? music?.track?.album?.images[0]?.url
              : null,
            name: music?.track?.name,
            artistName: music?.track?.artists
              .map((artist) => artist.name)
              .join(", "),
            albumName: music?.track?.album?.name,
            duration_ms: music?.track?.duration_ms,
            release_date: music?.track?.album?.release_date,
            uri: music?.track?.uri,
            id: music?.track?.id,
          }}
          order={index}
        />
      ))}
    </div>
  );
};

export default Home;
