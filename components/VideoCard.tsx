import React, { useState, useEffect, useRef } from 'react';

import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'
import { Video } from '../types';
import useAuthStore from '../store/authStore';
import LikeButtonVideoCard from './LikeButtonVideoCard';
import { MdInsertComment } from 'react-icons/md';
import CommentButtonVideoCard from './CommentButtonVideoCard';
import ViewsButtonVideoCard from './ViewsButtonVideoCard';
import SettingsButtonVideoCard from './SettingsButtonVideoCard';
import { BASE_URL } from '../utils';
import axios from 'axios';
import { useRouter } from 'next/router';


interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  const [postRef, setPostRef] = useState(post);
  const { userProfile }: any = useAuthStore();
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  }

  const onVideoPress = () => {
   if(playing) {
    videoRef?.current?.pause();
    setPlaying(false);
   } else {
    videoRef?.current?.play();
    setPlaying(true);
   }
  }

  const handleLike = async (like: boolean) => {
    if(userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like
      })

      setPostRef({ ...postRef, likes: data.likes })
      refreshData();
    }
  }

  const handleView = async () => {
    if(userProfile) {
        const { data } = await axios.put(`${BASE_URL}/api/view`, {
          userId: userProfile._id,
          postId: post._id,
        })
      setPostRef({ ...postRef, views: data.views })
      refreshData();
    } 
}

  const handleDelete = async () => {
    if(userProfile._id === post.postedBy._id) {
      
      const { data } = await axios.delete(`${BASE_URL}/api/post/${post._id}`)

      setTimeout(() => {window.location.reload()}, 1500);
      
    }
    
  }

  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
      <div>
        <div className='flex gap-3 p-2 font-semibold rounded'>
          <div className='lg:w-16 lg:h-16 w-10 h-10 cursor-pointer'>
            <Link href={`/profile/${post.postedBy._id}`}>
              
                <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={post.postedBy.image}
                  alt="Profile Picture"
                  layout='responsive'
                />
              
            </Link>
          </div>
          <div>
            <Link href={`/profile/${post.postedBy._id}`}>
              <div className='flex items-center gap-2 cursor-pointer'>
                <p className='flex gap-2 items-center text-md font-bold text-primary'>
                  {post.postedBy.userName} {` `}
                  <GoVerified className='text-blue-400 text-md'/>
                </p>
              </div>
            </Link>
            <div className='flex gap-3 flex-row items-center content-center'>
              <p className='font-medium md:text-md text-gray-700 hidden md:block'>
                {post.caption}
              </p>
              <Link href={`/?topic=${post.topic}`} key={post.topic}>
                <span className='hidden md:block md:text-sm text-gray-700 hover:text-[#40b7de] font-bold block capitalize cursor-pointer'>
                • {post.topic}
                </span>       
              </Link>
           </div>
          </div>
        </div>
      </div>

      <div className='lg:ml-20 flex gap-4 relative'>
        <div 
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className='rounded-3xl'>
          <Link href={`/detail/${post._id}`}>
            <video
              controls
              ref={videoRef}
              className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100'
              src={post.video.asset.url}
              onEnded={() => handleView()}
            >
            </video>
          </Link>

          {isHover && (
            <div className='lg:block md:block hidden absolute lg:bottom-[225px] lg:left-[260px] md:bottom-[170px] md:left-[75px] lg:w-[200px] md:w-[100px] cursor-pointer'>
              {playing ? (
                <button onClick={onVideoPress}>
                    <BsFillPauseFill className='text-white text-5xl lg:text-6xl'/>
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className='text-white text-5xl lg:text-6xl'/>
                </button>
              )}
            </div>
          )}
        </div>
        
          <div className='flex flex-col items-center content-center gap-1/2'>
            {userProfile && (
              <>
                <LikeButtonVideoCard
                  likes={post.likes}
                  handleLike={() => handleLike(true)}
                  handleDislike={() => handleLike(false)}
                />
                <Link href={`/detail/${post._id}`}>
                  <div>
                    <CommentButtonVideoCard 
                    comments={post.comments}
                    />
                  </div>
                </Link>
                <ViewsButtonVideoCard 
                  views={post.views}
                />
                {userProfile._id === post.postedBy._id && (
                  <div className='mt-auto'>
                    <SettingsButtonVideoCard 
                      handleDelete={() => handleDelete()}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        
      </div>
    </div>
  )
}

export default VideoCard