import { PaymentTransaction, SubscriptionActive } from '@/types/userplanbill';
import { getToken } from './server';

const base_url = process.env.NEXT_PUBLIC_BASE_API_URL

export const fetchUserPayments = async (): Promise<{
    data?: PaymentTransaction[];
    error?: string;
  }> => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error('No token found. User not logged in.');
      }
  
      const response = await fetch(`${base_url}/plan-bill/payment`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to fetch payments.');
      }
  
      const { data }: { data: PaymentTransaction[] } = await response.json();
      return { data };
    } catch (error: any) {
      console.error('Error fetching payments:', error.message || error);
      return { error: error.message };
    }
  };
  

  export const fetchUserSubscriptions = async (): Promise<{
    data?: SubscriptionActive[];
    error?: string;
  }> => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error('No token found. User not logged in.');
      }
  
      const response = await fetch(`${base_url}/plan-bill/subscription`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to fetch subscriptions.');
      }
  
      const { data }: { data: SubscriptionActive[] } = await response.json();
      return { data };
    } catch (error: any) {
      console.error('Error fetching subscriptions:', error.message || error);
      return { error: error.message };
    }
  };
  
