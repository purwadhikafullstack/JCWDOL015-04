import { useState, useEffect } from 'react';
import { getUserInfo, updateUserInfo } from '@/lib/user';
import { toast } from 'react-toastify';
import { EducationLevel, Gender } from '@/types/role';
import { countryOptions } from '@/utils/format';

const SettingProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [nationality, setNationality] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [education, setEducation] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [biography, setBiography] = useState('');
  const [languages, setLanguages] = useState('');
  const [tempatLahir, setTempatLahir] = useState('');
  const [skills, setSkills] = useState('');

  // Fetch user info when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      const { user, ok } = await getUserInfo();
      if (ok && user) {
        setNationality(user.nationality || '');
        setDateOfBirth(user.DateOfBirth ? user.DateOfBirth.split('T')[0] : '');
        setGender(user.gender || '');
        setEducation(user.education || '');
        setCountry(user.country || '');
        setAddress(user.location || '');
        setBiography(user.biography || '');
        setLanguages(user.languages || '');
        setTempatLahir(user.tempat_lahir || '');
        setSkills(user.skills || '');
      } else {
        toast.error('Failed to load profile data');
      }
    };
    fetchUserData();
  }, []);

  // Toggle edit mode
  const toggleEditMode = () => {
    if (isEditing) {
      handleSaveChanges();
    }
    setIsEditing(!isEditing);
  };

  // Handle saving changes
  const handleSaveChanges = async () => {
    const formData = new FormData();
    formData.append('nationality', nationality);
    formData.append('DateOfBirth', dateOfBirth);
    formData.append('gender', gender);
    formData.append('education', education);
    formData.append('country', country);
    formData.append('location', address);
    formData.append('biography', biography);
    formData.append('languages', languages);
    formData.append('tempat_lahir', tempatLahir);
    formData.append('skills', skills);

    const { result, ok } = await updateUserInfo(formData);
    if (ok) {
      toast.success('Profile updated successfully!');
    } else {
      toast.error(result.msg || 'Failed to update profile');
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-600 mb-1">Nationality</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Your Nationality"
            disabled={!isEditing}
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-600">Date of Birth</label>
          <input
            type="date"
            className="input input-bordered w-full mt-1"
            disabled={!isEditing}
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-600">Gender</label>
          <select
            className="select select-bordered w-full mt-1"
            disabled={!isEditing}
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select...</option>
            {Object.entries(Gender).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-600">Education Level</label>
          <select
            className="select select-bordered w-full mt-1"
            disabled={!isEditing}
            value={education}
            onChange={(e) => setEducation(e.target.value)}
          >
            <option value="">Select...</option>
            {Object.entries(EducationLevel).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-600">Country</label>
          <select
            className="select select-bordered w-full mt-1"
            disabled={!isEditing}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">Select...</option>
            <option value="ID">Indonesia</option>
            <option value="SG">Singapore</option>
            <option value="MY">Malaysia</option>
            <option value="US">United States</option>
            <option value="GB">United Kingdom</option>
            <option value="DE">Germany</option>
            <option value="JP">Japan</option>
            <option value="CN">China</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Address</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Your address"
            disabled={!isEditing}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Languages</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Languages spoken"
            disabled={!isEditing}
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Place of Birth</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Place of Birth"
            disabled={!isEditing}
            value={tempatLahir}
            onChange={(e) => setTempatLahir(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Skills</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Your skills"
            disabled={!isEditing}
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>
        <div className="col-span-2">
          <label className="block text-gray-600">Biography</label>
          <textarea
            className="textarea textarea-bordered w-full mt-1"
            placeholder="Write down your biography here. Let the employers know who you are..."
            rows={4}
            disabled={!isEditing}
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
          ></textarea>
        </div>
      </div>

      <button onClick={toggleEditMode} className="btn btn-primary mt-4">
        {isEditing ? 'Save Changes' : 'Change Data'}
      </button>
    </div>
  );
};

export default SettingProfile;
