import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

interface AverageRatingProps {
  averageRating: number; // Rata-rata rating perusahaan
  totalReviews: number; // Total jumlah ulasan
}

const AverageRating: React.FC<AverageRatingProps> = ({ averageRating, totalReviews }) => {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    return (
      <div className="flex items-center">
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

  return (
    <div className="p-4 bg-blue-100 rounded-md shadow-md text-center">
      <h2 className="text-xl font-semibold mb-2">Rata-rata Rating Perusahaan</h2>
      <div className="flex justify-center items-center space-x-2">
        {renderStars(averageRating)}
        <span className="text-lg font-bold text-gray-700">{averageRating.toFixed(1)}</span>
      </div>
      <p className="text-sm text-gray-600 mt-1">{totalReviews} ulasan</p>
    </div>
  );
};

export default AverageRating;
