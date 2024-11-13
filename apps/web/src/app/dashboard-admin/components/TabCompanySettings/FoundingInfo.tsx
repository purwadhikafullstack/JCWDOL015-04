import { useState, useEffect } from 'react';
import { fetchUserCompany, updateCompany } from '@/lib/company';
import { countryOptions, industryOptions } from '@/utils/format';
import { toast } from 'react-toastify';

const FoundingInfo = () => {
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [country, setCountry] = useState('');
  const [officeAddress, setOfficeAddress] = useState('');
  const [industryType, setIndustryType] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [yearOfEstablish, setYearOfEstablish] = useState('');
  const [website, setWebsite] = useState('');
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchCompanyData = async () => {
      const { company, ok } = await fetchUserCompany();
      if (ok && company) {
        setCompanyId(company.company_id.toString());
        setCountry(company.country || '');
        setOfficeAddress(company.address || '');
        setIndustryType(company.IndustryType || '');
        setTeamSize(company.TeamSize || '');
        setYearOfEstablish(company.yearOfEstablish || '');
        setWebsite(company.website || '');
      } else {
        toast.error('Failed to fetch company data');
      }
      setLoading(false);
    };
    fetchCompanyData();
  }, []);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSaveChanges = async () => {
    if (!companyId) return;

    const formData = new FormData();
    formData.append('country', country);
    formData.append('address', officeAddress);
    formData.append('IndustryType', industryType);
    formData.append('TeamSize', teamSize);
    formData.append('yearOfEstablish', yearOfEstablish);
    formData.append('website', website);

    const { company, ok } = await updateCompany(companyId, formData);

    if (ok) {
      toast.success('Company information updated successfully');
      setIsEditing(false);
    } else {
      toast.error('Failed to update company information');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
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
            value={officeAddress}
            onChange={(e) => setOfficeAddress(e.target.value)}
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
            value={teamSize}
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
            value={yearOfEstablish}
            onChange={(e) => setYearOfEstablish(e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Company Website</label>
          <input
            type="url"
            className="input input-bordered w-full"
            placeholder="Enter Company Website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
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
