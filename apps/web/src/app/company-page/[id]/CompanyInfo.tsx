import { Company } from '@/types/company';

const CompanyInfo: React.FC<{ company: Company }> = ({ company }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
    <h2 className="text-xl font-semibold mb-4">About {company.company_name}</h2>
    <p>{company.aboutUs}</p>
    <div className="mt-4">
      <a href={company.website} target="_blank" className="text-blue-500 underline">Visit Website</a>
    </div>
  </div>
);

export default CompanyInfo;
