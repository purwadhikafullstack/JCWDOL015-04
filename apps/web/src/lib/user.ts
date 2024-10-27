// lib/user.ts
import { IUserLogin, IUserReg, IUserVerify } from '@/types/iuser';

const base_url = process.env.BASE_URL_API || 'http://localhost:8000/api';

export const regUser = async (data: IUserReg) => {
  try {
    const res = await fetch(`${base_url}/user`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const contentType = res.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      const result = await res.json();
      return { result, ok: res.ok };
    } else {
      const text = await res.text();
      console.error('Unexpected response format:', text);
      return {
        result: { status: 'error', msg: 'Unexpected response format' },
        ok: false,
      };
    }
  } catch (error) {
    console.error('Error in regUser:', error);
    return { result: { status: 'error', msg: 'An error occurred' }, ok: false };
  }
};

export const loginUser = async (data: IUserLogin) => {
  try {
    const res = await fetch(`${base_url}/user/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const contentType = res.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      const result = await res.json();
      return { result, ok: res.ok };
    } else {
      const text = await res.text();
      console.error('Unexpected response format:', text);
      return {
        result: { status: 'error', msg: 'Unexpected response format' },
        ok: false,
      };
    }
  } catch (error) {
    console.error('Error in loginUser:', error);
    return { result: { status: 'error', msg: 'An error occurred' }, ok: false };
  }
};

export const verifyUser = async (token: string) => {
  const res = await fetch(`${base_url}/user/verify`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await res.json();
  return { result, ok: res.ok };
};

export const resendVerificationEmail = async (email: string): Promise<{ message: string; ok: boolean; is_verified: boolean }> => {
  try {
    console.log('Calling resendVerificationEmail with email:', email);
    const response = await fetch(`${base_url}/user/resend-verification`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    console.log('Response status:', response.status);
    const data: IUserVerify & { message?: string } = await response.json();
    console.log('Response data:', data);

    return { 
      message: data.message || 'Verification email resent successfully!', 
      ok: response.ok,
      is_verified: data.is_verified 
    };
  } catch (error: any) {
    console.error('Error in resendVerificationEmail:', error.message);
    return { message: error.message || 'An error occurred. Please try again.', ok: false, is_verified: false };
  }
};



export default base_url;
