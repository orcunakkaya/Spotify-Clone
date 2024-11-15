'use server';

import prisma from "@/lib/db";

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

export const editPlaylist = async (req, res) => {
  const { id, title } = req.body;
  try {
    const updatedPlaylist = await prisma.playlist.update({
      where: {
        id: id,
      },
      data: {
        title: title,
      },
    });
    res.status(200).json(updatedPlaylist);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

export const addSongToPlaylist = async (req, res) => {
    const { id, song } = req.body;
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
        res.status(200).json(updatedPlaylist);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
    };

export const deletePlaylist = async (req, res) => {
    const { id } = req.body;
    try {
        await prisma.playlist.delete({
        where: {
            id: id,
        },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
    };
