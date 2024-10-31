// src/lib/auth.ts
import { supabase } from './supabaseClient';
import { loginAction } from '@/redux/slice/authorSlice'; // Make sure this import points to your slice file
import { useAppDispatch } from '@/redux/hooks';

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  if (error) {
    console.error('Error with Google sign-in:', error.message);
  }
  return data;
};

export const signInWithFacebook = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'facebook',
  });
  if (error) {
    console.error('Error with Facebook sign-in:', error.message);
  }
  return data;
};
