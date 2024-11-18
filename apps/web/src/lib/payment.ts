import { DashboardMetrics, IConfirmPayment, ISubsPayment } from '@/types/payment';
import { getToken } from './server';

const base_url = process.env.BASE_URL_API

export const uploadPaymentProof = async (data: {
  subs_type_id: number;
  payment_proof: File;
}) => {
  try {
    const token = await getToken(); // Pastikan token valid
    if (!token) {
      throw new Error('No token found');
    }

    const formData = new FormData();
    formData.append('subscription_type_id', data.subs_type_id.toString());
    formData.append('file', data.payment_proof);

    const response = await fetch(`${base_url}/payment/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`, // Kirim token untuk autentikasi
      },
      body: formData, // Gunakan FormData untuk file upload
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'Failed to upload Payment Proof');
    }

    return { ok: true, data: await response.json() };
  } catch (error: any) {
    console.error('Error in uploadPaymentProof:', error.message);
    return { ok: false, error: error.message };
  }
};

export const confirmTransaction = async (
    transactionId: number,
    status: 'completed' | 'failed'
  ): Promise<{ success: boolean; error?: string }> => {
    if (!transactionId) {
      return { success: false, error: 'Transaction ID is required.' };
    }
  
    try {
      const token = await getToken();
      if (!token) {
        throw new Error('No token found. Please log in.');
      }
  
      const response = await fetch(`${base_url}/payment/confirm`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transaction_id: transactionId, status }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to confirm transaction');
      }
  
      return { success: true };
    } catch (error: any) {
      console.error('Error confirming transaction:', error);
      return { success: false, error: error.message };
    }
  };
  

export const fetchDashboardData = async (): Promise<{
    data?: DashboardMetrics;
    error?: string;
  }> => {
    try {
      const token = await getToken(); // Ambil token dari localStorage
  
      if (!token) {
        throw new Error('No token found. Please log in.');
      }
  
      const response = await fetch(`${base_url}/payment/dashboard`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to fetch dashboard data');
      }
  
      const data: DashboardMetrics = await response.json();
      return { data };
    } catch (error: any) {
      console.error('Error fetching dashboard data:', error);
      return { error: error.message };
    }
  };
  

  
  