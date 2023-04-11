import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import images from '../assests';

const SearchBar = ({ activeSelect, setActiveSelect, handleSearch, clearSearch }) => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [toggle, setToggle] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(debouncedSearch);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [debouncedSearch]);

  useEffect(() => {
    if (search) {
      handleSearch(search);
    } else {
      clearSearch();
    }
  }, [search]);

  return (
    <>
      <div className="flex-1 flexCenter dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 p-4 rounded-md ">
        <Image
          src={images.search}
          style={{ objectFit: 'contain' }}
          width={20}
          height={20}
          alt="search"
          className={theme === 'light' && 'filter invert'}
        />
        <input
          className="dark:bg-nft-black-2 bg-white mx-4 w-full dark:text-white text-nft-black-1 font-normal text-xs outline-none"
          type="text"
          placeholder="seacrh nft"
          onChange={(e) => setDebouncedSearch(e.target.value)}
          value={debouncedSearch}
        />
      </div>
      <div
        className="relative flexBetween ml-4 sm:ml-0 sm:mt-2 min-w-190 cursor-pointer  dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 p-4 rounded-md"
        onClick={() => { setToggle((prevToggle) => !prevToggle); }}
      >
        <p className="font-poppins font-normal text-xs dark:text-white text-nft-black-1">{activeSelect}</p>
        <Image
          src={images.arrow}
          style={{ objectFit: 'contain' }}
          width={15}
          height={15}
          className={theme === 'light' && 'filter invert'}
        />

        {toggle && (
          <div className="absolute top-full left-0 right-0  w-full mt-3 z-10  dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 py-3 px-4 rounded-md">
            {['Recently added', 'Price Asc', 'Price desc'].map((item) => (
              <p
                onClick={() => setActiveSelect(item)}
                key={item}
                className="font-poppins font-normal text-xs dark:text-white text-nft-black-1 my-3 cursor-pointer"
              >
                {item}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
