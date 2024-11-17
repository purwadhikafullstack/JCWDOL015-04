import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { supabase } from '@/lib/supabaseClient';
import { useAppDispatch } from '@/redux/hooks';
import { loginAction } from '@/redux/slice/authorSlice';
import { useRouter } from 'next/navigation';
import { base_url } from '@/lib/user';
import { createToken } from '@/lib/server';

export const useSocialLogin = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleFacebookLogin = async () => {
    try {
      await supabase.auth.signInWithOAuth({ provider: 'facebook' });
    } catch (error) {
      toast.error('Failed to sign in with Facebook.');
    }
  };

  const handleGoogleLogin = async () => {
    toast.info('Google login is not yet implemented.');
  };

  const processSocialLogin = async (session: any) => {
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
        toast.dismiss();
        toast.success('Login successful!');
        dispatch(loginAction(result.user));
        createToken(result.token);
        router.push('/');
      } else {
        toast.error(result.msg || 'Social login failed.');
      }
    } catch (error) {
      console.error('Error during social login:', error);
      toast.error('Error while saving user data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN') {
          processSocialLogin(session);
        }
      },
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return { handleFacebookLogin, handleGoogleLogin, loading };
};
