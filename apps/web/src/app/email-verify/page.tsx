'use client';

import Link from 'next/link';
import { useState } from 'react';

const EmailVerification = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full text-center m-5 mt-[-100px] lg:mt-[-350px] md:mt-[-325px]]">
        {/* Header */}
        <h2 className="text-3xl font-semibold mb-4">Email Verification</h2>
        <p className="text-gray-600 mb-8">
          We've sent a verification to <strong>emailaddress@gmail.com</strong> to verify your email address and activate your account.
        </p>

        {/* Input Field for Verification Code */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Verification Code"
            className="w-full p-3 border rounded-md focus:outline-none"
          />
        </div>

        {/* Verify Account Button */}
        <button className="w-full bg-blue-600 text-white py-3 mt-6 rounded-md hover:bg-blue-700 transition">
          Verify My Account
        </button>

        {/* Resend Link */}
        <p className="text-gray-500 mt-6">
          Didn’t receive any code?{' '}
          <Link href="#" className="text-blue-600 hover:underline">
            Resend
          </Link>
        </p>
      </div>
    </div>
  );
};

export default EmailVerification;