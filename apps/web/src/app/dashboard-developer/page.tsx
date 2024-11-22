'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getToken } from '@/lib/server';
import base_url from '@/lib/user';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '@/types/iuser';
import Sidebar from './tabmenu/Sidebar';
import OverviewTab from './tabmenu/OverviewTab';
import { useRouter, useSearchParams } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import PaymentControl from './tabmenu/PaymentControl';
import SubSetting from './tabmenu/SubSetting';
import SettingAccount from './tabmenu/SettingAccount';
import DeveloperAssessment from './tabmenu/assestmentManage';

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

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'overview':
        return <OverviewTab />;
      case 'paymentControl':
        return <PaymentControl />;
      case 'subscriptionSettings':
        return <SubSetting />;
      case 'assessmentManage':
        return <DeveloperAssessment />;
      case 'accountSettings':
        return <SettingAccount />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <ProtectedRoute requiredRole="developer">
      <div className="min-h-screen bg-gray-100 pt-20 lg:pt-0">
        <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <main className="p-4">{renderTabContent()}</main>
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
