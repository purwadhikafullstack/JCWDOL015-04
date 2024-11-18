import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { FiUpload } from 'react-icons/fi';
import { fetchUserCompany, updateCompany } from '@/lib/company';
import { toast } from 'react-toastify';
import Image from 'next/image';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const CompanyInfo = () => {
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [aboutUs, setAboutUs] = useState('');
  const [logo, setLogo] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);
  const [selectedLogoFile, setSelectedLogoFile] = useState<File | null>(null);
  const [selectedBannerFile, setSelectedBannerFile] = useState<File | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState(false);
  const quillEditorContent = useRef<string>('');

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const { company, ok } = await fetchUserCompany();
        if (ok && company) {
          setCompanyId(company.company_id.toString());
          setCompanyName(company.company_name);
          setAboutUs(company.aboutUs || '');
          setLogo(company.logo || null);
          setBanner(company.banner || null);
        } else {
          toast.error('Failed to fetch company data');
        }
      } catch (error) {
        toast.error('An error occurred while fetching company data');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedLogoFile(file);
      const reader = new FileReader();
      reader.onload = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedBannerFile(file);
      const reader = new FileReader();
      reader.onload = () => setBanner(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSaveChanges = async () => {
    if (!isEditing) return;

    if (!companyId) {
      toast.error('Company ID is not available');
      return;
    }

    const formData = new FormData();
    formData.append('company_name', companyName);
    formData.append('aboutUs', quillEditorContent.current || aboutUs);

    if (selectedLogoFile) {
      formData.append('logo', selectedLogoFile);
    }

    if (selectedBannerFile) {
      formData.append('banner', selectedBannerFile);
    }

    try {
      const { company, ok } = await updateCompany(companyId, formData);

      if (ok) {
        setCompanyName(company?.company_name || '');
        setAboutUs(company?.aboutUs || '');
        setLogo(company?.logo || null);
        setBanner(company?.banner || null);
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
  console.log('aboutUs:', aboutUs);
  return (
    <div className="p-6 space-y-6">
      <h3 className="text-xl font-semibold mb-4">Company Info</h3>

      {/* Logo and Banner upload */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Logo Upload */}
        <div className="flex flex-col items-center">
          <label className="block text-gray-600 mb-3 font-semibold">Logo</label>
          <div className="relative w-60 h-60 border-4 border-dashed border-blue-400 rounded-lg overflow-hidden cursor-pointer mb-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
              disabled={!isEditing}
            />
            {logo ? (
              <Image
                src={logo}
                width={236}
                height={236}
                alt="Logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full text-gray-500">
                <FiUpload size={24} />
                <span>Browse photo or drop here</span>
              </div>
            )}
          </div>
        </div>

        {/* Banner Upload */}
        <div className="flex flex-col items-center">
          <label className="block text-gray-600 mb-3 font-semibold">
            Banner Image
          </label>
          <div className="relative w-full h-36 border-4 border-dashed border-green-400 rounded-lg overflow-hidden cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleBannerUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
              disabled={!isEditing}
            />
            {banner ? (
              <Image
                src={banner}
                alt="Banner"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full text-gray-500">
                <FiUpload size={24} />
                <span>Browse photo or drop here</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Company Name */}
      <div className="mt-6">
        <label className="block text-gray-600 mb-2 font-semibold">
          Company Name
        </label>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Enter company name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          disabled={!isEditing}
        />
      </div>

      {/* About Us Editor */}
      <div className="mt-6">
        <label className="block text-gray-600 mb-2 font-semibold">
          About Us
        </label>
        <ReactQuill
          value={aboutUs}
          onChange={(value) => {
            setAboutUs(value);
            quillEditorContent.current = value;
          }}
          placeholder="Tell us about your company"
          theme="snow"
          className="border-2 border-gray-300 rounded-lg"
          readOnly={!isEditing}
        />
      </div>

      {/* Edit/Save Button */}
      <button
        onClick={isEditing ? handleSaveChanges : handleEditToggle}
        className="btn btn-primary mt-6"
      >
        {isEditing ? 'Save Changes' : 'Edit'}
      </button>
    </div>
  );
};

export default CompanyInfo;
