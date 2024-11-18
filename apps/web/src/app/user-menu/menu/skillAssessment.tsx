'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  fetchAllAssessments,
  fetchStartAssessment,
  fetchSubmitAssessment,
} from '@/lib/assessment';
import { fetchGenerateCertificate } from '@/lib/certif';
import { Assessment, Question } from '@/types/assessment';
import SkillAssessmentList from '../components/UassessmentList';
import AssessmentCard from '../components/UassessmentCard';
import { getToken } from '@/lib/server';
import { checkSubscriptionStatus } from '@/lib/subsDashboard';

const UserAssessment: React.FC = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [isActiveSubscription, setIsActiveSubscription] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const router = useRouter();

  useEffect(() => {
    const checkStatus = async () => {
      try {
        setLoading(true);
        const token = await getToken();
        if (!token) {
          toast.error('Unauthorized: No token found');
          setIsActiveSubscription(false);
          return;
        }

        const result = await checkSubscriptionStatus(token);
        if (result.isActive) {
          setIsActiveSubscription(true);
        } else {
          toast.error('You do not have an active subscription.');
          setIsActiveSubscription(false);

          // Redirect to CustomerPlans after 3 seconds
          setTimeout(() => {
            router.push('/user-menu?tab=CustomerPlans');
          }, 3000);
        }
      } catch (error) {
        console.error('Error checking subscription status:', error);
        toast.error('Failed to check subscription status.');
        setIsActiveSubscription(false);
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, [router]);

  const handleAutoSubmit = useCallback(async () => {
    try {
      const token = localStorage.getItem('assessmentToken');

      if (!token) {
        toast.error('Failed to auto-submit: Token is missing.');
        return;
      }

      toast.warn('Time is up! Auto-submitting the assessment.');

      const data = { responses: [], token }; // Submit token with empty data
      await fetchSubmitAssessment(data);

      toast.success('Assessment auto-submitted successfully.');
      setQuestions(null); // Reset questions in state
      router.push('/user-menu'); // Navigate to results or dashboard page
    } catch (error: any) {
      console.error('Error auto-submitting assessment:', error);
      toast.error(error.message || 'Failed to auto-submit assessment.');
    }
  }, [router]);

  useEffect(() => {
    if (questions && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }

    if (timeLeft === 0) {
      handleAutoSubmit();
    }
  }, [questions, timeLeft, handleAutoSubmit]);

  useEffect(() => {
    if (isActiveSubscription) {
      loadAssessments();
    }
  }, [isActiveSubscription]);

  const loadAssessments = async () => {
    try {
      setLoading(true);
      const data = await fetchAllAssessments();
      setAssessments(data);
    } catch (error: any) {
      console.error('Error loading assessments:', error);
      toast.error(error.message || 'Failed to load assessments');
    } finally {
      setLoading(false);
    }
  };

  const handleStartAssessment = async (assessmentId: number) => {
    try {
      setLoading(true);
      const { token, assessment } = await fetchStartAssessment(assessmentId);

      localStorage.setItem('assessmentToken', token); // Save token
      setQuestions(assessment.questions); // Save questions
      setTimeLeft(30 * 60); // Reset timer

      toast.success('Assessment started!');
    } catch (error: any) {
      console.error('Error starting assessment:', error);
      toast.error(error.message || 'Failed to start assessment');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAssessment = async (
    responses: { question_id: number; answer_text: string }[],
  ) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('assessmentToken');
      const data = { responses, token }; // Submit token with data
      await fetchSubmitAssessment(data);
      setQuestions(null); // Reset questions after submit
      toast.success('Assessment submitted successfully!');
      router.push('/user-menu'); // Navigate to main page
    } catch (error: any) {
      console.error('Error submitting assessment:', error);
      toast.error(error.message || 'Failed to submit assessment');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCertificate = async (assessmentId: number) => {
    try {
      setLoading(true);

      const response = await fetchGenerateCertificate(assessmentId);
      const blob = new Blob([response], { type: 'application/pdf' });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `certificate_${assessmentId}.pdf`;
      a.click();

      window.URL.revokeObjectURL(url);
      toast.success('Certificate generated successfully! Downloading...');
    } catch (error: any) {
      console.error('Error generating certificate:', error);
      toast.error(error.message || 'Failed to generate certificate.');
    } finally {
      setLoading(false);
    }
  };

  if (isActiveSubscription === null) {
    return <p>Checking subscription status...</p>;
  }

  if (!isActiveSubscription) {
    return <p>Redirecting to subscription page...</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {!questions ? (
        <div>
          <SkillAssessmentList
            assessments={assessments}
            onStart={handleStartAssessment}
            loading={loading}
          />
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">Generate Certificate</h2>
            {assessments
              .filter((assessment) => assessment.status === 'passed')
              .map((assessment) => (
                <div key={assessment.assessment_id} className="mb-4 p-4 border rounded-lg">
                  <p>Assessment: {assessment.assessment_data}</p>
                  <p>Score: {assessment.score}</p>
                  <button
                    onClick={() => handleGenerateCertificate(assessment.assessment_id)}
                    className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                  >
                    Generate Certificate
                  </button>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div>
          <p className="text-red-500 font-semibold">
            Time Remaining: {Math.floor(timeLeft / 60)}:
            {timeLeft % 60 < 10 ? '0' : ''}
            {timeLeft % 60}
          </p>
          <AssessmentCard
            questions={questions}
            onSubmit={handleSubmitAssessment}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
};

export default UserAssessment;
