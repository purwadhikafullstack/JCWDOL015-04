// pages/AnalyticsPage.tsx
'use client';

import React from 'react';
import { Typography, Box, Container, Paper } from '@mui/material';
import UserDemographics from './components/UserDemographics';
import SalaryTrends from './components/SalaryTrends';
import ApplicantInterests from './components/ApplicantInterests';
import OtherData from './components/OthersData';


const AnalyticsPage: React.FC = () => {
  return (
    <Container maxWidth="lg" className="py-12 bg-gray-50 min-h-screen">
      <Paper elevation={3} className="rounded-lg p-8 mb-10 shadow-lg bg-white">
        <Typography
          variant="h4"
          className="font-semibold text-center text-gray-900 mb-4"
          style={{ fontSize: '2rem' }}
        >
          Website Analytics Dashboard
        </Typography>
        <Typography
          variant="subtitle1"
          className="text-center text-gray-600 mb-8"
          style={{ fontSize: '1rem' }}
        >
          Dapatkan wawasan mendalam mengenai pengguna dan kinerja aplikasi
        </Typography>
      </Paper>
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <UserDemographics />
        <SalaryTrends />
        <ApplicantInterests />
        <OtherData />
      </Box>
    </Container>
  );
};

export default AnalyticsPage;
