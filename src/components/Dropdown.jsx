'use client';
import { useState, useEffect, useRef } from "react";
import Add from "../../public/assets/Add";
import Share from "../../public/assets/Share";
import MiniLogo from "../../public/assets/MiniLogo";
import Plus from "../../public/assets/Plus";
import ArrowRight from "../../public/assets/ArrowRight";
import { getAllPlaylists, addSongToPlaylist, removeSongFromPlaylist } from "@/actions/actions";
import { usePlaylistContext } from "@/context/PlaylistContext";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Dropdown = ({ onSelect, music, setIsMainOpen }) => {
  const pathName = usePathname();

  const { setPlaylists } = usePlaylistContext();
  const [isOpen, setIsOpen] = useState(false);
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    getAllPlaylists().then((res) => {
      setPlaylist(res);
    }).catch((err) => {
      console.error('YourLibrary', err);
    });
  }

  const adMusicToPlaylist = (playlist) => {
    addSongToPlaylist({
      id: playlist.id,
      song: {
          "track": {
            "album": {
              "images": [
                {
                  "url": music.track.album.images[0].url
                }
              ],
              "name": music.track.album.name,
              "artists": music.track.album.artists,
              "release_date": music.track.album.release_date
            },
            "name": music.track.name,
            "duration_ms": music.track.duration_ms,
          }
      }
    }).then(res => {
      setPlaylists(prev => prev.map(i => i.id === playlist.id ? res : i));
    })
    setIsMainOpen(false);
  }

  const deleteSong = () => {
    removeSongFromPlaylist({
      id: music.id
    }).then(res => {
      setPlaylists(prev => prev.filter(i => i.id !== music.id));
    })
    setIsMainOpen(false);
  }


  return (
    <ul className="relative min-w-56 p-1 text-subdued whitespace-nowrap text-sm bg-decorativeSubdued border-none rounded">
      <li className="w-full py-3 pl-3 pr-2 flex items-center justify-between cursor-pointer hover:bg-hoverBackgroundColor" onMouseEnter={() => setIsOpen(prev => !prev)} ><div className="flex items-center gap-2"><Plus /><span className="text-white">Çalma listesine ekle</span></div><span className="rotate-[90deg]"><ArrowRight /></span></li>
    {isOpen && <ul className="absolute min-w-56 p-1 top-8 right-px bg-decorativeSubdued border-none rounded -translate-x-60 translate-y-1" >
      {
        playlist.map((pl, index) => (
          <li key={index} className="w-full py-3 pl-3 pr-2 flex items-center gap-2 cursor-pointer hover:bg-hoverBackgroundColor overflow-hidden text-ellipsis whitespace-normal line-clamp-1" onClick={() => adMusicToPlaylist(pl)}><span className="text-white">{pl.title}</span></li>
        ))
      }
      </ul>}
      {
        pathName.includes('collection') && 
         <li className="w-full py-3 pl-3 pr-2 flex items-center gap-2 cursor-pointer hover:bg-hoverBackgroundColor" onClick={() => setIsMainOpen(false)}>
          <Image 
            src="/assets/trash.svg"
            alt="delete"
            width={16}
            height={16}
          />
          <span className="text-white">Çalma listesinden kaldır</span></li>
      }
      <li className="w-full py-3 pl-3 pr-2 flex items-center gap-2 cursor-pointer hover:bg-hoverBackgroundColor" onClick={() => setIsMainOpen(false)}><Add /><span className="text-white">Beğenilen şarkılara kaydet</span></li>
      <li className="w-full py-3 pl-3 pr-2 flex items-center gap-2 cursor-pointer hover:bg-hoverBackgroundColor" onClick={() => setIsMainOpen(false)}><Share /><span className="text-white">Paylaş</span></li>
      <li className="w-full py-3 pl-3 pr-2 flex items-center gap-2 cursor-pointer hover:bg-hoverBackgroundColor" onClick={() => setIsMainOpen(false)}><MiniLogo /><span className="text-white">Masaüstü uygulamasında aç</span> </li>
    </ul>
  );
};

export default Dropdown;