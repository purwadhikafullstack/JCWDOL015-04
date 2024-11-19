'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import {
  countryOptions,
  jobCategories,
  jobEducationLevels,
  jobTypeOptions,
  salaryRanges,
} from '@/utils/format';
import ProtectedRoute from '@/components/ProtectedRoute';
import base_url from '@/lib/user';
import { fetchUserCompany } from '@/lib/company';

const JobForm = ({ jobId }: { jobId?: number }) => {
  const [formData, setFormData] = useState({
    job_title: '',
    description: '',
    responsibility: '',
    country: 'ID',
    location: '',
    salary: '',
    jobType: 'fullTime',
    jobCategory: '',
    jobEducationLevel: '',
    jobExpired_at: '',
    companyId: '', // Tetap string
    userId: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUserCompany();

        if (response.ok) {
          if (response.company) {
            setFormData((prevData) => ({
              ...prevData,
              companyId: String(response.company?.company_id || ''), // Set company_id
            }));
            console.log('Company ID:', response.company.company_id);
          } else {
            toast.error('Failed to fetch company info.');
          }

          if (response.user) {
            setFormData((prevData) => ({
              ...prevData,
              userId: String(response.user?.user_id || ''), // Set user_id
            }));
            console.log('User ID:', response.user.user_id);
          } else {
            toast.error('Failed to fetch user info.');
          }
        } else {
          toast.error('Failed to fetch company or user info.');
        }
      } catch (error) {
        console.error('Error fetching company and user info:', error);
        toast.error('Error fetching company and user info.');
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
  
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!formData.companyId) {
      toast.error('Company ID is missing. Please try again.');
      return;
    }
  
    try {
      const token = Cookies.get('token');
      if (!token) {
        toast.error('You need to log in to perform this action.');
        return;
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
  
      const dataToSend = {
        ...formData,
        salary: formData.salary ? parseInt(formData.salary) : null,
        jobExpired_at: formData.jobExpired_at
          ? new Date(formData.jobExpired_at).toISOString()
          : null,
        jobCategory: formData.jobCategory.toLowerCase(), // Pastikan sesuai dengan enum
        jobEducationLevel: formData.jobEducationLevel.toLowerCase(), // Pastikan sesuai dengan enum
      };
  
      console.log('Data to send:', dataToSend);
  
      if (jobId) {
        await axios.put(`${base_url}/jobs/${jobId}`, dataToSend, config);
        toast.success('Job updated successfully!');
      } else {
        await axios.post(`${base_url}/jobs`, dataToSend, config);
        toast.success('Job created successfully!');
      }
      setIsSubmitted(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
          console.error('Axios Error:', error.response?.data); // Tampilkan response error dari backend
      } else {
          console.error('Unexpected Error:', error);
      }
      toast.error('Error submitting form, please try again.');
  }
  };
  

  if (isSubmitted) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-2xl font-bold text-green-500 mb-4">
          Job {jobId ? 'Updated' : 'Created'} Successfully!
        </h2>
        <Link href="/company-jobs" legacyBehavior>
          <a className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Go Back to Job List
          </a>
        </Link>
      </div>
    );
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="max-w-3xl mx-auto my-10 p-8 bg-white shadow-md rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-3xl font-semibold mb-6 text-gray-700">
            {jobId ? 'Edit Job' : 'Post a Job'}
          </h1>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="job_title"
                className="block text-sm font-medium text-gray-700"
              >
                Job Title
              </label>
              <input
                type="text"
                name="job_title"
                value={formData.job_title}
                onChange={handleChange}
                placeholder="Add job title, role, vacancies, etc."
                className="input input-bordered w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter job location"
                className="input input-bordered w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="select select-bordered w-full p-2 border border-gray-300 rounded-md"
              >
                {countryOptions.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="salary"
                className="block text-sm font-medium text-gray-700"
              >
                Salary Range
              </label>
              <select
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="select select-bordered w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="" disabled>
                  Select salary range
                </option>
                {salaryRanges.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="jobEducationLevel"
                className="block text-sm font-medium text-gray-700"
              >
                Education Level
              </label>
              <select
                name="jobEducationLevel"
                value={formData.jobEducationLevel}
                onChange={handleChange}
                className="select select-bordered w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="" disabled>
                  Select education level
                </option>
                {jobEducationLevels.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="jobExpired_at"
                className="block text-sm font-medium text-gray-700"
              >
                Expiration Date
              </label>
              <input
                type="date"
                name="jobExpired_at"
                value={formData.jobExpired_at}
                onChange={handleChange}
                className="input input-bordered w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="jobType"
                className="block text-sm font-medium text-gray-700"
              >
                Job Type
              </label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="select select-bordered w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="" disabled>
                  Select job type
                </option>
                {jobTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Job Category */}
            <div>
              <label
                htmlFor="jobCategory"
                className="block text-sm font-medium text-gray-700"
              >
                Job Category
              </label>
              <select
                name="jobCategory"
                value={formData.jobCategory}
                onChange={handleChange}
                className="select select-bordered w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="" disabled>
                  Select job category
                </option>
                {jobCategories.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add job description..."
              className="textarea textarea-bordered w-full p-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="responsibility"
              className="block text-sm font-medium text-gray-700"
            >
              Responsibility
            </label>
            <textarea
              name="responsibility"
              value={formData.responsibility}
              onChange={handleChange}
              placeholder="Add job responsibilities..."
              className="textarea textarea-bordered w-full p-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            {jobId ? 'Update Job' : 'Post Job'}
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default JobForm;
