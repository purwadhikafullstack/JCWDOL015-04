'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Sidebar from './menu/sidebar';
import CustomerOverview from './menu/overview';
import CustomerProfile from './menu/cusProfil';
import AppliedJob from './menu/appliedjob';
import CustomerPlans from './menu/subsPlan';
import PlanBilling from './menu/plan-bill';
import FavoriteJobs from './menu/favjobs';
import CVGenerator from './menu/cvgenerator';


const CustomerMenu: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTab, setSelectedTab] = useState<string>('CustomerOverview');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setSelectedTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    router.push(`/user-menu?tab=${tab}`);
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'CustomerOverview':
        return <CustomerOverview />;
      case 'CustomerProfile':
        return <CustomerProfile />;
      case 'AppliedJob':
        return <AppliedJob />;
      case 'FavoriteJobs':
        return <FavoriteJobs />;
      case 'CustomerPlans':
        return <CustomerPlans />;
      case 'PlanBilling':
        return <PlanBilling />;
      case 'CVGenerator':
        return <CVGenerator />;
      default:
        return <CustomerOverview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar selectedTab={selectedTab} setSelectedTab={handleTabChange} />
      <main className="flex-grow">{renderTabContent()}</main>
    </div>
  );
};

export default CustomerMenu;
