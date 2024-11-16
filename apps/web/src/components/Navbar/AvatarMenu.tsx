"use client";
import React from 'react';
import { UserRole } from '@/types/role';
import { useAppSelector } from '@/redux/hooks'; // Import useAppSelector to access Redux state

interface AvatarMenuProps {
  onLogout: () => void;
  userRole: UserRole;
}

const AvatarMenu: React.FC<AvatarMenuProps> = ({ onLogout, userRole }) => {
  const profilePicture = useAppSelector((state) => state.user.profile_picture);

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
            src={profilePicture || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow"
      >
        <li><a href='/user-menu'>Profile</a></li>
        <li><button>Setting</button></li>
        {userRole === UserRole.Developer && (
          <li><button>Assessments</button></li>
        )}
        <li>
          <button
            onClick={onLogout}
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
