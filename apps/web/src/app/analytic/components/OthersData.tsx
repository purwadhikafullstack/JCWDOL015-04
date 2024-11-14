// components/OtherData.tsx
'use client';

import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { Insights } from '@mui/icons-material';

const OtherData: React.FC = () => {
  return (
    <Paper elevation={3} className="bg-white shadow-lg rounded-lg p-6 w-full">
      <Box className="flex items-center justify-center mb-4">
        <Insights fontSize="large" className="text-purple-500 mr-2" />
        <Typography variant="h6" className="font-semibold text-gray-800">
          Other Important Data
        </Typography>
      </Box>
      <Box className="text-gray-700 space-y-2">
        <Typography className="text-gray-800">
          <strong>User Retention Rate:</strong> 85%
        </Typography>
        <Typography className="text-gray-800">
          <strong>Job Application Completion:</strong> 70%
        </Typography>
        <Typography className="text-gray-800">
          <strong>Popular Job Sources:</strong>
        </Typography>
        <Typography className="ml-4">- LinkedIn: 40%</Typography>
        <Typography className="ml-4">- Company Website: 30%</Typography>
        <Typography className="ml-4">- Referrals: 15%</Typography>
      </Box>
    </Paper>
  );
};

export default OtherData;
