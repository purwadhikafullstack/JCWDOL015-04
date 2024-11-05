
import { jwtDecode } from 'jwt-decode';
import { IUserLogin, IUserReg, IUserVerify, IUserState } from '@/types/iuser';
import { getToken } from './server';

export const base_url = process.env.BASE_URL_API || 'http://localhost:8000/api';

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
    const response = await fetch(`${base_url}/user/resend-verification`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data: IUserVerify & { message?: string } = await response.json();
    return { 
      message: data.message || 'Verification email resent successfully!', 
      ok: response.ok,
      is_verified: data.is_verified 
    };
  } catch (error: any) {
    return { message: error.message || 'An error occurred. Please try again.', ok: false, is_verified: false };
  }
};

export const getUserInfo = async () => {
  try {
    // Get token from cookies
    const token = await getToken();
    if (!token) {
      console.error('No token found');
      return { user: null, ok: false };
    }

    // Decode the token to get user ID
    const decoded: any = jwtDecode(token);
    const userId = decoded?.user_id;

    if (!userId) {
      console.error('Invalid token');
      return { user: null, ok: false };
    }

    // Fetch user info using the decoded user ID
    const res = await fetch(`${base_url}/user/${userId}`, { cache: 'no-cache' });
    const result = await res.json();
    return { result, user: result.user, ok: res.ok };
  } catch (error) {
    console.error('Error fetching user info:', error);
    return { user: null, ok: false };
  }
};

export default base_url;
