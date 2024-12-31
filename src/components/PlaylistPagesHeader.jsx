import React from 'react'
import Image from 'next/image';
import PlayButton from '@/app/collection/components/PlayButton';
import DotsButton from '@/app/collection/components/DotsButton';

const PlaylistPagesHeader = ({ playlist, type="my playlist", name="Orçun Berkay Akkaya" }) => {
    // flex items-center justify-center border-none rounded bg-decorativeSubdued w-[230px] h-[230px] shadow-emptyBox relative
    // flex flex-nowrap
  return (
    <div className='mb-4'>
        <div className='p-6 bg-gradient-to-b from-lightDecorativeSubdued from-0% to-decorativeSubdued -m-4 mb-4 to-100%'>
            <div className='grid grid-cols-[230px_auto] max-xl:grid-cols-[160px_auto] '>
                <div className='border-none rounded bg-decorativeSubdued w-[230px] h-[230px] max-xl:w-[160px] max-xl:h-[160px] shadow-emptyBox relative'>
                    
                {playlist.playListImage.length > 0 ? (
                    <Image
                        src={playlist.playListImage}
                        alt={playlist.title}
                        sizes='230px'
                        fill
                        style={{objectFit: 'cover', objectPosition: 'center center'}}
                        priority
                        className="rounded grid"
                    />
                    ) : (
                    <Image
                        src={"/assets/empty.svg"}
                        alt={playlist.title}
                        width={64}
                        height={64}
                        priority
                        className="rounded grid"
                    />
                    )}
                </div>
                <div className='ml-6 flex flex-col self-end gap-2'>
                    <span className='text-sm'>{type === 'my playlist' ? <>Çalma listesi</> : <>{type}</>}</span>
                    <span className='font-extrabold text-8xl max-xl:text-5xl overflow-hidden text-ellipsis whitespace-normal line-clamp-1 leading-tight'>{playlist.title}</span>
                    <span className='font-bold text-sm'>{type === 'my playlist' ? <>Orçun Berkay Akkaya</> : <>{name}</>} • {playlist.playListCount} şarkı</span>
                </div>
            </div>
        </div>
        <div className='bg-gradient-to-b from-decorativeSubdued from-0% to-black -mt-4 -ml-4 -mr-4 p-6 flex flex-nowrap gap-x-8'>
            <PlayButton /> {playlist.hiddenOptions ? null : <DotsButton playlist={playlist} />}
        </div>
    </div>
  )
}

export default PlaylistPagesHeader