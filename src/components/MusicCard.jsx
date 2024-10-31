import React from "react";
import Image from "next/image";
import Dots from "../../public/assets/Dots";

const MusicCard = ({ music, order }) => {
  return (
    <div className="text-subdued grid grid-cols-custom-layout px-4 gap-x-4 border border-transparent h-14 items-center max-2xl:grid-cols-custom-layout-md ">
      <span className="text-base ">{order}</span>
      <Image
        src={music.track.album.images[0].url}
        alt={music.track.album.name}
        width={40}
        height={40}
        className=""
      />
      <div className="">
        <div className="text-white text-base overflow-hidden text-ellipsis whitespace-normal line-clamp-1">{music.track.name}</div>
        <div className="text-subdued hover:text-white text-sm overflow-hidden text-ellipsis whitespace-normal line-clamp-1">
          {music.track.album.artists.map((artist) => artist.name).join(", ")}
        </div>
      </div>
      <div className="text-sm overflow-hidden text-ellipsis whitespace-normal line-clamp-1">{music.track.album.name}</div>
      <div className="text-sm max-2xl:hidden">{music.track.album.release_date}</div>
      <div className="flex flex-nowrap gap-x-4 justify-between">
        <div className="text-sm text-ellipsis whitespace-normal line-clamp-1">
          {music.track.duration_ms}
        </div>
        <button className="flex justify-center items-center"><Dots /></button>
      </div>
    </div>
  );
};

export default MusicCard;

// grid-template-columns: 
// 16px minmax(120px, var(--col1, 6fr)) minmax(120px, var(--col2, 4fr)) minmax(120px, var(--col3, 3fr)) minmax(120px, var(--col4, 1fr))

// grid-template-columns: 
// [index] var(--tracklist-index-column-width, 16px) [first] minmax(120px, var(--col1, 4fr)) [var1] minmax(120px, var(--col2, 2fr)) [last] minmax(120px, var(--col3, 1fr));