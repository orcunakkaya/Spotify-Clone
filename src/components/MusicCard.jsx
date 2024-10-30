import React from 'react'
import Image from 'next/image'

const MusicCard = ({ music, order}) => {
  return (
    <div>
        <span className='text-subdued text-base'>{order}</span>
        <Image 
            src={music.track.album.images[0].url}
            alt={music.track.album.name}
            width={64}
            height={64}
        />
        <div>
            <div>{music.track.name}</div>
            <div>{music.track.album.artists.map((artist) => artist.name).join(', ')}</div>
        </div>
        <div>{music.track.album.name}</div>
    </div>
  )
}

export default MusicCard