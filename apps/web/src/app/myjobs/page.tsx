// pages/MyJobs.tsx
'use client';

import React, { useState } from 'react';
import {
  Typography,
  Paper,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Select,
  FormControl,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MyCompanyJobSideBar from '@/components/MyCompanyJobSideBar';
import Link from 'next/link';

type Job = {
  id: number;
  title: string;
  type: string;
  status: 'Active' | 'Expire';
  applications: number;
  daysRemaining: number;
};

const MyJobs: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterStatus, setFilterStatus] = useState('All Jobs');

  const [jobs, setJobs] = useState<Job[]>([
    { id: 1, title: 'UI/UX Designer', type: 'Full Time', status: 'Active', applications: 798, daysRemaining: 7 },
    { id: 2, title: 'Junior Graphic Designer', type: 'Contract', status: 'Expire', applications: 583, daysRemaining: 0 },
    { id: 3, title: 'Front End Developer', type: 'Full Time', status: 'Active', applications: 740, daysRemaining: 9 },
  ]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, job: Job) => {
    setAnchorEl(event.currentTarget);
    setSelectedJob(job);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedJob(null);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStatusChange = (jobId: number, newStatus: 'Active' | 'Expire') => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, status: newStatus } : job
      )
    );
  };

  const filteredJobs = filterStatus === 'All Jobs' ? jobs : jobs.filter(job => job.status === filterStatus);

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen p-6 space-x-6">
      <MyCompanyJobSideBar />
      <div className="w-full max-w-5xl">
        <div className="flex justify-between items-center mb-4">
          <FormControl variant="outlined" className="w-48">
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as string)}
              displayEmpty
            >
              <MenuItem value="All Jobs">All Jobs</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Expire">Expire</MenuItem>
            </Select>
          </FormControl>
        </div>

        <Paper className="shadow-lg rounded-lg">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Jobs</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Applications</TableCell>
                  <TableCell>Selection Test</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredJobs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <Typography>{job.title}</Typography>
                        <Typography variant="caption" className="text-gray-500">
                          {job.type} • {job.daysRemaining} days remaining
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell>
                      <FormControl variant="outlined" size="small">
                        <Select
                          value={job.status}
                          onChange={(e) => handleStatusChange(job.id, e.target.value as 'Active' | 'Expire')}
                          displayEmpty
                        >
                          <MenuItem value="Active">Active</MenuItem>
                          <MenuItem value="Expire">Expire</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <Typography>{job.applications} Applications</Typography>
                    </TableCell>
                    <TableCell>
                      <Link href="http://localhost:3000/test-creation">
                        <Button variant="outlined" color="secondary">
                          Selection Test
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link href="/jobs-applicant">
                        <Button variant="outlined" color="primary" className="mr-2">
                          View Applications
                        </Button>
                      </Link>
                      <IconButton onClick={(event) => handleMenuOpen(event, job)}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                      >
                        <MenuItem onClick={handleMenuClose}>Promote Job</MenuItem>
                        <MenuItem onClick={handleMenuClose}>View Detail</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Make it Expire</MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredJobs.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
};

export default MyJobs;
