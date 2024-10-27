import Image from 'next/image';
import { FiImage } from 'react-icons/fi';
import SaveButton from '@/assets/save-button.svg';
import SavedButton from '@/assets/saved-button.svg';

const HeaderSection = ({ job, isSaved, handleSaveClick }: any) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
    <div className="flex items-center gap-4 w-full md:w-auto">
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

      {/* Job Title and Save Button in the same row on small screens */}
      <div className="flex-1 flex items-center justify-between gap-2">
        <div>
          <h1 className="text-lg md:text-2xl font-bold">{job.job_title}</h1>
          <p className="text-gray-500 text-sm md:text-base">{job.company.company_name}</p>
        </div>
        {/* Save Button next to Job Title on small screens */}
        <button
          onClick={handleSaveClick}
          className={`p-2 rounded-lg transition-all ${
            isSaved ? 'bg-blue-100 hover:bg-blue-200' : 'bg-gray-100 hover:bg-gray-200'
          } flex items-center justify-center`}
        >
          <Image
            src={isSaved ? SavedButton : SaveButton}
            alt={isSaved ? 'Saved' : 'Save job'}
            width={28}
            height={28}
            className="transition-transform transform hover:scale-105"
          />
        </button>
      </div>
    </div>
    
    {/* Apply Button */}
    <div className="flex items-center justify-center w-full lg:pl-1.5 md:w-auto mt-4 md:mt-0">
      <a
        href="#my_modal_8"
        className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition-all text-sm font-semibold whitespace-nowrap md:px-5 md:py-2"
      >
        Apply Now →
      </a>
    </div>
  </div>
);

export default HeaderSection;
