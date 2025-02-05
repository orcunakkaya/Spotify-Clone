import React from "react";
import MusicCard from "@/components/MusicCard";
import Time from "../../../../public/assets/Time";
import PlaylistPagesHeader from "@/components/PlaylistPagesHeader/PlaylistPagesHeader";
const Home = async ({ params }) => {

  const res = await fetch("http://localhost:3000/api/auth/get-token", { method: 'POST' });
  const data = await res.json();
  const token = data.access_token;

  const playListResponse = await fetch(`http://localhost:3000/api/spotify/playlist/${params.id}`, {
    method: 'GET',
    headers: {
      Authorization: `${token}`,
    },
  });
  
  const playList = await playListResponse.json();
  const playListFiltered = playList.tracks.items.filter((item) => item.track !== null);

  return (
    <div className="text-white">
      <PlaylistPagesHeader
        playlist={{
          title: playList?.name ?? "",
          playListImage: playList?.images[0]?.url ?? "",
          playListCount: playListFiltered.length ?? 0,
          hiddenOptions: true,
          uris: playListFiltered.map((music) => music.track.uri),
        }}
        type={"playlist"}
        name={playList?.owner?.display_name ?? ""}
      />
      <div className="grid items-center h-8 px-4 mb-4 border border-transparent text-subdued gap-x-4 grid-cols-custom-layout max-2xl:grid-cols-custom-layout-md max-xl:grid-cols-custom-layout-sm border-b-hoverBackgroundColor">
        <span>#</span>
        <div className="text-sm">Başlık</div>
        <div></div>
        <div className="text-sm max-xl:hidden">Albüm</div>
        <div className="text-sm max-2xl:hidden">Eklenme Tarihi</div>
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
