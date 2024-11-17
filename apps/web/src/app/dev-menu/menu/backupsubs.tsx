import React, { useEffect, useState } from 'react';
import Card from '../components/cardsub';
import { getSubstypes, updateSubsType, createSubsType, deleteSubsType } from '@/lib/substype';
import { ISubsType } from '@/types/substype';
import { toast } from 'react-toastify';

const SubsManage: React.FC = () => {
  const [plans, setPlans] = useState<ISubsType[]>([]);
  const [isEditingAll, setIsEditingAll] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await getSubstypes();
        if (response.ok && response.substypes && Array.isArray(response.substypes.subscriptionstypeAll)) {
          setPlans(response.substypes.subscriptionstypeAll);
        } else {
          console.error('Failed to fetch plans');
          toast.error('Failed to fetch plans: Invalid data structure or empty response');
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
        toast.error(`Failed to fetch plans: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
      }
    };

    fetchPlans();
  }, []);

  const handlePlanChange = async (id: number, name: string, value: any) => {
    const updatedPlans = plans.map((plan) =>
      plan.subs_type_id === id ? { ...plan, [name]: value } : plan
    );
    setPlans(updatedPlans);

    const updatedPlan = updatedPlans.find(plan => plan.subs_type_id === id);
    if (updatedPlan) {
      try {
        const response = await updateSubsType(id, updatedPlan);
        if (response.ok) {
          toast.success('Plan updated successfully');
        } else {
          console.error('Failed to update plan');
          toast.error('Failed to update plan: Invalid response from server');
        }
      } catch (error) {
        console.error('Error updating plan:', error);
        toast.error(`Failed to update plan: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
      }
    }
  };

  const handleAddPlan = async () => {
    const newPlan: ISubsType = {
      subs_type_id: plans.length + 1,
      type: 'NEW PLAN',
      description: '',
      price: 0,
      features: [],
      is_recomend: false,
    };

    try {
      const response = await createSubsType(newPlan);
      if (response.ok && response.data) {
        setPlans([...plans, response.data]);
        toast.success('New plan created successfully');
      } else {
        console.error('Failed to create plan');
        toast.error('Failed to create new plan: Invalid response from server');
      }
    } catch (error) {
      console.error('Error creating plan:', error);
      toast.error(`Failed to create new plan: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
    }
  };

  const handleDeletePlan = async (id: number) => {
    try {
      const response = await deleteSubsType(id);
      if (response.ok) {
        setPlans(plans.filter((plan) => plan.subs_type_id !== id));
        toast.success('Plan deleted successfully');
      } else {
        console.error('Failed to delete plan');
        toast.error('Failed to delete plan: Invalid response from server');
      }
    } catch (error) {
      console.error('Error deleting plan:', error);
      toast.error(`Failed to delete plan: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <main className="flex-1 p-6 md:p-10">
        <h1 className="text-2xl font-semibold mb-4">
          Dev Subscription Setting
        </h1>
        <div className="flex justify-between mb-6">
          <label className="flex cursor-pointer gap-2">
            <span className="font-medium">View Mode</span>
            <input
              type="checkbox"
              checked={isEditingAll}
              onChange={(e) => setIsEditingAll(e.target.checked)}
              className="toggle bg-white border-gray-400 [--tglbg:theme(colors.gray.500)] checked:bg-blue-500 checked:border-sky-300 checked:[--tglbg:theme(colors.sky.200)]"
            />
            <span className="font-medium">Edit Mode</span>
          </label>
          {isEditingAll && (
            <button
              onClick={handleAddPlan}
              className="bg-green-500 text-white py-2 px-4 rounded-lg"
            >
              Add New ISubsType
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans?.map((plan) => (
            <Card
              key={plan.subs_type_id}
              plan={plan}
              onChange={handlePlanChange}
              isEditingAll={isEditingAll}
              onRecommend={(id) => handlePlanChange(id, 'is_recomend', !plan.is_recomend)}
              onDelete={handleDeletePlan}
              onToggleEdit={() => {}}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default SubsManage;
