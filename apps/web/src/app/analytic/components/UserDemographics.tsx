'use client';

import React, { useEffect, useState } from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { People } from '@mui/icons-material';

interface GenderData {
  gender: 'MALE' | 'FEMALE';
  count: number;
}

interface LocationData {
  location: string;
  percentage: number;
}

interface DemographicsData {
  averageExperience: number;
  genderDistribution: GenderData[];
  topLocations: LocationData[];
}

const UserDemographics: React.FC = () => {
  const [data, setData] = useState<DemographicsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/analytics/user-demographics`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        // Filter hanya gender MALE dan FEMALE
        const filteredGenderDistribution = result.genderDistribution
          .filter((item: any) => item.gender === 'MALE' || item.gender === 'FEMALE')
          .map((item: any) => ({
            gender: item.gender,
            count: item._count.gender,
          }));

        // Format top locations data
        const formattedTopLocations = (result.topLocations || []).map((location: any) => ({
          location: location.country || 'Unknown',
          percentage: location._count.location || 0,
        }));

        setData({
          averageExperience: result.averageExperience || 0,
          genderDistribution: filteredGenderDistribution,
          topLocations: formattedTopLocations,
        });
      } catch (error) {
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
    return <Typography>Error fetching data.</Typography>;
  }

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
          <strong>Average Experience:</strong> {data.averageExperience.toFixed(2)}
        </Typography>
        <Typography className="text-gray-800">
          <strong>Gender Distribution:</strong>
        </Typography>
        {data.genderDistribution.map((item, index) => (
          <Typography key={index} className="ml-4">
            - {item.gender}: {item.count}
          </Typography>
        ))}
        <Typography className="mt-4 text-gray-800">
          <strong>Top Locations:</strong>
        </Typography>
        {data.topLocations.length > 0 ? (
          data.topLocations.map((location, index) => (
            <Typography key={index} className="ml-4">
              - {location.location}: {location.percentage}%
            </Typography>
          ))
        ) : (
          <Typography className="ml-4">No location data available.</Typography>
        )}
      </Box>
    </Paper>
  );
};

export default UserDemographics;
