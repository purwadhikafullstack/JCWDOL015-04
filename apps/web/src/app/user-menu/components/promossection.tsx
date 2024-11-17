import React from 'react';
import Image from 'next/image';

const PromoSection: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-10">
      {/* Bagian Teks */}
      <div className="md:w-1/2 text-center md:text-left mb-6 md:mb-0">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Buy Premium Subscription to Premium Feature
        </h2>
        <p className="text-gray-600">
          Donec eu dui ut dolor commodo ornare. Sed arcu libero, malesuada quis
          justo sit amet, varius tempus neque. Quisque ultrices mi sed lorem
          condimentum, vel tempus lectus ultricies.
        </p>
      </div>

      {/* Bagian Gambar */}
      <div className="md:w-1/2 flex justify-center">
        <Image
          src="/assets/Subsmenu.png" // Gantilah dengan path gambar yang sesuai
          alt="Illustration"
          width={400} // Tentukan lebar yang diinginkan
          height={300} // Tentukan tinggi yang diinginkan
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default PromoSection;
