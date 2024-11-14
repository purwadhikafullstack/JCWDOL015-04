'use client';

import SignInForm from './components/SignInForm';
import SignInInfoSection from './components/SignInInfoSection';
import Loading from '@/components/loading';
import { useSignIn } from '@/hooks/useSignIn';
import { useSocialLogin } from '@/hooks/useSocialLogin';

const SignInPage: React.FC = () => {
  const { loading: signInLoading } = useSignIn();
  const { loading: socialLoginLoading } = useSocialLogin();

  if (signInLoading || socialLoginLoading) return <Loading />;

  return (
    <div className="min-h-screen flex bg-white">
      <SignInForm />
      <SignInInfoSection />
    </div>
  );
};

export default SignInPage;
