import React from 'react';
import Link from 'next/link';
import { UserRole } from '@/types/role';
import AvatarMenu from './AvatarMenu';
import Notification from './Notification/notification';

interface AuthButtonsProps {
  isLoggedIn: boolean;
  userRole: UserRole | null;
  onLogout: () => void;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({
  isLoggedIn,
  userRole,
  onLogout,
}) => (
  <div className="flex items-center space-x-2">
    {isLoggedIn ? (
      <>
        {(userRole === UserRole.Admin) && (
          <Link href="/ ISI DISINI ">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Manage Jobs
            </button>
          </Link>
        )}
        {userRole && (
          <>
            <Notification />
            <AvatarMenu onLogout={onLogout} userRole={userRole} />
          </>
        )}
      </>
    ) : (
      <>
        <Link href="/sign-in">
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
