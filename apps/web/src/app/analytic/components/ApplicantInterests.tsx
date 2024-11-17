'use client';

import React, { useEffect, useState } from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { Interests } from '@mui/icons-material';
import base_url from '@/lib/user';

interface JobCategory {
  jobCategory: string;
  count: number;
}

interface Location {
  location: string;
  count: number;
}

const formatCategoryName = (name: string) => {
  return name
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const ApplicantInterests: React.FC = () => {
  const [jobCategories, setJobCategories] = useState<JobCategory[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${base_url}/analytics/applicant-interests`);
        const data = await response.json();

        const formattedJobCategories = data.jobCategories.map((category: any) => ({
          jobCategory: category.jobCategory,
          count: category._count.jobCategory,
        }));

        const formattedLocations = data.locations.map((location: any) => ({
          location: location.location,
          count: location._count.location,
        }));

        setJobCategories(
          formattedJobCategories.sort((a: JobCategory, b: JobCategory) => b.count - a.count).slice(0, 3)
        );
        setLocations(
          formattedLocations.sort((a: Location, b: Location) => b.count - a.count).slice(0, 3)
        );
      } catch (error) {
        console.error('Error fetching applicant interests:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Paper elevation={3} className="bg-white shadow-lg rounded-lg p-6 w-full">
      <Box className="flex items-center justify-center mb-4">
        <Interests fontSize="large" className="text-red-500 mr-2" />
        <Typography variant="h6" className="font-semibold text-gray-800">
          Applicant Interests
        </Typography>
      </Box>
      <Box className="text-gray-700 space-y-2">
        <Typography className="text-gray-800">
          <strong>Job Categories:</strong>
        </Typography>
        {jobCategories.map((category) => (
          <Typography key={category.jobCategory} className="ml-4">
            - {formatCategoryName(category.jobCategory)}: {((category.count / jobCategories.reduce((acc, curr) => acc + curr.count, 0)) * 100).toFixed(1)}%
          </Typography>
        ))}
        
        <Typography className="mt-4 text-gray-800">
          <strong>Locations:</strong>
        </Typography>
        {locations.map((location) => (
          <Typography key={location.location} className="ml-4">
            - {location.location}: {((location.count / locations.reduce((acc, curr) => acc + curr.count, 0)) * 100).toFixed(1)}%
          </Typography>
        ))}
      </Box>
    </Paper>
  );
};

export default ApplicantInterests;
