'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getJobById } from '@/lib/job';
import { Job } from '@/types/job';
import HeaderSection from './HeaderSection';
import JobOverview from './JobOverview';
import CompanyInfo from './CompanyInfo';
import ApplyModal from './ApplyModal';

const JobPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { job, ok } = await getJobById(id as string);
        if (ok && job) {
          setJob(job);
        } else {
          setError('Failed to load job details');
        }
      } catch (error) {
        console.error('Error fetching job details:', error);
        setError('An error occurred while fetching job details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!job) return <p>No job data available</p>;

  const handleSaveClick = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-100 p-4 md:p-6 lg:p-8 pt-24 md:mt-16 lg:mt-0">
      <div className="max-w-6xl w-full">
        {/* Main Layout for Job and Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Job Details Section */}
          <div className="flex-1 bg-white shadow-lg rounded-lg p-4 md:p-6 lg:p-8 space-y-6">
            <HeaderSection job={job} isSaved={isSaved} handleSaveClick={handleSaveClick} />
            
            {/* Job Description Section */}
            <section>
              <h2 className="text-lg md:text-xl font-semibold mb-2">Job Description</h2>
              <p className="text-gray-700 text-sm md:text-base">{job.description}</p>
            </section>

            {/* Responsibilities Section */}
            <section>
              <h2 className="text-lg md:text-xl font-semibold mb-2">Responsibilities</h2>
              <p className="text-gray-700 text-sm md:text-base">{job.responsibility}</p>
            </section>
          </div>

          {/* Sidebar Section */}
          <div className="w-full lg:w-1/3 space-y-6">
            <JobOverview job={job} />
            <CompanyInfo job={job} />
          </div>
        </div>
      </div>

      {/* Apply Modal Component */}
      {job && <ApplyModal jobId={job.job_id} />}
    </div>
  );
};

export default JobPage;
