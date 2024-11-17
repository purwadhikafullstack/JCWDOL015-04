'use client';
import React from 'react';
import { FaBook, FaLayerGroup, FaCreditCard } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';

const menuItems = [
  { name: 'Dashboard', icon: <FaLayerGroup />, key: 'DevDashboard' },
  { name: 'Manage Subscriptions', icon: <FaCreditCard />, key: 'SubsDevMenu' },
  { name: 'Manage Bills', icon: <FaPencil />, key: 'BillsManage' },
  { name: 'Manage Assessments', icon: <FaBook />, key: 'AssessmentManage' },
];

interface SidebarProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedTab, setSelectedTab }) => {
  return (
    <aside className="w-64 bg-white h-screen py-6 pl-6 flex flex-col justify-between border-r-2">
      <div>
        <h2 className="text-gray-500 text-sm font-semibold mb-6">
          DEVELOPER DASHBOARD
        </h2>
        <ul>
          {menuItems.map(({ name, icon, key }) => (
            <li
              key={key}
              onClick={() => setSelectedTab(key)}
              className={`flex items-center hover:text-blue-500 hover:bg-[#F1F2F4] h-11 cursor-pointer ${
                selectedTab === key
                  ? 'bg-[#E7F0FA] text-[#0A65CC] border-l-4 border-[#0A65CC]'
                  : 'text-gray-500'
              }`}
            >
              <span className="mx-3">{icon}</span>
              {name}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;