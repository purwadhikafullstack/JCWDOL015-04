'use client';
import React, { useState } from 'react';
import CardSubs from '@/components/card';
import {
  FaCircleCheck,
  FaCirclePlus,
  FaCreditCard,
  FaGear,
  FaLayerGroup,
  FaPencil,
  FaPenToSquare,
} from 'react-icons/fa6';
import { FaSignOutAlt } from 'react-icons/fa';

interface Plan {
  id: number;
  title: string;
  description: string;
  price: string;
  features: string[];
  recommended: boolean;
}

const Dashboard: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([
    {
      id: 1,
      title: 'BASIC',
      description:
        'Praesent eget pulvinar orci. Duis ut pellentesque ligula convallis.',
      price: '50000',
      features: [
        'Post 1 Job',
        'Urgents & Featured Jobs',
        'Highlights Job with Colors',
        'Access & Saved 5 Candidates',
        '10 Days Resume Visibility',
        '24/7 Critical Support',
      ],
      recommended: false,
    },
    {
      id: 2,
      title: 'STANDARD',
      description:
        'Praesent eget pulvinar orci. Duis ut pellentesque ligula convallis.',
      price: '125000',
      features: [
        '3 Active Jobs',
        'Urgents & Featured Jobs',
        'Highlights Job with Colors',
        'Access & Saved 10 Candidates',
        '20 Days Resume Visibility',
        '24/7 Critical Support',
      ],
      recommended: true,
    },
    {
      id: 3,
      title: 'PREMIUM',
      description:
        'Praesent eget pulvinar orci. Duis ut pellentesque ligula convallis.',
      price: '275000',
      features: [
        '6 Active Jobs',
        'Urgents & Featured Jobs',
        'Highlights Job with Colors',
        'Access & Saved 20 Candidates',
        '30 Days Resume Visibility',
        '24/7 Critical Support',
      ],
      recommended: false,
    },
  ]);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handlePlanChange = (id: number, name: string, value: any) => {
    setPlans(
      plans.map((plan) => (plan.id === id ? { ...plan, [name]: value } : plan)),
    );
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleRecommendToggle = (id: number) => {
    setPlans(
      plans.map((plan) =>
        plan.id === id ? { ...plan, recommended: !plan.recommended } : plan,
      ),
    );
  };

  const handleAddPlan = () => {
    const newPlan: Plan = {
      id: plans.length + 1,
      title: 'NEW PLAN',
      description: '',
      price: '$0',
      features: [],
      recommended: false,
    };
    setPlans([...plans, newPlan]);
  };

  const handleDeletePlan = (id: number) => {
    setPlans(plans.filter((plan) => plan.id !== id));
  };

  const [activeLink, setActiveLink] = useState<string | null>(null);

  const handleClick = (linkId: string) => {
    setActiveLink(linkId);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <aside className="w-full md:w-1/4 bg-white h-auto md:h-screen py-6 pl-6 flex flex-col justify-between border-r-2">
        <div>
          <h2 className="text-gray-500 text-sm font-semibold mb-6">
            DEVELOPER DASHBOARD
          </h2>
          <nav>
            <a
              href="#"
              onClick={() => handleClick('overview')}
              className={`flex items-center text-gray-500 hover:text-blue-500 hover:bg-[#F1F2F4] h-11 ${activeLink === 'overview' ? 'bg-[#E7F0FA] text-[#0A65CC]' : ''}`}
            >
              <FaLayerGroup className="mr-3" />
              Overview
            </a>
            <a
              href="#"
              onClick={() => handleClick('payment')}
              className={`flex items-center text-gray-500 hover:text-blue-500 hover:bg-[#F1F2F4] h-11 ${activeLink === 'payment' ? 'bg-[#E7F0FA] text-[#0A65CC]' : ''}`}
            >
              <FaCreditCard className="mr-3" /> Payment Control
            </a>
            <a
              href="#"
              onClick={() => handleClick('assessment')}
              className={`flex items-center text-gray-500 hover:text-blue-500 hover:bg-[#F1F2F4] h-11 ${activeLink === 'assessment' ? 'bg-[#E7F0FA] text-[#0A65CC]' : ''}`}
            >
              <FaPencil className="mr-3" />
              Create Assessment
            </a>
            <a
              href="#"
              onClick={() => handleClick('settings')}
              className={`flex items-center text-gray-500 hover:text-blue-500 hover:bg-[#F1F2F4] h-11 ${activeLink === 'settings' ? 'bg-[#E7F0FA] text-[#0A65CC]' : ''}`}
            >
              <FaGear className="mr-3" /> Subs Setting
            </a>
          </nav>
        </div>
        <a
          href="#"
          className="flex items-center text-gray-500 hover:text-blue-500 mt-6"
        >
          <FaSignOutAlt className="mr-3" />
          Log-out
        </a>
      </aside>
      <main className="flex-1 p-6 md:p-10">
        <h1 className="text-2xl font-semibold mb-4">
          Dev Subscription Setting
        </h1>
        <p className="text-gray-500 mb-8">
          Donec eu dui ut dolor commodo ornare. Sed arcu libero, malesuada quis
          justo sit amet, varius tempus neque. Quisque ultrices mi sed lorem
          condimentum, vel tempus lectus ultricies.
        </p>
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={handleEditToggle}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            {isEditing ? (
              <>
                <FaCircleCheck className="inline mr-2" /> Save All
              </>
            ) : (
              <>
                <FaPenToSquare className="inline mr-2 mb-1" /> Edit All
              </>
            )}
          </button>

          {isEditing && ( // Menampilkan tombol "Add New Plan" hanya ketika isEditing true
            <button
              onClick={handleAddPlan}
              className="bg-green-500 text-white py-2 px-4 rounded-lg flex items-center"
            >
              Add New Plan <FaCirclePlus className="ml-2" />
            </button>
          )}
        </div>
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          {plans.map((plan) => (
            <CardSubs
              key={plan.id}
              plan={plan}
              onChange={handlePlanChange}
              isEditing={isEditing}
              onRecommend={handleRecommendToggle}
              onDelete={handleDeletePlan}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
