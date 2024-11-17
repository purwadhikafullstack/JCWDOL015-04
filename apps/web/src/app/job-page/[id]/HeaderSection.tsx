import Image from 'next/image';
import { FiImage } from 'react-icons/fi';
import SaveButton from '@/assets/save-button.svg';
import SavedButton from '@/assets/saved-button.svg';

const HeaderSection = ({ job, isSaved, handleSaveClick, hasApplied }: any) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
    <div className="flex items-center gap-4 w-full md:w-auto">
      {/* Company Logo */}
      {job.company.logo ? (
        <Image
          src={job.company.logo}
          alt={`${job.company.company_name} Logo`}
          width={60}
          height={60}
          className="rounded-full md:w-20 md:h-20"
        />
      ) : (
        <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-300 flex items-center justify-center rounded-full text-gray-400">
          <FiImage size={30} />
        </div>
      )}

      {/* Job Title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-lg md:text-2xl font-bold">{job.job_title}</h1>
        <p className="text-gray-500 text-sm md:text-base">
          {job.company.company_name}
        </p>
      </div>

      {/* Mobile-only Save Button (visible only on mobile) */}
      {!hasApplied && (
        <button
          onClick={handleSaveClick}
          className={`flex md:hidden p-2 mr-4 rounded-lg transition-all mt-4 ${
            isSaved
              ? 'bg-blue-100 hover:bg-blue-200'
              : 'bg-gray-100 hover:bg-gray-200'
          } items-center justify-center`}
        >
          <Image
            src={isSaved ? SavedButton : SaveButton}
            alt={isSaved ? 'Saved' : 'Save job'}
            width={24}
            height={24}
            className="transition-transform transform hover:scale-105"
          />
        </button>
      )}
    </div>

    {/* Save and Apply Button Section */}
    <div className="flex flex-col md:flex-row items-center md:items-center md:space-x-2 w-full md:w-auto">
      {/* Save Button (hidden on mobile) */}
      {!hasApplied && (
        <button
          onClick={handleSaveClick}
          className={`hidden md:flex w-10 h-10 rounded-lg transition-all mb-2 md:mb-0 ${
            isSaved
              ? 'bg-blue-100 hover:bg-blue-200'
              : 'bg-gray-100 hover:bg-gray-200'
          } items-center justify-center`}
        >
          <Image
            src={isSaved ? SavedButton : SaveButton}
            alt={isSaved ? 'Saved' : 'Save job'}
            width={24}
            height={24}
            className="transition-transform transform hover:scale-105"
          />
        </button>
      )}

      {/* Conditionally Render the Apply Button */}
      {hasApplied ? (
        <button
          className="bg-gray-400 text-white w-full md:w-auto px-5 py-3 rounded-lg cursor-not-allowed transition-all text-sm font-semibold"
          disabled
        >
          Applied
        </button>
      ) : (
        <a
          href="#my_modal_8"
          className="bg-blue-600 text-white w-full md:w-auto px-5 py-3 rounded-lg hover:bg-blue-700 transition-all text-sm font-semibold text-center md:text-left whitespace-nowrap"
        >
          Apply Now →
        </a>
      )}
    </div>
  </div>
);

export default HeaderSection;
