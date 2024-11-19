"use client"

import React, { useState, useEffect, createContext, useContext } from 'react';
import { createPlaylist, getAllPlaylists } from '@/actions/actions';

const PlaylistContext = createContext();

export const usePlaylist = () => {
    return useContext(PlaylistContext);
    }

export const PlaylistProvider = ({ children }) => {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const addNewList = async () => {
        createPlaylist({
            title: `${playlists.length + 1}.My Playlist`
        }).then((res) => {
            getData();
        }).catch((err) => {
            console.error('addNewList', err);
        });
    }

    const getData = () => {
        getAllPlaylists().then((res) => {
            setPlaylists(res);
        }).catch((err) => {
            console.error('Context getData: ', err);
        });
    }

    return (
        <PlaylistContext.Provider value={{ playlists, addNewList }}>
            {children}
        </PlaylistContext.Provider>
    )
}

export default PlaylistContext;