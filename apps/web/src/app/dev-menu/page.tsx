'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SideBar from '@/app/dev-menu/menu/sidebar';
import DevDashboard from './menu/devDashboard';
import BillsManage from './menu/billsManage';
import AssessmentManage from './menu/assestmentManage';
import SubsManage from './menu/subsManage';
import { getToken } from '@/lib/server';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '@/types/iuser';

const DevMenu: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<string>('DevDashboard');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setSelectedTab(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    const validateUser = async () => {
      try {
        const token = await getToken(); // Ambil token dari localStorage
        if (!token) {
          toast.error('User not logged in.');
          router.push('/sign-in'); // Redirect ke halaman login jika token tidak ditemukan
          return;
        }

        const decodedToken = jwtDecode<DecodedToken>(token);
        if (decodedToken.role !== 'developer') {
          toast.error('Access denied. Only candidates can view this page.');
          router.push('/unauthorized'); // Redirect jika bukan role candidate
          return;
        }

        setUserRole(decodedToken.role); // Set user role
      } catch (error) {
        console.error('Failed to validate user:', error);
        toast.error('Invalid token or user not authorized.');
        router.push('/sign-in');
      } finally {
        setLoading(false);
      }
    };

    validateUser();
  }, [router]);
  
  if (loading) {
    return <p>Loading...</p>;
  }

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