import moment from 'moment';
import { OverviewItem } from '@/app/job-page/[id]/OverviewItem';
import {
  FiCalendar,
  FiBook,
  FiDollarSign,
  FiMapPin,
  FiBriefcase,
  FiGrid,
} from 'react-icons/fi';
import { getLabel } from '@/utils/getLabel';
import {
  getJobTypeName,
  jobEducationLevels,
  jobExperienceLevels,
  jobCategories,
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
        value={job.jobExpired_at !== null ? moment(job.jobExpired_at).format('DD MMMM, YYYY') : "No Expire Date provided" }
      />
      <OverviewItem
        icon={<FiGrid />}
        label="Job Function"
        value={getLabel(jobCategories, job.jobCategory)}
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
            : 'Compensation to Be Determined'
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
