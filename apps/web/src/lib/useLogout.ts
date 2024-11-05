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
    await deleteToken(); // Call your token deletion logic
    dispatch(logoutAction()); // Dispatch the logout action
    router.push('/'); // Redirect to the home page
  };

  return logout;
};

export default useLogout;
