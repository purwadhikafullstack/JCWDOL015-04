import Image from 'next/image';
import Link from 'next/link';

import IconApplyJob from '../assets/howitworks/Icon-ApplyJob.png';
import IconCreateAccount from '../assets/howitworks/Icon-create-account.png';
import IconFindJob from '../assets/howitworks/Icon-FindJob.png';
import IconUploadCV from '../assets/howitworks/Icon-UploadCV.png';
import ArrowDown from '../assets/howitworks/Arrows1.png';
import ArrowUp from '../assets/howitworks/Arrows2.png';

const HowItWorks = () => {
  return (
    <div className="bg-[#F1F2F4] py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          How HireMe Helps You Find Your Dream Job
        </h2>

        <div className="relative flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-8">
          {/* Step 1: Create Account */}
          <div className="relative text-center flex flex-col items-center py-8 px-6 transform transition duration-300 hover:bg-white hover:rounded-lg hover:shadow-lg hover:scale-105">
            <div className="p-6 mb-4">
              <Image
                src={IconCreateAccount}
                alt="Create Account"
                width={120}
                height={120}
              />
            </div>
            <h3 className="text-lg font-semibold">Create account</h3>
            <p className="text-gray-500 text-sm max-w-xs">
              Start your journey by creating a HireMe account. Get access to
              thousands of job opportunities tailored to your profile.
            </p>
          </div>

          {/* Arrow Down: Create Account -> Upload CV */}
          <div className="absolute z-50 top-10 left-[230px] hidden lg:block">
            <Image src={ArrowDown} alt="Arrow Down" width={200} height={200} />
          </div>

          {/* Step 2: Upload CV/Resume */}
          <div className="relative text-center flex flex-col items-center py-8 px-6 transform transition duration-300 hover:bg-white hover:rounded-lg hover:shadow-lg hover:scale-105">
            <div className="p-6 mb-4">
              <Image
                src={IconUploadCV}
                alt="Upload CV/Resume"
                width={120}
                height={120}
              />
            </div>
            <h3 className="text-lg font-semibold">Upload CV/Resume</h3>
            <p className="text-gray-500 text-sm max-w-xs">
              Showcase your skills by uploading your CV or resume. Highlight
              your experience and expertise to attract the right employers.
            </p>
          </div>

          {/* Arrow Up: Upload CV -> Find Suitable Job */}
          <div className="absolute top-36 left-[600px] z-50 hidden lg:block">
            <Image src={ArrowUp} alt="Arrow Up" width={200} height={200} />
          </div>

          {/* Step 3: Find Suitable Job */}
          <div className="relative text-center flex flex-col items-center py-8 px-6 transform transition duration-300 hover:bg-white hover:rounded-lg hover:shadow-lg hover:scale-105">
            <div className="p-6 mb-4">
              <Image
                src={IconFindJob}
                alt="Find Suitable Job"
                width={120}
                height={120}
              />
            </div>
            <h3 className="text-lg font-semibold">Find suitable job</h3>
            <p className="text-gray-500 text-sm max-w-xs">
              Explore jobs that match your skills. Use filters to find the best
              fit for your career goals.
            </p>
          </div>

          {/* Arrow Down: Find Suitable Job -> Apply Job */}
          <div className="absolute z-50 top-10 right-[250px] hidden lg:block">
            <Image src={ArrowDown} alt="Arrow Down" width={225} height={225} />
          </div>

          {/* Step 4: Apply for Job */}
          <div className="relative text-center flex flex-col items-center py-8 px-6 transform transition duration-300 hover:bg-white hover:rounded-lg hover:shadow-lg hover:scale-105">
            <div className="p-6 mb-4">
              <Image
                src={IconApplyJob}
                alt="Apply Job"
                width={120}
                height={120}
              />
            </div>
            <h3 className="text-lg font-semibold">Apply job</h3>
            <p className="text-gray-500 text-sm max-w-xs">
              Submit your application directly through HireMe!. Easily track
              your progress and stay updated on your application status.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
