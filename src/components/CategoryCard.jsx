import Link from "next/link";
import React from "react";
import Image from "next/image";

const CategoryCard = ({ category, index }) => {
  return (
    <div className="p-3 w-full h-full max-h-48">
      <Link href={`/genre/${category.id}`} className="raunded-lg  relative">
        <Image
          src={category.icons[0].url}
          alt={category?.name}
          width={category.icons[0].width}
          height={category.icons[0].height}
          priority
          className="rounded-lg w-full h-full"
          style={{
            objectFit: "cover",
          }}
        />
        <div className="absolute top-4 left-4 text-white font-bold text-2xl">
          {category.name}
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
