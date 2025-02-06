import React from 'react'
import Image from 'next/image';
import DotsButton from '@/app/collection/components/DotsButton';
import dynamic from 'next/dynamic'
const PlayButtonComponent = dynamic(() => import('./PlayButtonComponent'), { ssr: false })

const PlaylistPagesHeader = ({ playlist, type="my playlist", name="Orçun Berkay Akkaya" }) => {
  return (
    <div className='mb-4'>
        <div className='p-6 bg-gradient-to-b from-lightDecorativeSubdued from-0% to-decorativeSubdued -m-4 mb-4 to-100%'>
            <div className='grid grid-cols-[230px_auto] max-xl:grid-cols-[160px_auto] '>
                <div className='border-none rounded bg-decorativeSubdued w-[230px] h-[230px] max-xl:w-[160px] max-xl:h-[160px] shadow-emptyBox relative grid place-items-center'>
                    
                {playlist.playListImage.length > 0 ? (
                    <Image
                        src={playlist.playListImage}
                        alt={playlist.title}
                        sizes='230px'
                        fill
                        style={{objectFit: 'cover', objectPosition: 'center center'}}
                        priority
                        className="grid rounded"
                    />
                    ) : (
                    <Image
                        src={"/assets/empty.svg"}
                        alt={playlist.title}
                        width={64}
                        height={64}
                        priority
                        className="grid rounded"
                    />
                    )}
                </div>
                <div className='flex flex-col self-end gap-2 ml-6'>
                    <span className='text-sm'>{type === 'my playlist' ? <>Playlist</> : <>{type}</>}</span>
                    <span className='overflow-hidden font-extrabold leading-tight whitespace-normal text-8xl max-xl:text-5xl text-ellipsis line-clamp-1'>{playlist.title}</span>
                    <span className='text-sm font-bold'>{type === 'my playlist' ? <>Orçun Berkay Akkaya</> : <>{name}</>} • {playlist.playListCount} songs</span>
                </div>
            </div>
        </div>
        <div className='bg-gradient-to-b from-decorativeSubdued from-0% to-black -mt-4 -ml-4 -mr-4 p-6 flex flex-nowrap gap-x-8'>
            {playlist && <PlayButtonComponent uris={playlist?.uris} /> } {playlist.defaultList === true ? null : playlist.hiddenOptions ? null : <DotsButton playlist={playlist} />}
        </div>
    </div>
  )
}

export default PlaylistPagesHeader