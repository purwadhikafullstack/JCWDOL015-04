'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchVerifyCertificate } from '@/lib/certif';

interface CertificateData {
  assessment_name: string;
  user_name: string;
  score: number;
  status: string;
  issued_at: string;
  unique_code: string;
}

const VerifyCertificatePage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [code, setCode] = useState('');
  const [certificateData, setCertificateData] =
    useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validation, setValidation] = useState<string | null>(null);

  // Bungkus handleVerifyCertificate dengan useCallback
  const handleVerifyCertificate = useCallback(
    async (inputCode?: string, updateParams = true) => {
      const certificateCode = inputCode || code;
      if (!certificateCode.trim()) {
        setError('Certificate code cannot be empty.');
        return;
      }

      setLoading(true);
      setError('');
      setCertificateData(null);

      try {
        if (updateParams) {
          router.push(`/certificate-verify?code=${certificateCode}`);
        }
        const data = await fetchVerifyCertificate(certificateCode);
        setCertificateData(data.certificate);
        setValidation(data.message);
      } catch (error: any) {
        console.error('Error verifying certificate:', error.message);
        setError(
          'Invalid or expired certificate. Please check the code and try again.',
        );
      } finally {
        setLoading(false);
      }
    },
    [code, router],
  );

  // Gunakan useEffect untuk auto-fetch berdasarkan URL params
  useEffect(() => {
    if (!searchParams) return;

    const queryCode = searchParams.get('code');
    if (queryCode) {
      setCode(queryCode);
      handleVerifyCertificate(queryCode, false);
    }
  }, [searchParams, handleVerifyCertificate]);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-green-600">
        Verify Certificate
      </h1>
      <div className="mb-6">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter certificate code"
          className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>
      <div className="text-center">
        <button
          onClick={() => handleVerifyCertificate()}
          className={`bg-green-500 text-white px-6 py-3 rounded-lg font-medium transition-transform transform hover:scale-105 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Verifying...' : 'Verify Certificate'}
        </button>
      </div>

      {error && (
        <div className="mt-6 text-center text-red-500 font-semibold">
          {error}
        </div>
      )}

      {certificateData && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-green-600 mb-4">
            Certificate Details:
          </h2>
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-medium">Assessment Name:</span>{' '}
              {certificateData.assessment_name}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Name:</span>{' '}
              {certificateData.user_name}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Score:</span>{' '}
              {certificateData.score}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Code:</span>{' '}
              {certificateData.unique_code}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Date:</span>{' '}
              {new Date(certificateData.issued_at).toLocaleDateString()}
            </p>
          </div>

          {validation && (
            <div className="mt-4 text-center">
              <p className="text-green-500 font-bold underline underline-offset-2 text-3xl">
                {validation}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyCertificatePage;
