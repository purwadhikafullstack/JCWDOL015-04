import { useState, useEffect } from 'react';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiGithub, FiPlusCircle, FiX } from 'react-icons/fi';
import { getUserInfo, updateUserInfo } from '@/lib/user';
import { toast } from 'react-toastify';

interface SocialLink {
  platform: 'Facebook' | 'Twitter' | 'Instagram' | 'Linkedin' | 'Github' | 'Website';
  url: string;
}

const platforms = [
  { name: 'Facebook', icon: <FiFacebook className="text-blue-600" /> },
  { name: 'Twitter', icon: <FiTwitter className="text-blue-400" /> },
  { name: 'Instagram', icon: <FiInstagram className="text-pink-500" /> },
  { name: 'Linkedin', icon: <FiLinkedin className="text-blue-700" /> },
  { name: 'Github', icon: <FiGithub className="text-gray-800" /> },
  { name: 'Website', icon: <FiPlusCircle className="text-green-600" /> },
];

const SettingSocialLinks = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { platform: 'Facebook', url: '' },
    { platform: 'Twitter', url: '' },
    { platform: 'Instagram', url: '' },
    { platform: 'Linkedin', url: '' },
    { platform: 'Github', url: '' },
    { platform: 'Website', url: '' },
  ]);

  // Fetch user social links
  useEffect(() => {
    const fetchUserData = async () => {
      const { user, ok } = await getUserInfo();
      if (ok && user) {
        setSocialLinks([
          { platform: 'Facebook', url: user.facebook || '' },
          { platform: 'Twitter', url: user.twitter || '' },
          { platform: 'Instagram', url: user.instagram || '' },
          { platform: 'Linkedin', url: user.linkedin || '' },
          { platform: 'Github', url: user.github || '' },
          { platform: 'Website', url: user.website || '' },
        ]);
      } else {
        toast.error('Failed to load social links');
      }
    };
    fetchUserData();
  }, []);

  const handleLinkChange = (index: number, value: string) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index] = { ...updatedLinks[index], url: value };
    setSocialLinks(updatedLinks);
  };

  const handleSaveChanges = async () => {
    const formData = new FormData();
    socialLinks.forEach((link) => {
      formData.append(link.platform.toLowerCase(), link.url);
    });

    const { result, ok } = await updateUserInfo(formData);
    if (ok) {
      toast.success('Social links updated successfully!');
    } else {
      toast.error(result.msg || 'Failed to update social links');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h3 className="text-xl font-semibold mb-4">Social Links</h3>
      <div className="space-y-4">
        {socialLinks.map((link, index) => (
          <div className="flex flex-col sm:flex-row items-center gap-4" key={index}>
            <div className="relative w-full sm:w-1/4">
              <div className="flex items-center gap-2 border rounded-md p-2">
                {platforms.find((p) => p.name === link.platform)?.icon}
                <span>{link.platform}</span>
              </div>
            </div>
            <input
              type="url"
              className="input input-bordered w-full"
              placeholder={`Enter your ${link.platform} link`}
              value={link.url}
              onChange={(e) => handleLinkChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>
      <button onClick={handleSaveChanges} className="btn btn-primary mt-4">
        Save Changes
      </button>
    </div>
  );
};

export default SettingSocialLinks;