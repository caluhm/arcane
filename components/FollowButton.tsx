import React, { useState, useEffect } from 'react';
import useAuthStore from '../store/authStore';

interface IProps {
    handleFollow: () => void;
    handleUnfollow: () => void;
    followers: any[];
}

const FollowButton = ({ followers, handleFollow, handleUnfollow}: IProps) => {
  const { userProfile }: any = useAuthStore();
  const [alreadyFollowing, setAlreadyFollowing] = useState(true);
  const filterFollowers = followers?.filter((item) => item._ref === userProfile?._id);

  useEffect(() => {
    if(filterFollowers?.length > 0) {
        setAlreadyFollowing(true);     
    } else {
        setAlreadyFollowing(false);
    }
  }, [filterFollowers, followers])

  return (
    <div className='pt-5'>
        {alreadyFollowing ? (
            <div className='flex flex-row gap-5 items-center content-center'>
            <p className='md:text-md font-bold text-gray-700 text-sm'>{followers?.length | 0} <span className='md:text-md font-medium text-gray-400 text-sm'>Followers</span></p>
            
            <button 
                className='py-1 px-4 border-2 rounded-md text-white bg-[#40b7de] border-[#a7e9ff] text-sm font-semibold'
                onClick={handleUnfollow}
            >
                <span>Following</span>
            </button>
            </div>
        ) : (
            <div className='flex flex-row gap-5 items-center content-center'>
                <p className='md:text-md font-bold text-gray-700 text-sm'>{followers?.length | 0} <span className='md:text-md font-medium text-gray-400 text-sm'>Followers</span></p>
            <button 
                className='py-1 px-4 border-2 rounded-md bg-gray-200 border-gray-300 text-sm font-semibold'
                onClick={handleFollow}
            >
                <span>Follow</span>
            </button>
            </div>
        )}
    </div>
  )
}

export default FollowButton