import { Dispatch } from 'redux';
import { toast } from 'react-toastify';
import { loginAction } from '@/redux/slice/authorSlice';
import { createToken } from '@/lib/server';
import { base_url } from '@/lib/user';
import { NextRouter } from 'next/router';

export const processSocialLogin = async (
  session: any,
  dispatch: Dispatch,
  router: NextRouter,
  setLoading: (value: boolean) => void
) => {
  if (!session) return;

  setLoading(true);
  const { user } = session;
  const userPayload = {
    email: user.email,
    first_name: user.user_metadata?.full_name?.split(' ')[0] || '',
    last_name: user.user_metadata?.full_name?.split(' ')[1] || '',
    profile_picture: user.user_metadata?.avatar_url || '',
  };

  try {
    const response = await fetch(`${base_url}/user/social-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userPayload),
    });

    const result = await response.json();
    if (result.status === 'ok') {
      toast.success('Login successful!');
      dispatch(loginAction(result.user));
      createToken(result.token);
      router.push('/');
    } else {
      toast.error(result.msg || 'Social login failed.');
    }
  } catch (error) {
    toast.error('Error while saving user data.');
  } finally {
    setLoading(false);
  }
};
