'use client';
import moment from 'moment';
import { OverviewItem } from '@/app/job-page/[id]/OverviewItem'; // Adjust path as necessary
import {
  FaGlobe,
  FaEnvelope,
  FaPhone,
  FaPeopleArrows,
  FaBuilding,
} from 'react-icons/fa';
import { FaPeopleGroup } from 'react-icons/fa6';
import { MdDateRange } from 'react-icons/md';
import { getLabel } from '@/utils/getLabel';
import { industryOptions } from '@/utils/format';

const CompanyOverview = ({ company }: any) => (
  <div className="bg-white p-6">
    <h2 className="text-xl font-semibold mb-4">Company Overview</h2>
    <div className="space-y-4 text-gray-700">
      <OverviewItem
        icon={<MdDateRange />}
        label="Founded In"
        value={
          company.yearOfEstablish
            ? moment(company.yearOfEstablish).format('D MMM YYYY')
            : 'N/A'
        }
      />
      <OverviewItem
        icon={<FaPeopleGroup />}
        label="Team Size"
        value={
          company.TeamSize
            ? `${company.TeamSize.toLocaleString()} employee${company.TeamSize > 1 ? 's' : ''}`
            : 'N/A'
        }
      />
      <OverviewItem
        icon={<FaBuilding />}
        label="Industry Type"
        value={getLabel(industryOptions, company.IndustryType as string)}
      />
      <h2 className="text-lg font-bold mt-4">Contact Information</h2>
      <OverviewItem
        icon={<FaGlobe />}
        label="Website"
        value={company.website || 'N/A'}
      />
      <OverviewItem
        icon={<FaPhone />}
        label="Phone"
        value={company.phone || 'N/A'}
      />
      <OverviewItem
        icon={<FaEnvelope />}
        label="Email"
        value={company.email || 'N/A'}
      />
    </div>
  </div>
);

export default CompanyOverview;
