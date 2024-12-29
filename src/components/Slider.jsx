"use client";

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'

const Slider = ({ children }) => {
    const [emblaRef] = useEmblaCarousel()
  return (
    <div ref={emblaRef} className='overflow-hidden'>
        <div className='flex'>{children}</div>
    </div>
  )
}

export default Slider