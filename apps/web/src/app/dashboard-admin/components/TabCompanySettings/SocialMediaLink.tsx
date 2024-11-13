import { useState, useEffect } from 'react';
import { fetchUserCompany, updateCompany } from '@/lib/company';
import { toast } from 'react-toastify';

const SocialMediaLink = () => {
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [facebook, setFacebook] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [website, setWebsite] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadCompanyData = async () => {
      setLoading(true);
      try {
        const { company, ok } = await fetchUserCompany();
        if (ok && company) {
          setCompanyId(company.company_id.toString());
          setFacebook(company.facebook || '');
          setTwitter(company.twitter || '');
          setInstagram(company.instagram || '');
          setLinkedin(company.linkedin || '');
          setWebsite(company.website || '');
        } else {
          setError('Failed to load company social media links.');
        }
      } catch (err) {
        setError('An error occurred while fetching company data.');
      } finally {
        setLoading(false);
      }
    };

    loadCompanyData();
  }, []);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSaveChanges = async () => {
    if (!isEditing || !companyId) return;

    // Ensure that no required fields are empty before submitting
    if (!facebook || !twitter || !instagram || !linkedin || !website) {
      toast.error('Please fill all the social media fields.');
      return;
    }

    const formData = new FormData();
    formData.append('facebook', facebook);
    formData.append('twitter', twitter);
    formData.append('instagram', instagram);
    formData.append('linkedin', linkedin);
    formData.append('website', website);

    try {
      const { company, ok } = await updateCompany(companyId, formData);

      if (ok && company) {
        // Update state after successful update
        setFacebook(company?.facebook || '');
        setTwitter(company?.twitter || '');
        setInstagram(company?.instagram || '');
        setLinkedin(company?.linkedin || '');
        setWebsite(company?.website || '');

        toast.success('Social media links updated successfully');
        setIsEditing(false);
      } else {
        toast.error('Failed to update social media links');
      }
    } catch (error) {
      toast.error('An error occurred while updating social media links');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <h3 className="text-xl font-semibold mb-4">Social Media Links</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-600 mb-2">Facebook</label>
          <input
            type="url"
            className="input input-bordered w-full"
            placeholder="Enter Facebook URL"
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Twitter</label>
          <input
            type="url"
            className="input input-bordered w-full"
            placeholder="Enter Twitter URL"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Instagram</label>
          <input
            type="url"
            className="input input-bordered w-full"
            placeholder="Enter Instagram URL"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-2">LinkedIn</label>
          <input
            type="url"
            className="input input-bordered w-full"
            placeholder="Enter LinkedIn URL"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
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

export default SocialMediaLink;
