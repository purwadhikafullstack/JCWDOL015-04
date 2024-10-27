'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Background from '../../assets/BG-CreateAccount.png';
import IconCompany from '../../assets/Icon-Company-Trans.png';
import IconJob from '../../assets/Icon-Job-Trans.png';
import IconFacebook from '../../assets/category/Icon-Facebook.png';
import IconGoogle from '../../assets/category/Icon-Google.png';

const ForgetPassword = () => {
  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 bg-white py-16 lg:py-28 px-6 sm:px-12 flex flex-col justify-center relative">
        {/* Form Section */}
        <div className="max-w-md mx-auto m-6 lg:mt-[-250px] md:mt-[-120px]">
          {/* Header */}
          <h2 className="text-3xl pb-3 font-semibold">Forget Password</h2>

          <p className="text-sm text-gray-600 mb-4">
            Go back to{' '}
            <Link href="/sign-in" className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </p>

          <p className="text-sm text-gray-600 mb-4">
            Don’t have an account?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:underline">
              Create Account
            </Link>
          </p>

          <p className="text-sm text-gray-600 mb-4">
            Verify your Account?{' '}
            <Link href="/email-verify" className="text-blue-600 hover:underline">
              Verify here
            </Link>
          </p>

          {/* Input Field */}
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-3 border rounded-md focus:outline-none"
            />
          </div>

          {/* Reset Password Button */}
          <button className="w-full bg-blue-600 text-white py-3 mt-6 rounded-md hover:bg-blue-700 transition">
            Reset Password
          </button>

          {/* Divider */}
          <div className="text-center my-6 text-gray-500">or</div>

          {/* Social Login Buttons */}
          <div className="flex space-x-6">
            <button className="w-full flex items-center justify-center bg-gray-100 p-3 rounded-md hover:bg-gray-200 transition">
              <Image src={IconFacebook} alt="Facebook" width={24} height={24} />
              <span className="ml-2 text-gray-700">Sign in with Facebook</span>
            </button>
            <button className="w-full flex items-center justify-center bg-gray-100 p-3 rounded-md hover:bg-gray-200 transition">
              <Image src={IconGoogle} alt="Google" width={24} height={24} />
              <span className="ml-2 text-gray-700">Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Section with Background */}
      <div
        className="hidden lg:block lg:w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${Background.src})` }}
      >
        <div className="absolute inset-0 flex flex-col justify-end items-center text-white pb-36 px-4">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Over 1,75,324 candidates
            </h2>
            <p className="text-xl lg:text-2xl font-light mt-4">
              waiting for good employees.
            </p>

            {/* Icons Section */}
            <div className="mt-12 flex justify-center space-x-8">
              <div className="text-center">
                <Image
                  src={IconJob}
                  alt="Live Jobs"
                  width={50}
                  height={50}
                  className="mx-auto"
                />
                <p className="text-lg font-bold mt-4">1,75,324</p>
                <p className="text-sm">Live Job</p>
              </div>
              <div className="text-center">
                <Image
                  src={IconCompany}
                  alt="Companies"
                  width={50}
                  height={50}
                  className="mx-auto"
                />
                <p className="text-lg font-bold mt-4">97,354</p>
                <p className="text-sm">Companies</p>
              </div>
              <div className="text-center">
                <Image
                  src={IconJob}
                  alt="New Jobs"
                  width={50}
                  height={50}
                  className="mx-auto"
                />
                <p className="text-lg font-bold mt-4">7,532</p>
                <p className="text-sm">New Jobs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
