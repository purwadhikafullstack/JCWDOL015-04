import { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { FiUpload } from 'react-icons/fi';
import { fetchUserCompany } from '@/lib/company';

const CompanyInfo = () => {
  const [companyName, setCompanyName] = useState('');
  const [aboutUs, setAboutUs] = useState('');
  const [logo, setLogo] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null);
  const quillRef = useRef<ReactQuill | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const { company, ok } = await fetchUserCompany();
        if (ok && company) {
          setCompanyName(company.company_name);
          setAboutUs(company.description || ''); 
          setLogo(company.logo || null);
          setBanner(company.banner || null);
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

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => setBanner(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    const htmlContent = quillRef.current?.getEditor().root.innerHTML;
    console.log('HTML content:', htmlContent);
  
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h3 className="text-xl font-semibold mb-4">Company Info</h3>

      {/* Logo and Banner Image Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Logo Upload */}
        <div className="flex flex-col items-center">
          <label className="block text-gray-600 mb-3 font-semibold">Logo</label>
          <div className="relative w-60 h-60 border-4 border-dashed border-blue-400 rounded-lg overflow-hidden cursor-pointer mb-3 shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-blue-600">
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            {logo ? (
              <img src={logo} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full text-gray-500">
                <FiUpload size={24} />
                <span>Browse photo or drop here</span>
                <p className="text-sm text-gray-500 mt-2">Max photo size 5 MB</p>
              </div>
            )}
          </div>
        </div>

        {/* Banner Upload */}
        <div className="flex flex-col items-center">
          <label className="block text-gray-600 mb-3 font-semibold">Banner Image</label>
          <div className="relative w-full h-36 border-4 border-dashed border-green-400 rounded-lg overflow-hidden cursor-pointer shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-green-600">
            <input
              type="file"
              accept="image/*"
              onChange={handleBannerUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            {banner ? (
              <img src={banner} alt="Banner" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full text-gray-500">
                <FiUpload size={24} />
                <span>Browse photo or drop here</span>
                <p className="text-sm text-gray-500 mt-2">Max photo size 5 MB</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Company Name */}
      <div className="mt-6">
        <label className="block text-gray-600 mb-2 font-semibold">Company Name</label>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Enter company name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>

      {/* About Us Section with React Quill */}
      <div className="mt-6">
        <label className="block text-gray-600 mb-2 font-semibold">About Us</label>
        <ReactQuill
          value={aboutUs}
          onChange={setAboutUs}
          placeholder="Tell us about your company"
          theme="snow"
          ref={quillRef}
          className="border-2 border-gray-300 rounded-lg"
        />
      </div>

      {/* Save Button */}
      <button onClick={handleSaveChanges} className="btn btn-primary mt-6">
        Save Changes
      </button>
    </div>
  );
};

export default CompanyInfo;
