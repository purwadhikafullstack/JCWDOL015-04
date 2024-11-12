// src/app/dashboard-admin-developer/components/TabCompanySettings/SocialMediaLink.tsx
import { useState, useEffect } from 'react';
import { fetchUserCompany } from '@/lib/company';

const SocialMediaLink = () => {
  const [facebook, setFacebook] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [website, setWebsite] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCompanyData = async () => {
      setLoading(true);
      try {
        const { company, ok } = await fetchUserCompany();
        if (ok && company) {
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
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Website</label>
          <input
            type="url"
            className="input input-bordered w-full"
            placeholder="Enter Website URL"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
      </div>
      <button className="btn btn-primary mt-6">Save Changes</button>
    </div>
  );
};

export default SocialMediaLink;
