// Updated JobApplications.tsx

'use client';

import React, { useState } from 'react';
import { Typography, Button, Menu, MenuItem, TextField, Paper, Box } from '@mui/material';
import { FilterList } from '@mui/icons-material';
import MyCompanyJobSideBar from '@/components/MyCompanyJobSideBar';
import AllApplications from './components/AllApplications';
import UnderReviewApplications from './components/UnderReviewApplications';

type Applicant = {
  id: number;
  name: string;
  position: string;
  experience: string;
  education: string;
  dateApplied: string;
  shortlisted: boolean;
};

const JobApplications: React.FC = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([
    {
      id: 1,
      name: 'Ronald Richards',
      position: 'UI/UX Designer',
      experience: '7 Years',
      education: 'Master Degree',
      dateApplied: 'Jan 23, 2022',
      shortlisted: false,
    },
    {
      id: 2,
      name: 'Theresa Webb',
      position: 'Product Designer',
      experience: '7 Years',
      education: 'High School Degree',
      dateApplied: 'Jan 23, 2022',
      shortlisted: false,
    },
    {
      id: 3,
      name: 'Devon Lane',
      position: 'User Experience Designer',
      experience: '7 Years',
      education: 'Master Degree',
      dateApplied: 'Jan 23, 2022',
      shortlisted: true,
    },
  ]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sort, setSort] = useState('Newest');
  const [searchName, setSearchName] = useState('');
  const [searchExperience, setSearchExperience] = useState('');
  const [searchEducation, setSearchEducation] = useState('');

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    handleMenuClose();
  };

  const filteredApplicants = applicants.filter((applicant) => {
    return (
      applicant.name.toLowerCase().includes(searchName.toLowerCase()) &&
      applicant.experience.toLowerCase().includes(searchExperience.toLowerCase()) &&
      applicant.education.toLowerCase().includes(searchEducation.toLowerCase())
    );
  });

  return (
    <div className="flex justify-center items-start bg-gray-100 min-h-screen p-6 space-x-8">
      <MyCompanyJobSideBar />

      <main className="flex-1 max-w-4xl space-y-6">
        <Paper elevation={3} className="p-6 bg-white rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <Typography variant="h5" className="font-semibold text-gray-800">
              UI/UX Job Applicants
            </Typography>
            <Button
              startIcon={<FilterList />}
              onClick={handleMenuOpen}
              variant="contained"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md text-sm"
            >
              Sort
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={() => handleSortChange('Newest')}>Newest</MenuItem>
              <MenuItem onClick={() => handleSortChange('Oldest')}>Oldest</MenuItem>
            </Menu>
          </div>

          {/* Filter Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <TextField
              label="Search by Name"
              variant="outlined"
              size="small"
              fullWidth
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="bg-white"
            />
            <TextField
              label="Search by Experience"
              variant="outlined"
              size="small"
              fullWidth
              value={searchExperience}
              onChange={(e) => setSearchExperience(e.target.value)}
              className="bg-white"
            />
            <TextField
              label="Search by Education"
              variant="outlined"
              size="small"
              fullWidth
              value={searchEducation}
              onChange={(e) => setSearchEducation(e.target.value)}
              className="bg-white"
            />
          </div>
        </Paper>

        {/* Application Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AllApplications applicants={filteredApplicants} />
          <UnderReviewApplications applicants={applicants} />
        </div>
      </main>
    </div>
  );
};

export default JobApplications;
