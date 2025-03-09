import React from "react";
import PlaylistPagesHeader from "@/components/PlaylistPagesHeader/PlaylistPagesHeader";
import Time from "../../../../public/assets/Time";
import MusicCard from "@/components/MusicCard";
import { redirect, notFound } from "next/navigation";


const Home = async ({ params }) => {
  let album = {};

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/get-token`,
      {
        method: "POST",
        next: { revalidate: 1800 },
      }
    );
    const data = await res.json();
    const token = data.access_token;

    const albumResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify/albums/${params.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    if(!res.ok || !albumResponse.ok) {
      if(res.status === 401 || albumResponse.status === 401) {
        throw new Error(`Authorization Error`);
      }
      throw new Error(playListResponse.error);
    }

    album = await albumResponse.json();
    
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
          title: album?.name ?? "",
          playListImage: album?.images[0]?.url ?? "",
          playListCount: album?.tracks?.items?.length ?? 0,
          hiddenOptions: true,
          uris: album?.tracks?.items?.map((music) => music.uri),
          defaultList: album?.defaultList ?? false,
        }}
        type={"Album"}
        name={album?.name}
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

      {album?.tracks?.items?.map((music, index) => (
        <MusicCard
          key={index}
          music={{
            image: album?.images[0]?.url ?? "",
            name: music?.name,
            artistName: music?.artists.map((artist) => artist.name).join(", "),
            albumName: album?.name,
            duration_ms: music?.duration_ms,
            release_date: album?.release_date,
            uri: music.uri,
            id: music?.id,
          }}
          order={index}
        />
      ))}
    </div>
  );
};

export default Home;
