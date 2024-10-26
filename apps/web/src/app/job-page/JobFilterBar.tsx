import { useState, useEffect } from 'react';
import Select from 'react-select';
import { FaSearch } from 'react-icons/fa';
import Flag from 'react-world-flags';
import { GoLocation } from 'react-icons/go';

interface JobFilterBarProps {
  onSearch: (filters: { search: string; country: string; category: string }) => void;
  manualLocation: boolean;
}

const countryOptions = [
  { code: '', name: 'All Countries' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'SG', name: 'Singapore' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'DE', name: 'Germany' },
  { code: 'JP', name: 'Japan' },
  { code: 'CN', name: 'China' },
];

const mappedCountryOptions = countryOptions.map((country) => ({
  value: country.code,
  label: (
    <div className="flex items-center p-2.5">
      <Flag code={country.code || 'XX'} alt={country.name} className="mr-2 w-6 h-4" />
      <span>{country.name}</span>
    </div>
  ),
}));

export default function JobFilterBar({ onSearch, manualLocation }: JobFilterBarProps) {
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('');
  const [category, setCategory] = useState('');
  const [filtersApplied, setFiltersApplied] = useState(false);

  const handleSearchClick = () => {
    onSearch({ search, country, category });
    setFiltersApplied(Boolean(search || country || category));
  };

  const handleClearFilters = () => {
    setSearch('');
    setCountry('');
    setCategory('');
    setFiltersApplied(false);
    onSearch({ search: '', country: '', category: '' });
  };

  useEffect(() => {
    setFiltersApplied(Boolean(search || country || category));
  }, [search, country, category]);

  return (
    <div className="flex flex-col lg:flex-row lg:flex-wrap items-center bg-white p-4 sm:p-6 rounded-lg shadow-md space-y-4 lg:space-y-0 lg:space-x-4 w-full max-w-[100%]">
      {/* Job Title Search Input */}
      <div className="flex items-center flex-grow bg-white border border-gray-300 rounded-md p-2.5 sm:p-3 w-full lg:w-auto">
        <FaSearch className="text-blue-600 mr-2" />
        <input
          type="text"
          placeholder="Job title, Keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow focus:outline-none"
        />
      </div>

      {/* Country Select Dropdown (required if manualLocation is true) */}
      <div className="flex-grow lg:ml-4 w-full lg:w-auto">
        <Select
          options={mappedCountryOptions}
          placeholder={
            <div className="flex items-center p-2.5">
              <GoLocation className="text-blue-600 mr-2" />
              <span>{manualLocation ? 'Select Location' : 'Location'}</span>
            </div>
          }
          classNamePrefix="react-select"
          onChange={(option) => setCountry(option ? option.value : '')}
          isSearchable={false}
          styles={{
            container: (base) => ({ ...base, width: '100%' }),
            control: (base) => ({ ...base, minHeight: '44px' }),
          }}
        />
      </div>

      {/* Category Dropdown */}
      <div className="flex-grow lg:ml-4 w-full lg:w-auto">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-md p-2.5 sm:p-3 w-full"
        >
          <option value="">All Category</option>
          <option value="fullTime">Full-Time</option>
          <option value="partTime">Part-Time</option>
          <option value="contractor">Contract</option>
        </select>
      </div>

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
    </div>
  );
}
