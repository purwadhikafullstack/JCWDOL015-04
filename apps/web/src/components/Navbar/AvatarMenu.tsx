'use client';
import React from 'react';
import { UserRole } from '@/types/role';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';

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
    } else if (userRole === UserRole.Admin || userRole === UserRole.Developer) {
      router.push('/dashboard-admin-developer');
    }
  };

  const handleSettingClick = () => {
    if (userRole === UserRole.Candidate) {
      router.push('/dashboard-candidate?tab=account-setting');
    } else if (userRole === UserRole.Admin || userRole === UserRole.Developer) {
      router.push('/dashboard-admin-developer');
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
          <img
            alt="Avatar"
            src={
              profilePicture ||
              'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
            }
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
      >
        <li>
          <button onClick={handleProfileClick}>Profile</button>
        </li>
        <li>
          <button onClick={handleSettingClick}>Setting</button>
        </li>
        {userRole === UserRole.Developer && (
          <li>
            <button>Assessments</button>
          </li>
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
