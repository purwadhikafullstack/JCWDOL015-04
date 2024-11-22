'use client'
import { fetchVerifyCertificate } from '@/lib/certif';
import React, { useState } from 'react';

const VerifyCertificatePage: React.FC = () => {
  const [code, setCode] = useState('');
  const [certificateData, setCertificateData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerifyCertificate = async () => {
    setLoading(true);
    setError('');
    setCertificateData(null);

    try {
      const data = await fetchVerifyCertificate(Number(code));
      setCertificateData(data.assessment);
    } catch (error: any) {
      console.error('Error verifying certificate:', error.message);
      setError('Invalid or expired certificate. Please check the code and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-green-600">Verify Certificate</h1>
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
          onClick={handleVerifyCertificate}
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
          <h2 className="text-xl font-semibold text-green-600 mb-4">Certificate Details:</h2>
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-medium">Assessment Name:</span> {certificateData.assessment_data}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Score:</span> {certificateData.score}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Status:</span> {certificateData.status}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Date:</span> {new Date(certificateData.assessment_date).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyCertificatePage;
