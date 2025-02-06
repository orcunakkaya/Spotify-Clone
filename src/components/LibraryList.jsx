"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LibraryListLoading from "./LibraryListLoading";
import { usePlaylistContext } from "@/context/PlaylistContext";

const LibraryList = ({ list }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { loading } = usePlaylistContext();

  const handleRouter = (route) => {
    router.push(`/collection/${route}`);
  };

  const likedSongs = list.find((item) => item.defaultList === true);

  if(loading) {
    return Array.from({ length: 5 }).map((_, index) => <LibraryListLoading key={index} />)
  }
  
  return (
    <div>
      {likedSongs && (
        <button
          onClick={() => handleRouter(likedSongs.id)}
          className={`block min-w-full h-16 p-2 border border-transparent ${
            !isOpen && "hover:bg-hoverBackgroundColor"
          } rounded ${isOpen && "bg-tinted text-white"}`}
        >
          <div className="flex h-12 gap-2 flex-nowrap">
            <div className="border-none rounded h-12 w-[48px] grid place-items-center bg-decorativeSubdued relative">
              <Image
                src={likedSongs.playListImage}
                alt={likedSongs.title}
                sizes="48px"
                fill
                style={{ objectFit: "cover", objectPosition: "center center" }}
                priority
                className="rounded"
              />
            </div>
            <div className="grid gap-0.5 text-left">
              <span>Liked Songs</span>
              <span className="text-subdued">
                {likedSongs.songs.length} songs
              </span>
            </div>
          </div>
        </button>
      )}
      {list
        .filter((i) => i?.defaultList !== true)
        .map((item, index) => (
          <button
            onClick={() => handleRouter(item.id)}
            key={index}
            className={`block min-w-full h-16 p-2 border border-transparent ${
              !isOpen && "hover:bg-hoverBackgroundColor"
            } rounded ${isOpen && "bg-tinted text-white"}`}
          >
            <div className="flex h-12 gap-2 flex-nowrap">
              <div className="border-none rounded h-12 w-[48px] grid place-items-center bg-decorativeSubdued relative">
                {item.playListImage.length > 0 ? (
                  <Image
                    src={
                      item.playListImage.length > 0
                        ? item.playListImage
                        : "/assets/empty.svg"
                    }
                    alt={item.title}
                    fill
                    style={{
                      objectFit: "cover",
                      objectPosition: "center center",
                    }}
                    priority
                    className="rounded"
                  />
                ) : (
                  <Image
                    src={
                      item.playListImage.length > 0
                        ? item.playListImage
                        : "/assets/empty.svg"
                    }
                    alt={item.title}
                    width={24}
                    height={24}
                    priority
                    className="rounded"
                  />
                )}
              </div>
              <div className="grid gap-0.5 text-left">
                <span className="overflow-hidden whitespace-normal text-ellipsis line-clamp-1">
                  {item.title}
                </span>
                <span className="text-subdued">{item.songs.length} songs</span>
              </div>
            </div>
          </button>
        ))}
    </div>
  );
};

export default LibraryList;
