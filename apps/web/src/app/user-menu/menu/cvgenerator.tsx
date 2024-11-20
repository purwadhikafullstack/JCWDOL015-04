'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cv } from '@/types/cvgenerator';
import { downloadCv, getCvs } from '@/lib/cvgenerator';
import { checkSubscriptionStatus } from '@/lib/subsDashboard';
import { getToken } from '@/lib/server';
import ResumeForm from '../components/resumeform';

export default function CvDashboard() {
  const [cv, setCv] = useState<Cv | null>(null);
  const [loading, setLoading] = useState(false);
  const [isActiveSubscription, setIsActiveSubscription] = useState<boolean | null>(null);
  const [isCreating, setIsCreating] = useState(false); // State untuk menampilkan form
  const router = useRouter();

  useEffect(() => {
    const checkStatus = async () => {
      const token = await getToken();
      if (!token) {
        toast.error('Unauthorized: No token found');
        setIsActiveSubscription(false);
        return;
      }

      const result = await checkSubscriptionStatus(token);
      if (result.isActive) {
        setIsActiveSubscription(true);
        fetchCv(); // Fetch CV setelah memastikan subscription aktif
      } else {
        toast.error('You do not have an active subscription.');
        setIsActiveSubscription(false);

        // Redirect to CustomerPlans after 3 seconds
        setTimeout(() => {
          router.push('/user-menu?tab=CustomerPlans');
        }, 3000);
      }
    };

    checkStatus();
  }, [router]);

  useEffect(() => {
  }, [cv]);
  

  const fetchCv = async () => {
    setLoading(true);
    try {
      const response = await getCvs();
      if (response.ok && response.cvs && Array.isArray(response.cvs) && response.cvs.length > 0) {
        setCv(response.cvs[0]);
      } else {
        setCv(null);
        toast.info('You do not have any CV.');
      }
    } catch (e) {
      console.error('Error during fetchCv:', e);
      toast.error('An error occurred while fetching CV');
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleCreateCv = () => {
    setIsCreating(true); // Tampilkan form
  };

  const handleFormSubmit = () => {
    setIsCreating(false); // Sembunyikan form setelah submit
    fetchCv(); // Refresh CV list
  };

  const handleDownloadCv = async () => {
    try {
      if (!cv || !cv.cv_id) {
        toast.error('No CV selected for download.');
        return;
      }
  
      // Panggil fungsi downloadCv
      const result = await downloadCv(cv.cv_id.toString());
  
      if (result.ok && result.file) {
        // Buat URL blob untuk file
        const url = window.URL.createObjectURL(result.file);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cv-${cv.cv_id}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
  
        toast.success('CV downloaded successfully!');
      } else {
        toast.error('Failed to download CV. Please try again.');
      }
    } catch (error) {
      console.error('Error downloading CV:', error);
      toast.error('An unexpected error occurred while downloading CV.');
    }
  };
  

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">CV Generator</h1>

      {isActiveSubscription === null ? (
        <p>Loading subscription status...</p>
      ) : isActiveSubscription ? (
        <>
          {isCreating ? (
            <ResumeForm onResumeCreated={handleFormSubmit} />

          ) : cv ? (
            <div>
              <h2 className="text-lg font-bold mb-4">Your CV</h2>
              <div className="border p-4 rounded mb-4">
                <p>
                  <strong>Full Name:</strong> {cv.content.fullName}
                </p>
                <p>
                  <strong>Summary:</strong> {cv.content.summary}
                </p>
                <p>
                  <strong>Template:</strong> {cv.template}
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleCreateCv}
                >
                  Update CV
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={handleDownloadCv}
                >
                  Download CV
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-red-500 mb-4">Anda belum memiliki CV.</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleCreateCv}
              >
                Create CV
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-red-500">
          You need an active subscription to access CV Generator. Redirecting to
          subscription plans...
        </p>
      )}
    </div>
  );
}
