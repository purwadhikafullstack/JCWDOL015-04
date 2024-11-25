import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { loginUser } from '@/lib/user';
import { loginAction } from '@/redux/slice/authorSlice';
import { createToken } from '@/lib/server';

export const useSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error('Please enter email and password.');
      return;
    }

    try {
      setLoading(true);
      const { result, ok } = await loginUser({ email, password });
      
      if (ok) {
        toast.success('Login successful!');
        dispatch(loginAction(result.user));
        createToken(result.token);
        router.push('/');
      } else {
        toast.error(result.msg || 'Login failed. Please try again.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    email, setEmail, password, setPassword, showPassword, setShowPassword, handleSubmit, loading
  };
};
