import { getUserInfo } from '@/lib/user';
import { useEffect, useState } from 'react';


interface UserProfile {
  user_id: number;
  role: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getUserInfo(); // Panggil API untuk mendapatkan profil pengguna
        setUser(profile);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { user, loading };
};
