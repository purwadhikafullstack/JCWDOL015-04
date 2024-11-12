// MobileMenu.tsx
"use client"
import React from 'react';
import Link from 'next/link';
import NavLinks from './NavLinks';
import { UserRole } from '@/types/role';

interface MobileMenuProps {
  isLoggedIn: boolean;
  userRole: UserRole | null;
  onLogout: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isLoggedIn, userRole, onLogout }) => (
  <div className="lg:hidden bg-white shadow-lg rounded-md z-50 absolute top-16 w-full">
    <ul className="flex flex-col items-start space-y-4 py-4 ml-2 mr-2">
      <NavLinks userRole={userRole} />
      {isLoggedIn ? (
        <>
         {userRole === UserRole.Candidate && UserRole.Admin && (
            <Link href="/profile"><button className="hover:text-Primary-blue">Profile</button></Link>
          )}
          {userRole === UserRole.Candidate && UserRole.Admin && (
            <Link href="/settings"><button className="hover:text-Primary-blue">Setting</button></Link>
          )}
          {userRole === UserRole.Developer && (
            <Link href="/assessments"><button className="hover:text-Primary-blue">Assessments</button></Link>
          )}
          <button onClick={onLogout} className="bg-red-500 text-white w-full py-2 rounded-md hover:bg-red-600">
            Logout
          </button>
        </>
      ) : (
        <div className="flex flex-col w-full px-4 space-y-2">
          <Link href="/post-job"><button className="bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700">Post A Job</button></Link>
          <Link href="/sign-in"><button className="bg-gray-200 text-blue-600 w-full py-2 rounded-md hover:bg-gray-300">Sign In</button></Link>
        </div>
      )}
    </ul>
  </div>
);

export default MobileMenu;