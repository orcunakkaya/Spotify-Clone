"use client"

import React, { useState, useEffect, createContext, useContext } from 'react';
import { getAllPlaylists } from '@/actions/actions';

const PlaylistContext = createContext();

export const usePlaylistContext = () => {
    return useContext(PlaylistContext);
    }

export const PlaylistProvider = ({ children }) => {
    const [playlists, setPlaylists] = useState([]);
    const [playingSong, setPlayingSong] = useState('test');

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        getAllPlaylists().then((res) => {
            setPlaylists(res);
        }).catch((err) => {
            console.error('Context getData: ', err);
        });
    }

    return (
        <PlaylistContext.Provider value={{ playlists, setPlaylists, getData, playingSong }}>
            {children}
        </PlaylistContext.Provider>
    )
}

export default PlaylistContext;