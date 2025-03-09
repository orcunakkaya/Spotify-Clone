"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
const PlaylistContext = createContext();

export const usePlaylistContext = () => {
  return useContext(PlaylistContext);
};

export const PlaylistProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, auth } = useAuthContext();

  useEffect(() => {
    if(!auth || !user) return;
    getData(auth, user);
  }, [auth, user]);

  const getData = (api_token, user) => {
    try {
      setLoading(true);
      fetch(`/api/spotify/my-playlist`, {
        method: "GET",
        headers: {
          Authorization: `${api_token}`,
          spotify_user: `${JSON.stringify(user)}`,
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.items.length > 0) {
            setPlaylists(data.items);
          } else {
            setPlaylists([]);
          }
          setLoading(false);
        });
    } catch (error) {
        setLoading(false);
    }
    
  };

  return (
    <PlaylistContext.Provider
      value={{ playlists, setPlaylists, getData, loading }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export default PlaylistContext;
