import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, role } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(typeof window !== 'undefined');
  }, []);

  useEffect(() => {
    if (isClient) {
      if (!isAuthenticated) {
        toast.info('Register or login to view all features!');
        router.push('/auth');
      } else if (requiredRole && role !== requiredRole) {
        router.push('/');
        toast.error('Access denied. Only'+' '+ requiredRole +`'s can view this page.`);
      }
    }
  }, [isAuthenticated, role, router, requiredRole, isClient]);

  if (!isClient || !isAuthenticated || (requiredRole && role !== requiredRole)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
