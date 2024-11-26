'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getToken } from '@/lib/server';
import base_url from '@/lib/user';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '@/types/iuser';
import Sidebar from './tabmenu/Sidebar';
import { useRouter, useSearchParams } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import SettingAccount from './tabmenu/SettingAccount';
import DeveloperAssessment from './tabmenu/assestmentManage';
import Dashboard from './tabmenu/OverviewTab';
import SubsManage from './tabmenu/SubSetting';
import BillsManage from './tabmenu/PaymentControl';

const AdminDashboard = () => {
  const router = useRouter()
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';
  const [selectedTab, setSelectedTab] = useState(initialTab);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        if (!token) throw new Error('No token found');

        const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);
        const userId = decodedToken.user_id;
        const userRole = decodedToken.role;

        if (!userId) throw new Error('User ID not found in token');

        // Cek apakah role bukan 'developer'
        if (userRole !== 'developer') {
          router.push('/sign-in');
          return;
        }

        const response = await fetch(`${base_url}/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUserName(`${data.user.firstName} ${data.user.lastName}`);
        } else {
          toast.error(data.msg || 'Failed to fetch user data.');
        }
      } catch (error) {
        toast.error('An error occurred while fetching user data.');
      }
    };

    fetchData();
  }, [router]); 

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setSelectedTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    router.push(`/dashboard-developer?tab=${tab}`);
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'overview':
        return <Dashboard />;
      case 'paymentControl':
        return <BillsManage />;
      case 'subscriptionSettings':
        return <SubsManage />;
      case 'assessmentManage':
        return <DeveloperAssessment />;
      case 'accountSettings':
        return <SettingAccount />;
      default:
        return <Dashboard/>;
    }
  };

  return (
    <ProtectedRoute requiredRole="developer">
      <div className="min-h-screen bg-gray-100 pt-20 lg:pt-0">
        <Sidebar selectedTab={selectedTab} setSelectedTab={handleTabChange} />
        <main className="p-4">{renderTabContent()}</main>
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
