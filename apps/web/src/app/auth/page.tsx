"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Error404 from '@/assets/page404.png'; // Ensure this path is correct

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4 lg:-mt-20 text-center">
      <Image src={Error404} alt="404 Illustration" className="max-w-md mb-8" />
      <h1 className="text-4xl font-semibold text-gray-800 mb-4">Oops! Login Required to access this page!</h1>
      <p className="text-gray-600 mb-6">
        Please login or Register to access this page or apply job!
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => router.push('/')}
          className="bg-blue-500 text-white px-6 py-2 rounded-md shadow hover:bg-blue-600 transition duration-200"
        >
          Home
        </button>
        <button
          onClick={() => router.push('/sign-in')}
          className="bg-white border border-gray-300 text-gray-800 px-6 py-2 rounded-md shadow hover:bg-gray-100 transition duration-200"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
