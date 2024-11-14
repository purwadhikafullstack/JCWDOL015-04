// components/UserDemographics.tsx
'use client';

import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { People } from '@mui/icons-material';

const UserDemographics: React.FC = () => {
  return (
    <Paper elevation={3} className="bg-white shadow-lg rounded-lg p-6 w-full">
      <Box className="flex items-center justify-center mb-4">
        <People fontSize="large" className="text-blue-500 mr-2" />
        <Typography variant="h6" className="font-semibold text-gray-800">
          User Demographics
        </Typography>
      </Box>
      <Box className="text-gray-700 space-y-2">
        <Typography className="text-gray-800">
          <strong>Average Age:</strong> 29
        </Typography>
        <Typography className="text-gray-800">
          <strong>Gender Distribution:</strong>
        </Typography>
        <Typography className="ml-4">- Male: 55%</Typography>
        <Typography className="ml-4">- Female: 45%</Typography>
        <Typography className="mt-4 text-gray-800">
          <strong>Top Locations:</strong>
        </Typography>
        <Typography className="ml-4">- Jakarta: 25%</Typography>
        <Typography className="ml-4">- Surabaya: 15%</Typography>
        <Typography className="ml-4">- Bandung: 10%</Typography>
      </Box>
    </Paper>
  );
};

export default UserDemographics;
