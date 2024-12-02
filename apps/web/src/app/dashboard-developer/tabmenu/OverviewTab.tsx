import React, { useEffect, useState } from 'react';
import { FaUsers, FaDollarSign, FaCheckCircle } from 'react-icons/fa';
import { DashboardData } from '@/types/subsDashboard';
import { fetchSubsDashboardData } from '@/lib/subsDashboard';

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchSubsDashboardData();
        if (response.error) {
          throw new Error(response.error);
        }
        setData(response.data || null);
      } catch (err: any) {
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  if (!data) {
    return <div className="text-center py-10">No data available</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Developer Dashboard</h1>

      {/* Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="flex items-center bg-blue-100 p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-center w-16 h-16 bg-white rounded-lg">
            <FaUsers className="text-blue-500 text-3xl" />
          </div>
          <div className="ml-4">
            <p className="text-2xl font-bold text-blue-700">{data.totalUsers}</p>
            <p className="text-gray-500">Total Users Subscribed</p>
          </div>
        </div>
        <div className="flex items-center bg-green-100 p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-center w-16 h-16 bg-white rounded-lg">
            <FaCheckCircle className="text-green-500 text-3xl" />
          </div>
          <div className="ml-4">
            <p className="text-2xl font-bold text-green-700">{data.completedTransactions}</p>
            <p className="text-gray-500">Total Payments Completed</p>
          </div>
        </div>
        <div className="flex items-center bg-red-100 p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-center w-16 h-16 bg-white rounded-lg">
            <FaDollarSign className="text-red-500 text-3xl" />
          </div>
          <div className="ml-4">
            <p className="text-2xl font-bold text-red-700">{formatCurrency(data.totalRevenue)}</p>
            <p className="text-gray-500">Total Revenue</p>
          </div>
        </div>
      </div>

      {/* Subscription List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">List of Subscribed Users</h2>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">
                User ID
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                User Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Start Date
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                End Date
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {data.activeSubscriptions.map((sub) => (
              <tr key={sub.subscription_id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  {sub.subscription_id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {sub.user_name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {sub.start_date}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {sub.end_date}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-green-600 font-semibold">
                  Active
                </td>
              </tr>
            ))}
            {data.inactiveSubscriptions.map((sub) => (
              <tr key={sub.subscription_id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  {sub.subscription_id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {sub.user_name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {sub.start_date}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {sub.end_date}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-red-600 font-semibold">
                  Inactive
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
