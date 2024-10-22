"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import SaveButton from '../assets/save-button.svg';
import SavedButton from '../assets/saved-button.svg';
import LogoApple from '../assets/company-logo/Logo-Apple.svg';
import LogoDribbble from '../assets/company-logo/Logo-Dribbble.svg';
import LogoFacebook from '../assets/company-logo/Logo-Facebook.svg';
import LogoFigma from '../assets/company-logo/Logo-Figma.svg';
import LogoFreepik from '../assets/company-logo/Logo-Freepik.svg';
import LogoGoogle from '../assets/company-logo/Logo-Google.svg';
import LogoUdemy from '../assets/company-logo/Logo-Udemy.svg';
import LogoUpwork from '../assets/company-logo/Logo-Upwork.svg';


interface JobCardProps {
  job_id: number;
  job_title: string;
  location: string;
  salary: string | null;
  company: {
    company_name: string;
    logo: string | null;
  };
}

interface FeatureJobProps {
  jobs?: JobCardProps[];
}

const FeatureJob = ({ jobs = [] }: FeatureJobProps) => {
  const staticJobs = [
    {
      job_id: 1,
      job_title: 'Senior UX Designer',
      location: 'Australia',
      salary: '$30K-$35K',
      company: {
        company_name: 'Upwork',
        logo: LogoUpwork,
      },
    },
    {
      job_id: 2,
      job_title: 'Software Engineer',
      location: 'China',
      salary: '$50K-$60K',
      company: {
        company_name: 'Apple',
        logo: LogoApple,
      },
    },
    {
      job_id: 3,
      job_title: 'Junior Graphic Designer',
      location: 'Canada',
      salary: '$50K-$70K',
      company: {
        company_name: 'Figma',
        logo: LogoFigma,
      },
    },
    {
      job_id: 4,
      job_title: 'Product Designer',
      location: 'United States',
      salary: '$35K-$40K',
      company: {
        company_name: 'Udemy',
        logo: LogoUdemy,
      },
    },
    {
      job_id: 5,
      job_title: 'Marketing Officer',
      location: 'Germany',
      salary: '$50K-$90K',
      company: {
        company_name: 'Facebook',
        logo: LogoFacebook,
      },
    },
    {
      job_id: 6,
      job_title: 'Interaction Designer',
      location: 'France',
      salary: '$5K-$10K',
      company: {
        company_name: 'Google',
        logo: LogoGoogle,
      },
    },
  ];

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Jobs</h2>
          <Link href="/view-all" className="text-blue-600 font-semibold flex items-center hover:text-blue-700 transition-colors">
            View All
            <span className="ml-2">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {(jobs.length > 0 ? jobs : staticJobs).slice(0, 6).map((job: JobCardProps) => (
            <JobCard key={job.job_id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface JobCardComponentProps {
  job: JobCardProps;
}

const JobCard = ({ job }: JobCardComponentProps) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveClick = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div
      className="relative p-4 sm:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border hover:border-blue-500 flex flex-col sm:flex-row items-end sm:items-center justify-between space-y-4 sm:space-y-0"
    >
      <div className="flex items-center space-x-4 w-full">
        <Image
          src={job.company.logo || '/default-logo.png'}
          alt={job.company.company_name}
          width={80}
          height={80}
          className="object-contain"
        />
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-semibold">{job.job_title}</h3>
          <p className="text-sm text-gray-600">{job.location}</p>
          <p className="text-sm text-gray-600">{job.salary}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4 lg:w-full w-auto justify-between sm:justify-end lg:mt-2 mt-0">
        {/* Save Button */}
        <button
          onClick={handleSaveClick}
          className={`lg:p-2 p-3 rounded-lg ${
            isSaved ? 'bg-blue-100' : 'bg-gray-100'
          } hover:bg-blue-200 transition-all`}
        >
          <Image
            src={isSaved ? SavedButton : SaveButton}
            alt={isSaved ? 'Saved' : 'Save job'}
            width={24}
            height={24}
          />
        </button>

        {/* Apply Now Button */}
        <Link href={`/apply/${job.job_id}`}>
          <button className="bg-blue-600 text-white lg:px-6 lg:py-2 px-8 py-3 rounded-lg hover:bg-blue-700 transition-all w-auto">
            Apply Now →
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FeatureJob;