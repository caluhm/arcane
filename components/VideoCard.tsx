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
  const [isVideoMuted, setIsVideoMuted] = useState(false);
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

  useEffect(() => {
    if(videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted])

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
    if(userProfile && (post.views === null || post.views.includes(userProfile))) {
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
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
          <div className='md:w-16 md:h-16 w-10 h-10'>
            <Link href={`/profile/${post.postedBy._id}`}>
              <>
                <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={post.postedBy.image}
                  alt="Profile Picture"
                  layout='responsive'
                />
              </>
            </Link>
          </div>
          <div>
          <Link href={`/profile/${post.postedBy._id}`}>
            <div className='flex items-center gap-2'>
              <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
                {post.postedBy.userName} {` `}
                <GoVerified className='text-blue-400 text-md'/>
              </p>
              <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                {post.postedBy.userName}
              </p>
            </div>
          </Link>
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
              onPlay={() => handleView()}
              loop
              ref={videoRef}
              className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100'
              src={post.video.asset.url}>
            </video>
          </Link>

          {isHover && (
            <div className='absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] p-3'>
              {playing ? (
                <button onClick={onVideoPress}>
                    <BsFillPauseFill className='text-black text-2xl lg:text-4xl'/>
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className='text-black text-2xl lg:text-4xl'/>
                </button>
              )}
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className='text-black text-2xl lg:text-4xl'/>
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <HiVolumeUp className='text-black text-2xl lg:text-4xl'/>
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