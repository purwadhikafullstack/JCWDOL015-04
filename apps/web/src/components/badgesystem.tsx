import { fetchUserBadgesById } from "@/lib/assessment";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import badge from '@/assets/badge.gif'

const BadgeSystem: React.FC<{ userId: string | number }> = ({ userId }) => {
  const [badges, setBadges] = useState<{ badge: string; assessment_data: string | null }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBadges = async () => {
      try {
        const data = await fetchUserBadgesById(userId); // Fetch badges by user ID
        setBadges(data);
      } catch (err: any) {
        setError(err.message || "Failed to load badges");
      }
    };

    loadBadges();
  }, [userId]);



  if (error) return null; 

  return (
    <div className="grid grid-cols-3 gap-4">
      {badges.map((badgeData, index) => (
        <div
          key={index}
          className="group relative flex flex-col items-center"
        > 
          {/* Badge icon */}
          <Image
            src={badge} // Ganti sesuai struktur file badge Anda
            alt={badgeData.badge}
            width={40}
            height={40}
          />

          {/* Tooltip on hover */}
          <div className="w-28 absolute bottom-5 left-12 transform -translate-x-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            {badgeData.badge}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BadgeSystem;
