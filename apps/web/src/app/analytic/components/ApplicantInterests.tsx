// components/ApplicantInterests.tsx
'use client';

import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { Interests } from '@mui/icons-material';

const ApplicantInterests: React.FC = () => {
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
          <strong>Top Job Categories:</strong>
        </Typography>
        <Typography className="ml-4">- Software Development: 35%</Typography>
        <Typography className="ml-4">- Marketing: 20%</Typography>
        <Typography className="ml-4">- Design: 15%</Typography>
        <Typography className="mt-4 text-gray-800">
          <strong>Top Locations:</strong>
        </Typography>
        <Typography className="ml-4">- Jakarta: 30%</Typography>
        <Typography className="ml-4">- Surabaya: 25%</Typography>
      </Box>
    </Paper>
  );
};

export default ApplicantInterests;
