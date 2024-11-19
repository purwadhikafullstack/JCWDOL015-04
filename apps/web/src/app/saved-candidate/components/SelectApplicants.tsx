'use client';

import React, { useEffect, useState } from 'react';
import {
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
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
};

const SelectApplicants: React.FC<SelectApplicantsProps> = ({ companyId }) => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewTime, setInterviewTime] = useState('');

  useEffect(() => {
    if (!companyId) return;

    const fetchApplicants = async () => {
      try {
        const response = await axios.get(
          `${base_url}/applications/interview-applicants/${companyId}`,
        );
        setApplicants(response.data.applicants);
      } catch (error) {
        console.error('Error fetching applicants:', error);
      }
    };

    fetchApplicants();
  }, [companyId]);

  const handleOpenDialog = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedApplicant(null);
    setDialogOpen(false);
    setInterviewDate('');
    setInterviewTime('');
  };

  const handleScheduleInterview = async () => {
    if (!selectedApplicant || !interviewDate || !interviewTime) {
      alert('Please fill all fields before scheduling.');
      return;
    }
  
    try {
      const interviewDateTime = new Date(`${interviewDate}T${interviewTime}:00`).toISOString();
  
      console.log('Sending data to backend:', {
        interviewDate: interviewDate,
        interviewTime: interviewDateTime, 
      });
  
      await axios.patch(
        `${base_url}/applications/${selectedApplicant.id}/interview-schedule`,
        {
          interviewDate: interviewDateTime, 
          interviewTime: interviewDateTime, 
        },
      );
  
      alert('Interview scheduled successfully!');
      handleCloseDialog();
    } catch (error) {
      console.error('Error scheduling interview:', error);
      alert('Failed to schedule interview. Please try again.');
    }
  };
  

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
            {applicants.map((applicant) => (
              <TableRow key={applicant.id}>
                <TableCell>
                  <div className="flex items-center">
                    <Avatar
                      src={
                        applicant.photoUrl ||
                        'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                      }
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
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenDialog(applicant)}
                  >
                    Schedule Interview
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Schedule Interview</DialogTitle>
        <DialogContent>
          <Typography variant="body2" className="mb-2">
            {selectedApplicant?.name} - {selectedApplicant?.position}
          </Typography>
          <TextField
            fullWidth
            type="date"
            label="Interview Date"
            value={interviewDate}
            onChange={(e) => setInterviewDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            margin="dense"
          />
          <TextField
            fullWidth
            type="time"
            label="Interview Time"
            value={interviewTime}
            onChange={(e) => setInterviewTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleScheduleInterview} color="primary" variant="contained">
            Schedule
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default SelectApplicants;
