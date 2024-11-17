// components/SelectApplicants.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Typography, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar } from '@mui/material';
import axios from 'axios';
import base_url from '@/lib/user';

type Applicant = {
  id: number;
  name: string;
  position: string;
  experience: string;
  education: string;
  photoUrl?: string;
};

type SelectApplicantsProps = {
  companyId: number;
  onSchedule: (applicant: Applicant) => void;
};

const SelectApplicants: React.FC<SelectApplicantsProps> = ({ companyId, onSchedule }) => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);

  useEffect(() => {
    if (!companyId) return;

    const fetchApplicants = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/applications/interview-applicants/${companyId}`);
        setApplicants(response.data.applicants);
      } catch (error) {
        console.error('Error fetching applicants:', error);
      }
    };

    fetchApplicants();
  }, [companyId]);

  return (
    <Paper className="p-4 shadow-lg rounded-lg">
      <Typography variant="h6" className="font-semibold mb-4">
        Select Applicants for Interview
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Applicant</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Experience</TableCell>
              <TableCell>Education</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applicants.map(applicant => (
              <TableRow key={applicant.id}>
                <TableCell>
                  <div className="flex items-center">
                    <Avatar
                      src={applicant.photoUrl || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'}
                      alt={applicant.name}
                      className="mr-3"
                    />
                    <Typography>{applicant.name}</Typography>
                  </div>
                </TableCell>
                <TableCell>{applicant.position}</TableCell>
                <TableCell>{applicant.experience}</TableCell>
                <TableCell>{applicant.education}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => onSchedule(applicant)}>
                    Schedule Interview
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default SelectApplicants;
