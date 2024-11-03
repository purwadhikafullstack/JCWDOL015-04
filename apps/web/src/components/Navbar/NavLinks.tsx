"use client"
import React from 'react';
import Link from 'next/link';
import { UserRole } from '@/types/role';

interface NavLinksProps {
  userRole: UserRole | null;
}

const NavLinks: React.FC<NavLinksProps> = ({ userRole }) => {
  const checkRole = (role: UserRole) => userRole === role;

  if (checkRole(UserRole.Admin) || checkRole(UserRole.Developer)) {
    return (
      <>
        <li><Link href="/find-candidate" className="hover:text-Primary-blue">Find Candidate</Link></li>
        <li><Link href="/dashboard" className="hover:text-Primary-blue">Dashboard</Link></li>
        <li><Link href="/my-jobs" className="hover:text-Primary-blue">My Jobs</Link></li>
        <li><Link href="/applications" className="hover:text-Primary-blue">Applications</Link></li>
        <li><Link href="/support" className="hover:text-Primary-blue">Customer Supports</Link></li>
      </>
    );
  }
  if (checkRole(UserRole.Candidate)) {
    return (
      <>
        <li><Link href="/job-page" className="hover:text-Primary-blue">Find Job</Link></li>
        <li><Link href="/company-page" className="hover:text-Primary-blue">Find Employers</Link></li>
        <li><Link href="/dashboard" className="hover:text-Primary-blue">Dashboard</Link></li>
        <li><Link href="/support" className="hover:text-Primary-blue">Customer Supports</Link></li>
      </>
    );
  }
  return (
    <>
      <li><Link href="/job-page" className="hover:text-Primary-blue">Find Job</Link></li>
      <li><Link href="/company-page" className="hover:text-Primary-blue">Find Employers</Link></li>
      <li><Link href="/candidates" className="hover:text-Primary-blue">Candidates</Link></li>
      <li><Link href="/pricing-plans" className="hover:text-Primary-blue">Pricing Plans</Link></li>
      <li><Link href="/support" className="hover:text-Primary-blue">Customer Supports</Link></li>
    </>
  );
};

export default NavLinks;