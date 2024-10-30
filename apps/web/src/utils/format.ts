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
export const getJobTypeName = (jobType: string): string => {
  const typesNames: { [key: string]: string } = {
    fullTime: 'Full-Time',
    partTime: 'Part-Time',
    freelance: 'Freelance',
    contractor: 'Contractor',
  };
  return typesNames[jobType] || jobType;
};

export const countryOptions = [
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

export const jobTypeOptions = [
  { value: '', label: 'All Types' },
  { value: 'fullTime', label: 'Full-Time' },
  { value: 'partTime', label: 'Part-Time' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'contractor', label: 'Contractor' },
];

export const salaryRanges = [
  { value: '500-1000', label: '$500 - $1000' },
  { value: '1000-2000', label: '$1000 - $2000' },
  { value: '2000-3000', label: '$2000 - $3000' },
  { value: '3000-4000', label: '$3000 - $4000' },
  { value: '4000-5000', label: '$4000 - $5000' },
  { value: '5000+', label: '$5000+' },
];

export const jobCategories = [
  { value: 'software_engineering', label: 'Software Engineering' },
  { value: 'data_science', label: 'Data Science' },
  { value: 'machine_learning', label: 'Machine Learning' },
  { value: 'artificial_intelligence', label: 'Artificial Intelligence' },
  { value: 'cybersecurity', label: 'Cybersecurity' },
  { value: 'business_intelligence', label: 'Business Intelligence' },
  { value: 'cyber_security', label: 'Cyber Security' },
  { value: 'product_management', label: 'Product Management' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'design', label: 'Design' },
  { value: 'finance', label: 'Finance' },
  { value: 'accounting', label: 'Accounting' },
  { value: 'legal', label: 'Legal' },
  { value: 'management', label: 'Management' },
  { value: 'human_resources', label: 'Human Resources' },
  { value: 'customer_service', label: 'Customer Service' },
  { value: 'sales', label: 'Sales' },
  { value: 'legal_and_compliance', label: 'Legal and Compliance' },
  { value: 'management_and_leadership', label: 'Management and Leadership' },
  { value: 'public_relations', label: 'Public Relations' },
];

export const jobEducationLevels = [
  { value: 'high_school', label: 'High School' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'graduate', label: 'Graduate' },
  { value: 'bachelor_degree', label: 'Bachelor Degree' },
  { value: 'master_degree', label: 'Master Degree' },
  { value: 'doctor_degree', label: 'Doctor Degree' },
];

export const jobExperienceLevels = [
  { value: 'entry_level', label: 'Entry Level' },
  { value: 'mid_level', label: 'Mid Level' },
  { value: 'senior_level', label: 'Senior Level' },
  { value: 'expert', label: 'Expert' },
];