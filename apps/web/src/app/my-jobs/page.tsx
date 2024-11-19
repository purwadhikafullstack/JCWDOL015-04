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
  TablePagination,
  Select,
  FormControl,
  MenuItem,
} from '@mui/material';
import MyCompanyJobSideBar from '@/components/MyCompanyJobSideBar';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import { fetchRecentlyPostedJobs } from '@/lib/job';
import base_url, { getUserInfo } from '@/lib/user';

type Job = {
  id: number;
  title: string;
  type: string;
  status: 'Active' | 'Expire';
  applications: number;
  daysRemaining: number;
};

const MyJobs: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterStatus, setFilterStatus] = useState('All Jobs');
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const userResponse = await getUserInfo();
      if (userResponse.ok && userResponse.user) {
        const userId = userResponse.user.user_id;
        const recentJobs = await fetchRecentlyPostedJobs(userId);
        const jobsData = (recentJobs.jobs || []).map((job: any) => ({
          id: job.job_id,
          title: job.job_title,
          type: job.jobType,
          status: job.is_active ? 'Active' : 'Expire',
          applications: job.applications?.length || 0,
          daysRemaining: job.days_remaining || 0,
        }));
        setJobs(jobsData);
      } else {
        console.error('Failed to fetch user info');
      }
    };

    fetchData();
  }, []);

  const updateJobStatus = async (
    jobId: number,
    newStatus: 'Active' | 'Expire',
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/jobs/${jobId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ is_active: newStatus === 'Active' }),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to update job status');
      }

      const result = await response.json();
      console.log('Job status updated:', result);

      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === jobId ? { ...job, status: newStatus } : job,
        ),
      );
    } catch (error) {
      console.error('Error updating job status:', error);
    }
  };

  const deleteJob = async (jobId: number) => {
    const confirmDelete = confirm(
      'Are you sure you want to delete this job? This action cannot be undone.',
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${base_url}/jobs/${jobId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Failed to delete the job.');
      }

      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
      alert('Job successfully deleted!');
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Failed to delete the job. Please try again later.');
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredJobs =
    filterStatus === 'All Jobs'
      ? jobs
      : jobs.filter((job) => job.status === filterStatus);

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="flex justify-center bg-gray-100 min-h-screen p-6 space-x-6">
        <MyCompanyJobSideBar />
        <div className="w-full max-w-5xl bg-white p-4 shadow-lg rounded-md">
          <div className="flex justify-between items-center mb-6">
            <Typography variant="h5" className="font-bold text-gray-700">
              My Jobs
            </Typography>
            <FormControl variant="outlined" className="w-48">
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as string)}
                displayEmpty
                className="bg-gray-100 rounded-md"
              >
                <MenuItem value="All Jobs">All Jobs</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Expire">Expire</MenuItem>
              </Select>
            </FormControl>
          </div>

          <TableContainer>
            <Table className="border">
              <TableHead>
                <TableRow className="bg-gray-200">
                  <TableCell className="font-semibold">Jobs</TableCell>
                  <TableCell className="font-semibold">Status</TableCell>
                  <TableCell className="font-semibold">View Detail</TableCell>
                  <TableCell className="font-semibold">Selection Test</TableCell>
                  <TableCell className="font-semibold">View Applications</TableCell>
                  <TableCell className="font-semibold">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredJobs
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((job) => (
                    <TableRow
                      key={job.id}
                      className="hover:bg-gray-50 transition duration-150"
                    >
                      <TableCell>
                        <div>
                          <Typography className="font-medium text-gray-800">
                            {job.title}
                          </Typography>
                          <Typography
                            variant="caption"
                            className="text-gray-500"
                          >
                            {job.type} • {job.daysRemaining} days remaining
                          </Typography>
                        </div>
                      </TableCell>
                      <TableCell>
                        <FormControl variant="outlined" size="small">
                          <Select
                            value={job.status}
                            onChange={(e) => {
                              const newStatus = e.target.value as
                                | 'Active'
                                | 'Expire';
                              updateJobStatus(job.id, newStatus);
                            }}
                            className="bg-gray-100"
                          >
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Expire">Expire</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="primary"
                          className="hover:bg-blue-50"
                          onClick={() => {
                            window.location.href = `/my-jobs/${job.id}`;
                          }}
                        >
                          View Detail
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="secondary"
                          className="hover:bg-pink-50"
                          onClick={async () => {
                            try {
                              const response = await fetch(
                                `${base_url}/preselection/check-test/${job.id}`,
                              );

                              if (response.ok) {
                                const data = await response.json();
                                if (data.hasTest) {
                                  window.location.href = `/test-creation/${job.id}`;
                                } else {
                                  const confirmCreate = confirm(
                                    'Tes belum terbuat untuk pekerjaan ini. Apakah Anda ingin membuat tes baru?',
                                  );
                                  if (confirmCreate) {
                                    const createResponse = await fetch(
                                      `${base_url}/preselection/create-test`,
                                      {
                                        method: 'POST',
                                        headers: {
                                          'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                          jobId: job.id,
                                        }),
                                      },
                                    );

                                    if (createResponse.ok) {
                                      alert(
                                        'Tes berhasil dibuat! Anda akan diarahkan ke halaman edit.',
                                      );
                                      window.location.href = `/test-creation/${job.id}`;
                                    } else {
                                      const errorData =
                                        await createResponse.json();
                                      alert(
                                        `Gagal membuat tes: ${errorData.msg}`,
                                      );
                                    }
                                  }
                                }
                              }
                            } catch (error) {
                              alert('Terjadi kesalahan. Silakan coba lagi.');
                            }
                          }}
                        >
                          Selection Test
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/jobs-applicant?jobId=${job.id}&jobTitle=${encodeURIComponent(
                            job.title,
                          )}`}
                        >
                          <Button
                            variant="outlined"
                            color="primary"
                            className="hover:bg-green-50"
                          >
                            View Applications
                          </Button>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="error"
                          className="hover:bg-red-50"
                          onClick={() => deleteJob(job.id)}
                        >
                          Delete Job
                        </Button>
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
            className="mt-4"
          />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default MyJobs;
