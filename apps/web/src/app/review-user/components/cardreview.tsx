import React from 'react';

interface Review {
  review_id: number;
  rating: number;
  comment?: string;
  salary_estimate?: number;
  position?: string;
  workCultureRating?: number;
  workLifeBalanceRating?: number;
  facilitiesRating?: number;
  careerOpportunitiesRating?: number;
  created_at: Date;
}

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.review_id} className="p-4 bg-white shadow-md rounded-md">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">
              {review.position || 'Anonim'}
            </h3>
            <span className="text-sm text-gray-500">
              {new Date(review.created_at).toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            Perkiraan Gaji: {review.salary_estimate ? `Rp${review.salary_estimate}` : 'Tidak tersedia'}
          </p>
          <div className="space-y-1 mb-2">
            <div>
              <span className="font-medium">Rating Umum:</span> {review.rating}/5
            </div>
            <div>
              <span className="font-medium">Budaya Kerja:</span> {review.workCultureRating ?? 'N/A'}/5
            </div>
            <div>
              <span className="font-medium">Keseimbangan Kerja dan Kehidupan:</span> {review.workLifeBalanceRating ?? 'N/A'}/5
            </div>
            <div>
              <span className="font-medium">Fasilitas:</span> {review.facilitiesRating ?? 'N/A'}/5
            </div>
            <div>
              <span className="font-medium">Peluang Karier:</span> {review.careerOpportunitiesRating ?? 'N/A'}/5
            </div>
          </div>
          {review.comment && (
            <p className="text-gray-800 text-sm">{review.comment}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
