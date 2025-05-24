"use client";

import React, { useState, createContext, useContext } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

const PlayerContext = createContext();

export const usePlayerContext = () => {
  return useContext(PlayerContext);
};

export const PlayerProvider = ({ children }) => {
  const router = useRouter();
  const [player, setPlayer] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null); // O an çalan şarkı
  const [isPlaying, setIsPlaying] = useState(false); // Çalma durumu
  const [allTracks, setAllTracks] = useState([]); // Tüm şarkılar

  const playSong = async (trackUri, access_token, deviceId) => {
    if (!deviceId || !trackUri || !access_token) return;

    await fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uris: trackUri }),
      }
    ).then(res => {
    if(res.status === 401){
      Cookies.remove('spotify_api_token', { path: '/' });
      Cookies.remove('spotify_access_token', { path: '/' });
      Cookies.remove('spotify_user', { path: '/' });
      router.push("/login");
    }
    })
    setIsPlaying(true);
  };

  return (
    <PlayerContext.Provider
      value={{
        player,
        setPlayer,
        currentTrack,
        setCurrentTrack,
        isPlaying,
        setIsPlaying,
        playSong,
        setAllTracks,
        allTracks,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContext;
