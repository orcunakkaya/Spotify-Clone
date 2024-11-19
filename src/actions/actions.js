'use server';

import prisma from "@/lib/db";
import { revalidatePath } from 'next/cache';

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
        const updatedPlaylist = await prisma.playlist.update({
        where: {
            id: id,
        },
        data: {
            songs: {
            push: song,
            },
        },
        });
        revalidatePath(`/collection/${id}`);
        return updatedPlaylist;
    } catch (error) {
        return error;
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
