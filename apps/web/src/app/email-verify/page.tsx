'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { resendVerificationEmail } from '@/lib/user';
import { useRouter } from 'next/navigation';

const EmailVerification = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [counter, setCounter] = useState(0);
  const router = useRouter();

  const handleVerifyClick = async () => {
    if (!email) {
      toast.error('Email is required to verify the account.');
      return;
    }

    setLoading(true);

    try {
      const { message, ok, is_verified: verifiedStatus } = await resendVerificationEmail(email);

      if (verifiedStatus) {
        setIsVerified(true);
        toast.info('User is already verified.');
      } else if (ok) {
        toast.success('Verification email resent successfully!');
        setCounter(60);
        router.push('/sign-in');
      } else {
        toast.error(message || 'Failed to resend verification link.');
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      if (counter === 60) {
        toast.info(`You can resend the verification link in ${counter} seconds`);
      }

      return () => clearTimeout(timer);
    }
  }, [counter]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full text-center m-5 mt-[-100px] lg:mt-[-350px] md:mt-[-325px]]">
        <h2 className="text-3xl font-semibold mb-4">Email Verification</h2>
        <p className="text-gray-600 mb-8">
          We&apos;ve sent a verification to <strong>{email || 'your email address'}</strong> to verify your email address and activate your account.
        </p>

        {/* Input Field for Email */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none"
          />
        </div>

        {/* Verify Account Button */}
        <button
          onClick={handleVerifyClick}
          className="w-full bg-blue-600 text-white py-3 mt-6 rounded-md hover:bg-blue-700 transition"
          disabled={loading || counter > 0 || isVerified}
        >
          {loading ? 'Processing...' : 'Verify My Account'}
        </button>
      </div>
    </div>
  );
};

export default EmailVerification;
