// job-page/[id]/JobOverview.tsx
import moment from 'moment';
import { OverviewItem } from '@/app/job-page/[id]/OverviewItem';
import {
  FiCalendar,
  FiBook,
  FiDollarSign,
  FiMapPin,
  FiBriefcase,
} from 'react-icons/fi';
import { getLabel } from '@/utils/getLabel';
import {
  getJobTypeName,
  jobEducationLevels,
  jobExperienceLevels,
} from '@/utils/format';

const JobOverview = ({ job }: any) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <h2 className="text-xl font-semibold mb-4">Job Overview</h2>
    <div className="space-y-4 text-gray-700">
      <OverviewItem
        icon={<FiCalendar />}
        label="Job Posted"
        value={moment(job.created_at).format('DD MMMM, YYYY')}
      />
      <OverviewItem
        icon={<FiCalendar />}
        label="Job Expire In"
        value={moment(job.updated_at).format('DD MMMM, YYYY')}
      />
      <OverviewItem
        icon={<FiBook />}
        label="Education"
        value={getLabel(jobEducationLevels, job.jobEducationLevel)}
      />
      <OverviewItem
        icon={<FiDollarSign />}
        label="Salary"
        value={
          job.salary !== null
            ? `$${Number(job.salary).toLocaleString()} / month`
            : 'Not provided'
        }
      />
      <OverviewItem
        icon={<FiMapPin />}
        label="Location"
        value={job.location || 'Location not available'}
      />
      <OverviewItem
        icon={<FiBriefcase />}
        label="Job Type"
        value={getJobTypeName(job.jobType)}
      />
      <OverviewItem
        icon={<FiBriefcase />}
        label="Experience"
        value={getLabel(jobExperienceLevels, job.jobExperience)}
      />
    </div>
  </div>
);

export default JobOverview;
