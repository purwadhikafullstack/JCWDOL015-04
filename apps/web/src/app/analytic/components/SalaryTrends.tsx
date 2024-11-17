// components/SalaryTrends.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { MonetizationOn } from '@mui/icons-material';
import base_url from '@/lib/user';

interface SalaryByLocation {
  location: string;
  avgSalary: number;
}

interface PopularPosition {
  jobTitle: string;
  avgSalary: number;
}

const SalaryTrends: React.FC = () => {
  const [salaryByLocation, setSalaryByLocation] = useState<SalaryByLocation[]>([]);
  const [popularPositions, setPopularPositions] = useState<PopularPosition[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${base_url}/analytics/salary-trends`);
        const data = await response.json();

        const formattedSalaryByLocation = data.salaryByLocation.map((location: any) => ({
          location: location.location,
          avgSalary: location._avg.salary,
        }));
        const formattedPopularPositions = data.popularPositions.map((position: any) => ({
          jobTitle: position.job_title,
          avgSalary: position._avg.salary,
        }));

        setSalaryByLocation(formattedSalaryByLocation);
        setPopularPositions(formattedPopularPositions);
      } catch (error) {
        console.error('Error fetching salary trends:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Paper elevation={3} className="bg-white shadow-lg rounded-lg p-6 w-full">
      <Box className="flex items-center justify-center mb-4">
        <MonetizationOn fontSize="large" className="text-green-500 mr-2" />
        <Typography variant="h6" className="font-semibold text-gray-800">
          Salary Trends
        </Typography>
      </Box>
      <Box className="text-gray-700 space-y-2">
        <Typography className="text-gray-800">
          <strong>Average Salary by Location:</strong>
        </Typography>
        {salaryByLocation.length > 0
          ? salaryByLocation.map((location) => (
              <Typography key={location.location} className="ml-4">
                - {location.location}: ${location.avgSalary.toLocaleString()}
              </Typography>
            ))
          : 'Loading...'}
        <Typography className="mt-4 text-gray-800">
          <strong>Popular Positions:</strong>
        </Typography>
        {popularPositions.length > 0
          ? popularPositions.map((position) => (
              <Typography key={position.jobTitle} className="ml-4">
                - {position.jobTitle}: ${position.avgSalary.toLocaleString()}
              </Typography>
            ))
          : 'Loading...'}
      </Box>
    </Paper>
  );
};

export default SalaryTrends;
