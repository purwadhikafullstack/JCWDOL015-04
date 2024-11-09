// src/app/company-page/OverviewItem.tsx
import React from 'react';

interface OverviewItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

const OverviewItem: React.FC<OverviewItemProps> = ({ icon, label, value }) => {
  return (
    <div className="flex items-center gap-3">
    <div className="text-blue-500">{icon}</div>
    <div>
      <p className="font-medium">{label}:</p>
      <p>{value}</p>
    </div>
  </div>
  );
};

export default OverviewItem;
