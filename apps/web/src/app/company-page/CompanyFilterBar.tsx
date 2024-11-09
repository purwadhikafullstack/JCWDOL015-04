import { useState } from 'react';
import Select from 'react-select';
import { FaSearch } from 'react-icons/fa';
import { GoLocation } from 'react-icons/go';
import { FaChartBar } from 'react-icons/fa';
import Flag from 'react-world-flags';
import { CompanyFilterBarProps } from '@/types/company';
import { countryOptions, industryOptions } from '@/utils/format';

const CompanyFilterBar: React.FC<CompanyFilterBarProps> = ({ onSearch }) => {
    const [search, setSearch] = useState('');
    const [industry, setIndustry] = useState<string[]>([]);
    const [country, setCountry] = useState<string | null>(null);
    const [filtersApplied, setFiltersApplied] = useState(false);

    const handleSearchClick = () => {
        onSearch({ search, industry, country: country || '' });
        setFiltersApplied(Boolean(search || industry.length || country));
    };    

    const handleClearFilters = () => {
        setSearch('');
        setIndustry([]);
        setCountry(null);
        setFiltersApplied(false);
        onSearch({ search: '', industry: [], country: '' });
    };

    // Map countries to options with flags
    const mappedCountryOptions = countryOptions.map((country) => ({
        value: country.code,
        label: (
            <div className="flex items-center">
                <Flag code={country.code || 'XX'} alt={country.name} className="mr-2 w-6 h-4" />
                <span>{country.name}</span>
            </div>
        ),
    }));

    // Map industry options with icons
    const mappedIndustryOptions = industryOptions.map((industry) => ({
        value: industry.value,
        label: (
            <div className="flex items-center">
                <FaChartBar className="text-blue-600 mr-2" />
                <span>{industry.label}</span>
            </div>
        ),
    }));

    return (
        <div className="flex flex-col lg:flex-row lg:flex-wrap items-center bg-white p-4 sm:p-6 rounded-lg shadow-md space-y-4 lg:space-y-0 lg:space-x-4 w-full max-w-[100%]">
            {/* Search Input */}
            <div className="flex items-center flex-grow bg-white border border-gray-300 rounded-md p-2 sm:p-3 w-full lg:w-auto">
                <FaSearch className="text-blue-600 mr-2" />
                <input
                    type="text"
                    placeholder="Search by company name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-grow focus:outline-none"
                />
            </div>

            {/* Country Dropdown */}
            <div className="flex-grow lg:ml-4 w-full lg:w-auto">
                <Select
                    options={mappedCountryOptions}
                    isClearable
                    placeholder={
                        <div className="flex items-center">
                            <GoLocation className="text-blue-600 mr-2" />
                            <span>Select Country</span>
                        </div>
                    }
                    classNamePrefix="react-select"
                    onChange={(option) => setCountry(option ? option.value : null)}
                    value={
                        country ? mappedCountryOptions.find((option) => option.value === country) : null
                    }
                    isSearchable={false}
                    styles={{
                        container: (base) => ({ ...base, width: '100%' }),
                        control: (base) => ({ ...base, minHeight: '44px' }),
                    }}
                />
            </div>

            {/* Industry Type Multi-select Dropdown */}
            <div className="flex-grow lg:ml-2 w-full lg:w-auto">
                <Select
                    options={mappedIndustryOptions}
                    isMulti
                    placeholder={
                        <div className="flex items-center">
                            <FaChartBar className="text-blue-600 mr-2" />
                            <span>Select Industry</span>
                        </div>
                    }
                    classNamePrefix="react-select"
                    onChange={(selectedOptions) =>
                        setIndustry(selectedOptions ? selectedOptions.map((option) => option.value) : [])
                    }
                    value={mappedIndustryOptions.filter((option) => industry.includes(option.value))}
                    isSearchable={false}
                    styles={{
                        container: (base) => ({ ...base, width: '100%' }),
                        control: (base) => ({ ...base, minHeight: '49.5px' }),
                    }}
                />
            </div>

            {/* Search Button */}
            <button
                onClick={handleSearchClick}
                className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors mt-4 lg:mt-0 w-full lg:w-auto"
            >
                Search
            </button>

            {/* Clear Filters Button */}
            {filtersApplied && (
                <button
                    onClick={handleClearFilters}
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors mt-4 lg:mt-0 w-full lg:w-auto"
                >
                    Clear Filters
                </button>
            )}
        </div>
    );
};

export default CompanyFilterBar;
