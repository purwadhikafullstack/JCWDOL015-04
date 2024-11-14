'use client';

import React from 'react';
import Link from 'next/link';
import { Paper, Typography, Button } from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import FavoriteIcon from '@mui/icons-material/Favorite';

const MyCompanyJobSideBar: React.FC = () => {
  return (
    <Paper elevation={3} className="p-4 w-52 bg-white shadow rounded-lg self-start">
      <Typography variant="h6" className="font-semibold mb-4 text-center">
        My Jobs
      </Typography>
      <nav className="space-y-2">
        <Link href="/myjobs">
          <Button
            fullWidth
            variant="text"
            startIcon={<WorkOutlineIcon />}
            className="text-gray-700 hover:bg-blue-200 justify-start"
          >
            My Company Job
          </Button>
        </Link>
        <Link href="/post-jobs">
          <Button
            fullWidth
            variant="text"
            startIcon={<PostAddIcon />}
            className="text-gray-700 hover:bg-blue-200 justify-start"
          >
            Post a Job
          </Button>
        </Link>
        <Link href="/myjobs">
          <Button
            fullWidth
            variant="text"
            startIcon={<AssignmentIndIcon />}
            className="text-gray-700 hover:bg-blue-200 justify-start"
          >
            My Jobs
          </Button>
        </Link>
        <Link href="/saved-candidate">
          <Button
            fullWidth
            variant="text"
            startIcon={<FavoriteIcon />}
            className="text-gray-700 hover:bg-blue-200 justify-start"
          >
            Saved Candidate
          </Button>
        </Link>
      </nav>
    </Paper>
  );
};

export default MyCompanyJobSideBar;
