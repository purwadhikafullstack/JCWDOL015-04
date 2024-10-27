import { useState, useEffect } from 'react';
import Select from 'react-select';
import { FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { GoLocation, GoStack } from 'react-icons/go';
import {
  jobTypeOptions,
  salaryRanges,
  jobCategories,
  jobEducationLevels,
  jobExperienceLevels,
} from '@/utils/format';
import { JobFilterBarProps } from '@/types/job';
import { mappedCountryOptions } from './jobFilterFunction';

export default function JobFilterBar({
  onSearch,
  manualLocation,
}: JobFilterBarProps) {
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('');
  const [jobType, setJobType] = useState<string[]>([]);
  const [salary, setSalary] = useState<string[]>([]);
  const [jobCategory, setJobCategory] = useState<string[]>([]);
  const [jobEducationLevel, setJobEducationLevel] = useState<string[]>([]);
  const [jobExperience, setJobExperience] = useState<string[]>([]);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleSearchClick = () => {
    onSearch({
      search,
      country,
      jobType,
      salary,
      jobCategory,
      jobEducationLevel,
      jobExperience,
    });
    setFiltersApplied(
      Boolean(
        search ||
          country ||
          jobType.length ||
          salary.length ||
          jobExperience.length ||
          jobCategory.length ||
          jobEducationLevel.length,
      ),
    );
  };

  const handleClearFilters = () => {
    setSearch('');
    setCountry('');
    setJobType([]);
    setSalary([]);
    setJobCategory([]);
    setJobEducationLevel([]);
    setJobExperience([]);
    setFiltersApplied(false);
    onSearch({
      search: '',
      country: '',
      jobType: [],
      salary: [],
      jobCategory: [],
      jobEducationLevel: [],
      jobExperience: [],
    });
  };

  useEffect(() => {
    setFiltersApplied(
      Boolean(
        search ||
          country ||
          jobType.length ||
          jobCategory.length ||
          jobEducationLevel.length ||
          jobExperience.length,
      ),
    );
  }, [search, country, jobType, jobCategory, jobEducationLevel, jobExperience]);

  return (
    <div className="flex flex-col lg:flex-row lg:flex-wrap items-center bg-white p-4 sm:p-6 rounded-lg shadow-md space-y-4 lg:space-y-0 lg:space-x-4 w-full max-w-[100%]">
      {/* Job Title Search Input */}
      <div className="flex items-center flex-grow bg-white border border-gray-300 rounded-md p-2 sm:p-3 w-full lg:w-auto">
        <FaSearch className="text-blue-600 mr-2" />
        <input
          type="text"
          placeholder="Job title, Keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow focus:outline-none"
        />
      </div>

      {/* Country Select Dropdown */}
      <div className="flex-grow lg:ml-4 w-full lg:w-auto">
        <Select
          options={mappedCountryOptions}
          isClearable
          placeholder={
            <div className="flex p-2.5 items-center">
              <GoLocation className="text-blue-600 mr-2" />
              <span>{manualLocation ? 'Select Location' : 'All Countries'}</span>
            </div>
          }
          classNamePrefix="react-select"
          onChange={(option) => setCountry(option ? option.value : '')}
          value={country ? mappedCountryOptions.find((option) => option.value === country) : null}
          isSearchable={false}
          styles={{
            container: (base) => ({ ...base, width: '100%' }),
            control: (base) => ({ ...base, minHeight: '44px' }),
          }}
        />
      </div>

      {/* Job Type Multi-select Dropdown */}
      <div className="flex-grow lg:ml-2 w-full lg:w-auto">
        <Select
          options={jobTypeOptions}
          isMulti
          placeholder={
            <div className="flex p-2.5 items-center">
              <GoStack className="text-blue-600 mr-2" />
              <span>{'Select Job Type'}</span>
            </div>
          }
          classNamePrefix="react-select"
          onChange={(selectedOptions) =>
            setJobType(selectedOptions ? selectedOptions.map((option) => option.value) : [])
          }
          value={jobTypeOptions.filter((option) => jobType.includes(option.value))}
          isSearchable={false}
          styles={{
            container: (base) => ({ ...base, width: '100%' }),
            control: (base) => ({ ...base, minHeight: '49.5px' }),
          }}
        />
      </div>

      {/* Advanced Search Toggle */}
      <button
        onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
        className="text-blue-600 font-medium lg:ml-4 flex items-center space-x-2"
      >
        <span>Advanced Filter</span>
        {showAdvancedFilters ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {/* Find Job Button */}
      <button
        onClick={handleSearchClick}
        className="bg-blue-600 text-white py-2 sm:py-3 px-6 sm:px-8 rounded-md hover:bg-blue-700 transition-colors mt-4 lg:mt-0 w-full lg:w-auto"
      >
        Find Job
      </button>

      {/* Clear Filter Button */}
      {filtersApplied && (
        <button
          onClick={handleClearFilters}
          className="bg-gray-300 text-gray-700 py-2 sm:py-3 px-4 sm:px-8 rounded-md hover:bg-gray-400 transition-colors mt-4 lg:mt-0 w-full lg:w-auto"
        >
          Clear Filter
        </button>
      )}

      {/* Advanced Filters Section */}
      {showAdvancedFilters && (
        <div className="w-full mt-10 p-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Salary Multi-select Filter */}
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Salary Range</h3>
            <Select
              options={salaryRanges}
              isMulti
              placeholder="Select Salary Range(s)"
              classNamePrefix="react-select"
              onChange={(selectedOptions) =>
                setSalary(selectedOptions ? selectedOptions.map((option) => option.value) : [])
              }
              value={salaryRanges.filter((option) => salary.includes(option.value))}
              isSearchable={false}
              styles={{
                container: (base) => ({ ...base, width: '100%' }),
                control: (base) => ({ ...base, minHeight: '44px' }),
              }}
            />
          </div>

          {/* Job Category Multi-select Filter */}
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Job Category</h3>
            <Select
              options={jobCategories}
              isMulti
              placeholder="Select Category(s)"
              classNamePrefix="react-select"
              onChange={(selectedOptions) =>
                setJobCategory(selectedOptions ? selectedOptions.map((option) => option.value) : [])
              }
              value={jobCategories.filter((option) => jobCategory.includes(option.value))}
              isSearchable={false}
              styles={{
                container: (base) => ({ ...base, width: '100%' }),
                control: (base) => ({ ...base, minHeight: '44px' }),
              }}
            />
          </div>

          {/* Education Level Multi-select Filter */}
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Education Level</h3>
            <Select
              options={jobEducationLevels}
              isMulti
              placeholder="Select Education Level(s)"
              classNamePrefix="react-select"
              onChange={(selectedOptions) =>
                setJobEducationLevel(
                  selectedOptions ? selectedOptions.map((option) => option.value) : []
                )
              }
              value={jobEducationLevels.filter((option) => jobEducationLevel.includes(option.value))}
              isSearchable={false}
              styles={{
                container: (base) => ({ ...base, width: '100%' }),
                control: (base) => ({ ...base, minHeight: '44px' }),
              }}
            />
          </div>

          {/* Experience Level Multi-select Filter */}
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Experience Level</h3>
            <Select
              options={jobExperienceLevels}
              isMulti
              placeholder="Select Experience Level(s)"
              classNamePrefix="react-select"
              onChange={(selectedOptions) =>
                setJobExperience(selectedOptions ? selectedOptions.map((option) => option.value) : [])
              }
              value={jobExperienceLevels.filter((option) => jobExperience.includes(option.value))}
              isSearchable={false}
              styles={{
                container: (base) => ({ ...base, width: '100%' }),
                control: (base) => ({ ...base, minHeight: '44px' }),
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
