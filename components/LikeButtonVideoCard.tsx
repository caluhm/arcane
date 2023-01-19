import React, { useState, useEffect } from 'react';
import { MdFavorite } from 'react-icons/md';

import useAuthStore from '../store/authStore';

interface IProps {
    handleLike: () => void;
    handleDislike: () => void;
    likes: any[];
}

const LikeButtonVideoCard = ({ likes, handleLike, handleDislike}: IProps) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false)
  const { userProfile }: any = useAuthStore();
  const filterLikes = likes?.filter((item) => item._ref === userProfile?._id);

  useEffect(() => {
    if(filterLikes?.length > 0) {
        setAlreadyLiked(true);     
    } else {
        setAlreadyLiked(false);
    }
  }, [filterLikes, likes])

  return (
    <div className='flex gap-6'>
        <div className='flex flex-col justify-center items-center cursor-pointer'>
            {alreadyLiked ? (
                <div 
                    className='bg-primary rounded-full p-2 md:p-2 lg:p-3 text-[#40b7de]'
                    onClick={handleDislike}
                >
                    <MdFavorite className='text-lg md:text-xl lg:text-2xl'/>
                </div>
            ) : (
                <div 
                    className='bg-primary rounded-full p-2 md:p-2 lg:p-3'
                    onClick={handleLike}
                >
                    <MdFavorite className='text-lg md:text-xl lg:text-2xl'/>
                </div>
            )}
            <p className='text-md font-semibold'>{likes?.length | 0}</p>
        </div>
    </div>
  )
}

export default LikeButtonVideoCard