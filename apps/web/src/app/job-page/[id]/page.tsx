// src/app/job-page/[id]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Job } from '@/types/job'; // Import the Job interface

export default function JobDetailsPage() {
    const router = useRouter();
    const { id } = router.query;
    const [job, setJob] = useState<Job | null>(null);

    useEffect(() => {
        const fetchJobDetails = async () => {
            if (id) {
                try {
                    const response = await fetch(`/api/jobs/${id}`); // Replace with your backend API endpoint
                    const data = await response.json();
                    setJob(data.job);
                } catch (error) {
                    console.error('Error fetching job details:', error);
                }
            }
        };
        fetchJobDetails();
    }, [id]);

    if (!job) return <p>Loading job details...</p>;

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">{job.job_title}</h1>
            <p className="text-xl mb-2">Company: {job.company.company_name}</p>
            <p className="mb-2">Location: {job.location}</p>
            <p className="mb-4">Salary: ${job.salary}</p>
            <h2 className="text-2xl font-semibold mb-2">Job Description</h2>
            <p>{job.description}</p>

            <div className="mt-6">
                <button className="bg-blue-500 text-white px-4 py-2 rounded mr-4">Apply Now</button>
                <button className="bg-gray-500 text-white px-4 py-2 rounded">Save Job</button>
            </div>
        </div>
    );
}
