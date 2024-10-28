import React from 'react';
import {
  FaArrowRightLong,
  FaCircleCheck,
  FaCirclePlus,
  FaRegTrashCan,
} from 'react-icons/fa6';

interface Plan {
  id: number;
  title: string;
  description: string;
  price: string;
  features: string[];
  recommended: boolean;
}

interface CardProps {
  plan: Plan;
  onChange: (id: number, name: string, value: any) => void;
  isEditing: boolean;
  onRecommend: (id: number) => void;
  onDelete: (id: number) => void;
}

const CardSubs: React.FC<CardProps> = ({
  plan,
  onChange,
  isEditing,
  onRecommend,
  onDelete,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    onChange(plan.id, name, value);
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...plan.features];
    newFeatures[index] = value;
    onChange(plan.id, 'features', newFeatures);
  };

  const addFeature = () => {
    const newFeatures = [...plan.features, ''];
    onChange(plan.id, 'features', newFeatures);
  };

  const removeFeature = (index: number) => {
    const newFeatures = plan.features.filter((_, i) => i !== index);
    onChange(plan.id, 'features', newFeatures);
  };

  const formatCurrency = (value: string) => {
    const numberValue = parseFloat(value.replace(/[^0-9.-]+/g, '')); 
    const roundedValue = Math.floor(numberValue); 
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0, 
    }).format(roundedValue);
  }

  return (
    <div className="bg-white p-6 border border-[#E4E5E8] rounded-lg shadow-md w-full md:w-1/3 relative">
      {plan.recommended && (
        <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg rounded-tr-lg">
          Recommendation
        </div>
      )}
      {isEditing && (
        <button
          onClick={() => onRecommend(plan.id)}
          className="absolute top-0 left-0 bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-br-lg rounded-tl-lg"
        >
          {plan.recommended ? 'Unrecommend' : 'Recommend'}
        </button>
      )}
      {isEditing ? (
        <>
          <input
            type="text"
            name="title"
            value={plan.title}
            onChange={handleInputChange}
            className="text-lg font-semibold text-[#18191C] mb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:border-blue-500"
          />
          <textarea
            name="description"
            value={plan.description}
            onChange={handleInputChange}
            className="text-[#767F8C] mb-4 w-full border-b-2 border-gray-200 focus:outline-none focus:border-blue-500"
          />
          <div className="text-3xl font-medium text-[#0A65CC] mb-1">
            <input
              type="text"
              name="price"
              value={plan.price}
              onChange={handleInputChange}
              className="w-full border-b-2 border-gray-200 focus:outline-none focus:border-blue-500"
            />
          </div>
        </>
      ) : (
        <>
          <h2 className="text-lg font-semibold mb-2 text-[#18191C]">
            {plan.title}
          </h2>
          <p className="text-[#767F8C] mb-4">{plan.description}</p>
          <div className="flex items-end">
            <div className="text-3xl font-bold text-[#0A65CC] mb-1">
              {formatCurrency(plan.price)}
            </div>
            <div className="text-gray-500">/Monthly</div>
          </div>
        </>
      )}
      <ul className="my-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-500 my-2">
            <FaCircleCheck className="text-[#0A65CC] mr-2" />
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
                  <FaRegTrashCan className="ml-2" />
                </button>
              </>
            ) : (
              <div className='my-2'>
                {feature}
              </div>
            )}
          </li>
        ))}
        {isEditing && (
          <li>
            <button onClick={addFeature} className="text-blue-500 flex items-center">
              <FaCirclePlus className="mr-2" /> Add Feature
            </button>
          </li>
        )}
      </ul>
      <button className="w-full bg-blue-500 text-white py-2 rounded-lg flex items-center justify-center">
        Choose Plan <FaArrowRightLong className="ml-2" />
      </button>
      {isEditing && (
        <button
          onClick={() => onDelete(plan.id)}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg flex items-center justify-center"
        >
          Delete Plan <FaRegTrashCan className="ml-2" />
        </button>
      )}
    </div>
  );
};

export default CardSubs;
