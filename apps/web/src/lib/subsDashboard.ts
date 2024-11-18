import { DashboardData } from '@/types/subsDashboard';
import { getToken } from './server';

const base_url = process.env.BASE_URL_API

export const fetchSubsDashboardData = async (): Promise<{
  data?: DashboardData;
  error?: string;
}> => {
  try {
    const token = await getToken(); // Ambil token dari localStorage

    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const response = await fetch(`${base_url}/subscription/dashboard`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to fetch dashboard data');
    }

    const data: DashboardData = await response.json();
    return { data };
  } catch (error: any) {
    console.error('Error fetching dashboard data:', error);
    return { error: error.message };
  }
};

export const checkSubscriptionStatus = async (
  token: string,
): Promise<{ isActive: boolean; message?: string }> => {
  try {
    const response = await fetch(`${base_url}/subscription/check-active`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        isActive: false,
        message: errorData.message || 'Failed to fetch subscription status',
      };
    }

    const data = await response.json();
    return { isActive: data.isActive };
  } catch (error) {
    console.error('Error checking subscription status:', error);
    return {
      isActive: false,
      message: 'An error occurred while checking subscription status',
    };
  }
};




