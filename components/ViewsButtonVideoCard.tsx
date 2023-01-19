import React from 'react'
import { BsEyeFill } from 'react-icons/bs';

const ViewsButtonVideoCard = ({}) => {
  return (
    <div className='flex gap-6'>
      <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
        <div 
          className='bg-primary rounded-full p-2 md:p-2 lg:p-3'
          onClick={() => {}}
        >
          <BsEyeFill  className='text-lg md:text-xl lg:text-2xl'/>
        </div>
        <p className='text-md font-semibold'>10</p>
      </div>
    </div>
  )
}

export default ViewsButtonVideoCard