import { ReactNode } from 'react';

interface OverviewItemProps {
  icon: ReactNode; 
  label: string; 
  value: string;
}

export const OverviewItem: React.FC<OverviewItemProps> = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="text-blue-500">{icon}</div>
    <div>
      <p className="font-medium">{label}:</p>
      <p>{value}</p>
    </div>
  </div>
);