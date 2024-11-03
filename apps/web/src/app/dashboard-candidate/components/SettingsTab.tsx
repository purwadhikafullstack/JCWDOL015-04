// src/app/dashboard-candidate/components/SettingsTab.tsx
import { useState } from 'react';

const SettingsTab = () => {
  const [settingsTab, setSettingsTab] = useState('personal');

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Settings</h2>
      <div className="mb-8">
        <button
          className={`mr-4 ${settingsTab === 'personal' ? 'text-blue-500 border-b-2 border-blue-500' : ''}`}
          onClick={() => setSettingsTab('personal')}
        >
          Personal
        </button>
        <button
          className={`mr-4 ${settingsTab === 'profile' ? 'text-blue-500 border-b-2 border-blue-500' : ''}`}
          onClick={() => setSettingsTab('profile')}
        >
          Profile
        </button>
        <button
          className={`mr-4 ${settingsTab === 'socialLinks' ? 'text-blue-500 border-b-2 border-blue-500' : ''}`}
          onClick={() => setSettingsTab('socialLinks')}
        >
          Social Links
        </button>
        <button
          className={`mr-4 ${settingsTab === 'accountSetting' ? 'text-blue-500 border-b-2 border-blue-500' : ''}`}
          onClick={() => setSettingsTab('accountSetting')}
        >
          Account Setting
        </button>
      </div>
      <div>
        {/* Settings content can go here */}
      </div>
    </div>
  );
};

export default SettingsTab;
