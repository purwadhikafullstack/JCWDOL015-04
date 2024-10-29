// job-page.tsx
'use client';

import { useEffect, useState } from 'react';
import JobFilterBar from './JobFilterBar';
import { fetchJobs } from '@/services/jobService';
import Card from '@/components/Card';
import { JobCardProps } from '@/types/job';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function JobListingsPage() {
  const [jobs, setJobs] = useState<JobCardProps[]>([]);
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

      if (lat !== undefined) jobFilters.lat = lat.toString();
      if (lng !== undefined) jobFilters.lng = lng.toString();
      jobFilters.radius = radius.toString();

      const jobsData = await fetchJobs(sortOrder, jobFilters);

      const formattedJobs = jobsData.map((job) => ({
        job_id: job.job_id,
        job_title: job.job_title,
        location: job.location,
        salary: job.salary ? `$${job.salary}K` : null,
        company: {
          company_name: job.company.company_name,
          logo: job.company.logo || null,
        },
      }));

      setJobs(formattedJobs || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
    }
  };

  // Load jobs on component mount and when sortOrder changes
  useEffect(() => {
    console.log('asc');
    loadJobs();
  }, [sortOrder]);

  const handleSearch = (filters: any) => {
    loadJobs(filters);
  };

  return (
    <ProtectedRoute requiredRole="candidate">
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
                <Card key={job.job_id} job={job} />
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
    </ProtectedRoute>
  );
}
