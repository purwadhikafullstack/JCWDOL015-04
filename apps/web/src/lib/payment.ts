import { ISubsPayment } from "@/types/payment";
import { getToken } from "./server";


const base_url = process.env.BASE_URL_API || 'http://localhost:8000/api';

export const uploadPaymentProof = async (
    subsPaymentProof: ISubsPayment,
  ): Promise<{ data?: any; error?: string; ok: boolean }> => {
    try {
      const token = await getToken();
      const response = await fetch(`${base_url}/payment/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Ensure the token is valid
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subsPaymentProof),
      });
  
      if (!response.ok) {
        throw new Error('Failed to upload Payment Proof');
      }
  
      const data = await response.json();
      return { data, ok: true };
    } catch (error) {
      console.error('Error creating Payment Proof:', error);
      return {
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        ok: false,
      };
    }
  };