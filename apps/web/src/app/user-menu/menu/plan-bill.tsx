'use client';

import { fetchUserPayments, fetchUserSubscriptions } from '@/lib/userplanbill';
import { PaymentTransaction, SubscriptionActive } from '@/types/userplanbill';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const CandidateDashboard: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionActive[]>([]);
  const [payments, setPayments] = useState<PaymentTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL_API || 'http://localhost:8000/api';

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            // Ambil data subscription aktif
            const { data: subscriptionsData, error: subscriptionsError } =
              await fetchUserSubscriptions();
            console.log('Fetched subscriptions:', subscriptionsData); // Debug log
            if (subscriptionsError) {
              toast.error('Failed to fetch subscriptions');
              console.error('Subscriptions error:', subscriptionsError);
            } else {
              setSubscriptions(
                Array.isArray(subscriptionsData) ? subscriptionsData : []
              );
            }
      
            // Ambil data pembayaran
            const { data: paymentsData, error: paymentsError } =
              await fetchUserPayments();
            console.log('Fetched payments:', paymentsData); // Debugging log
            if (paymentsError) {
              toast.error('Failed to fetch payments');
              console.error('Payments error:', paymentsError);
            } else {
              setPayments(
                Array.isArray(paymentsData) ? paymentsData : []
              );
            }
          } catch (error) {
            toast.error('Failed to load user data');
            console.error('User data error:', error);
          } finally {
            setLoading(false);
          }
        };
      
        fetchUserData();
      }, []);
      

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
  <h1 className="text-2xl font-bold mb-6">Plan Bills History</h1>

  {/* Active Subscriptions */}
  <div className="mb-8">
    <h2 className="text-xl font-semibold mb-4">Active Subscriptions</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Subscription ID</th>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left">Start Date</th>
            <th className="px-4 py-2 text-left">End Date</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(subscriptions) && subscriptions.length > 0 ? (
            subscriptions.map((sub) => (
              <tr key={sub.subscription_id} className="border-t">
                <td className="px-4 py-2">{sub.subscription_id}</td>
                <td className="px-4 py-2">{sub.subscriptionType.type}</td>
                <td className="px-4 py-2">
                  {new Date(sub.start_date).toLocaleDateString('id-ID')}
                </td>
                <td className="px-4 py-2">
                  {new Date(sub.end_date).toLocaleDateString('id-ID')}
                </td>
                <td
                  className={`px-4 py-2 font-bold ${
                    sub.status === 'active'
                      ? 'text-green-500'
                      : 'text-gray-500'
                  }`}
                >
                  {sub.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4">
                No subscriptions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>

  {/* Payment History */}
  <div>
    <h2 className="text-xl font-semibold mb-4">Payment History</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Payment ID</th>
            <th className="px-4 py-2 text-left">Amount</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Transaction Date</th>
            <th className="px-4 py-2 text-left">Receipt</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(payments) && payments.length > 0 ? (
            payments.map((pay) => (
              <tr key={pay.transaction_id} className="border-t">
                <td className="px-4 py-2">{pay.transaction_id}</td>
                <td className="px-4 py-2">
                  Rp {parseInt(pay.amount).toLocaleString('id-ID')}
                </td>
                <td
                  className={`px-4 py-2 font-bold ${
                    pay.status === 'completed'
                      ? 'text-green-500'
                      : pay.status === 'pending'
                      ? 'text-orange-500'
                      : 'text-red-500'
                  }`}
                >
                  {pay.status}
                </td>
                <td className="px-4 py-2">
                  {new Date(pay.transaction_date).toLocaleDateString('id-ID')}
                </td>
                <td className="px-4 py-2">
                  {pay.receipt ? (
                    <a
                      href={`${baseUrl}/public/payment-proof/${pay.receipt}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View
                    </a>
                  ) : (
                    'N/A'
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4">
                No payment history found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
</div>

  );
};

export default CandidateDashboard;
