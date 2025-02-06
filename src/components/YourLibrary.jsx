'use client';

import React from "react";
import Library from "../../public/assets/Library";
import Plus from "../../public/assets/Plus";
import dynamic from "next/dynamic";
const LibraryList = dynamic(() => import("./LibraryList"));
import { createPlaylist } from "@/actions/actions";
import { usePlaylistContext } from "@/context/PlaylistContext";

const YourLibrary = () => {
  const { playlists, getData, loading } = usePlaylistContext();

  const addNewList = async () => {
    createPlaylist({
      title: `${playlists.length + 1}.My Playlist`
    }).then((res) => {
      getData();
    }).catch((err) => {
      console.error('addNewList', err);
    });
  }

  return (
    <div className="flex flex-col h-full px-4 pt-3 pb-2 overflow-auto rounded-lg bg-boxBackgroundColor gap-y-2"> 
      <div className="flex items-center justify-between ">
        <button className="flex items-center text-linkColor gap-x-5 hover:text-white">
          <Library />
          <div className="text-base font-bold">Your Library</div>
        </button>
        <button onClick={() => addNewList()} className="p-2 rounded-full text-linkColor hover:text-white hover:bg-white hover:bg-opacity-25">
          <Plus />
        </button>
      </div>
      <div className="mt-2">
          <LibraryList list={playlists} />
      </div>
    </div>
  );
};

export default YourLibrary;