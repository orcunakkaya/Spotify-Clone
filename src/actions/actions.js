'use server';

import prisma from "@/lib/db";

export const addPlaylist = async (req, res) => {
  const { title } = req.body;
  try {
    const newPlaylist = await prisma.playlist.create({
      data: {
        title: 'New Playlist',
        songs: []
      },
    });
    res.status(201).json(newPlaylist);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}