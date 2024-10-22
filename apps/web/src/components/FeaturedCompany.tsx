'use client';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { GoLocation } from 'react-icons/go'; // Import the location icon
import LogoApple from '../assets/company-logo/Logo-Apple.svg';
import LogoDribbble from '../assets/company-logo/Logo-Dribbble.svg';
import LogoFacebook from '../assets/company-logo/Logo-Facebook.svg';
import LogoFigma from '../assets/company-logo/Logo-Figma.svg';
import LogoFreepik from '../assets/company-logo/Logo-Freepik.svg';
import LogoGoogle from '../assets/company-logo/Logo-Google.svg';
import LogoUdemy from '../assets/company-logo/Logo-Udemy.svg';
import LogoUpwork from '../assets/company-logo/Logo-Upwork.svg';
import LogoSlack from '../assets/company-logo/Logo-Slack.svg';

interface CompanyCardProps {
  company_id: number;
  company_name: string;
  location: string;
  logo: string | StaticImageData;
}

interface FeaturedCompanyProps {
  companies?: CompanyCardProps[];
}

const FeaturedCompany = ({ companies = [] }: FeaturedCompanyProps) => {
  const staticCompanies = [
    {
      company_id: 1,
      company_name: 'Dribbble',
      location: 'United States',
      logo: LogoDribbble,
    },
    {
      company_id: 2,
      company_name: 'Upwork',
      location: 'United States',
      logo: LogoUpwork,
    },
    {
      company_id: 3,
      company_name: 'Slack',
      location: 'China',
      logo: LogoSlack,
    },
    {
      company_id: 4,
      company_name: 'Freepik',
      location: 'United States',
      logo: LogoFreepik,
    },
  ];

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Top Companies</h2>
          <Link
            href="/view-all-companies"
            className="text-blue-600 font-semibold flex items-center hover:text-blue-700 transition-colors"
          >
            View All
            <span className="ml-2">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(companies.length > 0 ? companies : staticCompanies).map(
            (company: CompanyCardProps) => (
              <CompanyCard key={company.company_id} company={company} />
            ),
          )}
        </div>
      </div>
    </div>
  );
};

// CompanyCard component
interface CompanyCardComponentProps {
  company: CompanyCardProps;
}

const CompanyCard = ({ company }: CompanyCardComponentProps) => {
  return (
    <div className="relative p-4 sm:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border hover:border-blue-500 flex flex-col justify-between items-center">
      <div className="flex flex-col items-center space-y-4 w-full">
        <Image
          src={
            typeof company.logo === 'string' ? company.logo : company.logo.src
          }
          alt={company.company_name}
          width={80}
          height={80}
          className="object-contain"
        />
        <div className="text-center">
          <h3 className="text-lg sm:text-xl font-semibold">
            {company.company_name}
          </h3>
          <div className="flex items-center justify-center text-sm text-gray-600">
            <GoLocation className="mr-1" /> {/* Location icon */}
            <span>{company.location}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-center w-full">
        <Link href={`/company/${company.company_id}`}>
          <button className="bg-blue-50 text-blue-600 px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-all w-full sm:w-auto">
            Open Position →
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedCompany;
