import React from 'react';

const Loading = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-gray-50">
      <span className="loading loading-dots loading-lg animate-pulse text-blue-600"></span>
      <p className="mt-4 text-gray-600 text-lg animate-fade">Loading, please wait...</p>
    </div>
  );
};

export default Loading;
