'use client';

import React from "react";
import Library from "../../public/assets/Library";
import Plus from "../../public/assets/Plus";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
const LibraryList = dynamic(() => import("./LibraryList"));

import { usePlaylistContext } from "@/context/PlaylistContext";
import { useAuthContext } from "@/context/AuthContext";
const YourLibrary = () => {
  const router = useRouter();
  const { playlists, getData } = usePlaylistContext();
  const { auth, user } = useAuthContext();

  const addNewList = async () => {
    if (!user || !auth) return;
    fetch(`/api/spotify/my-playlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${auth}`,
      },
      body: JSON.stringify({
        user_id: user.id,
      }),
    })
      .then((res) => {
        getData(auth, user);
      })
      .catch((err) => {
        console.error("addNewList", err);
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