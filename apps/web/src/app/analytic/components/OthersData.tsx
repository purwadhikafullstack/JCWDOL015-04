'use client';

import React, { useEffect, useState } from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { Insights } from '@mui/icons-material';
import base_url from '@/lib/user';

interface OtherImportantData {
  userRetentionRate: number;
  jobApplicationCompletion: number;
  applicationStatusDistribution: Array<{ status: string; _count: { status: number } }>;
}

// Fungsi untuk memformat status
const formatStatus = (status: string): string => {
  return status.replace(/_/g, ' ').toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
};

const OtherData: React.FC = () => {
  const [data, setData] = useState<OtherImportantData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${base_url}/analytics/other-data`);
        const result = await response.json();
        console.log('Fetched Data:', result);

        setData({
          userRetentionRate: result.userRetentionRate || 0,
          jobApplicationCompletion: result.jobApplicationCompletion || 0,
          applicationStatusDistribution: result.applicationStatusDistribution || [],
        });
      } catch (error) {
        console.error('Error fetching other important data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!data) {
    return (
      <Typography>Error fetching data or no data available.</Typography>
    );
  }

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
          <strong>User Retention Rate:</strong> {data.userRetentionRate}%
        </Typography>
        <Typography className="text-gray-800">
          <strong>Job Application Completion:</strong> {data.jobApplicationCompletion}%
        </Typography>
        <Typography className="text-gray-800">
          <strong>Application Status Distribution:</strong>
        </Typography>
        {data.applicationStatusDistribution.length > 0 ? (
          data.applicationStatusDistribution.map((statusData) => {
            const total = data.applicationStatusDistribution.reduce((acc, curr) => acc + curr._count.status, 0);
            const percentage = total > 0 ? ((statusData._count.status / total) * 100).toFixed(1) : 0;

            return (
              <Typography key={statusData.status} className="ml-4">
                - {formatStatus(statusData.status)}: {percentage}%
              </Typography>
            );
          })
        ) : (
          <Typography className="ml-4">No application data available.</Typography>
        )}
      </Box>
    </Paper>
  );
};

export default OtherData;
