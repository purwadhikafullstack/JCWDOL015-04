import React, { useState } from 'react';

interface ReviewFormProps {
  onSubmit: (review: string, position: string, minSalary: number, maxSalary: number, ratings: Ratings) => void;
  onCancel: () => void; // Tambahkan prop untuk handleCancel
}

interface Ratings {
  culture: number;
  workLifeBalance: number;
  facilities: number;
  careerOpportunities: number;
}

const AnonymousReviewForm: React.FC<ReviewFormProps> = ({ onSubmit, onCancel }) => {
  const [review, setReview] = useState('');
  const [position, setPosition] = useState('');
  const [minSalary, setMinSalary] = useState<number>(0);
  const [maxSalary, setMaxSalary] = useState<number>(0);
  const [ratings, setRatings] = useState<Ratings>({
    culture: 0,
    workLifeBalance: 0,
    facilities: 0,
    careerOpportunities: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (minSalary <= maxSalary) {
      onSubmit(review, position, minSalary, maxSalary, ratings);
    }
  };

  const handleRatingChange = (aspect: keyof Ratings, value: number) => {
    setRatings((prev) => ({ ...prev, [aspect]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow-md rounded-md">
      <div>
        <label className="block text-sm font-medium text-gray-700">Review</label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          placeholder="Tulis ulasan Anda di sini"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Posisi Pekerjaan</label>
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          placeholder="Masukkan posisi pekerjaan Anda"
        />
      </div>

      <div className="flex space-x-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Gaji Minimum</label>
          <input
            type="number"
            value={minSalary}
            onChange={(e) => setMinSalary(Number(e.target.value))}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Masukkan gaji minimum"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Gaji Maksimum</label>
          <input
            type="number"
            value={maxSalary}
            onChange={(e) => setMaxSalary(Number(e.target.value))}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Masukkan gaji maksimum"
          />
        </div>
      </div>

      {['culture', 'workLifeBalance', 'facilities', 'careerOpportunities'].map((aspect) => (
        <div key={aspect} className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            {aspect.replace(/([A-Z])/g, ' $1').toUpperCase()}
          </label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRatingChange(aspect as keyof Ratings, star)}
                className={`cursor-pointer text-2xl ${
                  ratings[aspect as keyof Ratings] >= star ? 'text-yellow-500' : 'text-gray-300'
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      ))}

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel} // Panggil fungsi onCancel saat tombol Cancel diklik
          className="py-2 px-4 bg-gray-400 text-white rounded-md hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Submit Review
        </button>
      </div>
    </form>
  );
};

export default AnonymousReviewForm;
