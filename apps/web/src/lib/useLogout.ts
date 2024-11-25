import { useAppDispatch } from '@/redux/hooks';
import { logoutAction } from '@/redux/slice/authorSlice';
import { deleteToken } from '@/lib/server';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const useLogout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logout = async () => {
    toast.success('Logged out successfully!');
    await deleteToken();
    dispatch(logoutAction());
    router.push('/');
  };

  return logout;
};

export default useLogout;
