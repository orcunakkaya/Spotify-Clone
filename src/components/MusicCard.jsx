"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Dots from "../../public/assets/Dots";
import msToMinutesAndSeconds from "@/utils/time";
import dynamic from "next/dynamic";
import Play from "../../public/assets/Play.jsx";

const Dropdown = dynamic(() => import("./Dropdown"), { ssr: false });

import { usePlayerContext } from "@/context/PlayerContext";
import { useAuthContext } from "@/context/AuthContext";

const MusicCard = ({ music, order }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { playSong, setAllTracks } = usePlayerContext();
  const { deviceId, auth } = useAuthContext();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option) => {
    setIsOpen(false);
  };

  const handleSongClick = (trackUri) => {
    playSong([trackUri], auth, deviceId);
    setAllTracks([]);
  };

  return (
    <>
      <div className={`group text-subdued hover:text-white grid grid-cols-custom-layout px-4 gap-x-4 border border-transparent h-14 items-center max-2xl:grid-cols-custom-layout-md max-xl:grid-cols-custom-layout-sm ${!isOpen && 'hover:bg-hoverBackgroundColor'} rounded ${isOpen && 'bg-tinted text-white'}`}>
        <span className="text-base group-hover:hidden">{order + 1}</span>
        <span className="hidden text-white group-hover:block">{
          <button onClick={() => handleSongClick(music.uri)}><Play /></button>
    
      }</span>
        <Image
          src={music.image}
          alt={music.name}
          width={40}
          height={40}
          className=""
        />
        <div>
          <div className="overflow-hidden text-base text-white whitespace-normal text-ellipsis line-clamp-1">
            {music.name}
          </div>
          <div className="overflow-hidden text-sm whitespace-normal text-ellipsis line-clamp-1">
            {music.artistName}
          </div>
        </div>
        <div className="overflow-hidden text-sm whitespace-normal max-xl:hidden text-ellipsis line-clamp-1">
          {music.albumName}
        </div>
        <div className="text-sm max-2xl:hidden text-subdued">
          {music.release_date}
        </div>
        <div className="relative flex justify-between flex-nowrap gap-x-2">
          <div className="text-sm whitespace-normal text-ellipsis line-clamp-1 text-subdued">
            {msToMinutesAndSeconds(music.duration_ms)}
          </div>
          <button
            type="button"
            className="flex items-center justify-center text-white"
            id="menu-button"
            onClick={toggleDropdown}
            aria-expanded={isOpen}
            aria-haspopup="true"
            
          >
            <Dots />
          </button>
          {isOpen && (
          <div className="absolute right-0 z-10 mt-8 bg-transparent border border-none rounded shadow-md" ref={dropdownRef}>
            <Dropdown onSelect={handleSelect} music={music} setIsMainOpen={setIsOpen} />
          </div>
        )}
        </div>
      </div>
    </>
  );
};

export default MusicCard;