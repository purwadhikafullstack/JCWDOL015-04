import Image from 'next/image';
import Link from 'next/link';

// Importing the icons and arrows from the correct asset paths
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
          How JobPilot Helps You Find Your Dream Job
        </h2>

        <div className="relative flex flex-col lg:flex-row items-center justify-around space-y-8 lg:space-y-0 lg:space-x-8">
          {/* Step 1: Create Account */}
          <div className="relative text-center flex flex-col items-center">
            <div className="p-6 mb-4">
              <Image
                src={IconCreateAccount}
                alt="Create Account"
                width={120}
                height={120}
              />
            </div>
            <h3 className="text-lg font-semibold">Create account</h3>
            <p className="text-gray-500 text-sm">
              Aliquam facilisis egestas sapien, nec tempor leo tristique at.
            </p>
          </div>

          {/* Arrow Down: Create Account -> Upload CV */}
          <div className="absolute z-50 top-10 left-[220px] hidden lg:block">
            <Image src={ArrowDown} alt="Arrow Down" width={200} height={200} />
          </div>

          {/* Step 2: Upload CV/Resume */}
          <div className="relative text-center flex flex-col items-center lg:w-1/4 lg:bg-white lg:py-8 lg:px-6 lg:rounded-lg lg:shadow-lg">
            <div className="p-6 mb-4">
              <Image
                src={IconUploadCV}
                alt="Upload CV/Resume"
                width={120}
                height={120}
              />
            </div>
            <h3 className="text-lg font-semibold">Upload CV/Resume</h3>
            <p className="text-gray-500 text-sm">
              Curabitur sit amet maximus ligula. Nam a nulla ante. Nam sodales.
            </p>
          </div>

          {/* Arrow Up: Upload CV -> Find Suitable Job */}
          <div className="absolute top-36 left-[580px] z-50 hidden lg:block">
            <Image src={ArrowUp} alt="Arrow Up" width={200} height={200} />
          </div>

          {/* Step 3: Find Suitable Job */}
          <div className="relative text-center flex flex-col items-center">
            <div className="p-6 mb-4">
              <Image
                src={IconFindJob}
                alt="Find Suitable Job"
                width={120}
                height={120}
              />
            </div>
            <h3 className="text-lg font-semibold">Find suitable job</h3>
            <p className="text-gray-500 text-sm">
              Phasellus quis eleifend ex. Morbi nec fringilla nibh.
            </p>
          </div>

          {/* Arrow Down: Find Suitable Job -> Apply Job */}
          <div className="absolute z-50 top-10 right-[278px] hidden lg:block">
            <Image src={ArrowDown} alt="Arrow Down" width={225} height={225} />
          </div>

          {/* Step 4: Apply for Job */}
          <div className="relative text-center flex flex-col items-center">
            <div className="p-6 mb-4">
              <Image
                src={IconApplyJob}
                alt="Apply Job"
                width={120}
                height={120}
              />
            </div>
            <h3 className="text-lg font-semibold">Apply job</h3>
            <p className="text-gray-500 text-sm">
              Curabitur sit amet maximus ligula. Nam a nulla ante, Nam sodales
              purus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
