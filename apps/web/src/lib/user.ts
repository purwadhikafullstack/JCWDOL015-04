
import { jwtDecode } from 'jwt-decode';
import { IUserLogin, IUserReg, IUserVerify } from '@/types/iuser';
import { getToken } from './server';

export const base_url = process.env.NEXT_PUBLIC_BASE_API_URL

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
      return {
        result: { status: 'error', msg: 'Unexpected response format' },
        ok: false,
      };
    }
  } catch (error) {
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
      return {
        result: { status: 'error', msg: 'Unexpected response format' },
        ok: false,
      };
    }
  } catch (error) {
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
    const token = await getToken();
    if (!token) {
      return { user: null, ok: false };
    }

    const decoded: any = jwtDecode(token);
    const userId = decoded?.user_id;

    if (!userId) {
      return { user: null, ok: false };
    }

    const res = await fetch(`${base_url}/user/${userId}`, { cache: 'no-cache' });
    const result = await res.json();
    return { result, user: result.user, ok: res.ok };
  } catch (error) {
    return { user: null, ok: false };
  }
};

export const updateUserInfo = async (data: FormData): Promise<{ result: any; ok: boolean }> => {
  try {
    const token = await getToken();
    const res = await fetch(`${base_url}/user/update`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    const result = await res.json();
    return { result, ok: res.ok };
  } catch (error) {
    return { result: { status: 'error', msg: 'An error occurred on updating profile, maybe image too large maximum 1MB' }, ok: false };
  }
};

export const updateUserCredential = async (data: { email?: string; phone?: string; currentPassword?: string; Newpassword?: string; Confirmpassword?: string }) => {
  try {
    const token = await getToken();
    const res = await fetch(`${base_url}/user/update`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    return { result, ok: res.ok };
  } catch (error) {
    return { result: { status: 'error', msg: 'An error occurred' }, ok: false };
  }
};

export const deleteUserAccount = async (email: string, password: string) => {
  try {
    const token = await getToken();
    const response = await fetch(`${base_url}/user/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    return { ok: response.ok, result };
  } catch (error) {
    return { ok: false, result: { status: 'error', msg: 'An error occurred while deleting the account' } };
  }
};





export default base_url;
