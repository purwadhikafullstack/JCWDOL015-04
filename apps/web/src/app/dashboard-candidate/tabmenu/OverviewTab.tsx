import { ReactNode, useEffect, useState } from 'react';
import { FiBriefcase, FiBookmark } from 'react-icons/fi';
import {
  fetchAppliedJobCount,
  fetchFavoriteJobCount,
  fetchRecentlyAppliedJobs,
} from '@/lib/applyJob';
import { getUserInfo } from '@/lib/user';
import { fetchUserBadgesById } from '@/lib/assessment'; // Import fungsi baru untuk mengambil badge
import BadgeSystem from '@/components/badgesystem';
import { RecentlyAppliedJob } from '@/types/job';
import moment from 'moment';
import Image from 'next/image';
import { getStatusLabel } from '@/utils/format';

interface OverviewTabProps {
  setSelectedTab: (tab: string) => void;
}

const OverviewTab = ({ setSelectedTab }: OverviewTabProps) => {
  const [userName, setUserName] = useState<string>('');
  const [userId, setUserId] = useState<string | null>(null);
  const [appliedJobCount, setAppliedJobCount] = useState<number>(0);
  const [favoriteJobCount, setFavoriteJobCount] = useState<number>(0);
  const [recentlyAppliedJobs, setRecentlyAppliedJobs] = useState<
    RecentlyAppliedJob[]
  >([]);
  const [hasBadge, setHasBadge] = useState<boolean>(false);

  const fetchUserBadges = async (user_id: string) => {
    try {
      const badges = await fetchUserBadgesById(user_id);
      setHasBadge(badges.length > 0);
    } catch (error) {
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await getUserInfo();
        if (userResponse.ok && userResponse.user) {
          const { first_name, last_name, user_id } = userResponse.user;
          setUserName(`${first_name} ${last_name}`);
          setUserId(user_id);

          const [appliedCount, favoriteCount, recentJobs] = await Promise.all([
            fetchAppliedJobCount(user_id),
            fetchFavoriteJobCount(user_id),
            fetchRecentlyAppliedJobs(user_id),
          ]);

          setAppliedJobCount(appliedCount);
          setFavoriteJobCount(favoriteCount);
          setRecentlyAppliedJobs(recentJobs.slice(0, 5));

          fetchUserBadges(user_id);
        }
      } catch (error) {
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-semibold">Hello, {userName}</h1>
          {userId && hasBadge && <BadgeSystem userId={userId} />}
        </div>
      </div>

      {/* Job Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 justify-center">
        <SummaryCard
          color="bg-blue-50"
          icon={<FiBriefcase className="text-blue-500 text-3xl" />}
          count={appliedJobCount}
          label="Applied jobs"
        />
        <SummaryCard
          color="bg-yellow-50"
          icon={<FiBookmark className="text-yellow-500 text-3xl" />}
          count={favoriteJobCount}
          label="Favorite jobs"
        />
      </div>

      {/* Recently Applied Jobs */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recently Applied</h2>
          <button
            onClick={() => setSelectedTab('appliedJobs')}
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
                <th>No.</th>
                <th>Job</th>
                <th>Date Applied</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentlyAppliedJobs.length > 0 ? (
                recentlyAppliedJobs.map((job, index) => (
                  <tr
                    key={job.application_id}
                    className="hover:bg-gray-200"
                    style={{ cursor: 'pointer' }}
                  >
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            {job.logo ? (
                              <Image
                                src={job.logo}
                                width={48}
                                height={48}
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
                          <div className="text-sm opacity-50">
                            {job.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="block lg:hidden">
                        {moment(job.date_applied).format('D MMM, YYYY')}
                        <br />
                        {moment(job.date_applied).format('h:mm A')}
                      </span>
                      <span className="hidden lg:block">
                        {moment(job.date_applied).format(
                          'D MMM, YYYY | h:mm A',
                        )}
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
      </div>
    </div>
  );
};

interface SummaryCardProps {
  color: string;
  icon: ReactNode;
  count: number;
  label: string;
}

const SummaryCard = ({ color, icon, count, label }: SummaryCardProps) => (
  <div
    className={`p-4 ${color} rounded-lg flex items-center space-x-4 shadow-sm`}
  >
    {icon}
    <div>
      <h2 className="text-2xl font-bold">{count}</h2>
      <p className="text-gray-600">{label}</p>
    </div>
  </div>
);

export default OverviewTab;
