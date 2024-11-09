import Link from 'next/link';
import {
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiTwitter,
  FiYoutube,
} from 'react-icons/fi';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* MyJob section */}
          <div>
            <h2 className="text-white text-lg font-bold mb-4">HireMe</h2>
            <p className="text-sm">
              Call now:{' '}
              <Link href="tel:3195550115" className="text-white">
                (319) 555-0115
              </Link>
            </p>
            <p className="text-sm">
              6391 Elgin St. Celina, Delaware 10299, New York, United States of
              America
            </p>
          </div>

          {/* Quick Link section */}
          <div>
            <h3 className="text-white text-md font-semibold mb-4">
              Quick Link
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Candidate section */}
          <div>
            <h3 className="text-white text-md font-semibold mb-4">Candidate</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/job-page" className="hover:text-white">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/company-page" className="hover:text-white">
                  Browse Employers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Candidate Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Employers section */}
          <div>
            <h3 className="text-white text-md font-semibold mb-4">Employers</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-white">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Browse Candidates
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Employers Dashboard
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Applications
                </Link>
              </li>
            </ul>
          </div>

          {/* Support section */}
          <div>
            <h3 className="text-white text-md font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-white">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
            {/* Copyright Text */}
            <p className="text-sm text-gray-500 mb-4 md:mb-0">
              © 2024 HireMe - Job Portal. All rights reserved.
            </p>

            {/* Social Media Icons */}
            <div className="flex justify-center md:justify-end space-x-4">
              <Link href="#">
                <FiFacebook
                  size={24}
                  className="text-gray-500 hover:text-white"
                />
              </Link>
              <Link href="#">
                <FiInstagram
                  size={24}
                  className="text-gray-500 hover:text-white"
                />
              </Link>
              <Link href="#">
                <FiLinkedin
                  size={24}
                  className="text-gray-500 hover:text-white"
                />
              </Link>
              <Link href="#">
                <FiTwitter
                  size={24}
                  className="text-gray-500 hover:text-white"
                />
              </Link>
              <Link href="#">
                <FiYoutube
                  size={24}
                  className="text-gray-500 hover:text-white"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
