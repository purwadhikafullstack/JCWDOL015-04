// components/InterviewSchedules.tsx
'use client';

import React from 'react';
import { Typography, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

type InterviewSchedule = {
  id: number;
  applicantId: number;
  applicantName: string;
  date: string;
  time: string;
  applicantPhotoUrl?: string;
};

type InterviewSchedulesProps = {
  schedules: InterviewSchedule[];
  onEdit: (schedule: InterviewSchedule) => void;
  onDelete: (id: number) => void;
};

const InterviewSchedules: React.FC<InterviewSchedulesProps> = ({ schedules, onEdit, onDelete }) => {
  return (
    <Paper className="p-4 shadow-lg rounded-lg">
      <Typography variant="h6" className="font-semibold mb-4">
        Interview Schedules
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Applicant</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedules.map(schedule => (
              <TableRow key={schedule.id}>
                <TableCell>
                  <div className="flex items-center">
                    <Avatar
                      src={schedule.applicantPhotoUrl || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'}
                      alt={schedule.applicantName}
                      className="mr-3"
                    />
                    <Typography>{schedule.applicantName}</Typography>
                  </div>
                </TableCell>
                <TableCell>{schedule.date}</TableCell>
                <TableCell>{schedule.time}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    className="text-blue-600 hover:text-blue-800 text-xs mx-1"
                    startIcon={<Edit />}
                    // onClick={() => onEdit(schedule)}
                  >
                    Accept
                  </Button>
                  <Button
                    size="small"
                    className="text-red-600 hover:text-red-800 text-xs mx-1"
                    startIcon={<Delete />}
                    onClick={() => onDelete(schedule.id)}
                  >
                    Reject
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

export default InterviewSchedules;
