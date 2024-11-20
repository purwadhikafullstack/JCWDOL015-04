// pages/SchedulePage.tsx
'use client';

import React, { useState } from 'react';
import {
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Paper,
  Box,
} from '@mui/material';
import SelectApplicants from './components/SelectApplicants';
import InterviewSchedules from './components/InterviewSchedules';
import MyCompanyJobSideBar from '@/components/MyCompanyJobSideBar';

type Applicant = {
  id: number;
  name: string;
  position: string;
  experience: string;
  education: string;
};

type InterviewSchedule = {
  id: number;
  applicantId: number;
  applicantName: string;
  date: string;
  time: string;
};

const SchedulePage: React.FC = () => {
  const [applicants] = useState<Applicant[]>([
    { id: 1, name: 'Ronald Richards', position: 'UI/UX Designer', experience: '7 Years', education: 'Master Degree' },
    { id: 2, name: 'Theresa Webb', position: 'Product Designer', experience: '5 Years', education: 'Bachelor Degree' },
  ]);

  const [schedules, setSchedules] = useState<InterviewSchedule[]>([]);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const companyId = 29;

  const handleOpenDialog = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setDate('');
    setTime('');
  };

  const handleSaveSchedule = () => {
    if (selectedApplicant && date && time) {
      const newSchedule: InterviewSchedule = {
        id: schedules.length + 1,
        applicantId: selectedApplicant.id,
        applicantName: selectedApplicant.name,
        date,
        time,
      };
      setSchedules([...schedules, newSchedule]);
      handleCloseDialog();
    }
  };

  const handleDeleteSchedule = (id: number) => {
    setSchedules(schedules.filter(schedule => schedule.id !== id));
  };

  return (
    <Box className="flex justify-center bg-gray-100 min-h-screen p-6 space-x-6">
      <MyCompanyJobSideBar />
      
      <Paper elevation={3} className="w-full max-w-5xl p-6 rounded-lg shadow-lg space-y-6 bg-white">
        <Typography variant="h4" className="font-semibold text-center text-blue-800">
          Interview Schedule Management
        </Typography>

        <SelectApplicants companyId={companyId}/>
        <InterviewSchedules 
          schedules={schedules} 
          onEdit={(schedule) => handleOpenDialog(applicants.find(app => app.id === schedule.applicantId)!)} 
          onDelete={handleDeleteSchedule} 
        />

        <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
          <DialogTitle className="text-blue-800 font-semibold">Schedule Interview</DialogTitle>
          <DialogContent className="space-y-4">
            <Typography variant="subtitle1" className="mb-2 text-gray-700">
              Applicant: <span className="font-medium">{selectedApplicant?.name}</span>
            </Typography>
            <TextField
              label="Date"
              type="date"
              fullWidth
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              className="mb-4"
            />
            <TextField
              label="Time"
              type="time"
              fullWidth
              value={time}
              onChange={(e) => setTime(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </DialogContent>
          <DialogActions className="p-4">
            <Button onClick={handleCloseDialog} color="secondary" className="text-gray-600">
              Cancel
            </Button>
            <Button onClick={handleSaveSchedule} variant="contained" color="primary" className="bg-blue-600">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default SchedulePage;
