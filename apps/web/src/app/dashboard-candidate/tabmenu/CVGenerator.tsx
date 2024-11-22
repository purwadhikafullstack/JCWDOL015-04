'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cv } from '@/types/cvgenerator';
import { downloadCv, getCvs } from '@/lib/cvgenerator';
import { checkSubscriptionStatus } from '@/lib/subsDashboard';
import ResumeForm from './components/resumeform';
import { getToken } from '@/lib/server';

export default function CvDashboard() {
  const [isActiveSubscription, setIsActiveSubscription] = useState<
    boolean | null
  >(null);
  const [cv, setCv] = useState<Cv | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSubscription = async () => {
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
      }
      fetchCv();
    };

    checkSubscription();
  }, [router]);

  const fetchCv = async () => {
    setLoading(true);
    try {
      const result = await getCvs();
      if (result.ok && result.cvs && result.cvs.length > 0) {
        setCv(result.cvs[0]);
      } else {
        setCv(null);
      }
    } catch (error) {
      console.error('Error fetching CV:', error);
      toast.error('An error occurred while fetching CV.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setIsCreating(true);
  };

  const handleUpdate = () => {
    setIsUpdating(true);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setIsUpdating(false);
  };

  const handleFormSubmit = () => {
    setIsCreating(false);
    setIsUpdating(false);
    fetchCv();
  };

  const handleDownload = async () => {
    if (!cv) {
      toast.error('No CV available for download.');
      return;
    }

    try {
      const result = await downloadCv(cv.cv_id.toString());
      if (result.ok && result.file) {
        const url = window.URL.createObjectURL(result.file);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cv-${cv.cv_id}.pdf`;
        a.click();
      } else {
        toast.error('Failed to download CV.');
      }
    } catch (error) {
      console.error('Error downloading CV:', error);
      toast.error('An unexpected error occurred.');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">CV Generator</h1>

        {loading ? (
          <p>Loading...</p>
        ) : isCreating || isUpdating ? (
          <ResumeForm
            onResumeCreated={handleFormSubmit}
            onCancel={handleCancel}
            initialData={isUpdating ? cv?.content : null}
          />
        ) : cv ? (
          <div className="space-y-4">
            <div className="p-4 border rounded bg-gray-50">
              <h2 className="font-bold text-lg">Your CV</h2>
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
                onClick={handleUpdate}
              >
                Update CV
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleDownload}
              >
                Download CV
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-red-500 mb-4">No CV available.</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleCreate}
            >
              Create CV
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
