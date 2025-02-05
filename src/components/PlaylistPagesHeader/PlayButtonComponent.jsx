"use client";

import React from 'react'
import Play from '../../../public/assets/Play.jsx';
import { usePlayerContext } from "@/context/PlayerContext";
import { useAuthContext } from "@/context/AuthContext";

const PlayButtonComponent = ({ uris }) => {

  const { playSong, setAllTracks } = usePlayerContext();
  const { deviceId, auth } = useAuthContext();

  const handleSongClick = (uris) => {
    playSong(uris, auth, deviceId);
    setAllTracks(uris);
  };

  return (
    <button onClick={() => handleSongClick(uris)} className='w-[56px] h-[56px] rounded-full text-black bg-green grid place-items-center hover:scale-110'>
        <Play width='24' height='24' />
    </button>
  )
}

export default PlayButtonComponent