import { loginUser } from '@/lib/user';

export const loginWithEmail = async (email: string, password: string) => {
  const loginData = { email, password };
  const { result, ok } = await loginUser(loginData);
  return { result, ok };
};
