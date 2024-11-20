'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { IReview } from '@/types/review';
import { createReview, fetchReviewsByCompany } from '@/lib/review';
import ReviewList from './components/reviewlist';
import AnonymousReviewForm from './components/formreview';
import AverageRating from './components/avgrating';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReviewsPage: React.FC<{ params: { companyId: string } }> = ({
  params,
}) => {
  const searchParams = useSearchParams();
  const queryCompanyId = searchParams.get('companyId');
  const dynamicCompanyId = params.companyId;
  const [averageRating, setAverageRating] = useState(0);
  const companyId = queryCompanyId || dynamicCompanyId;

  const [reviews, setReviews] = useState<IReview[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!companyId) return;

    const loadReviews = async () => {
      try {
        const data = await fetchReviewsByCompany(Number(companyId));
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
      company_id: 1,
    };
    try {
      const newReview = await createReview(payload);
      toast.success('Review created successfully!');
      setReviews((prev) => [...prev, newReview]); // Tambahkan review ke state
    } catch (error: any) {
      toast.error(`Failed to create review: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Reviews for Company {companyId}</h1>
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

      {showForm && <AnonymousReviewForm onSubmit={handleSubmitReview} />}

      <h2 className="text-xl font-semibold mt-8 mb-4">Existing Reviews</h2>
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default ReviewsPage;
