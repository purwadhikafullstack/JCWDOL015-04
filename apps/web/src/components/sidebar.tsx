'use client';
import React, { useState } from 'react';
import { FaCreditCard, FaGear, FaLayerGroup, FaPencil } from 'react-icons/fa6';
import { FaSignOutAlt } from 'react-icons/fa';

export default function SideBar() {
  const [activeLink, setActiveLink] = useState<string | null>(null);

  const handleClick = (linkId: string) => {
    setActiveLink(linkId);
  };
  return (
    <aside className="w-full md:w-1/4 bg-white h-auto md:h-screen py-6 pl-6 flex flex-col justify-between border-r-2">
      <div>
        <h2 className="text-gray-500 text-sm font-semibold mb-6">
          DEVELOPER DASHBOARD
        </h2>
        <nav>
          <a
            href="#"
            onClick={() => handleClick('overview')}
            className={`flex items-center  hover:text-blue-500 hover:bg-[#F1F2F4] h-11 ${activeLink === 'overview' ? 'bg-[#E7F0FA] text-[#0A65CC] border-l-4 border-[#0A65CC]' : 'text-gray-500'}`}
          >
            <FaLayerGroup className="mx-3" />
            Overview
          </a>
          <a
            href="#"
            onClick={() => handleClick('payment')}
            className={`flex items-center  hover:text-blue-500 hover:bg-[#F1F2F4] h-11 ${activeLink === 'payment' ? 'bg-[#E7F0FA] text-[#0A65CC] border-l-4 border-[#0A65CC]' : 'text-gray-500'}`}
          >
            <FaCreditCard className="mx-3" /> Payment Control
          </a>
          <a
            href="#"
            onClick={() => handleClick('assessment')}
            className={`flex items-center  hover:text-blue-500 hover:bg-[#F1F2F4] h-11 ${activeLink === 'assessment' ? 'bg-[#E7F0FA] text-[#0A65CC] border-l-4 border-[#0A65CC]' : 'text-gray-500'}`}
          >
            <FaPencil className="mx-3" />
            Create Assessment
          </a>
          <a
            href="#"
            onClick={() => handleClick('settings')}
            className={`flex items-center  hover:text-blue-500 hover:bg-[#F1F2F4] h-11 ${activeLink === 'settings' ? 'bg-[#E7F0FA] text-[#0A65CC] border-l-4 border-[#0A65CC]' : 'text-gray-500'}`}
          >
            <FaGear className="mx-3" /> Subs Setting
          </a>
        </nav>
      </div>
      <a
        href="#"
        className="flex items-center text-gray-500 hover:text-blue-500 mt-6"
      >
        <FaSignOutAlt className="mr-3" />
        Log-out
      </a>
    </aside>
  );
}
