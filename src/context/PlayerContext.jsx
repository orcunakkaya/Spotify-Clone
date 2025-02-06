"use client";

import React, { useState, createContext, useContext } from "react";

const PlayerContext = createContext();

export const usePlayerContext = () => {
  return useContext(PlayerContext);
};

export const PlayerProvider = ({ children }) => {
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
    ).then(res => console.log(res));
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
