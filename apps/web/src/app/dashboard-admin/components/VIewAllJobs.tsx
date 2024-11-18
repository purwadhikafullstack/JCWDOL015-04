'use client';

import { useEffect, useState } from 'react';
import { FiBriefcase } from 'react-icons/fi';
import { fetchRecentlyPostedJobs } from '@/lib/job';
import { getUserInfo } from '@/lib/user';
import { RecentlyPostedJob } from '@/types/job';
import moment from 'moment';

const ViewAllJobsPosted = () => {
  const [recentlyPostedJobs, setRecentlyPostedJobs] = useState<RecentlyPostedJob[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      const userResponse = await getUserInfo();
      if (userResponse.ok && userResponse.user) {
        const userId = userResponse.user.user_id;
        const recentJobs = await fetchRecentlyPostedJobs(userId);
        setRecentlyPostedJobs(recentJobs.jobs || []); 
      } else {
        console.error('Failed to fetch user info');
      }
    };

    fetchData();
  }, []);

  
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = recentlyPostedJobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(recentlyPostedJobs.length / jobsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <h2 id="posted-jobs" className="text-2xl font-semibold mb-4">
        Posted Jobs
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* Table Head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Job</th>
              <th>Date Posted</th>
              <th>Status</th>
              <th>Expiration</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentJobs.length > 0 ? (
              currentJobs.map((job, index) => (
                <tr key={job.job_id} className="hover:bg-gray-200">
                  <td>{indexOfFirstJob + index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          {job.logo ? (
                            <img
                              src={job.logo}
                              alt={`${job.job_title} logo`}
                              className="object-cover h-full w-full"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-400">
                              <FiBriefcase className="text-3xl" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{job.job_title}</div>
                        <div className="text-sm opacity-50">{job.location}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="block lg:hidden">
                      {moment(job.created_at).format('D MMM, YYYY')}
                    </span>
                    <span className="hidden lg:block">
                      {moment(job.created_at).format('D MMM, YYYY')}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${job.is_active ? 'badge-success' : 'badge-neutral'}`}
                    >
                      {job.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <span>{moment(job.jobExpired_at).format('D MMM, YYYY')}</span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-primary">View Details</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center">
                  No recently posted jobs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="btn btn-outline btn-sm"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="btn btn-outline btn-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ViewAllJobsPosted;
