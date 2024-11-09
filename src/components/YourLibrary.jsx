'use client';

import React from "react";
import Library from "../../public/assets/Library";
import Plus from "../../public/assets/Plus";
import dynamic from "next/dynamic";
import prisma from "@/lib/db";
const LibraryList = dynamic(() => import("./LibraryList"));
import { createPlaylist } from "@/actions/actions";

const YourLibrary = () => {

  const addNewList = async () => {

    createPlaylist(
      {
        title: 'New Playlist',
        songs: []
      }
    ).then((res) => {
      console.log('addNewList', res);
    }).catch((err) => {
      console.error('addNewList', err);
    });
  }

  return (
    <div className="bg-boxBackgroundColor rounded-lg px-4 pt-3 pb-2 flex flex-col gap-y-2 h-full overflow-auto"> 
      <div className="flex justify-between items-center ">
        <button className="text-linkColor flex items-center gap-x-5 hover:text-white">
          <Library />
          <div className="font-bold text-base">Kitaplığın</div>
        </button>
        <button onClick={() => addNewList()} className="text-linkColor hover:text-white hover:bg-white hover:bg-opacity-25 p-2 rounded-full">
          <Plus />
        </button>
      </div>
      <div className="mt-2">
          <LibraryList />
      </div>
    </div>
  );
};

export default YourLibrary;