"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import { getAllPlaylists } from "@/actions/actions";

const PlaylistContext = createContext();

export const usePlaylistContext = () => {
  return useContext(PlaylistContext);
};

export const PlaylistProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    getAllPlaylists()
      .then((res) => {
        setPlaylists(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Context getData: ", err);
      });
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
