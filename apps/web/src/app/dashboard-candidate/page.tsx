'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getToken } from '@/lib/server';
import base_url from '@/lib/user';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '@/types/iuser';
import Sidebar from './tabmenu/Sidebar';
import OverviewTab from './tabmenu/OverviewTab';
import AppliedJobsTab from './tabmenu/AppliedJobsTab';
import FavoriteJobsTab from './tabmenu/FavoriteJobsTab';
import SettingsTab from './tabmenu/SettingsTab';
import { useRouter, useSearchParams } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import UserAssessment from './tabmenu/skillAssessment';
import CustomerPlans from './tabmenu/SubscriptionTab';
import CvDashboard from './tabmenu/CVGenerator';
import PlansBillingDashboard from './tabmenu/PlansBillingTab';

const CandidateDashboard = () => {
  const router = useRouter()
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';
  const [selectedTab, setSelectedTab] = useState(initialTab);
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
        } else {
          toast.error(data.msg || 'Failed to fetch user data.');
        }
      } catch (error) {
        toast.error('An error occurred while fetching user data.');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setSelectedTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    router.push(`/dashboard-candidate?tab=${tab}`);
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'overview':
        return <OverviewTab setSelectedTab={setSelectedTab} />;
      case 'appliedJobs':
        return <AppliedJobsTab />;
      case 'favoriteJobs':
        return <FavoriteJobsTab />;
      case 'CVGenerator':
        return <CvDashboard />;
      case 'Subscription':
        return <CustomerPlans />;
      case 'plansBilling':
        return <PlansBillingDashboard />;
      case 'userAssessment':
        return <UserAssessment />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <OverviewTab setSelectedTab={setSelectedTab} />;
    }
  };

  return (
    <ProtectedRoute requiredRole="candidate">
      <div className="min-h-screen bg-gray-100 pt-20 lg:pt-0">
        <Sidebar selectedTab={selectedTab} setSelectedTab={handleTabChange} />
        <main className="p-4">{renderTabContent()}</main>
      </div>
    </ProtectedRoute>
  );
};

export default CandidateDashboard;
