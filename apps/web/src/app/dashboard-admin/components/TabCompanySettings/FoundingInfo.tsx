import { useState, useEffect } from 'react';
import { fetchUserCompany, updateCompany } from '@/lib/company';
import { toast } from 'react-toastify';
import { countryOptions, industryOptions } from '@/utils/format'; 
import { formatNumberWithCommas } from '@/utils/format';

const FoundingInfo = () => {
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [organizationType, setOrganizationType] = useState('');
  const [industryType, setIndustryType] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [yearOfEstablishment, setYearOfEstablishment] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const { company, ok } = await fetchUserCompany();
        if (ok && company) {
          setCompanyId(company.company_id.toString());
          setOrganizationType(company.company_name);
          setIndustryType(company.IndustryType || '');
          setCountry(company.country || '');
          setAddress(company.address || '');
          setTeamSize(company.TeamSize ? String(company.TeamSize) : '');
          setYearOfEstablishment(company.yearOfEstablish || '');
          setCompanyWebsite(company.website || '');
        } else {
          setError('Failed to fetch company data.');
        }
      } catch (error) {
        console.error('Error fetching company data:', error);
        setError('An error occurred while fetching company data.');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSaveChanges = async () => {
    if (!isEditing || !companyId) return;

    // Ensure that no required fields are empty before submitting
    if (!organizationType || !yearOfEstablishment || !companyWebsite || !country) {
      toast.error('Please fill all the required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('company_name', organizationType);
    formData.append('IndustryType', industryType);
    formData.append('country', country);
    formData.append('address', address);
    formData.append('TeamSize', teamSize);
    formData.append('yearOfEstablish', yearOfEstablishment);
    formData.append('website', companyWebsite);

    try {
      const { company, ok } = await updateCompany(companyId, formData);

      if (ok && company) {
        // Update state after successful update
        setOrganizationType(company?.company_name || '');
        setIndustryType(company?.IndustryType || '');
        setCountry(company?.country || '');
        setAddress(company?.address || '');
        setTeamSize(company?.TeamSize || '');
        setYearOfEstablishment(company?.yearOfEstablish || '');
        setCompanyWebsite(company?.website || '');

        toast.success('Company information updated successfully');
        setIsEditing(false);
      } else {
        toast.error('Failed to update company information');
      }
    } catch (error) {
      toast.error('An error occurred while updating company information');
    }
  };

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
            disabled={!isEditing}
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
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Industry Type</label>
          <select
            className="input input-bordered w-full"
            value={industryType}
            onChange={(e) => setIndustryType(e.target.value)}
            disabled={!isEditing}
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
            value={(teamSize)}
            onChange={(e) => setTeamSize(e.target.value)}
            disabled={!isEditing}
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
            disabled={!isEditing}
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
            disabled={!isEditing}
          />
        </div>
      </div>
      <button
        onClick={isEditing ? handleSaveChanges : handleEditToggle}
        className="btn btn-primary mt-6"
      >
        {isEditing ? 'Save Changes' : 'Edit'}
      </button>
    </div>
  );
};

export default FoundingInfo;
