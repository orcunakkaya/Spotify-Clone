"use client";
import { useState } from "react";
import Add from "../../public/assets/Add";
import Share from "../../public/assets/Share";
import MiniLogo from "../../public/assets/MiniLogo";
import Plus from "../../public/assets/Plus";
import ArrowRight from "../../public/assets/ArrowRight";
import { usePlaylistContext } from "@/context/PlaylistContext";
import { useAuthContext } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Dropdown = ({ music, setIsMainOpen, handleSelect }) => {
  const pathName = usePathname();

  const { playlists, getData } = usePlaylistContext();
  const { auth, user } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
 
  const addMusicToPlaylist = (playListId) => {
    fetch(`/api/spotify/tracks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${auth}`,
      },
      body: JSON.stringify({
        uri: music.uri,
        playlist_id: playListId,
      }),
    })
      .then(() => {
        getData(auth, user);
      })
      .catch((err) => {
        console.error("add new track to playlist", err);
      });
    setIsMainOpen(false);
  };

  const addMusicToLikedSongs = () => {};

  const deleteSong = () => {
    let playListId = pathName.split("/")[2];

    const playlist = playlists.find((pl) => pl.id === playListId);
    fetch(`/api/spotify/tracks`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${auth}`,
      },
      body: JSON.stringify({
        uri: music.uri,
        snapshot_id: playlist.snapshot_id,
        playlist_id: playlist.id,
      }),
    })
      .then(() => {
        getData(auth, user);
      })
      .catch((err) => {
        console.error("add new track to playlist", err);
      });
    setIsMainOpen(false);
  };

  return (
    <>
      <ul onClick={(e) => e.stopPropagation()} className="relative p-1 text-sm border-none rounded max-lg:overflow-x-auto min-w-56 text-subdued whitespace-nowrap bg-decorativeSubdued max-lg:rounded-none max-lg:w-full max-lg:h-full max-lg:bg-dropdownBg backdrop-blur">
        <li className="flex items-center pt-24 pb-3 pl-3 pr-2 lg:hidden gap-x-3">
          <Image
            src={music.image}
            alt={music.name}
            width={55}
            height={55}
            priority
          />
          <div>
            <div className="overflow-hidden text-base text-white whitespace-normal text-ellipsis line-clamp-1">
              {music.name}
            </div>
            <div className="overflow-hidden text-sm whitespace-normal text-ellipsis line-clamp-1">
              {music.artistName}
            </div>
          </div>
        </li>
        <li
          className="flex items-center justify-between w-full py-3 pl-3 pr-2 cursor-pointer hover:bg-hoverBackgroundColor max-lg:hidden"
          onMouseEnter={(event) => (
            setIsOpen((prev) => !prev), handleSelect(event)
          )}
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
          <ul className="absolute p-1 translate-y-1 border-none rounded min-w-56 top-8 right-px bg-decorativeSubdued -translate-x-60 max-lg:hidden">
            {playlists.map((pl, index) => (
              <li
                key={index}
                className="flex items-center w-full gap-2 py-3 pl-3 pr-2 overflow-hidden whitespace-normal cursor-pointer hover:bg-hoverBackgroundColor text-ellipsis line-clamp-1"
                onClick={(event) => (
                  addMusicToPlaylist(pl.id), handleSelect(event)
                )}
              >
                <span className="text-white">{pl.name}</span>
              </li>
            ))}
          </ul>
        )}
        <li className="py-3 pl-3 pr-2 lg:hidden">
          <div className="items-center hidden gap-2 max-lg:flex">
            <span className="text-base font-bold text-white">Add to playlist</span>
          </div>
            <ul>
              {playlists.map((pl, index) => (
                <li
                  key={index}
                  className="flex items-center w-full gap-2 py-3 pl-3 pr-2 overflow-hidden whitespace-normal cursor-pointer hover:bg-hoverBackgroundColor text-ellipsis line-clamp-1"
                  onClick={(event) => (
                    addMusicToPlaylist(pl.id), handleSelect(event)
                  )}
                >
                  <span className="text-white">{pl.name}</span>
                </li>
              ))}
            </ul>
        </li>
        {pathName.includes("collection") && (
          <li
            className="flex items-center w-full gap-2 py-3 pl-3 pr-2 cursor-pointer hover:bg-hoverBackgroundColor"
            onClick={(event) => (deleteSong(), handleSelect(event))}
          >
            <Image
              src="/assets/trash.svg"
              alt="delete"
              width={16}
              height={16}
            />
            <span className="text-white">Remove from this playlist</span>
          </li>
        )}
        <li
          className="flex items-center w-full gap-2 py-3 pl-3 pr-2 cursor-pointer hover:bg-hoverBackgroundColor"
          onClick={(event) => (addMusicToLikedSongs(), handleSelect(event))}
        >
          <Add />
          <span className="text-white">Save to your Liked Songs</span>
        </li>
        <li
          className="flex items-center w-full gap-2 py-3 pl-3 pr-2 cursor-pointer hover:bg-hoverBackgroundColor"
          onClick={(event) => (setIsMainOpen(false), handleSelect(event))}
        >
          <Share />
          <span className="text-white">Share</span>
        </li>
        <li
          className="flex items-center w-full gap-2 py-3 pl-3 pr-2 cursor-pointer hover:bg-hoverBackgroundColor"
          onClick={(event) => (setIsMainOpen(false), handleSelect(event))}
        >
          <MiniLogo />
          <span className="text-white">Open in Desktop app</span>{" "}
        </li>
      </ul>
      <button onClick={(e) => (setIsMainOpen((prev) => !prev), e.stopPropagation())} className="absolute text-base font-bold top-8 right-8 lg:hidden">Close</button>
    </>
  );
};

export default Dropdown;