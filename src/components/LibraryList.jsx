'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const LibraryList = ({ list }) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleRouter = (route) => {
        router.push(`/collection/${route}`);
    }

  return (
    <div>
      <button onClick={() => handleRouter('liked-songs')} className={`block min-w-full h-16 p-2 border border-transparent ${!isOpen && 'hover:bg-hoverBackgroundColor'} rounded ${isOpen && 'bg-tinted text-white'}`}>
          <div className='h-12 flex flex-nowrap gap-2'>
            <div className='border-none rounded h-12 min-w-12 grid place-items-center'>
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
                <span className='text-subdued'>0 Şarkı</span>
            </div>
          </div>
    </button>
    {
      list.map((item, index) => (
        <button onClick={() => handleRouter(item.id)} key={index} className={`block min-w-full h-16 p-2 border border-transparent ${!isOpen && 'hover:bg-hoverBackgroundColor'} rounded ${isOpen && 'bg-tinted text-white'}`}>
          <div className='h-12 flex flex-nowrap gap-2'>
            <div className='border-none rounded h-12 min-w-12 grid place-items-center bg-decorativeSubdued'>
                <Image 
                    src='/assets/empty.svg'
                    alt={item.title}
                    width={24}
                    height={24}
                    priority
                    className='rounded'
                />
            </div>
            <div className='grid gap-0.5 text-left'>
                <span>{item.title}</span>
                <span className='text-subdued'>{item.songs.length} Şarkı</span>
            </div>
          </div>
        </button>
      ))
    }
    </div>
    
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