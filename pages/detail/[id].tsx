import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import axios from 'axios';

import { BASE_URL } from '../../utils';
import { Video } from '../../types';
import useAuthStore from '../../store/authStore';
import LikeButton from '../../components/LikeButton';
import Comments from '../../components/Comments';
import CommentButtonVideoCard from '../../components/CommentButtonVideoCard';
import ViewsButtonVideoCard from '../../components/ViewsButtonVideoCard';
import SettingsButtonVideoCard from '../../components/SettingsButtonVideoCard';

interface IProps {
  postDetails: Video,
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHover, setIsHover] = useState(false);
  const router = useRouter();
  const { userProfile }: any = useAuthStore();
  const [comment, setComment] = useState('');
  const [isPostingComment, setIsPostingComment] = useState(false);

  const onVideoClick = () => {
    if(playing) {
      videoRef?.current?.pause();
      setPlaying(false);
     } else {
      videoRef?.current?.play();
      setPlaying(true);
     }
  }

  if(!post) return null;

  const handleLike = async (like: boolean) => {
    if(userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like
      })

      setPost({ ...post, likes: data.likes })
    }
  }

  const addComment =async (e) => {
    e.preventDefault();

    if(userProfile && comment) {
      setIsPostingComment(true);

      const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment
      });

      setPost({ ...post, comments: data.comments});
      setComment('');
      setIsPostingComment(false);
    }
  }

  const handleDelete = async () => {
    if(userProfile._id === post.postedBy._id) {
      
      const { data } = await axios.delete(`${BASE_URL}/api/post/${post._id}`)

      router.back();

      setTimeout(() => {window.location.reload()}, 1000);
      
    }
    
  }

  return (
    <div className='flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap'>
      <div 
        className='relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black'
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}  
      >
        <div className='absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
          <p className='cursor-pointer' onClick={() => router.back()}>
            <MdOutlineCancel className='text-white text-[35px]'/>
          </p>
        </div>
        <div className='relative'>
          <div className='lg:h-[100vh] h-[60vh]'>
            <video
            controls
            ref={videoRef}
            
            src={post?.video?.asset.url}
            className="h-full cursor-pointer"
            >
            </video>
          </div>
          {isHover && ( 
          <div className='absolute top-[45%] left-[45%] cursor-pointer'>
            {playing ? (
              <button onClick={onVideoClick}>
                <BsFillPauseFill className='text-white text-6xl lg:text-8xl'/>
              </button>
            ) : (
              <button onClick={onVideoClick}>
                <BsFillPlayFill className='text-white text-6xl lg:text-8xl'/>
              </button>
            )}
          </div>
        )} 
        </div>
      </div>
      <div className='relative w-[1000px] md:w-[900px] lg:w-[700px]'>
        <div className='lg:mt-20 mt-10'>

          <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
            <div className='ml-4 md:w-20 md:h-20 w-16 h-16'>
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
              <div className='mt-3 flex flex-col gap-2'>
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
          <p className='px-10 text-lg text-gray-600'>{post.caption}</p>
          <div className='flex flex-row gap-6 mt-10 px-10'>
            {userProfile && (
              <>
                <LikeButton 
                  likes={post.likes}
                  handleLike={() => handleLike(true)}
                  handleDislike={() => handleLike(false)}
                />
                <CommentButtonVideoCard 
                  comments={post.comments}
                />
                <ViewsButtonVideoCard
                  views={post.views}
                />
                {userProfile._id === post.postedBy._id && (
                  <div className='ml-auto'>
                    <SettingsButtonVideoCard 
                      handleDelete={() => handleDelete()}
                    />
                </div>
                )}
                </>
            )}
          </div>
          <Comments 
            comment={comment}
            setComment={setComment}
            addComment={addComment}
            comments={post.comments}
            isPostingComment={isPostingComment}
          />
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({
  params: { id }
}: {
  params: { id: string }
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`)

  return {
    props: { postDetails: data }
  }
}

export default Detail