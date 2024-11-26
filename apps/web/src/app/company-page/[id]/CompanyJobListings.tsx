import { useEffect, useState } from 'react';
import { getJobsByCompanyId } from '@/lib/company';
import Card from '@/components/JobCard';
import { Job, JobCardProps } from '@/types/job';

interface CompanyJobListingsProps {
  companyId: number;
}

const CompanyJobListings = ({ companyId }: CompanyJobListingsProps) => {
  const [jobs, setJobs] = useState<JobCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(3);

  useEffect(() => {
    const fetchJobs = async () => {
      const { jobs: fetchedJobs, ok } = await getJobsByCompanyId(companyId);
      if (ok) {
        const formattedJobs: JobCardProps[] = fetchedJobs.map((job: Job) => ({
          job_id: job.job_id,
          job_title: job.job_title,
          location: job.location,
          salary:
            job.salary !== undefined ? `$${job.salary.toLocaleString()}` : null,
          company: {
            company_name: job.company.company_name,
            logo: job.company.logo || null,
          },
        }));
        setJobs(formattedJobs);
      }
      setLoading(false);
    };
    fetchJobs();
  }, [companyId]);

  if (loading) return <div>Loading jobs...</div>;

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <div>
      {/* Job listings grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentJobs.length > 0 ? (
          currentJobs.map((job) => <Card key={job.job_id} job={job} />)
        ) : (
          <p className="text-gray-500">
            No job listings available for this company.
          </p>
        )}
      </div>
      {/* Pagination Section */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-blue-600 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 bg-blue-600 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CompanyJobListings;
