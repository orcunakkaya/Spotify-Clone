import Link from "next/link";
import React from "react";
import Image from "next/image";
import getRandromColor from "@/utils/Color.jsx";
const CategoryCard = ({ category, index }) => {
  return (
    <Link
      href={`/genre/${category.name}`}
      className="p-3 w-full h-48 rounded-lg relative overflow-hidden"
      style={{ backgroundColor: getRandromColor() }}
    >
      <Image
        src={category.icons[0].url}
        alt={category?.name}
        width={category.icons[0].width}
        height={category.icons[0].height}
        priority
        className="rounded-lg h-auto max-h-32 w-1/3 max-w-32 absolute -right-5 -bottom-5 rotate-[25deg]"
      />

      <div className="absolute top-4 left-4 text-white font-bold text-2xl">
        {category.name}
      </div>
    </Link>
  );
};

export default CategoryCard;
