import React from "react";
import Link from "next/link";
import Image from "next/image";

const PlayListCard = ({ item, hidden }) => {
  return (
    <Link
      href={item.path}
      className={`rounded-md p-3 flex flex-col gap-2 hover:bg-highlight`}
    >
      <div className="w-[171px] h-[171px] grid place-items-center self-center relative">
        {item.image.length > 0 ? (
          <Image
            src={item.image.length > 0 ? item.image : "/assets/empty.svg"}
            alt={item.name}
            layout="fill"
            objectFit="cover"
            priority
            className="rounded"
          />
        ) : (
          <Image
            src={item.image.length > 0 ? item.image : "/assets/empty.svg"}
            alt={item.name}
            width={64}
            height={64}
            priority
            className="rounded"
          />
        )}
      </div>
      <div className="font-normal text-base text-white overflow-hidden text-ellipsis whitespace-normal line-clamp-1">{item.name}</div>
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

// const PlayListCard = ({ item }) => {
//   return (
//     <Link href={`/playlist/${item.id}`} className='rounded-md p-3 flex flex-col gap-2 hover:bg-highlight'>
//         <Image
//             src={item.images[0].url}
//             alt={item.description}
//             width={180}
//             height={180}
//             priority
//         />
//         <div className='font-normal text-base'>{item.name}</div>
//         <div className='text-sm text-subdued overflow-hidden text-ellipsis whitespace-normal line-clamp-2'>{item.description}</div>
//     </Link>
//   )
// }

// export default PlayListCard;
