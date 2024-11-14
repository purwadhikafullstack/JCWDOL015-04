// components/AllApplications.tsx
'use client';

import React from 'react';
import { Typography, Paper, Button } from '@mui/material';
import { Visibility, Delete } from '@mui/icons-material';

type Applicant = {
  id: number;
  name: string;
  position: string;
  experience: string;
  education: string;
  dateApplied: string;
  shortlisted: boolean;
  photoUrl?: string; 
};

type AllApplicationsProps = {
  applicants: Applicant[];
};

const AllApplications: React.FC<AllApplicationsProps> = ({ applicants }) => {
  return (
    <Paper elevation={3} className="bg-white shadow-lg rounded-lg p-6 w-full">
      <Typography variant="h6" className="font-semibold mb-4 text-center text-gray-800">
        All Applications ({applicants.filter(applicant => !applicant.shortlisted).length})
      </Typography>
      {applicants
        .filter((applicant) => !applicant.shortlisted)
        .map((applicant) => (
          <div key={applicant.id} className="border-b border-gray-300 py-4">
            <div className="flex items-center mb-3">
              {/* Thumbnail Foto */}
              <img
                src={applicant.photoUrl || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'}
                alt={`${applicant.name}'s photo`}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <Typography className="font-semibold text-gray-800 text-sm">
                  {applicant.name}
                </Typography>
                <Typography className="text-xs text-gray-500">
                  {applicant.position}
                </Typography>
              </div>
            </div>
            <div className="text-center mb-2">
              <Typography className="text-xs text-gray-600">
                {applicant.experience} Experience
              </Typography>
              <Typography className="text-xs text-gray-600">
                Education: {applicant.education}
              </Typography>
              <Typography className="text-xs text-gray-600">
                Applied: {applicant.dateApplied}
              </Typography>
              <a href="#" className="text-blue-600 text-xs mt-2 inline-block hover:underline">
                Download CV
              </a>
            </div>
            <div className="flex justify-center space-x-2 mt-2">
              <Button
                size="small"
                className="text-blue-600 hover:text-blue-800 text-xs"
                startIcon={<Visibility />}
              >
                Review
              </Button>
              <Button
                size="small"
                className="text-red-600 hover:text-red-800 text-xs"
                startIcon={<Delete />}
              >
                Reject
              </Button>
            </div>
          </div>
        ))}
    </Paper>
  );
};

export default AllApplications;
