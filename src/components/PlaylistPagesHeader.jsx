import React from 'react'
import Image from 'next/image';
import PlayButton from '@/app/collection/components/PlayButton';
import DotsButton from '@/app/collection/components/DotsButton';

const PlaylistPagesHeader = ({ playlist }) => {
  return (
    <div className='mb-4'>
        <div className='p-6 bg-gradient-to-b from-lightDecorativeSubdued from-0% to-decorativeSubdued -m-4 mb-4 to-100%'>
        <div className='flex flex-nowrap'>
            <div className='flex items-center justify-center border border-transparent rounded bg-decorativeSubdued w-[230px] h-[230px]'>
                <Image 
                    src={playlist.playListImage.length > 0 ? playlist.playListImage : '/assets/empty.svg'}
                    alt={playlist.title}
                    width={64}
                    height={64}
                    priority
                />
            </div>
            <div className='ml-6 flex flex-col self-end gap-2'>
                <span className='text-sm'>Çalma listesi</span>
                <span className='font-extrabold text-8xl'>{playlist.title}</span>
                <span className='font-bold text-sm'>Orçun Berkay Akkaya • {playlist.songs.length} şarkı</span>
            </div>
            </div>
        </div>
        <div className='bg-gradient-to-b from-decorativeSubdued from-0% to-black -mt-4 -ml-4 -mr-4 p-6 flex flex-nowrap gap-x-8'>
            <PlayButton /><DotsButton />
        </div>
    </div>
  )
}

export default PlaylistPagesHeader