import base_url from './user';
import { getToken } from './server';
import { RecentlyAppliedJob } from '@/types/job';

export const applyForJob = async (
  jobId: number,
  coverLetter: string,
  resume: File,
) => {
  const token = await getToken();

  if (!token) {
    console.error('No token found');
    return { msg: 'Unauthorized', ok: false };
  }

  const formData = new FormData();
  formData.append('jobId', String(jobId));
  formData.append('coverLetter', coverLetter);
  formData.append('resume', resume);

  try {
    const res = await fetch(`${base_url}/applications/apply`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await res.json();
    return { result, ok: res.ok };
  } catch (error) {
    console.error('Error in applyForJob:', error);
    return { msg: 'Failed to apply for the job', ok: false };
  }
};

export const checkApplicationStatus = async (
  jobId: number,
): Promise<boolean> => {
  const token = await getToken();

  if (!token) {
    console.error('No token found');
    return false;
  }

  try {
    const res = await fetch(
      `${base_url}/favorite-job/check-applied?jobId=${jobId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await res.json();
    return data.applied || false;
  } catch (error) {
    console.error('Error checking application status:', error);
    return false;
  }
};

export const fetchAppliedJobCount = async (userId: number) => {
  const token = await getToken();
  if (!token) {
    console.error('No token found');
    return 0;
  }

  const res = await fetch(`${base_url}/jobs/applied/count`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data.count || 0;
};

export const fetchFavoriteJobCount = async (userId: number) => {
  const token = await getToken();
  if (!token) {
    console.error('No token found');
    return 0;
  }

  const res = await fetch(`${base_url}/jobs/favorites/count`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data.count || 0;
};

export const fetchRecentlyAppliedJobs = async (
  userId: number,
): Promise<RecentlyAppliedJob[]> => {
  const token = await getToken();
  if (!token) {
    console.error('No token found');
    return [];
  }

  const res = await fetch(`${base_url}/applications/user/${userId}/recent`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return (data.applications as RecentlyAppliedJob[]) || [];
};
