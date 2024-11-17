import React from 'react'
import Dots from '../../../../public/assets/Dots.jsx';

const DotsButton = () => {
  return (
    <button className='text-subdued hover:text-white'>
        <Dots width='22' height='22' />
    </button>
  )
}

export default DotsButton