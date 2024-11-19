'use client';
import React from 'react';
import { UserRole } from '@/types/role';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface AvatarMenuProps {
  onLogout: () => void;
  userRole: UserRole;
}

const AvatarMenu: React.FC<AvatarMenuProps> = ({ onLogout, userRole }) => {
  const profilePicture = useAppSelector((state) => state.user.profile_picture);
  const router = useRouter();

  const handleProfileClick = () => {
    if (userRole === UserRole.Candidate) {
      router.push('/dashboard-candidate');
    } else if (userRole === UserRole.Developer) {
      router.push('/dashboard-developer');
    } else if (userRole === UserRole.Admin) {
      router.push('/dashboard-admin');
    }
  };

  const handleLogout = () => {
    onLogout();
    router.push('/');
  };

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          <Image
            alt="Avatar"
            width={40}
            height={40}
            src={
              profilePicture? profilePicture :
              'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
            }
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
      >
        {/* Profile Button - Conditional on userRole */}
        <li>
          <button onClick={handleProfileClick}>Profile</button>
        </li>
        {userRole === UserRole.Developer && (
          <>
            <li>
              <button>Assessments</button>
            </li>
            <li>
              <button>Subscription</button>
            </li>
          </>
        )}
        <li>
          <button
            onClick={handleLogout}
            className="rounded-lg hover:text-white hover:bg-red-600"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AvatarMenu;