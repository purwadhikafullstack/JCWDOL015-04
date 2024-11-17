import { useState, useEffect, ReactNode } from 'react';
import { FiBriefcase, FiBookmark } from 'react-icons/fi';
import { getUserInfo } from '@/lib/user';
import { RecentlyPostedJob } from '@/types/job';
import { fetchRecentlyPostedJobs, fetchTotalJobsCount } from '@/lib/job';
import moment from 'moment';
import Image from 'next/image';

interface OverviewProps {
  setSelectedTab: (tab: string) => void;
}

const Overview = ({ setSelectedTab }: OverviewProps) => {
  const [userName, setUserName] = useState('');
  const [totalJobPostCount, setTotalJobPostCount] = useState(0);
  const [totalUserApplied, setTotalUserApplied] = useState(0);
  const [totalRevenueSubscription, setTotalRevenueSubscription] = useState(0);
  const [recentlyPostedJobs, setRecentlyPostedJobs] = useState<
    RecentlyPostedJob[]
  >([]);
  const [selectedJob, setSelectedJob] = useState<RecentlyPostedJob | null>(
    null,
  );

  useEffect(() => {
    const fetchData = async () => {
      const userResponse = await getUserInfo();
      if (userResponse.ok && userResponse.user) {
        setUserName(
          `${userResponse.user.first_name} ${userResponse.user.last_name}`,
        );

        const userId = userResponse.user.user_id;

        const jobCountResponse = await fetchTotalJobsCount(userId);
        if (jobCountResponse.ok) {
          setTotalJobPostCount(jobCountResponse.totalJobsCount);
        }

        setTotalUserApplied(238);
        setTotalRevenueSubscription(574000000);

        const recentJobsResponse = await fetchRecentlyPostedJobs(userId);
        if (recentJobsResponse.ok) {
          setRecentlyPostedJobs(recentJobsResponse.jobs.slice(0, 5));
        }
      } else {
      }
    };
    fetchData();
  }, []);

  const handleViewDetails = (job: RecentlyPostedJob) => {
    setSelectedJob(job);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-semibold">Hello, {userName}</h1>
        <p className="text-gray-600">Welcome to your dashboard</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 justify-center">
        <SummaryCard
          color="bg-blue-50"
          icon={<FiBriefcase className="text-blue-500 text-3xl" />}
          count={totalJobPostCount}
          label="Total Jobs Posted"
        />
        <SummaryCard
          color="bg-yellow-50"
          icon={<FiBookmark className="text-yellow-500 text-3xl" />}
          count={totalUserApplied}
          label="User Applied to Jobs"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recently Jobs</h2>
          <button
            onClick={() => setSelectedTab('ViewAllJobsPosted')}
            className="text-blue-600 font-semibold hover:text-blue-700 transition-colors flex items-center"
          >
            View All
            <span className="ml-2">→</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Job</th>
                <th>Date Posted</th>
                <th>Status</th>
                <th>Expiration</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentlyPostedJobs.length > 0 ? (
                recentlyPostedJobs.map((job) => (
                  <tr
                    key={job.job_id}
                    className="hover:bg-gray-200 cursor-pointer"
                  >
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            {job.logo ? (
                              <Image
                                src={job.logo}
                                alt={`${job.job_title || 'Job'} Logo`} // Using the reference for alt text structure
                                className="object-cover"
                                width={100} // Adjust dimensions as needed
                                height={100} // Adjust dimensions as needed
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
                          <div className="text-sm opacity-50">
                            {job.location}
                          </div>
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
                      <span>
                        {moment(job.jobExpired_at).format('D MMM, YYYY')}
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
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleViewDetails(job)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
                    No recently jobs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({
  color,
  icon,
  count,
  label,
}: {
  color: string;
  icon: ReactNode;
  count: number;
  label: string;
}) => {
  const formatNumber = (number: number) => {
    return number.toLocaleString();
  };

  return (
    <div
      className={`p-6 ${color} rounded-lg flex items-center space-x-4 shadow-lg`}
    >
      {icon}
      <div>
        <h2 className="text-2xl font-semibold">{formatNumber(count)}</h2>
        <p className="text-gray-600">{label}</p>
      </div>
    </div>
  );
};

export default Overview;
