'use client';
import { useState, useEffect } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { getUserInfo, updateUserInfo, deleteUserAccount } from '@/lib/user';
import { toast } from 'react-toastify';

const SettingAccount = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showFinalDeleteConfirm, setShowFinalDeleteConfirm] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);

  const [email, setEmail] = useState('');
  const [initialEmail, setInitialEmail] = useState(email);
  const [phone, setPhone] = useState('');
  const [initialPhone, setInitialPhone] = useState(phone);

  const [passwordFields, setPasswordFields] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [deleteEmail, setDeleteEmail] = useState('');
  const [deletePassword, setDeletePassword] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const { user, ok } = await getUserInfo();
      if (ok && user) {
        setEmail(user.email || '');
        setPhone(user.phone || '');
        setInitialEmail(user.email || '');
        setInitialPhone(user.phone || '');
      } else {
        toast.error('Failed to load account data');
      }
    };
    fetchUserData();
  }, []);

  const toggleEdit = () => {
    if (
      isEditing &&
      (email !== initialEmail ||
        phone !== initialPhone ||
        passwordFields.newPassword ||
        passwordFields.currentPassword ||
        passwordFields.confirmPassword)
    ) {
      setShowSaveConfirm(true);
    } else {
      setIsEditing(!isEditing);
      setInitialEmail(email);
      setInitialPhone(phone);
      setPasswordFields({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPassword) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const handleSaveChanges = async () => {
    if (passwordFields.newPassword) {
      if (!passwordFields.currentPassword) {
        toast.error('Current password is required to change the password.');
        return;
      }
      if (passwordFields.newPassword !== passwordFields.confirmPassword) {
        toast.error('New password and confirm password do not match.');
        return;
      }
    }

    setShowSaveConfirm(false);
    setIsEditing(false);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('currentPassword', passwordFields.currentPassword);
    formData.append('Newpassword', passwordFields.newPassword);
    formData.append('Confirmpassword', passwordFields.confirmPassword);

    const { result, ok } = await updateUserInfo(formData);

    if (ok) {
      toast.success('Account updated successfully!');
      setInitialEmail(email);
      setInitialPhone(phone);
    } else {
      toast.error(result.msg || 'Failed to update account');
    }
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(false);
    setShowFinalDeleteConfirm(true);
  };

  const handleFinalDeleteAccount = async () => {
    const { result, ok } = await deleteUserAccount(deleteEmail, deletePassword);
    if (ok) {
      toast.success('Account deleted successfully!');
    } else {
      toast.error(result.msg || 'Failed to delete account');
    }
    setShowFinalDeleteConfirm(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h3 id="account-setting" className="text-xl font-semibold">
        Contact Info
      </h3>
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
        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-600 mt-3">Email</label>
          <input
            type="email"
            className="input input-bordered w-full mt-1"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!isEditing}
          />
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-8">Change Password</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['Current Password', 'New Password', 'Confirm Password'].map(
          (label, index) => {
            const field = label
              .toLowerCase()
              .replace(' ', '') as keyof typeof showPassword;
            return (
              <div key={index}>
                <label className="block text-gray-600">{label}</label>
                <div className="relative">
                  <input
                    type={showPassword[field] ? 'text' : 'password'}
                    className="input input-bordered w-full mt-1"
                    placeholder={label}
                    value={passwordFields[field as keyof typeof passwordFields]}
                    onChange={(e) =>
                      setPasswordFields({
                        ...passwordFields,
                        [field as keyof typeof passwordFields]: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                  />
                  <span
                    className="absolute top-2 right-3 cursor-pointer"
                    onClick={() => togglePasswordVisibility(field)}
                  >
                    {showPassword[field] ? <FiEyeOff /> : <FiEye />}
                  </span>
                </div>
              </div>
            );
          },
        )}
      </div>

      {showSaveConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-md shadow-lg p-6 border border-gray-300 max-w-sm text-center mx-auto">
            <span className="block mb-4">
              Are you sure you want to save changes to your account information?
            </span>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowSaveConfirm(false)}
                className="btn btn-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="btn btn-sm btn-primary"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={toggleEdit}
        className={`btn w-full md:w-auto mt-6 ${isEditing ? 'btn-primary' : 'btn-primary'}`}
      >
        {isEditing ? 'Save Changes' : 'Change Data'}
      </button>

      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-md shadow-lg p-6 border border-gray-300 max-w-sm text-center mx-auto">
            <span className="block mb-4">
              Are you sure you want to delete your account?
            </span>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="btn btn-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="btn btn-sm btn-error"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showFinalDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-md shadow-lg p-6 border border-gray-300 max-w-sm text-center mx-auto">
            <span className="block mb-4">
              Enter your email and password to confirm account deletion.
            </span>
            <input
              type="email"
              className="input input-bordered w-full mt-2"
              placeholder="Email address"
              value={deleteEmail}
              onChange={(e) => setDeleteEmail(e.target.value)}
            />
            <input
              type="password"
              className="input input-bordered w-full mt-2"
              placeholder="Password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
            />
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setShowFinalDeleteConfirm(false)}
                className="btn btn-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleFinalDeleteAccount}
                className="btn btn-sm btn-error"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-semibold">Delete Your Account</h3>
        <p className="text-gray-600 text-sm mt-2">
          If you delete your HireMe account, you will no longer be able to get
          information about the matched jobs, following employers, and job
          alerts, shortlisted jobs and more. You will be abandoned from all the
          services of HireMe.com.
        </p>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="btn btn-error mt-4"
        >
          Close Account
        </button>
      </div>
    </div>
  );
};

export default SettingAccount;
