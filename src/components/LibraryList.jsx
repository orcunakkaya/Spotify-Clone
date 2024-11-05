'use client'
import React, { useState } from 'react'
import Image from 'next/image';

const LibraryList = () => {
    const [isOpen, setIsOpen] = useState(false);
  return (

        <button className={`block min-w-full h-16 p-2 border border-transparent ${!isOpen && 'hover:bg-hoverBackgroundColor'} rounded ${isOpen && 'bg-tinted text-white'}`}>
          <div className='h-12 flex flex-nowrap gap-2'>
            <div className='border-none rounded h-12 min-w-12 grid place-items-center' style={{backgroundColor: '(#5018F0, #282828)'}}>
                <Image 
                    src='/assets/liked-songs.png'
                    alt='liked song'
                    width={48}
                    height={48}
                    priority
                    className='rounded'
                />
            </div>
            <div className='grid gap-0.5 text-left'>
                <span>Beğenilen Şarkılar</span>
                <span>0 Şarkı</span>
            </div>
          </div>
    </button>
  
  )
}

export default LibraryList

/*
<div className={`h-16 p-2 border border-transparent ${!isOpen && 'hover:bg-hoverBackgroundColor'} rounded ${isOpen && 'bg-tinted text-white'}`}>
          <div className='h-12 flex flex-nowrap gap-2'>
            <div className='border-none rounded h-12 min-w-12 grid place-items-center' style={{backgroundColor: '(#5018F0, #282828)'}}>
                <Image 
                    src='/assets/liked-songs.png'
                    alt='liked song'
                    width={48}
                    height={48}
                    priority
                    className='rounded'
                />
            </div>
            <div className='grid gap-0.5'>
                    <span>Beğenilen Şarkılar</span>
                    <span>0 Şarkı</span>
            </div>
          </div>
    </div>
*/