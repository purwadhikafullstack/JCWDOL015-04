'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { getStatusLabel } from '@/utils/format';
import base_url from '@/lib/user';

type Applicant = {
  id: number;
  name: string;
  position: string;
  experience: string;
  education: string;
  dateApplied: string;
  status: string;
  photoUrl?: string;
};

type AllApplicationsProps = {
  jobId: number;
};

const AllApplications: React.FC<AllApplicationsProps> = ({ jobId }) => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/applications/job/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get('token')}`,
            },
          }
        );
        setApplicants(response.data.applications);
      } catch (error) {
        console.error('Error fetching applicants:', error);
        toast.error('Failed to load applications.');
      }
    };

    fetchApplicants();
  }, [jobId]);

  const handleStatusChange = async (applicantId: number, newStatus: string) => {
    try {
      await axios.patch(
        `${base_url}/applications/${applicantId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      );

      setApplicants((prevApplicants) =>
        prevApplicants.map((applicant) =>
          applicant.id === applicantId ? { ...applicant, status: newStatus } : applicant
        )
      );

      toast.success(`Status updated to ${getStatusLabel(newStatus)}`);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status.');
    }
  };

  return (
    <Paper elevation={3} className="bg-white shadow-lg rounded-lg p-6 w-full">
      <Typography variant="h6" className="font-semibold mb-4 text-center text-gray-800">
        All Applications ({applicants.length})
      </Typography>
      {applicants.map((applicant) => (
        <div key={applicant.id} className="border-b border-gray-300 py-4">
          <div className="flex items-center mb-3">
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
          </div>

          <div className="flex justify-center mt-2">
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={applicant.status}
                label="Status"
                onChange={(e) => handleStatusChange(applicant.id, e.target.value as string)}
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="under_review">Under Review</MenuItem>
                <MenuItem value="interview">Interview</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
                <MenuItem value="hired">Hired</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      ))}
    </Paper>
  );
};

export default AllApplications;
