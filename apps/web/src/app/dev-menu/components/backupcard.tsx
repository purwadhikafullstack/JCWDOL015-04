import React, { useState, useEffect } from 'react';
import {
  FaArrowRight,
  FaCheckCircle,
  FaPencilAlt,
  FaPlusCircle,
  FaTrashAlt,
} from 'react-icons/fa';
import { BsFillSave2Fill } from 'react-icons/bs';
import { ISubsType } from '@/types/substype';


interface CardProps {
  plan: ISubsType;
  onChange: (id: number, name: string, value: any) => void;
  isEditingAll: boolean;
  onRecommend: (id: number) => void;
  onDelete: (id: number) => void;
  onToggleEdit: (id: number) => void;
}

const Card: React.FC<CardProps> = ({
  plan,
  onChange,
  isEditingAll,
  onRecommend,
  onDelete,
  onToggleEdit,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [originalPlan, setOriginalPlan] = useState<ISubsType>(plan);

  useEffect(() => {
    if (isEditing) {
      setOriginalPlan(plan); // Simpan salinan data awal saat memasuki mode edit
    }
  }, [isEditing, plan]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onChange(plan.subs_type_id, e.target.name, e.target.value);
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing); // Mengubah status edit
    onToggleEdit(plan.subs_type_id); // Mengubah state edit di luar
  };

  const handleDelete = () => {
    console.log('Deleted ISubsType ID:', plan.subs_type_id);
    onDelete(plan.subs_type_id);
  };

  const addFeature = () => {
    const updatedFeatures = [...plan.features, ''];
    onChange(plan.subs_type_id, 'features', updatedFeatures);
    console.log('Added Feature. Updated Features:', updatedFeatures);
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...plan.features];
    updatedFeatures[index] = value;
    onChange(plan.subs_type_id, 'features', updatedFeatures);
    console.log(`Feature at index ${index} changed to:`, value);
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = plan.features.filter((_, i) => i !== index);
    onChange(plan.subs_type_id, 'features', updatedFeatures);
    console.log(
      `Removed Feature at index ${index}. Updated Features:`,
      updatedFeatures,
    );
  };

  const handleCancelEdit = () => {
    // Kembalikan data ke salinan asli
    onChange(plan.subs_type_id, 'type', originalPlan.type);
    onChange(plan.subs_type_id, 'description', originalPlan.description);
    onChange(plan.subs_type_id, 'price', originalPlan.price);
    onChange(plan.subs_type_id, 'features', originalPlan.features);
    setIsEditing(false); // Kembali ke mode tampilan
    console.log('Edit canceled for ISubsType ID:', plan.subs_type_id);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR', 
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0 
    }).format(amount);
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md w-full max-w-xs md:max-w-sm lg:max-w-md relative flex flex-col justify-between h-full">
      {plan.is_recomend && (
        <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-semibold px-2 md:px-3 py-1 rounded-bl-lg">
          Recommendation
        </div>
      )}
      {isEditingAll && (
        <button
          onClick={handleToggleEdit}
          className="absolute top-0 left-0 bg-gray-200 text-gray-700 text-xs md:text-sm font-semibold px-2 md:px-3 py-1 rounded-br-lg flex items-center space-x-1"
        >
          {isEditing ? <BsFillSave2Fill /> : <FaPencilAlt />}
          <span>{isEditing ? 'Save' : 'Edit'}</span>
        </button>
      )}
      <div className="flex-grow">
        {isEditing ? (
          <>
            <input
              type="text"
              name="type"
              value={plan.type}
              onChange={handleInputChange}
              className="text-md md:text-lg font-semibold mb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:border-blue-500"
              placeholder="ISubsType Title"
            />
            <textarea
              name="description"
              value={plan.description}
              onChange={handleInputChange}
              className="text-sm md:text-gray-500 mb-4 w-full border-b-2 border-gray-200 focus:outline-none focus:border-blue-500"
              placeholder="ISubsType Description"
            />
            <div className="text-2xl md:text-3xl font-bold text-blue-500 mb-1">
              <input
                type="text"
                name="price"
                value={plan.price}
                onChange={handleInputChange}
                className="w-full border-b-2 border-gray-200 focus:outline-none focus:border-blue-500"
                placeholder="Price"
              />
            </div>
          </>
        ) : (
          <>
            <h2 className="text-md md:text-lg font-semibold mb-2">{plan.type}</h2>
            <p className="text-sm md:text-gray-500 mb-4">{plan.description}</p>
            <div className="text-2xl md:text-3xl font-bold text-blue-500 mb-1">
              {formatCurrency(plan.price)}{' '}
              <span className="text-gray-500 text-sm md:text-lg font-normal">/Monthly</span>
            </div>
          </>
        )}
        <ul className="space-y-2 mb-4 md:mb-6 mt-3 md:mt-4">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm md:text-gray-500">
              <FaCheckCircle className="text-blue-500 mr-2" />
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="w-full border-b-2 border-gray-200 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={() => removeFeature(index)}
                    className="ml-2 text-red-500"
                  >
                    <FaTrashAlt />
                  </button>
                </>
              ) : (
                <div className="my-1">{feature}</div>
              )}
            </li>
          ))}
          {isEditing && (
            <li>
              <button
                onClick={addFeature}
                className="text-blue-500 flex items-center"
              >
                <FaPlusCircle className="mr-2" /> Add Feature
              </button>
            </li>
          )}
        </ul>
      </div>
      <button className="w-full bg-blue-500 text-white py-2 rounded-lg flex items-center justify-center mt-auto text-sm md:text-base">
        Choose Plan <FaArrowRight className="ml-2" />
      </button>
      {isEditing && (
        <>
          <button
            onClick={() => onRecommend(plan.subs_type_id)}
            className="mt-2 md:mt-4 w-full bg-gray-200 text-gray-700 py-2 rounded-lg flex items-center justify-center text-sm md:text-base"
          >
            {plan.is_recomend ? 'Unrecommend' : 'Recommend'}
          </button>
          <button
            onClick={handleDelete}
            className="mt-2 md:mt-4 w-full bg-red-500 text-white py-2 rounded-lg flex items-center justify-center text-sm md:text-base"
          >
            Delete Plan <FaTrashAlt className="ml-2" />
          </button>
          <button
            onClick={handleCancelEdit}
            className="mt-2 md:mt-4 w-full bg-gray-300 text-gray-700 py-2 rounded-lg flex items-center justify-center text-sm md:text-base"
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
  
  
};

export default Card;
