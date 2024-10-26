"use client"
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    const url = `/job-page?search=${encodeURIComponent(search)}`;
    router.push(url);
  };

  return (
    <div className="relative flex items-center space-x-2 w-full max-w-lg">
      <div className="relative flex-grow">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Job title, keyword, company"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full min-w-[350px] pl-10 p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-5 py-3 rounded-md hover:bg-blue-700 transition-colors"
      >
        Find Job
      </button>
    </div>
  );
};

export default SearchBar;
