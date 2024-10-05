import Link from 'next/link'
import React from 'react'
import Image from 'next/image';

const CategoryCard = ({ category, index }) => {
    console.log("category",category.icons[0].url, category.name, index)
  return (
    <div className='p-3 '>
            <div  className='raunded-lg w-fit relative'>
            <Image
                src={category.icons[0].url}
                alt={category?.name}
                width={category.icons[0].width}
                height={category.icons[0].height}
                priority
                className='rounded-lg'
            />
            <div className='absolute top-4 left-4 text-white font-bold text-2xl'>{category.name}</div>
            </div>
    </div>
  )
}

export default CategoryCard