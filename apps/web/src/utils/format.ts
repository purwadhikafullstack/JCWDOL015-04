import Flag from 'react-world-flags';

export const toProperCase = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Country names mapping for conversion
export const getCountryName = (code: string): string => {
  const countryNames: { [key: string]: string } = {
    ID: 'Indonesia',
    SG: 'Singapore',
    MY: 'Malaysia',
    US: 'United States',
    GB: 'United Kingdom',
    DE: 'Germany',
    JP: 'Japan',
    CN: 'China',
  };
  return countryNames[code] || code; 
};

// Job category names mapping for display
export const getCategoryName = (category: string): string => {
  const categoryNames: { [key: string]: string } = {
    fullTime: 'Full-Time',
    partTime: 'Part-Time',
    freelance: 'Freelance',
    contractor: 'Contractor',
  };
  return categoryNames[category] || category;
};
