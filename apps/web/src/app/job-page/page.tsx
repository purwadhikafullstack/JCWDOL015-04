// job-page.tsx
'use client';

import { useEffect, useState } from 'react';
import JobFilterBar from './JobFilterBar';
import Link from 'next/link';
import { Job } from '@/types/job';
import { getCountryName, getJobTypeName } from '@/utils/format';
import { fetchJobs } from '@/services/jobService';

export default function JobListingsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [sortOrder, setSortOrder] = useState('latest');
  const [locationAccessDenied, setLocationAccessDenied] = useState(false);

  const loadJobs = async (
    filters = {},
    lat?: number,
    lng?: number,
    radius = 25,
  ) => {
    try {
      const jobFilters: { [key: string]: string | string[] } = {
        ...filters,
        dateRange: sortOrder,
      };

      const handleSortChange = (order: string) => {
        setSortOrder(order);
        console.log('Current sortOrder:', order); // Verify that the order changes
      };

      if (lat !== undefined) jobFilters.lat = lat.toString();
      if (lng !== undefined) jobFilters.lng = lng.toString();
      jobFilters.radius = radius.toString();

      const jobsData = await fetchJobs(sortOrder, jobFilters);
      setJobs(jobsData || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
    }
  };

  // Load jobs on component mount and when sortOrder changes
  useEffect(() => {
    loadJobs();
  }, [sortOrder]);

  const handleSearch = (filters: any) => {
    loadJobs(filters);
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        Find Your Dream Job
      </h1>

      <JobFilterBar
        onSearch={handleSearch}
        manualLocation={locationAccessDenied}
      />

      {/* Sort Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div className="flex space-x-2">
          <button
            onClick={() => setSortOrder('latest')}
            className={`p-2 rounded-md ${sortOrder === 'latest' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Latest
          </button>
          <button
            onClick={() => setSortOrder('oldest')}
            className={`p-2 rounded-md ${sortOrder === 'oldest' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Oldest
          </button>
        </div>
      </div>

      {/* Job Listings */}
      <div className="my-10 flex justify-center items-center w-full h-full">
        {jobs.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
            {jobs.map((job) => (
              <div
                key={job.job_id}
                className="p-4 bg-white rounded-lg shadow-md flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold">
                    {job.job_title}
                  </h2>
                  <p className="text-gray-500">{job.company.company_name}</p>
                  <p className="text-gray-500">{getJobTypeName(job.jobType)}</p>
                  <p className="text-gray-500">
                    {job.location}, {getCountryName(job.country)}
                  </p>
                </div>
                <Link
                  href={`/job-page/${job.job_id}`}
                  className="mt-4 text-blue-500 hover:underline self-start"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center w-full h-64 space-y-4">
            <span className="loading loading-bars loading-lg"></span>
            <p className="text-gray-500 text-center">
              No Jobs at the moment...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
