'use server';

import prisma from "@/lib/db";
import { revalidatePath } from 'next/cache';
import { nanoid } from 'nanoid';

export const createPlaylist = async (req, res) => {
  try {
    const newPlaylist = await prisma.playlist.create({
      data: {
        title: req.title,
        songs: JSON.parse("[]"),
      },
    });
    return newPlaylist;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await prisma.playlist.findMany();
    return playlists;
  } catch (error) {
    return error;
  }
}

export const getPlaylist = async (req, res) => {
  const { id } = req;
  try {
    const playlist = await prisma.playlist.findUnique({
      where: {
        id: id,
      },
    });
    return playlist;
  } catch (error) {
    return error;
  }
}

export const editPlaylist = async (req, res) => {
  const { id, title, playListImage } = req;
  try {
    const updatedPlaylist = await prisma.playlist.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        playListImage: playListImage
      },
    });
    revalidatePath(`/collection/${id}`);
    return updatedPlaylist;
  } catch (error) {
    return error;
  }
}

export const addSongToPlaylist = async (req, res) => {
    const { id, song } = req;
    try {
        const uniqueId = nanoid();
        const updatedPlaylist = await prisma.playlist.update({
        where: {
            id: id,
        },
        data: {
            songs: {
              push: {...song, id: uniqueId},
            },
        },
        });
        revalidatePath(`/collection/${id}`);
        return updatedPlaylist;
    } catch (error) {
        return error;
    }
    };

    export const removeSongFromPlaylist = async (req, res) => {
      const { id, songId } = req;
      try {
          // Önce playlisti getir
          const playlist = await prisma.playlist.findUnique({
              where: { id },
              select: { songs: true }, // Sadece `songs` dizisini al
          });
  
          if (!playlist) {
              return res.status(404).json({ error: "Playlist not found" });
          }
  
          // Şarkıyı listeden çıkar
          const updatedSongs = playlist.songs.filter(song => song.id !== songId);
  
          // Yeni şarkı listesini kaydet
          const updatedPlaylist = await prisma.playlist.update({
              where: { id },
              data: { songs: updatedSongs },
          });
  
          revalidatePath(`/collection/${id}`);
          return JSON.parse(JSON.stringify(updatedPlaylist)); // JSON'a çevirerek dön
      } catch (error) {
          return res.status(500).json({ error: error.message });
      }
  };

export const deletePlaylist = async (req, res) => {
    const { id } = req;
    try {
        await prisma.playlist.delete({
        where: {
            id: id,
        },
        });
        return true;
    } catch (error) {
        return error;
    }
    };
