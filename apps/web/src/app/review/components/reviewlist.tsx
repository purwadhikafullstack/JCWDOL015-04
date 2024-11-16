import React, { useState } from 'react';
import { IReview } from '@/types/review';
import { FaStar, FaRegStar } from 'react-icons/fa';

interface ReviewListProps {
  reviews: IReview[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  const [expandedReviewIds, setExpandedReviewIds] = useState<number[]>([]);

  const toggleExpand = (id: number) => {
    setExpandedReviewIds((prev) =>
      prev.includes(id) ? prev.filter((reviewId) => reviewId !== id) : [...prev, id]
    );
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return <FaStar key={i} className="text-yellow-500" />;
          } else if (i === fullStars && hasHalfStar) {
            return <FaStar key={i} className="text-yellow-300 opacity-50" />;
          } else {
            return <FaRegStar key={i} className="text-gray-300" />;
          }
        })}
      </div>
    );
  };

  if (reviews.length === 0) {
    return <p className="text-gray-500">Belum ada ulasan untuk perusahaan ini.</p>;
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div
          key={review.review_id}
          className="p-4 bg-white shadow-md rounded-md border border-gray-200"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">{review.position || 'Anonim'}</h3>
            <span className="text-sm text-gray-500">
              {new Date(review.created_at).toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            Perkiraan Gaji: {review.salary_estimate ? `Rp${review.salary_estimate.toLocaleString('id-ID')}` : 'Tidak tersedia'}
          </p>
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-medium">Rating Umum:</span>
            {renderStars(Number(review.rating))}
            <span>{Number(review.rating).toFixed(1)}</span>
          </div>

          {expandedReviewIds.includes(review.review_id) && (
            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
              <div>
                <span className="font-medium">Budaya Kerja</span>
                <div>{renderStars(review.workCultureRating ?? 0)}</div>
              </div>
              <div>
                <span className="font-medium">Keseimbangan Kerja dan Kehidupan</span>
                <div>{renderStars(review.workLifeBalanceRating ?? 0)}</div>
              </div>
              <div>
                <span className="font-medium">Fasilitas</span>
                <div>{renderStars(review.facilitiesRating ?? 0)}</div>
              </div>
              <div>
                <span className="font-medium">Peluang Karier</span>
                <div>{renderStars(review.careerOpportunitiesRating ?? 0)}</div>
              </div>
              {review.comment && (
                <div className="col-span-2 border-t pt-2 mt-2">
                  <p>{review.comment}</p>
                </div>
              )}
            </div>
          )}

          <button
            onClick={() => toggleExpand(review.review_id)}
            className="mt-4 w-full text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            {expandedReviewIds.includes(review.review_id) ? 'Tutup Detail' : 'Lihat Detail'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
