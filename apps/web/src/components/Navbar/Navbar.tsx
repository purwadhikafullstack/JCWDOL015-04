'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';
import { getToken, deleteToken } from '@/lib/server';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logoutAction } from '@/redux/slice/authorSlice';
import { UserRole } from '@/types/role';
import { useRouter } from 'next/navigation';
import logo from '../../assets/logo.png';
import { toast } from 'react-toastify';
import NavLinks from './NavLinks';
import SearchBar from './SearchBar';
import AuthButtons from './AuthButtons';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getToken();
      setToken(res || '');
    };
    setUserRole(user.role as UserRole | null);
    fetchData();
  }, [user, token]);

  const onLogout = async () => {
    toast.success('Logged out successful!');
    await deleteToken();
    dispatch(logoutAction());
    router.push('/');
    setUserRole(null);
    setToken(null);
  };

  return (
    <nav className="bg-white shadow-md z-50 fixed w-full top-0 lg:relative">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo and Branding */}
        <div className="flex items-center space-x-2">
          <Image
            src={logo}
            alt="Logo"
            width={40}
            height={40}
            style={{ objectFit: 'cover' }}
            layout="fixed"
          />
          <Link href="/" className="text-2xl font-bold text-gray-700">
            HireMe
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden lg:flex flex-grow mx-6 items-center">
          <SearchBar />
        </div>

        {/* Desktop Navigation Links and Auth Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          <ul className="flex space-x-6 text-gray-700">
            <NavLinks userRole={userRole} />
          </ul>
          <AuthButtons token={token} userRole={userRole} onLogout={onLogout} />
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center lg:hidden space-x-2">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700">
            {menuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <MobileMenu token={token} userRole={userRole} onLogout={onLogout} />
      )}
    </nav>
  );
};

export default Navbar;
