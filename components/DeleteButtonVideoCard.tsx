import React from 'react'
import { MdDelete } from 'react-icons/md'

const DeleteButtonVideoCard = () => {
    return (
        <div className='flex gap-6'>
          <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
            <div 
              className='bg-primary rounded-full p-2 md:p-2 lg:p-3'
              onClick={() => {}}
            >
              <MdDelete  className='text-lg md:text-xl lg:text-2xl'/>
            </div>
            
          </div>
        </div>
      )
}


export default DeleteButtonVideoCard