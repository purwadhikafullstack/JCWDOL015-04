import React from 'react';
import Select from 'react-select';
import Flag from 'react-world-flags';

const countries = [
  { code: 'ID', name: 'Indonesia' },
  { code: 'SG', name: 'Singapore' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'DE', name: 'Germany' },
  { code: 'JP', name: 'Japan' },
  { code: 'CN', name: 'China' },
];

// Format the options for react-select
const countryOptions = countries.map(country => ({
  value: country.name,
  label: (
    <div className="flex items-center">
      <Flag code={country.code} alt={country.name} className="mr-2 w-6 h-4" />
      <span>{country.name}</span>
    </div>
  ),
}));

const CountrySelector = () => {
  // Handle selection change
  const handleChange = (selectedOption: any) => {
    console.log('Selected Country:', selectedOption.value);
  };

  return (
    <div className="w-full max-w-sm">
      <Select
        options={countryOptions}
        onChange={handleChange}
        placeholder="Select a Country"
      />
    </div>
  );
};

export default CountrySelector;