import { FiUpload } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { getUserInfo, updateUserInfo } from '@/lib/user';
import { toast } from 'react-toastify';
import Image from 'next/image';

const SettingPersonal = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [title, setTitle] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState<number | ''>('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const { user, ok } = await getUserInfo();
      if (ok && user) {
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setTitle(user.title || '');
        setPhone(user.phone || '');
        setYearsOfExperience(user.years_of_experience || '');
        setProfileImage(user.profile_picture);
      }
    };

    fetchUserData();
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const toggleEditMode = () => setIsEditing(!isEditing);

  const handleSubmit = async () => {
    if (!isEditing) return;

    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('title', title);
    formData.append('years_of_experience', String(yearsOfExperience || ''));
    formData.append('phone', phone);

    if (selectedImage) {
      formData.append('profile_picture', selectedImage);
    }

    const { result, ok } = await updateUserInfo(formData);

    if (ok) {
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } else {
      toast.error(result.msg || 'Failed to update profile');
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-6">Basic Information</h3>
      {/* Profile Picture and Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="flex flex-col items-center">
          <label className="block text-gray-600 mb-3">Profile Picture</label>
          <div className="relative w-60 h-60 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden cursor-pointer mb-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
              disabled={!isEditing}
            />
            {profileImage ? (
              <Image
                src={profileImage}
                width={236}
                height={236}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full text-gray-500">
                <FiUpload size={24} />
                <span>Browse photo or drop here</span>
                <p className="text-sm text-gray-500 mt-2">
                  Max photo size 5 MB.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Form fields for personal information */}
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 mb-1">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter your first name"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter your last name"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Title/Headline</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Your title or headline"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Experience</label>
            <input
              type="text"
              value={yearsOfExperience}
              onChange={(e) => setYearsOfExperience(Number(e.target.value))}
              className="input input-bordered w-full"
              placeholder="Years of experience"
              disabled={!isEditing}
            />
          </div>
          <div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-gray-600 mt-3">Phone</label>
              <input
                type="text"
                className="input input-bordered w-full mt-2"
                placeholder="Phone number.."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={isEditing ? handleSubmit : toggleEditMode}
        className="btn btn-primary w-full mt-5 md:w-auto"
      >
        {isEditing ? 'Save Changes' : 'Change Data'}
      </button>
    </div>
  );
};

export default SettingPersonal;
