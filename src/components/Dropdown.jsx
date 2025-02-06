"use client";
import { useState, useEffect } from "react";
import Add from "../../public/assets/Add";
import Share from "../../public/assets/Share";
import MiniLogo from "../../public/assets/MiniLogo";
import Plus from "../../public/assets/Plus";
import ArrowRight from "../../public/assets/ArrowRight";
import {
  getAllPlaylists,
  addSongToPlaylist,
  removeSongFromPlaylist,
  addToSongToLikedSongs,
} from "@/actions/actions";
import { usePlaylistContext } from "@/context/PlaylistContext";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Dropdown = ({ music, setIsMainOpen }) => {
  const pathName = usePathname();

  const { setPlaylists } = usePlaylistContext();
  const [isOpen, setIsOpen] = useState(false);
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getAllPlaylists()
      .then((res) => {
        setPlaylist(res);
      })
      .catch((err) => {
        console.error("YourLibrary", err);
      });
  };
  const addMusicToPlaylist = (playListId) => {
    addSongToPlaylist({
      id: playListId,
      song: music,
    }).then((res) => {
      setPlaylists((prev) => prev.map((i) => (i.id === playListId ? res : i)));
    });
    setIsMainOpen(false);
  };

  const addMusicToLikedSongs = () => {
    addToSongToLikedSongs({
      song: music,
    }).then((res) => {
      setPlaylists((prev) => prev.map((i) => (i.id === res.id ? res : i)));
    });
    setIsMainOpen(false);
  };

  const deleteSong = () => {
    let playListId = pathName.split("/")[2];
    removeSongFromPlaylist({
      id: playListId,
      songId: music.id,
    }).then((res) => {
      setPlaylists((prev) => prev.map((i) => (i.id === playListId ? res : i)));
    });
    setIsMainOpen(false);
  };

  return (
    <ul className="relative p-1 text-sm border-none rounded min-w-56 text-subdued whitespace-nowrap bg-decorativeSubdued">
      <li
        className="flex items-center justify-between w-full py-3 pl-3 pr-2 cursor-pointer hover:bg-hoverBackgroundColor"
        onMouseEnter={() => setIsOpen((prev) => !prev)}
      >
        <div className="flex items-center gap-2">
          <Plus />
          <span className="text-white">Add to playlist</span>
        </div>
        <span className="rotate-[90deg]">
          <ArrowRight />
        </span>
      </li>
      {isOpen && (
        <ul className="absolute p-1 translate-y-1 border-none rounded min-w-56 top-8 right-px bg-decorativeSubdued -translate-x-60">
          {playlist.map((pl, index) => (
            <li
              key={index}
              className="flex items-center w-full gap-2 py-3 pl-3 pr-2 overflow-hidden whitespace-normal cursor-pointer hover:bg-hoverBackgroundColor text-ellipsis line-clamp-1"
              onClick={() => addMusicToPlaylist(pl.id)}
            >
              <span className="text-white">{pl.title}</span>
            </li>
          ))}
        </ul>
      )}
      {pathName.includes("collection") && (
        <li
          className="flex items-center w-full gap-2 py-3 pl-3 pr-2 cursor-pointer hover:bg-hoverBackgroundColor"
          onClick={() => deleteSong()}
        >
          <Image src="/assets/trash.svg" alt="delete" width={16} height={16} />
          <span className="text-white">Remove from this playlist</span>
        </li>
      )}
      <li
        className="flex items-center w-full gap-2 py-3 pl-3 pr-2 cursor-pointer hover:bg-hoverBackgroundColor"
        onClick={() => addMusicToLikedSongs()}
      >
        <Add />
        <span className="text-white">Save to your Liked Songs</span>
      </li>
      <li
        className="flex items-center w-full gap-2 py-3 pl-3 pr-2 cursor-pointer hover:bg-hoverBackgroundColor"
        onClick={() => setIsMainOpen(false)}
      >
        <Share />
        <span className="text-white">Share</span>
      </li>
      <li
        className="flex items-center w-full gap-2 py-3 pl-3 pr-2 cursor-pointer hover:bg-hoverBackgroundColor"
        onClick={() => setIsMainOpen(false)}
      >
        <MiniLogo />
        <span className="text-white">Open in Desktop app</span>{" "}
      </li>
    </ul>
  );
};

export default Dropdown;
