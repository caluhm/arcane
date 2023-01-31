import type { NextPage } from 'next';
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Video } from '../types';
import VideoCard from '../components/VideoCard';
import NoResults from '../components/NoResults';
import { BASE_URL } from '../utils';
import useAuthStore from '../store/authStore';


interface IProps {
  videos: Video[]
}

const Home = ({ videos }: IProps) => {
  const [showUserFeed, setShowUserFeed] = useState(true);
  const [videosList, setVideosList] = useState<Video[]>([]);

  const { userProfile }: any = useAuthStore();
  const followingVideos = videos.filter(video => video.postedBy.followers?.some(user => user._ref === userProfile?._id))

  const yourfeed = showUserFeed ? 'border-b-2 border-black' : 'text-gray-400'
  const following = !showUserFeed ? 'border-b-2 border-black' : 'text-gray-400'

  useEffect(() => {
    if(showUserFeed) {
        setVideosList(videos);
    } else {
        setVideosList(followingVideos);
    }
  }, [showUserFeed, videos])

  return (
    <div className='flex flex-col gap-10 h-full overflow-y-scroll'>
      {userProfile && (
      <div className='flex gap-10 border-b-2 border-gray-200 bg-white w-auto'>
        <p 
          className={`text-xl font-semibold cursor-pointer mt-1 ${yourfeed}`} 
          onClick={() => setShowUserFeed(true)}
        >
          Your Feed
        </p>
        <p 
          className={`text-xl font-semibold cursor-pointer mt-1 ${following}`} 
          onClick={() => setShowUserFeed(false)}
        >
          Following
        </p>
      </div>
      )}
      {videosList.length ? (
        videosList.map((video: Video) => (
          <VideoCard post={video} key={video._id}/>
        ))
      ) : (
        <NoResults text={'No Videos'}/>
      )}
    </div>
  )
}

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = await axios.get(`${BASE_URL}/api/post`);

  if(topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  }
  
  return {
    props: { videos: response.data },
  };
}

export default Home