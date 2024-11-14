'use client'
import React, { useEffect, useState } from 'react';
import { getSubstypes } from '@/lib/substype';
import { ISubsType } from '@/types/substype';
import { toast } from 'react-toastify';
import PromoSection from '../components/promossection';
import CustomerCard from '../components/cusCardPlan';

const banks = [
    { name: 'Bank Mandiri', account: '1400012345678' },
    { name: 'Bank BRI', account: '0020123456789' },
    { name: 'Bank BCA', account: '0080123456789' },
    { name: 'Bank BNI', account: '0090123456789' },
  ];
  
  const CustomerPlans: React.FC = () => {
    const [plans, setPlans] = useState<ISubsType[]>([]);
    const [selectedPlan, setSelectedPlan] = useState<ISubsType | null>(null);
    const [selectedBank, setSelectedBank] = useState<{ name: string; account: string } | null>(null);
    const [totalPrice, setTotalPrice] = useState<number>(0);
  
    useEffect(() => {
      const fetchPlans = async () => {
        try {
          const response = await getSubstypes();
          if (response.ok && response.substypes && Array.isArray(response.substypes.subscriptionstypeAll)) {
            setPlans(response.substypes.subscriptionstypeAll);
          } else {
            toast.error('Failed to fetch plans: Invalid data structure or empty response');
          }
        } catch (error) {
          toast.error(`Failed to fetch plans: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
        }
      };
  
      fetchPlans();
    }, []);
  
    const handleChoosePlan = (plan: ISubsType) => {
      const uniqueCode = Math.floor(10 + Math.random() * 90); // Random 2-digit unique code
      const modifiedPrice = parseInt(`${plan.price.toString().slice(0, -2)}${uniqueCode}`); // Replace last 2 digits with unique code
      setTotalPrice(modifiedPrice);
      setSelectedPlan(plan);
      setSelectedBank(banks[0]); // Default to first bank
    };
  
    const handleCloseModal = () => {
      setSelectedPlan(null);
      setSelectedBank(null);
    };
  
    const handleBankChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedBank = banks.find(bank => bank.name === event.target.value);
      setSelectedBank(selectedBank || null);
    };
  
    return (
      <div className="flex flex-col items-center p-6 md:p-10 relative">
        <PromoSection />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <CustomerCard key={plan.subs_type_id} plan={plan} onChoose={() => handleChoosePlan(plan)} />
          ))}
        </div>
  
        {/* Overlay dan Modal */}
        {selectedPlan && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 transition-opacity duration-300 ease-in-out"></div>
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4 transition-transform transform scale-95 opacity-0 duration-300 ease-in-out" style={{ opacity: selectedPlan ? 1 : 0, transform: selectedPlan ? 'scale(1)' : 'scale(0.95)' }}>
              <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
                <h2 className="text-xl font-semibold mb-4">Payment for {selectedPlan.type} Plan</h2>
                <p className="text-gray-600 mb-4">Payment gateway on develop</p>
                <p className="text-sm text-gray-500 mb-2">Please select a payment method and upload payment proof manually.</p>
  
                {/* Harga Total dengan Kode Unik */}
                <div className="mb-4">
                  <label className="block font-medium text-gray-700">Total Amount:</label>
                  <p className="text-2xl font-bold text-blue-500">
                    Rp {new Intl.NumberFormat('id-ID').format(totalPrice)}
                  </p>
                </div>
  
                {/* Pilihan Bank */}
                <div className="mb-4">
                  <label className="block font-medium text-gray-700 mb-2">Select Bank:</label>
                  <select
                    className="w-full p-2 border rounded-lg text-black bg-gray-300"
                    value={selectedBank?.name || ''}
                    onChange={handleBankChange}
                  >
                    {banks.map((bank) => (
                      <option key={bank.name} value={bank.name}>
                        {bank.name}
                      </option>
                    ))}
                  </select>
                </div>
  
                {/* Informasi Rekening Bank */}
                {selectedBank && (
                  <div className="mb-4 ">
                    <label className="block font-medium text-gray-700">Bank Account:</label>
                    <p className="text-lg font-bold text-blue-500">
                      {selectedBank.name}
                    </p>
                    <p className="text-blue-500 font-bold text-2xl">{selectedBank.account}</p>
                  </div>
                )}
  
                {/* Upload Bukti Pembayaran */}
                <div className="mb-6">
                  <label className="block font-medium text-gray-700 mb-2">Upload Payment Proof:</label>
                  <input type="file" className="w-full p-2 border rounded-lg" />
                </div>
  
                {/* Tombol Aksi */}
                <div className="flex justify-end">
                  <button onClick={handleCloseModal} className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2">
                    Cancel
                  </button>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };
  
  export default CustomerPlans;