'use client';
import { useState, useEffect, useRef } from "react";
import Add from "../../public/assets/Add";
import Share from "../../public/assets/Share";
import MiniLogo from "../../public/assets/MiniLogo";
import Plus from "../../public/assets/Plus";
import ArrowRight from "../../public/assets/ArrowRight";
import { getAllPlaylists } from "@/actions/actions";

const Dropdown = ({ onSelect, music }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    getAllPlaylists().then((res) => {
      setPlaylists(res);
    }).catch((err) => {
      console.error('YourLibrary', err);
    });
  }

  const adMusicToPlaylist = (playlist) => {
    console.log(music)
  }
    
  // console.log(playlists);

  return (
    <ul className="relative min-w-56 p-1 text-subdued whitespace-nowrap text-sm bg-decorativeSubdued border-none rounded">
      <li className="w-full py-3 pl-3 pr-2 flex items-center justify-between cursor-pointer hover:bg-hoverBackgroundColor" onMouseEnter={() => setIsOpen(prev => !prev)} ><div className="flex items-center gap-2"><Plus /><span className="text-white">Çalma listesine ekle</span></div><span className="rotate-[90deg]"><ArrowRight /></span></li>
    {isOpen && <ul className="absolute min-w-56 p-1 top-8 right-px bg-decorativeSubdued border-none rounded -translate-x-60 translate-y-1" >
      {
        playlists.map((playlist, index) => (
          <li key={index} className="w-full py-3 pl-3 pr-2 flex items-center gap-2 cursor-pointer hover:bg-hoverBackgroundColor" onClick={() => adMusicToPlaylist(playlist)}><span className="text-white">{playlist.title}</span></li>
        ))
      }
      </ul>}
      <li className="w-full py-3 pl-3 pr-2 flex items-center gap-2 cursor-pointer hover:bg-hoverBackgroundColor" onClick={() => onSelect("Option 1")}><Add /><span className="text-white">Beğenilen şarkılara kaydet</span></li>
      <li className="w-full py-3 pl-3 pr-2 flex items-center gap-2 cursor-pointer hover:bg-hoverBackgroundColor" onClick={() => onSelect("Option 2")}><Share /><span className="text-white">Paylaş</span></li>
      <li className="w-full py-3 pl-3 pr-2 flex items-center gap-2 cursor-pointer hover:bg-hoverBackgroundColor" onClick={() => onSelect("Option 3")}><MiniLogo /><span className="text-white">Masaüstü uygulamasında aç</span> </li>
    </ul>
  );
};

export default Dropdown;