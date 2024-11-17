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
  const [localPlan, setLocalPlan] = useState<ISubsType>(plan); // Menyimpan perubahan sementara

  // Inisialisasi state lokal ketika mode edit aktif
  useEffect(() => {
    if (isEditing) {
      setLocalPlan({ ...plan, features: plan.features }); // Inisialisasi features sebagai array kosong jika undefined
    }
  }, [isEditing, plan]);

  // Fungsi untuk menangani perubahan input
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setLocalPlan({ ...localPlan, [e.target.name]: e.target.value }); // Perbarui localPlan
  };

  // Fungsi untuk menangani perubahan fitur
  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...localPlan.features];
    updatedFeatures[index] = value; // Perbarui fitur di indeks tertentu
    setLocalPlan({ ...localPlan, features: updatedFeatures });
  };

  const addFeature = () => {
    const updatedFeatures = [...localPlan.features, ''];
    setLocalPlan({ ...localPlan, features: updatedFeatures }); // Tambahkan fitur kosong
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = localPlan.features.filter((_, i) => i !== index);
    setLocalPlan({ ...localPlan, features: updatedFeatures }); // Hapus fitur berdasarkan indeks
  };

  const handleCancelEdit = () => {
    setLocalPlan(plan); // Kembalikan data lokal ke data asli
    setIsEditing(false); // Keluar dari mode edit
  };

  const handleSave = () => {
    // Kirim data ke komponen induk hanya setelah tombol Save ditekan
    onChange(plan.subs_type_id, 'type', localPlan.type);
    onChange(plan.subs_type_id, 'description', localPlan.description);
    onChange(plan.subs_type_id, 'price', localPlan.price);
    onChange(plan.subs_type_id, 'features', localPlan.features);

    setIsEditing(false); // Keluar dari mode edit
    console.log('Changes saved for ISubsType ID:', plan.subs_type_id);
  };

  const handleDelete = () => {
    console.log('Deleted ISubsType ID:', plan.subs_type_id);
    onDelete(plan.subs_type_id);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
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
          onClick={() => {
            if (isEditing) {
              handleSave(); // Simpan perubahan saat tombol dalam mode Save
            } else {
              setIsEditing(true); // Aktifkan mode Edit
            }
          }}
          className="absolute top-0 left-0 bg-gray-200 text-gray-700 text-xs md:text-sm font-semibold px-2 md:px-3 py-1 rounded-br-lg flex items-center space-x-1"
        >
          {isEditing ? <BsFillSave2Fill /> : <FaPencilAlt />}
          <span>{isEditing ? 'Save' : 'Edit'}</span>
        </button>
      )}

      <div className="flex-grow">
        {isEditing ? (
          <>
            {/* Input untuk title */}
            <input
              type="text"
              name="type"
              value={localPlan.type || ''} // Gunakan nilai kosong jika tidak ada
              onChange={handleInputChange}
              className="text-md md:text-lg font-semibold mb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:border-blue-500"
              placeholder="Enter title"
            />

            {/* Input untuk description */}
            <textarea
              name="description"
              value={localPlan.description || ''} // Gunakan nilai kosong jika tidak ada
              onChange={handleInputChange}
              className="text-sm md:text-gray-500 mb-4 w-full border-b-2 border-gray-200 focus:outline-none focus:border-blue-500"
              placeholder="Enter description"
            />

            {/* Input untuk price */}
            <div className="text-2xl md:text-3xl font-bold text-blue-500 mb-1">
              <input
                type="number"
                name="price"
                value={localPlan.price || 0} // Gunakan 0 jika tidak ada nilai
                onChange={handleInputChange}
                className="w-full border-b-2 border-gray-200 focus:outline-none focus:border-blue-500"
                placeholder="Enter price"
              />
            </div>
          </>
        ) : (
          <>
            {/* Menampilkan title */}
            <h2 className="text-md md:text-lg font-semibold mb-2">
              {localPlan.type || 'No title available'}{' '}
              {/* Default jika title kosong */}
            </h2>

            {/* Menampilkan description */}
            <p className="text-sm md:text-gray-500 mb-4">
              {localPlan.description || 'No description available'}{' '}
              {/* Default jika description kosong */}
            </p>

            {/* Menampilkan price */}
            <div className="text-2xl md:text-3xl font-bold text-blue-500 mb-1">
              {localPlan.price > 0
                ? formatCurrency(localPlan.price) // Format harga jika > 0
                : '0'}{' '}
              <span className="text-gray-500 text-sm md:text-lg font-normal">
                /Monthly
              </span>
            </div>
          </>
        )}
        <ul className="space-y-2 mb-4 md:mb-6 mt-3 md:mt-4">
          {localPlan.features && localPlan.features.length > 0 ? (
            localPlan.features.map((feature, index) => (
              <li
                key={index}
                className="flex items-center text-sm md:text-gray-500"
              >
                <FaCheckCircle className="text-blue-500 mr-2" />
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) =>
                        handleFeatureChange(index, e.target.value)
                      }
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
            ))
          ) : (
            // Jika features tidak ada atau kosong, tampilkan label default
            <li className="text-sm md:text-gray-500 italic text-center">
              No features available
            </li>
          )}
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
