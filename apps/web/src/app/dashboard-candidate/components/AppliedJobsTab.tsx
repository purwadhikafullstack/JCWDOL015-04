// src/app/dashboard-candidate/components/AppliedJobsTab.tsx
'use client';

import { useEffect, useState } from 'react';
import { FiBriefcase } from 'react-icons/fi';
import { fetchRecentlyAppliedJobs } from '@/lib/applyJob';
import { getUserInfo } from '@/lib/user';
import { RecentlyAppliedJob } from '@/types/job';
import moment from 'moment';
import { getStatusLabel } from '@/utils/format';

const AppliedJobsTab = () => {
  const [recentlyAppliedJobs, setRecentlyAppliedJobs] = useState<
    RecentlyAppliedJob[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      // Fetch user info to get the userId
      const userResponse = await getUserInfo();
      if (userResponse.ok && userResponse.user) {
        const userId = userResponse.user.user_id;

        // Fetch recently applied jobs using userId
        const recentJobs = await fetchRecentlyAppliedJobs(userId);
        setRecentlyAppliedJobs(recentJobs);
      } else {
        console.error('Failed to fetch user info');
      }
    };

    fetchData();
  }, []);

  // Calculate the jobs to display on the current page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = recentlyAppliedJobs.slice(
    indexOfFirstJob,
    indexOfLastJob,
  );

  // Determine the total number of pages
  const totalPages = Math.ceil(recentlyAppliedJobs.length / jobsPerPage);

  // Handle page navigation
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <h2 id="applied-jobs" className="text-2xl font-semibold mb-4">
        Applied Jobs
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* Table Head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Job</th>
              <th>Date Applied</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentJobs.length > 0 ? (
              currentJobs.map((job, index) => (
                <tr
                  key={job.application_id}
                  className="hover:bg-gray-200"
                  style={{ cursor: 'pointer' }}
                >
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
                      {/* Display with line break on small screens */}
                      {moment(job.date_applied).format('D MMM, YYYY')}
                      <br />
                      {moment(job.date_applied).format('h:mm A')}
                    </span>
                    <span className="hidden lg:block">
                      {/* Display in a single line on larger screens */}
                      {moment(job.date_applied).format('D MMM, YYYY | h:mm A')}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1.5 leading-tight whitespace-nowrap ${
                        job.status === 'active'
                          ? 'badge-success'
                          : job.status === 'under_review'
                            ? 'badge-warning'
                            : job.status === 'interview'
                              ? 'badge-warning'
                              : job.status === 'pending'
                                ? 'badge-warning'
                                : job.status === 'accepted'
                                  ? 'badge-warning'
                                  : job.status === 'rejected'
                                    ? 'badge-error'
                                    : job.status === 'hired'
                                      ? 'badge-primary'
                                      : 'badge-neutral'
                      }`}
                    >
                      {getStatusLabel(job.status)}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">
                  No recently applied jobs found
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

export default AppliedJobsTab;
