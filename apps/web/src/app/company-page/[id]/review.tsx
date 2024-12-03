'use client';

import React, { useState, useEffect } from 'react';
import { IReview } from '@/types/review';
import { createReview, fetchReviewsByCompany } from '@/lib/review';
import ReviewList from './components/reviewlist';
import AnonymousReviewForm from './components/formreview';
import AverageRating from './components/avgrating';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReviewsPage: React.FC<{ params: { companyId: number } }> = ({
  params,
}) => {
  const companyId = params.companyId; // Ambil companyId dari props

  const [averageRating, setAverageRating] = useState(0);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!companyId) return; // Validasi jika companyId tidak valid

    const loadReviews = async () => {
      try {
        const data = await fetchReviewsByCompany(companyId);
        setReviews(data);

        const totalRating = data.reduce(
          (sum, review) => sum + Number(review.rating),
          0,
        );
        const average = totalRating / data.length;
        setAverageRating(average || 0);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching reviews');
        toast.error('Failed to fetch reviews');
      }
    };

    loadReviews();
  }, [companyId]);

  const reloadReviews = async () => {
    try {
      const data = await fetchReviewsByCompany(companyId);
      setReviews(data);

      const totalRating = data.reduce(
        (sum, review) => sum + Number(review.rating),
        0,
      );
      const average = totalRating / data.length;
      setAverageRating(average || 0);
    } catch (err) {
      toast.error('Failed to reload reviews');
    }
  };

  const handleSubmitReview = async (
    review: string,
    position: string,
    minSalary: number,
    maxSalary: number,
    ratings: {
      culture: number;
      workLifeBalance: number;
      facilities: number;
      careerOpportunities: number;
    },
  ) => {
    if (!companyId) return;

    const salary_estimate = (minSalary + maxSalary) / 2;

    const payload = {
      comment: review,
      salary_estimate: salary_estimate,
      position: position,
      workCultureRating: ratings.culture,
      workLifeBalanceRating: ratings.workLifeBalance,
      facilitiesRating: ratings.facilities,
      careerOpportunitiesRating: ratings.careerOpportunities,
      company_id: companyId,
    };

    try {
      await createReview(payload);
      toast.success('Review created successfully!');
      setShowForm(false); // Tutup form setelah submit
      await reloadReviews(); // Revalidate data reviews
    } catch (error: any) {
      toast.error(`Failed to create review: ${error.message}`);
    }
  };

  const handleCancel = () => {
    setShowForm(false); // Tutup form jika pengguna menekan tombol Cancel
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Reviews Company</h1>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Review
          </button>
        )}
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      <AverageRating
        averageRating={averageRating}
        totalReviews={reviews.length}
      />

      {showForm && (
        <div className="p-4 border border-gray-300 rounded-md bg-gray-100">
          <AnonymousReviewForm
            onSubmit={handleSubmitReview}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <h2 className="text-xl font-semibold mt-8 mb-4">Existing Reviews</h2>
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default ReviewsPage;
