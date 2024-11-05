import { JobCardProps } from '@/types/job';
import Link from 'next/link';
import Image from 'next/image';
import SaveButton from '../assets/save-button.svg';
import SavedButton from '../assets/saved-button.svg';
import { useState } from 'react';
import { FiImage } from 'react-icons/fi';
import { toggleSaveJob } from '@/lib/job';

interface CardProps {
  job: JobCardProps;
  isFavorited?: boolean;
}

const Card: React.FC<CardProps> = ({ job, isFavorited = false }) => {
  const [isSaved, setIsSaved] = useState(isFavorited);

  const handleSaveClick = async () => {
    const response = await toggleSaveJob(job.job_id);
    console.log(response); // Log the response to verify
    if (response.ok) {
      setIsSaved((prev) => !prev); // Toggle the saved state if successful
    } else {
      console.error(response.msg);
    }
  };

  return (
    <div className="relative lg:h-52 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 flex flex-col justify-between space-y-4 max-w-lg w-full">
      {/* Logo and Job Title */}
      <div className="flex items-start gap-4">
        {/* Company Logo */}
        {job.company.logo ? (
          <Image
            src={job.company.logo}
            alt={`${job.company.company_name} Logo`}
            width={80}
            height={80}
            className="rounded-full flex-shrink-0"
          />
        ) : (
          <div className="w-20 h-20 bg-gray-300 flex items-center justify-center rounded-full text-gray-400 flex-shrink-0">
            <FiImage size={40} />
          </div>
        )}

        {/* Job Information */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 break-words">
            {job.job_title}
          </h3>
          <p className="text-sm text-gray-500">{job.company.company_name}</p>
          <p className="text-sm text-gray-500">{job.location}</p>
          {job.salary && <p className="text-sm text-gray-500">{job.salary}</p>}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-4">
        {/* Save Button */}
        <button
          onClick={handleSaveClick}
          className={`p-1 rounded-md ${
            isSaved ? 'bg-blue-100' : 'bg-gray-100'
          } hover:bg-blue-200 transition-all`}
        >
          <Image
            src={isSaved ? SavedButton : SaveButton}
            alt={isSaved ? 'Saved' : 'Save job'}
            width={24}
            height={24}
          />
        </button>

        {/* Apply Now Button */}
        <Link href={`/job-page/${job.job_id}`}>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all text-sm font-medium">
            Apply Now →
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;