// components/SelectApplicants.tsx
'use client';

import React from 'react';
import { Typography, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar } from '@mui/material';

type Applicant = {
  id: number;
  name: string;
  position: string;
  experience: string;
  education: string;
  photoUrl?: string;
};

type SelectApplicantsProps = {
  applicants: Applicant[];
  onSchedule: (applicant: Applicant) => void;
};

const SelectApplicants: React.FC<SelectApplicantsProps> = ({ applicants, onSchedule }) => {
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
