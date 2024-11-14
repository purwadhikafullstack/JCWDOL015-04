import { GetServerSideProps } from 'next';
import React from 'react';
import AnonymousReviewForm from './components/formreview';


interface Ratings {
  culture: number;
  workLifeBalance: number;
  facilities: number;
  careerOpportunities: number;
}

const ReviewPage = () => {
  const handleFormSubmit = (
    review: string,
    position: string,
    minSalary: number,
    maxSalary: number,
    ratings: Ratings
  ) => {
    const averageRating = calculateAverageRating(ratings);

    // Kirim data ke backend (pastikan hanya akun terverifikasi)
    console.log({
      review,
      position,
      minSalary,
      maxSalary,
      ratings,
      averageRating,
    });

    // Misalnya, kirim data ke API untuk disimpan ke database
    fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        review,
        position,
        minSalary,
        maxSalary,
        ...ratings,
        averageRating,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log('Review berhasil dikirim:', data))
      .catch((error) => console.error('Gagal mengirim review:', error));
  };

  // Fungsi untuk menghitung rata-rata rating dari semua aspek
  const calculateAverageRating = (ratings: Ratings): number => {
    const totalRating =
      ratings.culture +
      ratings.workLifeBalance +
      ratings.facilities +
      ratings.careerOpportunities;
    const numberOfAspects = Object.keys(ratings).length;
    return parseFloat((totalRating / numberOfAspects).toFixed(1)); // Membulatkan rata-rata menjadi 1 desimal
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Tulis Ulasan Perusahaan</h1>
      <AnonymousReviewForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default ReviewPage;
