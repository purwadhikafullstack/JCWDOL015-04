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
        // Redirect to the authentication page if user is not authenticated
        toast.info('Register or login to apply for this job!');
        router.push('/auth');
      } else if (requiredRole && role !== requiredRole) {
        // Redirect if user does not have the required role
        router.push('/');
      }
    }
  }, [isAuthenticated, role, router, requiredRole, isClient]);

  if (!isClient || !isAuthenticated || (requiredRole && role !== requiredRole)) {
    return null; // Prevents flashing protected content before redirect
  }

  return <>{children}</>;
};

export default ProtectedRoute;
