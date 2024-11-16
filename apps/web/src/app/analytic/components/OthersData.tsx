// components/OtherData.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { Insights } from '@mui/icons-material';

// Definisikan tipe data yang diterima dari API
interface OtherImportantData {
  userRetentionRate: number;
  jobApplicationCompletion: number;
  applicationStatusDistribution: Array<{ status: string; count: number }>;
}

const OtherData: React.FC = () => {
  const [data, setData] = useState<OtherImportantData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/analytics/other-data`);
        const result = await response.json();

        setData({
          userRetentionRate: result.userRetentionRate,
          jobApplicationCompletion: result.jobApplicationCompletion,
          applicationStatusDistribution: result.applicationStatusDistribution,
        });
      } catch (error) {
        console.error('Error fetching other important data:', error);
      }
    };

    fetchData();
  }, []);

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
          <strong>User Retention Rate:</strong> {data ? `${data.userRetentionRate}%` : 'Loading...'}
        </Typography>
        <Typography className="text-gray-800">
          <strong>Job Application Completion:</strong> {data ? `${data.jobApplicationCompletion}%` : 'Loading...'}
        </Typography>
        <Typography className="text-gray-800">
          <strong>Application Status Distribution:</strong>
        </Typography>
        {data
          ? data.applicationStatusDistribution.map((statusData) => (
              <Typography key={statusData.status} className="ml-4">
                - {statusData.status}: {((statusData.count / data.applicationStatusDistribution.reduce((acc, curr) => acc + curr.count, 0)) * 100).toFixed(1)}%
              </Typography>
            ))
          : 'Loading...'}
      </Box>
    </Paper>
  );
};

export default OtherData;
