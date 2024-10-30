'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Background from '../../assets/BG-CreateAccount.png';
import IconCompany from '../../assets/Icon-Company-Trans.png';
import IconJob from '../../assets/Icon-Job-Trans.png';
import IconFacebook from '../../assets/category/Icon-Facebook.png';
import IconGoogle from '../../assets/category/Icon-Google.png';
import { loginUser } from '@/lib/user';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { createToken } from '@/lib/server';
import { loginAction } from '@/redux/slice/authorSlice';
import { useAppDispatch } from '@/redux/hooks';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      setIsValid(false);
      return;
    }

    const loginData = { email, password };

    try {
      const { result, ok } = await loginUser(loginData);

      if (ok) {
        toast.success('Login successful!');
        dispatch(
          loginAction({
            user_id: result.user.user_id,
            first_name: result.user.first_name,
            last_name: result.user.last_name,
            profile_picture: result.user.profile_picture || '',
            role: result.user.role,
          }),
        );
        createToken(result.token);
        router.push('/');
      } else {
        toast.error(result.msg || 'Login failed. Please try again.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 bg-white py-12 lg:py-20 px-6 sm:px-12 flex flex-col justify-center relative">
        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto m-6 lg:mt-[-250px] md:mt-[-120px]"
        >
          <h2 className="text-3xl pb-3 font-semibold">Sign in.</h2>
          <p className="text-sm text-gray-600 mb-4">
            Don’t have an account?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:underline">
              Create Account
            </Link>
          </p>
          {/* Input Fields */}
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-3 border rounded-md focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="w-full p-3 border rounded-md focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-3 cursor-pointer text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          {/* Remember Me and Forgot Password */}
          <div className="flex justify-between items-center mt-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-gray-600 text-sm">Remember Me</span>
            </label>
            <Link
              href="/forgotpassword"
              className="text-blue-600 hover:underline"
            >
              Forget password
            </Link>
          </div>
          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 mt-6 rounded-md hover:bg-blue-700 transition"
          >
            Sign In
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
        </form>
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
export default SignIn;
