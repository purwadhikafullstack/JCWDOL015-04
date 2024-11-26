'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoLocation } from 'react-icons/go';
import { CompanyCardProps } from '@/types/company';
import { fetchCompanies } from '@/lib/company';
import { getCountryLabel, getLabel } from '@/utils/getLabel';
import { countryOptions, industryOptions } from '@/utils/format';

const FeaturedCompany = () => {
  const [companies, setCompanies] = useState<CompanyCardProps[]>([]);

  const loadCompany = async () => {
    try {
      const filters = { dateRange: 'latest' };
      const companyData = await fetchCompanies(filters);

      const formattedCompanies: CompanyCardProps[] = companyData.map((company: CompanyCardProps) => ({
        company_id: company.company_id,
        company_name: company.company_name,
        logo: company.logo,
        IndustryType: company.IndustryType,
        country: company.country,
      }));

      setCompanies(formattedCompanies);
    } catch (error) {
      setCompanies([]);
    }
  };

  useEffect(() => {
    loadCompany();
  }, []);

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Top Companies</h2>
          <Link
            href="/company-page"
            className="text-blue-600 font-semibold flex items-center hover:text-blue-700 transition-colors"
          >
            View All
            <span className="ml-2">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {companies.map((company: CompanyCardProps) => (
            <CompanyCard key={company.company_id} company={company} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface CompanyCardComponentProps {
  company: CompanyCardProps;
}

const CompanyCard = ({ company }: CompanyCardComponentProps) => {
  return (
    <div className="relative p-4 sm:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border hover:border-blue-500 flex flex-col justify-between items-center">
      <div className="flex flex-col items-center space-y-4 w-full">
        {company.logo ? (
          <Image
            src={company.logo}
            alt={`${company.company_name} Logo`}
            width={80}
            height={80}
            className="object-contain"
          />
        ) : (
          <div className="w-20 h-20 bg-gray-300 flex items-center justify-center rounded-full text-gray-400">
            No Logo
          </div>
        )}
        <div className="text-center">
          <h3 className="text-lg sm:text-xl font-semibold">{company.company_name}</h3>
          <p className="text-sm text-gray-600">{getLabel(industryOptions, company.IndustryType as string)}</p>
          <div className="flex items-center justify-center text-sm text-gray-600">
            <GoLocation className="mr-1" />
            <span>{getCountryLabel(countryOptions, company.country as string)}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-center w-full">
        <Link href={`/company-page/${company.company_id}`}>
          <button className="bg-blue-50 text-blue-600 px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-all w-full sm:w-auto">
            Open Position →
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedCompany;
