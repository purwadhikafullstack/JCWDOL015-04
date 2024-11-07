import { FiUpload } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { getUserInfo, updateUserInfo } from '@/lib/user';
import { toast } from 'react-toastify';

const SettingPersonal = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [title, setTitle] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState<number | ''>('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const { user, ok } = await getUserInfo();
      if (ok && user) {
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setTitle(user.title || '');
        setYearsOfExperience(user.years_of_experience || '');
        setProfileImage(user.profile_picture);
      }
    };

    fetchUserData();
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file); // Store the selected file
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

    if (selectedImage) {
      formData.append('profile_picture', selectedImage); // Add the profile image if selected
    }

    const { result, ok } = await updateUserInfo(formData);

    if (ok) {
      toast.success('Profile updated successfully!');
      setIsEditing(false); // Exit edit mode on success
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
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full text-gray-500">
                <FiUpload size={24} />
                <span>Browse photo or drop here</span>
                <p className="text-sm text-gray-500 mt-2">Max photo size 5 MB.</p>
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
        </div>
      </div>

      <button
        onClick={isEditing ? handleSubmit : toggleEditMode}
        className="btn btn-primary w-full md:w-auto"
      >
        {isEditing ? "Save Changes" : "Change Data"}
      </button>


      {/* CV/Resume Section */}
      <h3 className="text-xl font-semibold mt-8 mb-4">Your Cv/Resume</h3>
      <div className="flex flex-wrap gap-4">
        {/* Example of Existing Resume Card */}
        <div className="bg-gray-50 border rounded-lg p-4 flex items-center justify-between w-full md:w-1/3">
          <div>
            <p className="font-semibold">Professional Resume</p>
            <p className="text-sm text-gray-500">3.5 MB</p>
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-xs">•••</label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-white rounded-box w-40">
              <li><a>Edit Resume</a></li>
              <li><a className="text-red-600">Delete</a></li>
            </ul>
          </div>
        </div>

        {/* Placeholder for Adding New Resume */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg w-full md:w-1/3 h-20 flex items-center justify-center text-center text-gray-500 cursor-pointer">
          <FiUpload size={24} />
          <span>Add Cv/Resume</span>
        </div>
      </div>
    </div>
  );
};

export default SettingPersonal;
