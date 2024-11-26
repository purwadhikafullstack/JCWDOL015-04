'use client';

import { useEffect, useState } from 'react';
import { FiBookmark } from 'react-icons/fi';
import { fetchFavoriteJobs } from '@/lib/job';
import { FavoriteJob } from '@/types/job';
import moment from 'moment';
import Link from 'next/link';
import { getUserInfo } from '@/lib/user';
import Image from 'next/image';

const FavoriteJobsTab = () => {
  const [favoriteJobs, setFavoriteJobs] = useState<FavoriteJob[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      const userResponse = await getUserInfo();
      if (userResponse.ok && userResponse.user) {
        const userId = userResponse.user.user_id;
        const jobs = await fetchFavoriteJobs(userId);
        setFavoriteJobs(jobs);
      } else {
      }
    };
  
    fetchData();
  }, []);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = favoriteJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(favoriteJobs.length / jobsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Favorite Jobs</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>No.</th>
              <th>Job</th>
              <th>Date Saved</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentJobs.length > 0 ? (
              currentJobs.map((favorite, index) => (
                <tr key={favorite.id} className="hover:bg-gray-200">
                  <td>{indexOfFirstJob + index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          {favorite.job.company.logo ? (
                            <Image
                              src={favorite.job.company.logo}
                              width={48}
                              height={48}
                              alt={`${favorite.job.company.company_name} logo`}
                              className="object-cover h-full w-full"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-400">
                              <FiBookmark className="text-3xl" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{favorite.job.job_title}</div>
                        <div className="text-sm opacity-50">{favorite.job.location}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="block lg:hidden">
                      {moment(favorite.created_at).format('D MMM, YYYY')}
                      <br />
                      {moment(favorite.created_at).format('h:mm A')}
                    </span>
                    <span className="hidden lg:block">
                      {moment(favorite.created_at).format('D MMM, YYYY | h:mm A')}
                    </span>
                  </td>
                  <td>
                    <Link href={`/job-page/${favorite.job.job_id}`}>
                      <button className="btn btn-ghost btn-xs">View Job</button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center">
                  No favorite jobs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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

export default FavoriteJobsTab;