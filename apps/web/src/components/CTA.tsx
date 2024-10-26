'use client';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';

const CTA = () => {
  const isLoggedIn = useAppSelector((state) => !!state.user.role);

  if (isLoggedIn) return null;

  return (
    <div className="bg-slate-50 py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Become a Candidate */}
          <div className="p-8 bg-white rounded-lg shadow-lg flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Become a Candidate
              </h2>
              <p className="text-gray-600 mb-6">
                Start your journey by joining a network of top professionals.
                Build your profile, browse opportunities, and find the right
                match for your skills and ambitions.
              </p>
            </div>
            <Link href="/sign-up">
              <button className="bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-all">
                Register Now →
              </button>
            </Link>
          </div>

          {/* Become an Employer */}
          <div className="p-8 bg-[#0A65CC] rounded-lg shadow-lg flex flex-col justify-between text-white">
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Become an Employer
              </h2>
              <p className="mb-6">
                Connect with qualified candidates who fit your company's unique
                requirements. Post job openings, review applications, and build
                your dream team.
              </p>
            </div>
            <Link href="/sign-up">
              <button className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-all">
                Register Now →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
