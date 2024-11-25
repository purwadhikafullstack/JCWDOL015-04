import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Link from 'next/link';
import SocialLoginButtons from './SocialLoginButtons';
import { useSignIn } from '@/hooks/useSignIn';

const SignInForm: React.FC = () => {
  const { email, setEmail, password, setPassword, showPassword, setShowPassword, handleSubmit } = useSignIn();

  return (
    <div className="w-full lg:w-1/2 bg-white py-12 lg:py-20 px-6 sm:px-12 flex flex-col justify-center relative">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto m-6 lg:mt-[-250px] md:mt-[-120px]">
        <h2 className="text-3xl pb-3 font-semibold">Sign in.</h2>
        <p className="text-sm text-gray-600 mb-4">
          Don’t have an account?{' '}
          <Link href="/sign-up" className="text-blue-600 hover:underline">
            Create Account
          </Link>
        </p>
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
            />
            <span onClick={() => setShowPassword(!showPassword)} className="absolute top-3 right-3 cursor-pointer text-gray-500">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
            <span className="text-gray-600 text-sm">Remember Me</span>
          </label>
          <Link href="/forgotpassword" className="text-blue-600 hover:underline">
            Forget password
          </Link>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-3 mt-6 rounded-md hover:bg-blue-700 transition">
          Sign In
        </button>
        <div className="text-center my-6 text-gray-500">or</div>
        <SocialLoginButtons />
      </form>
    </div>
  );
};

export default SignInForm;
