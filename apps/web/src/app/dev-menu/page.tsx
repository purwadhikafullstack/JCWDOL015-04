'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SideBar from '@/app/dev-menu/menu/sidebar';
import DevDashboard from './menu/devDashboard';
import BillsManage from './menu/billsManage';
import AssessmentManage from './menu/assestmentManage';
import SubsManage from './menu/subsManage';

const DevMenu: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTab, setSelectedTab] = useState<string>('DevDashboard');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setSelectedTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    router.push(`/dev-menu?tab=${tab}`);
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'DevDashboard':
        return <DevDashboard />;
      case 'SubsDevMenu':
        return <SubsManage />;
      case 'BillsManage':
        return <BillsManage />;
      case 'AssessmentManage':
        return <AssessmentManage />;
      default:
        return <DevDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar selectedTab={selectedTab} setSelectedTab={handleTabChange} />
      <main className="flex-grow">
        {renderTabContent()}
      </main>
    </div>
  );
};

export default DevMenu;