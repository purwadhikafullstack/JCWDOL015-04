import { useState, useEffect } from 'react';
import { fetchUserCompany } from '@/lib/company';
import { getLabel, getCountryLabel } from '@/utils/getLabel'; 
import { countryOptions, industryOptions } from '@/utils/format'; 
import { formatNumberWithCommas } from '@/utils/format';

const FoundingInfo = () => {
  const [organizationType, setOrganizationType] = useState('');
  const [industryType, setIndustryType] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [teamSize, setTeamSize] = useState<string>('');
  const [yearOfEstablishment, setYearOfEstablishment] = useState<string>('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const { company, ok } = await fetchUserCompany();
        if (ok && company) {
          setOrganizationType(company.company_name);
          setIndustryType(company.IndustryType || '');
          setCountry(company.country || '');
          setAddress(company.address || '');
          setTeamSize(company.TeamSize ? String(company.TeamSize) : '');

          const year = company.yearOfEstablish;
          if (year) {
            const parsedYear = new Date(year);
            if (!isNaN(parsedYear.getFullYear())) {
              setYearOfEstablishment(String(parsedYear.getFullYear()));
            } else {
              setYearOfEstablishment('');
            }
          } else {
            setYearOfEstablishment('');
          }

          setCompanyWebsite(company.website || '');
        } else {
          setError('Failed to fetch company data.');
        }
      } catch (error) {
        setError('An error occurred while fetching company data.');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h3 className="text-xl font-semibold mb-4">Founding Information</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-600 mb-2">Country</label>
          <select
            className="input input-bordered w-full"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            {countryOptions.map((option) => (
              <option key={option.code} value={option.code}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Office Address</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Office address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Industry Type</label>
          <select
            className="input input-bordered w-full"
            value={industryType}
            onChange={(e) => setIndustryType(e.target.value)}
          >
            {industryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Team Size</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter Team Size"
            value={formatNumberWithCommas(teamSize)}
            onChange={(e) => setTeamSize(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Year of Establishment</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter Year of Establishment"
            value={yearOfEstablishment}
            onChange={(e) => setYearOfEstablishment(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Company Website</label>
          <input
            type="url"
            className="input input-bordered w-full"
            placeholder="Enter Company Website"
            value={companyWebsite}
            onChange={(e) => setCompanyWebsite(e.target.value)}
          />
        </div>
      </div>
      <button className="btn btn-primary mt-6">Save Changes</button>
    </div>
  );
};

export default FoundingInfo;
