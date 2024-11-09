// /src/app/company-page/page.tsx
'use client';
import { useState, useEffect } from 'react';
import CompanyFilterBar from './CompanyFilterBar';
import CompanyCard from '@/components/CompanyCard';
import { getFilteredCompanies } from '@/services/companyService';
import { Company } from '@/types/company';
import ProtectedRoute from '@/components/ProtectedRoute';
import { fetchUserLocation } from '@/services/locationService';

// Define a type for the location structure
type Location = { latitude: number; longitude: number } | null;

export default function CompanyPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [sortOrder, setSortOrder] = useState('latest');
  const [location, setLocation] = useState<Location>(null);
  const [locationAccessDenied, setLocationAccessDenied] = useState(false);

  useEffect(() => {
    fetchUserLocation(setLocation, setLocationAccessDenied);
  }, []);

  const loadCompanies = async (
    filters: { search: string } = { search: '' },
    lat?: number,
    lng?: number,
    radius = 25,
  ) => {
    try {
      const companyFilters: {
        search: string;
        [key: string]: string | string[];
      } = {
        ...filters,
        dateRange: sortOrder,
      };

      if (lat !== undefined) companyFilters.lat = lat.toString();
      if (lng !== undefined) companyFilters.lng = lng.toString();
      companyFilters.radius = radius.toString();

      const data = await getFilteredCompanies(companyFilters);
      setCompanies(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching companies:', error);
      setCompanies([]);
    }
  };

  useEffect(() => {
    if (location) {
      loadCompanies({ search: '' }, location.latitude, location.longitude);
    } else {
      loadCompanies();
    }
  }, [sortOrder, location]);

  const handleSearch = (filters: {
    search: string;
    industry?: string[];
    country?: string;
  }) => {
    if (location) {
      loadCompanies(filters, location.latitude, location.longitude);
    } else {
      loadCompanies(filters);
    }
  };

  return (
    <ProtectedRoute requiredRole="candidate">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
          Browse Companies
        </h1>

        <CompanyFilterBar onSearch={handleSearch} />

        {/* Sort Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex space-x-2">
            <button
              onClick={() => setSortOrder('latest')}
              className={`p-2 rounded-md ${sortOrder === 'latest' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Latest
            </button>
            <button
              onClick={() => setSortOrder('oldest')}
              className={`p-2 rounded-md ${sortOrder === 'oldest' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Oldest
            </button>
          </div>
        </div>

        {/* Company Listings */}
        <div className="my-10 flex justify-center items-center w-full h-full">
          {companies.length > 0 ? (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
              {companies.map((company) => (
                <CompanyCard key={company.company_id} company={company} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center w-full h-64 space-y-4">
              <span className="loading loading-bars loading-lg"></span>
              <p className="text-gray-500 text-center">
                No Companies available at the moment...
              </p>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
