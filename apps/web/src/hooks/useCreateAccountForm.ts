import { useState } from 'react';
import { regUser } from '@/lib/user';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export const useCreateAccountForm = () => {
  const [role, setRole] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !email ||
      !password ||
      !confirmPassword ||
      !first_name ||
      !last_name ||
      !role ||
      password !== confirmPassword
    ) {
      setIsValid(false);
      return;
    }

    const userData = { first_name, last_name, email, password, role };

    try {
      const { result, ok } = await regUser(userData);
      if (ok) {
        toast.success(
          'Account created successfully! Please verify your email!',
        );
        setTimeout(() => {
          router.push('/sign-in');
        }, 2000);
      } else {
        toast.error(result?.msg || 'Registration failed');
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  return {
    role,
    setRole,
    first_name,
    setFirstName,
    last_name,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    isValid,
    handleSubmit,
  };
};
