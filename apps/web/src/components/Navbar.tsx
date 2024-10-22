'use client';
import { UserContext } from '@/context/UserContext';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { FiMenu, FiX, FiSearch } from 'react-icons/fi';
import Image from 'next/image';
import logo from '../assets/logo.png';

const Navbar: React.FC = () => {
  const { user, role, logout } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  const renderNavigationLinks = () => (
    <>
      <li>
        <Link href="/find-job" className="hover:text-Primary-blue">
          Find Job
        </Link>
      </li>
      <li>
        <Link href="/employers" className="hover:text-Primary-blue">
          Find Employers
        </Link>
      </li>
      <li>
        <Link href="/dashboard" className="hover:text-Primary-blue">
          Dashboard
        </Link>
      </li>
      <li>
        <Link href="/alerts" className="hover:text-Primary-blue">
          Job Alerts
        </Link>
      </li>
      <li>
        <Link href="/support" className="hover:text-Primary-blue">
          Customer Supports
        </Link>
      </li>
    </>
  );

  return (
    <nav className="bg-white shadow-md z-50 fixed w-full top-0 lg:relative">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Left Side: Logo */}
        <div className="flex items-center space-x-2">
          <Image
            src={logo}
            alt="Logo"
            width={40}
            height={40}
            objectFit="cover"
          />
          <Link href="/" className="text-2xl font-bold text-gray-700">
            HireMe
          </Link>
        </div>

        {/* Desktop Search Bar and Navigation Links */}
        <div className="hidden lg:flex flex-grow mx-6 items-center">
          {/* Search Bar with Search Icon */}
          <div className="relative flex-grow">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Job title, keyword, company"
              className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Right Side: Navigation Links and Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          <ul className="flex space-x-6 text-gray-700">
            {renderNavigationLinks()}
          </ul>

          <div className="flex items-center space-x-2">
            {user ? (
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Post A Jobs
                </button>
                <button className="bg-gray-300 px-4 py-2 rounded-md text-blue-600 hover:bg-gray-200">
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>

        {/*Mobile and Tablet Hamburger Menu*/}
        <div className="flex items-center lg:hidden space-x-2">
          {searchOpen && (
            <div className="absolute top-10 left-0 w-full p-2 bg-white flex items-center space-x-2 z-50">
            </div>
          )}

          {/* Hamburger Menu */}
          {!searchOpen && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700"
            >
              {menuOpen ? (
                <FiX className="text-2xl" />
              ) : (
                <FiMenu className="text-2xl" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobile/Tablet Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white shadow-lg z-50 absolute top-16 w-full">
          <ul className="flex flex-col items-start space-y-4 py-4 ml-2 mr-2">
            {renderNavigationLinks()}
            {user ? (
              <button
                onClick={logout}
                className="bg-red-500 text-white w-full py-2 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <div className="flex flex-col w-full px-4 space-y-2">
                <button className="bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700">
                  Post A Jobs
                </button>
                <button className="bg-gray-200 text-blue-600 w-full py-2 rounded-md hover:bg-gray-300">
                  Create Account
                </button>
                <button className="bg-gray-200 text-blue-600 w-full py-2 rounded-md hover:bg-gray-300">
                  Sign In
                </button>
              </div>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;