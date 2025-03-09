import React from "react";
import Link from "next/link";
import Image from "next/image";
import Play from "../../public/assets/Play";

const PlayListCard = ({ item, hidden }) => {
  return (
    <Link
      href={item.path}
      className={`group rounded-md p-3 flex flex-col gap-2 hover:bg-highlight`}
    >
      <div className="w-[171px] h-[171px] grid place-items-center self-center relative">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            sizes="171px"
            fill
            style={{objectFit: 'cover', objectPosition: 'center center'}}
            priority
            className="rounded"
          />
        ) : (
          <Image
            src={"/assets/empty.svg"}
            alt={item.name}
            width={64}
            height={64}
            priority
            className="rounded"
          />
        )}
        <span className="absolute hidden w-[48px] h-[48px] rounded-full text-black bg-green place-items-center group-hover:grid bottom-2 right-2"><Play width="24" height="24" /></span>
      </div>
      <div className="overflow-hidden text-base font-normal text-white whitespace-normal text-ellipsis line-clamp-1">{item.name}</div>
      <div
        className={`text-sm text-linkColor overflow-hidden text-ellipsis whitespace-normal line-clamp-1 ${
          hidden && "hidden"
        }`}
      >
        {item.description}
      </div>
    </Link>
  );
};

export default PlayListCard;
