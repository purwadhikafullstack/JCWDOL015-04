'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { FaDownload, FaEye } from 'react-icons/fa';

const CVGenerator: React.FC = () => {
  const pathname = usePathname(); // Mengambil pathname aktif
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    jobTitle: '',
    summary: '',
    skills: '',
    experience: '',
    education: '',
    certifications: '',
    additionalInfo: '',
  });
  const [selectedTemplate, setSelectedTemplate] = useState('ATS'); // Default template
  const [previewVisible, setPreviewVisible] = useState(false);

  // Hanya memungkinkan akses dari halaman profil
  useEffect(() => {
    if (!pathname.startsWith('/profile')) {
      router.push('/profile'); // Redirect jika tidak berasal dari halaman profil
    }
  }, [pathname, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTemplate(e.target.value);
  };

  const handleGenerateCV = () => {
    setPreviewVisible(true);
    // Tambahkan logika untuk mengonversi data ke template CV yang dipilih
  };

  const handleDownloadCV = () => {
    // Tambahkan logika untuk mengunduh CV sebagai file PDF
    alert('Download CV in ' + selectedTemplate + ' format');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h1 className="text-2xl font-semibold mb-4">CV Generator</h1>
      <p className="text-gray-500 mb-6">
        Generate your CV based on your profile information and additional details. Default template is ATS format.
      </p>

      {/* Form Pengisian Data CV */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label className="block font-medium mb-2">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            placeholder="Job Title"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block font-medium mb-2">Professional Summary</label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            placeholder="A brief summary of your professional background"
          ></textarea>
        </div>
        <div className="md:col-span-2">
          <label className="block font-medium mb-2">Skills</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            placeholder="E.g., JavaScript, Python, Project Management"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block font-medium mb-2">Work Experience</label>
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            placeholder="List your work experience"
          ></textarea>
        </div>
        <div className="md:col-span-2">
          <label className="block font-medium mb-2">Education</label>
          <textarea
            name="education"
            value={formData.education}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            placeholder="List your educational background"
          ></textarea>
        </div>
        <div className="md:col-span-2">
          <label className="block font-medium mb-2">Certifications (Optional)</label>
          <input
            type="text"
            name="certifications"
            value={formData.certifications}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            placeholder="Any certifications you have"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block font-medium mb-2">Additional Information (Optional)</label>
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            placeholder="Any additional information for your CV"
          ></textarea>
        </div>
      </div>

      {/* Template Selector */}
      <div className="mt-6">
        <label className="block font-medium mb-2">Select CV Template</label>
        <select
          value={selectedTemplate}
          onChange={handleTemplateChange}
          className="w-full p-2 border rounded-lg"
        >
          <option value="ATS">ATS Friendly (Default)</option>
          <option value="Modern">Modern</option>
          <option value="Professional">Professional</option>
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4 mt-8">
        <button
          onClick={handleGenerateCV}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          <FaEye className="mr-2" />
          Preview CV
        </button>
        <button
          onClick={handleDownloadCV}
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          <FaDownload className="mr-2" />
          Download CV
        </button>
      </div>

      {/* Preview Section */}
      {previewVisible && (
        <div className="mt-8 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-xl font-semibold mb-4">CV Preview ({selectedTemplate} Template)</h3>
          <p>Name: {formData.name}</p>
          <p>Job Title: {formData.jobTitle}</p>
          <p>Summary: {formData.summary}</p>
          <p>Skills: {formData.skills}</p>
          <p>Experience: {formData.experience}</p>
          <p>Education: {formData.education}</p>
          <p>Certifications: {formData.certifications}</p>
          <p>Additional Info: {formData.additionalInfo}</p>
        </div>
      )}
    </div>
  );
};

export default CVGenerator;
