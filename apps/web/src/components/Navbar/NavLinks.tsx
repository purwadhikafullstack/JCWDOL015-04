"use client"
import React from 'react';
import Link from 'next/link';
import { UserRole } from '@/types/role';

interface NavLinksProps {
  userRole: UserRole | null;
}

const NavLinks: React.FC<NavLinksProps> = ({ userRole }) => {
  const checkRole = (role: UserRole) => userRole === role;

  if (checkRole(UserRole.Admin)) {
    return (
      <>
        <li><Link href="/saved-candidate" className="hover:text-Primary-blue">Saved Candidate</Link></li>
        <li><Link href="/dashboard-admin" className="hover:text-Primary-blue">Dashboard</Link></li>
        <li><Link href="/my-jobs" className="hover:text-Primary-blue">My Jobs</Link></li>
        <li><Link href="/contact-support" className="hover:text-Primary-blue">Customer Supports</Link></li>
      </>
    );
  }
  if (checkRole(UserRole.Developer)) {
    return (
      <>
        <li><Link href="/assessment-page" className="hover:text-Primary-blue">Dashboard Assessments</Link></li>
        <li><Link href="/Subscription" className="hover:text-Primary-blue">Subscription</Link></li>
        <li><Link href="/contact-support" className="hover:text-Primary-blue">Customer Supports</Link></li>
      </>
    );
  }
  if (checkRole(UserRole.Candidate)) {
    return (
      <>
        <li><Link href="/job-page" className="hover:text-Primary-blue">Find Job</Link></li>
        <li><Link href="/company-page" className="hover:text-Primary-blue">Find Employers</Link></li>
        <li><Link href="/dashboard-candidate" className="hover:text-Primary-blue">Dashboard</Link></li>
        <li><Link href="/contact-support" className="hover:text-Primary-blue">Customer Supports</Link></li>
      </>
    );
  }
  return (
    <>
      <li><Link href="/job-page" className="hover:text-Primary-blue">Find Job</Link></li>
      <li><Link href="/company-page" className="hover:text-Primary-blue">Find Employers</Link></li>
      <li><Link href="/candidates" className="hover:text-Primary-blue">Candidates</Link></li>
      <li><Link href="/pricing-plans" className="hover:text-Primary-blue">Pricing Plans</Link></li>
      <li><Link href="/contact-support" className="hover:text-Primary-blue">Customer Supports</Link></li>
    </>
  );
};

export default NavLinks;