'use client'
import React from 'react'

import Play from '../../../../public/assets/Play.jsx';

const PlayButton = () => {
  return (
    <button className='w-[56px] h-[56px] rounded-full text-black bg-green grid place-items-center hover:scale-110'>
        <Play width='24' height='24' />
    </button>
  )
}

export default PlayButton