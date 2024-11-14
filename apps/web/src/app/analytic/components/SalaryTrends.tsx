// components/SalaryTrends.tsx
'use client';

import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { MonetizationOn } from '@mui/icons-material';

const SalaryTrends: React.FC = () => {
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
        <Typography className="ml-4">- Jakarta: $30,000</Typography>
        <Typography className="ml-4">- Surabaya: $27,000</Typography>
        <Typography className="ml-4">- Bandung: $26,500</Typography>
        <Typography className="mt-4 text-gray-800">
          <strong>Popular Positions:</strong>
        </Typography>
        <Typography className="ml-4">- Software Engineer: $35,000</Typography>
        <Typography className="ml-4">- Product Manager: $40,000</Typography>
      </Box>
    </Paper>
  );
};

export default SalaryTrends;
