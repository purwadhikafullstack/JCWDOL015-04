'use client';

import React, { useState, useEffect } from 'react';
import {
  Typography,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import {
  countryOptions,
  jobCategories,
  jobEducationLevels,
  jobExperienceLevels,
  jobTypeOptions,
} from '@/utils/format';

const JobDetail = ({ params }: { params: { id: string } }) => {
  const jobId = params.id;

  const [formData, setFormData] = useState({
    job_title: '',
    description: '',
    location: '',
    country: '',
    salary: '',
    jobCategory: '',
    jobEducationLevel: '',
    jobExperience: '',
    jobType: '',
    is_active: true,
  });

  const fetchJobDetail = async (jobId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/jobs/${jobId}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch job details');
      }

      const result = await response.json();

      if (result.job) {
        setFormData({
          job_title: result.job.job_title || '',
          description: result.job.description || '',
          location: result.job.location || '',
          country: result.job.country || '',
          salary: result.job.salary?.toString() || '',
          jobCategory: result.job.jobCategory || '',
          jobEducationLevel: result.job.jobEducationLevel || '',
          jobExperience: result.job.jobExperience || '',
          jobType: result.job.jobType || '',
          is_active: result.job.is_active || false,
        });
      } else {
      }
    } catch (error) {
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e: SelectChangeEvent, field: string) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleFormSubmit = async () => {
    try {
      const payload = {
        ...formData,
        salary: parseFloat(formData.salary),
        is_active: formData.is_active === true,
      };
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/jobs/${jobId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Failed to update job: ${errorData.msg || 'Unknown error'}`);
        return;
      }
  
      alert('Job updated successfully!');
    } catch (error) {
      alert('Failed to update job information.');
    }
  };
  

  useEffect(() => {
    if (jobId) {
      fetchJobDetail(jobId);
    }
  }, [jobId]);

  return (
    <Paper
      elevation={3}
      className="p-6 w-full max-w-3xl mx-auto bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg shadow-lg"
    >
      <Typography variant="h4" className="text-center font-bold mb-6 text-gray-800">
        Edit Job Details
      </Typography>

      <Box className="space-y-4">
        <TextField
          fullWidth
          label="Job Title"
          name="job_title"
          value={formData.job_title}
          onChange={handleInputChange}
          className="mb-4"
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="mb-4"
        />
        <TextField
          fullWidth
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          className="mb-4"
        />
        <FormControl fullWidth className="mb-4">
          <InputLabel>Country</InputLabel>
          <Select
            value={formData.country}
            onChange={(e) => handleSelectChange(e, 'country')}
          >
            {countryOptions.map((option) => (
              <MenuItem key={option.code} value={option.code}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Salary"
          name="salary"
          type="number"
          value={formData.salary}
          onChange={handleInputChange}
          className="mb-4"
        />
        <FormControl fullWidth className="mb-4">
          <InputLabel>Job Category</InputLabel>
          <Select
            value={formData.jobCategory}
            onChange={(e) => handleSelectChange(e, 'jobCategory')}
          >
            {jobCategories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth className="mb-4">
          <InputLabel>Education Level</InputLabel>
          <Select
            value={formData.jobEducationLevel}
            onChange={(e) => handleSelectChange(e, 'jobEducationLevel')}
          >
            {jobEducationLevels.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth className="mb-4">
          <InputLabel>Experience Level</InputLabel>
          <Select
            value={formData.jobExperience}
            onChange={(e) => handleSelectChange(e, 'jobExperience')}
          >
            {jobExperienceLevels.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth className="mb-4">
          <InputLabel>Job Type</InputLabel>
          <Select
            value={formData.jobType}
            onChange={(e) => handleSelectChange(e, 'jobType')}
          >
            {jobTypeOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth className="mb-4">
          <InputLabel>Status</InputLabel>
          <Select
            value={formData.is_active ? 'Active' : 'Expire'}
            onChange={(e) =>
              setFormData({ ...formData, is_active: e.target.value === 'Active' })
            }
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Expire">Expire</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleFormSubmit}
          className="w-full py-2 text-lg font-semibold"
        >
          Save Changes
        </Button>
      </Box>
    </Paper>
  );
};

export default JobDetail;
