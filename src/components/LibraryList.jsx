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

  if(loading) {
    return Array.from({ length: 5 }).map((_, index) => <LibraryListLoading key={index} />)
  }

  return (
    <div>
      {list.map((item, index) => (
          <button
            onClick={() => handleRouter(item.id)}
            key={index}
            className={`block min-w-full h-16 p-2 border border-transparent ${
              !isOpen && "hover:bg-hoverBackgroundColor"
            } rounded ${isOpen && "bg-tinted text-white"}`}
          >
            <div className="flex h-12 gap-2 flex-nowrap">
              <div className="border-none rounded h-12 w-[48px] grid place-items-center bg-decorativeSubdued relative">
                {item.images ? (
                  <Image
                    src={item.images[0].url}
                    alt={item.name}
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
                    src={"/assets/empty.svg"}
                    alt={item.name}
                    width={24}
                    height={24}
                    priority
                    className="rounded"
                  />
                )}
              </div>
              <div className="grid text-left place-items-center">
                <span className="overflow-hidden whitespace-normal text-ellipsis line-clamp-1">
                  {item.name}
                </span>
              </div>
            </div>
          </button>
        ))}
    </div>
  );
};

export default LibraryList;
