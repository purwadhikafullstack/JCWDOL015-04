// src/app/dashboard-candidate/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getToken } from '@/lib/server';
import base_url from '@/lib/user';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '@/types/iuser';
import Sidebar from './components/Sidebar';
import OverviewTab from './components/OverviewTab';
import AppliedJobsTab from './components/AppliedJobsTab';
import SubscriptionTab from './components/SubscriptionTab';
import FavoriteJobsTab from './components/FavoriteJobsTab';
import PlansBillingTab from './components/PlansBillingTab';
import SettingsTab from './components/SettingsTab';

const CandidateDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [userUniqueCode, setUserUniqueCode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        if (!token) throw new Error('No token found');

        const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);
        const userId = decodedToken.user_id;

        if (!userId) throw new Error('User ID not found in token');

        const response = await fetch(`${base_url}/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setFirstName(data.user.firstName);
          setLastName(data.user.lastName);
          setPhone(data.user.phone);
          setEmail(data.user.email);
          setUserUniqueCode(data.user.userUniqueCode);
        } else {
          toast.error(data.msg || 'Failed to fetch user data.');
        }
      } catch (error) {
        toast.error('An error occurred while fetching user data.');
      }
    };

    fetchData();
  }, []);

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'overview':
        return <OverviewTab />;
      case 'appliedJobs':
        return <AppliedJobsTab />;
      case 'subscription':
        return <SubscriptionTab />;
      case 'favoriteJobs':
        return <FavoriteJobsTab />;
      case 'plansBilling':
        return <PlansBillingTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20 lg:pt-0">
      <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <main className="p-4">
        {renderTabContent()}
      </main>
    </div>
  );
};

export default CandidateDashboard;