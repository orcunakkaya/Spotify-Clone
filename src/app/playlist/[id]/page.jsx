import React from "react";
import MusicCard from "@/components/MusicCard";
import Time from "../../../../public/assets/Time";
import PlaylistPagesHeader from "@/components/PlaylistPagesHeader/PlaylistPagesHeader";
import { notFound, redirect } from "next/navigation";

export const revalidate = 0;

const Home = async ({ params }) => {

  let playList = {};
  let playListFiltered = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/get-token`, { method: 'POST' });
    const data = await res.json();
    const token = data.access_token;

    const playListResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify/get-playlist/${params.id}`, {
      method: 'GET',
      headers: {
        Authorization: `${token}`,
      },
      cache: "no-store",
    });

    if(!res.ok || !playListResponse.ok) {
      if(res.status === 401 || playListResponse.status === 401) {
        throw new Error(`Authorization Error`);
      }
      throw new Error(res.error || playListResponse.error);
    }

    playList = await playListResponse.json();
    playListFiltered = playList.tracks.items.filter((item) => item.track !== null);
  
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
          playListImage: playList?.images[0]?.url ?? "",
          playListCount: playListFiltered.length ?? 0,
          hiddenOptions: true,
          uris: playListFiltered.map((music) => music.track.uri),
          defaultList: playList?.defaultList ?? false,
        }}
        type={"playlist"}
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
      {playListFiltered.map((music, index) => (
        <MusicCard
          key={index}
          music={{
            image: music?.track?.album?.images[0]?.url ?? "",
            name: music?.track?.name,
            artistName: music?.track?.album?.artists
              .map((artist) => artist.name)
              .join(", "),
            albumName: music?.track?.album?.name,
            duration_ms: music?.track?.duration_ms,
            release_date: music?.track?.album?.release_date,
            uri: music?.track?.uri,
          }}
          order={index}
        />
      ))}
    </div>
  );
};

export default Home;
