import Link from "next/link";
import React from "react";
import Image from "next/image";
import getRandromColor from "@/utils/color.js";
const CategoryCard = ({ category, index }) => {
  return (
    <Link
      href={`/genre/${category.name}`}
      className="relative w-full h-48 p-3 overflow-hidden rounded-lg"
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

      <div className="absolute text-2xl font-bold text-white top-4 left-4">
        {category.name}
      </div>
    </Link>
  );
};

export default CategoryCard;
