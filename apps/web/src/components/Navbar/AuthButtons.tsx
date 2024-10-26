"use client"
import React from 'react';
import Link from 'next/link';
import { UserRole } from '@/types/role';
import AvatarMenu from './AvatarMenu';

interface AuthButtonsProps {
  token: string | null;
  userRole: UserRole | null;
  onLogout: () => void;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ token, userRole, onLogout }) => (
  <div className="flex items-center space-x-2">
    {token && userRole ? (
      <>
        {(userRole === UserRole.Admin || userRole === UserRole.Developer) && (
          <Link href="/post-jobs">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Post A Job
            </button>
          </Link>
        )}
        <AvatarMenu onLogout={onLogout} userRole={userRole} />
      </>
    ) : (
      <>
        <Link href="/post-job">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Post A Job
          </button>
        </Link>
        <Link href="/sign-in">
          <button className="bg-gray-300 px-4 py-2 rounded-md text-blue-600 hover:bg-gray-200">
            Sign In
          </button>
        </Link>
      </>
    )}
  </div>
);

export default AuthButtons;