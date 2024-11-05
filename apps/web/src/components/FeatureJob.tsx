'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchJobs } from '@/services/jobService';
import { Job } from '@/types/job';
import SaveButton from '../assets/save-button.svg';
import SavedButton from '../assets/saved-button.svg';
import { JobCardProps } from '@/types/job';
import { FiImage } from 'react-icons/fi';
import { toggleSaveJob } from '@/lib/job'; // Import the toggleSaveJob function

const FeatureJob = () => {
  const [jobs, setJobs] = useState<JobCardProps[]>([]);

  const loadJobs = async () => {
    try {
      const jobFilters = { dateRange: 'latest' };
      const jobsData = await fetchJobs('latest', jobFilters);

      const formattedJobs = jobsData.slice(0, 6).map((job) => ({
        job_id: job.job_id,
        job_title: job.job_title,
        location: job.location,
        salary: job.salary !== undefined ? `$${job.salary}K` : null,
        company: {
          company_name: job.company.company_name,
          logo: job.company.logo || null,
        },
      }));

      setJobs(formattedJobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Jobs Nearby</h2>
          <Link
            href="/job-page"
            className="text-blue-600 font-semibold flex items-center hover:text-blue-700 transition-colors"
          >
            View All
            <span className="ml-2">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {jobs.map((job) => (
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

  const handleSaveClick = async () => {
    const response = await toggleSaveJob(job.job_id); // Call the toggleSaveJob function
    if (response.ok) {
      setIsSaved((prev) => !prev); // Toggle the saved state if the request was successful
    } else {
      console.error(response.msg);
    }
  };

  return (
    <div className="relative p-4 sm:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border hover:border-blue-500 flex flex-col sm:flex-row items-end sm:items-center justify-between space-y-4 sm:space-y-0">
      <div className="flex items-center space-x-4 w-full">
        {/* Company Logo */}
        {job.company.logo ? (
          <Image
            src={job.company.logo}
            alt={`${job.company.company_name} Logo`}
            width={80}
            height={80}
            className="rounded-sm flex-shrink-0"
          />
        ) : (
          <div className="w-20 h-20 bg-gray-300 flex items-center justify-center rounded-md text-gray-400 flex-shrink-0">
            <FiImage size={60} />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-semibold">{job.job_title}</h3>
          <p className="text-sm sm:text-base text-gray-500">
            {job.company.company_name}
          </p>
          <p className="text-sm text-gray-600">{job.location}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4 lg:w-full w-auto justify-between sm:justify-end lg:mt-2 mt-0">
        {/* Save Button */}
        <button
          onClick={handleSaveClick}
          className={`lg:p-1 p-1 rounded-md ${
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
        <Link href={`/job-page/${job.job_id}`}>
          <button className="bg-blue-600 text-white lg:px-6 lg:py-2 px-8 py-3 rounded-lg hover:bg-blue-700 transition-all w-auto">
            Apply Now →
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FeatureJob;