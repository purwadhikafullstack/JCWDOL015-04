import { useState } from 'react';
import { regUser } from '@/lib/user';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { IUserReg } from '@/types/iuser';

export const useCreateAccountForm = () => {
  const [role, setRole] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyCountry, setCompanyCountry] = useState('');
  const router = useRouter();

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    if (!email || !password || !confirmPassword || !first_name || !last_name || !role || password !== confirmPassword) {
      toast.error('Please fill out all required fields and ensure passwords match.');
      return;
    }
  
    const data: IUserReg = {
      first_name,
      last_name,
      email,
      password,
      role,
    };
  
    if (role === 'admin') {
      data.company_name = companyName;
      data.company_email = companyEmail;
      data.country = companyCountry;
    }
  
    try {
      const { result, ok } = await regUser(data);
      if (ok) {
        toast.success('Account created successfully! Please verify your email!');
        setTimeout(() => router.push('/sign-in'), 2000);
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
    companyName,
    setCompanyName,
    companyEmail,
    setCompanyEmail,
    companyCountry,
    setCompanyCountry,
    handleFormSubmit,
  };
};
