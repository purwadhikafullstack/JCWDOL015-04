// src/app/dashboard-candidate/components/SettingsTab.tsx

import { useState } from 'react';
import SettingPersonal from './TabSetting/SettingPersonal';
import SettingProfile from './TabSetting/SettingProfile';
import SettingSocialLinks from './TabSetting/SettingSocialLinks';
import SettingAccount from './TabSetting/SettingAccount';

const SettingsTab = () => {
  const [settingsTab, setSettingsTab] = useState('personal');

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Settings</h2>
      <div className="flex space-x-4 border-b pb-4 mb-8">
        <button
          className={`${
            settingsTab === 'personal' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-700'
          }`}
          onClick={() => setSettingsTab('personal')}
        >
          Personal
        </button>
        <button
          className={`${
            settingsTab === 'profile' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-700'
          }`}
          onClick={() => setSettingsTab('profile')}
        >
          Profile
        </button>
        <button
          className={`${
            settingsTab === 'socialLinks' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-700'
          }`}
          onClick={() => setSettingsTab('socialLinks')}
        >
          Social Links
        </button>
        <button
          className={`${
            settingsTab === 'accountSetting' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-700'
          }`}
          onClick={() => setSettingsTab('accountSetting')}
        >
          Account Setting
        </button>
      </div>
      <div>
        {settingsTab === 'personal' && <SettingPersonal />}
        {settingsTab === 'profile' && <SettingProfile />}
        {settingsTab === 'socialLinks' && <SettingSocialLinks />}
        {settingsTab === 'accountSetting' && <SettingAccount />}
      </div>
    </div>
  );
};

export default SettingsTab;
