import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { BiLogOut, BiSearch } from 'react-icons/bi';
import { IoMdAdd, IoMdArrowDropdown } from 'react-icons/io';

import Logo from '../utils/arcane-logo.png';
import { createOrGetUser } from '../utils';

import useAuthStore from '../store/authStore';
import { IUser } from '../types';

const Navbar = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();
  const [searchValue, setSearchValue] = useState('')
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: {preventDefault: () => void}) => {
    e.preventDefault();

    if(searchValue) {
      router.push(`/search/${searchValue}`)
    }
  }

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
        <Link href={"/"}>
            <div className='w-[100px] md:w-[130px] md:h-[30px] h-[38px]'>
                <Image 
                    className='cursor-pointer' 
                    src={Logo}
                    alt="Arcane"
                    layout='responsive'
                />
            </div>
        </Link>

        <div className='relative hidden md:block'>
          <form
            onSubmit={handleSearch}
            className='absolute md:static top-10 -left-20 bg-white'
          >
            <input
              type='text'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className='bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full  md:top-0'
              placeholder='Search for accounts and videos...'
            />
            <button
              onClick={handleSearch}
              className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400'
            >
              <BiSearch />
            </button>
          </form>
        </div>

        <div>
          {userProfile ? (
            <div className='flex gap-5 md:gap-10 items-center'>
              <Link href="/upload">
                <button className='border-2 py-1 px-2 md:px-4 text-md font-semibold flex items-center gap-2'>
                  <IoMdAdd className='text-xl'/>{` `}
                  <span className='hidden md:block'>Create </span>
                </button>
              </Link>
              {userProfile.image && (
                <Link href={`/profile/${userProfile._id}`}>
                  
                  <div className='flex lg:gap-2 justify-center items-center'>
                    <>
                      <Image
                        width={40}
                        height={40}
                        className="rounded-full cursor-pointer"
                        src={userProfile.image}
                        alt="Profile Picture"
                      />
                    </>
                    <div className='flex gap-1'>
                      <p className='hidden lg:block font-medium text-md text-gray-600'>{userProfile.userName}</p>
                    </div>
                  </div>
                </Link>
              )}
              <button
                type='button'
                className='px-2'
                onClick={() => {
                  googleLogout();  
                  removeUser();  
                }}
                >
                <div className='flex items-center justify-center gap-1'>
                  <p className='hidden lg:block text-gray-400 text-md'>Logout</p>
                  <BiLogOut size={20} className='text-gray-400'/>
                </div>
              </button>
            </div>
          ) : (
            <GoogleLogin 
              onSuccess={(response) => createOrGetUser(response, addUser)}
              onError={() => console.log('Error')}
            />
          )}
        </div>
    </div>
  )
}

export default Navbar