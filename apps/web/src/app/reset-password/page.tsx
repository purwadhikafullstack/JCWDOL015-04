'use client';

import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ResetPassword = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full text-center m-6 mt-[-80px] lg:mt-[-280px] md:mt-[-280px]">
        {/* Header */}
        <h2 className="text-3xl font-semibold mb-4">Reset Password</h2>
        <p className="text-gray-600 mb-8">
          Enter and confirm your new password below to securely update your
          account. Make sure your new password is strong and unique.
        </p>

        {/* Input Fields */}
        <div className="space-y-4">
          {/* New Password Field with Visibility Toggle */}
          <div className="relative">
            <input
              type={showNewPassword ? 'text' : 'password'}
              placeholder="New Password"
              className="w-full p-3 border rounded-md focus:outline-none"
            />
            <span
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute top-3 right-3 cursor-pointer text-gray-500"
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Confirm Password Field with Visibility Toggle */}
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              className="w-full p-3 border rounded-md focus:outline-none"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-3 right-3 cursor-pointer text-gray-500"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {/* Reset Password Button */}
        <button className="w-full bg-blue-600 text-white py-3 mt-6 rounded-md hover:bg-blue-700 transition">
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
