'use client';
import { useState, useEffect } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { getUserInfo, updateUserCredential, deleteUserAccount } from '@/lib/user';
import useLogout from '@/lib/useLogout';
import { toast } from 'react-toastify';

const SettingAccount = () => {
  const logout = useLogout(); // Use the logout function
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showFinalDeleteConfirm, setShowFinalDeleteConfirm] = useState(false);
  const [showLastDeleteConfirm, setShowLastDeleteConfirm] = useState(false);

  const [email, setEmail] = useState('');
  const [initialEmail, setInitialEmail] = useState(email);

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
        setInitialEmail(user.email || '');
      } else {
        toast.error('Failed to load account data');
      }
    };
    fetchUserData();
  }, []);

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const handleEmailSave = async () => {
    if (email === initialEmail) {
      toast.error('No changes detected in email.');
      return;
    }

    const payload = { email };
    const { result, ok } = await updateUserCredential(payload);

    if (ok) {
      toast.success('Email updated successfully!');
      setInitialEmail(email);
      setIsEditingEmail(false);
    } else {
      toast.error(result.msg || 'Failed to update email');
    }
  };

  const handlePasswordSave = async () => {
    if (!passwordFields.currentPassword.trim()) {
      toast.error('Current password is required to change the password.');
      return;
    }
    if (!passwordFields.newPassword.trim() || !passwordFields.confirmPassword.trim()) {
      toast.error('Both new password and confirm password are required.');
      return;
    }
    if (passwordFields.newPassword !== passwordFields.confirmPassword) {
      toast.error('New password and confirm password do not match.');
      return;
    }

    const payload = {
      currentPassword: passwordFields.currentPassword,
      Newpassword: passwordFields.newPassword,
      Confirmpassword: passwordFields.confirmPassword,
    };

    const { result, ok } = await updateUserCredential(payload);

    if (ok) {
      toast.success('Password updated successfully!');
      setPasswordFields({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setIsEditingPassword(false);
    } else {
      toast.error(result.msg || 'Failed to update password');
    }
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(false);
    setShowFinalDeleteConfirm(true);
  };

  const handleFinalDeleteAccount = async () => {
    setShowFinalDeleteConfirm(false);
    setShowLastDeleteConfirm(true); // Show the final confirmation step
  };

  const handleLastDeleteAccount = async () => {
    const { result, ok } = await deleteUserAccount(deleteEmail, deletePassword);
    if (ok) {
      toast.success('Account deleted successfully!');
      logout(); // Logout the user after successful account deletion
    } else {
      toast.error(result.msg || 'Failed to delete account');
    }
    setShowLastDeleteConfirm(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h3 id="account-setting" className="text-xl font-semibold">
        Contact Info
      </h3>
      <div>
        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-600 mt-3">Email</label>
          <input
            type="email"
            className="input input-bordered w-full mt-1"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!isEditingEmail}
          />
          <button
            onClick={() => {
              if (isEditingEmail) handleEmailSave();
              else setIsEditingEmail(true);
            }}
            className="btn btn-primary mt-4"
          >
            {isEditingEmail ? 'Save Email' : 'Change Email'}
          </button>
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-8">Change Password</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['Current Password', 'New Password', 'Confirm Password'].map(
          (label, index) => {
            const fieldKey: keyof typeof passwordFields =
              label === 'Current Password'
                ? 'currentPassword'
                : label === 'New Password'
                ? 'newPassword'
                : 'confirmPassword';

            const showKey: 'current' | 'new' | 'confirm' =
              label === 'Current Password'
                ? 'current'
                : label === 'New Password'
                ? 'new'
                : 'confirm';

            return (
              <div key={index}>
                <label className="block text-gray-600">{label}</label>
                <div className="relative">
                  <input
                    type={showPassword[showKey] ? 'text' : 'password'}
                    className="input input-bordered w-full mt-1"
                    placeholder={label}
                    value={passwordFields[fieldKey]}
                    onChange={(e) =>
                      setPasswordFields({
                        ...passwordFields,
                        [fieldKey]: e.target.value,
                      })
                    }
                    disabled={!isEditingPassword}
                  />
                  <span
                    className="absolute top-2 right-3 cursor-pointer"
                    onClick={() => togglePasswordVisibility(showKey)}
                  >
                    {showPassword[showKey] ? <FiEyeOff /> : <FiEye />}
                  </span>
                </div>
              </div>
            );
          },
        )}
      </div>
      <button
        onClick={() => {
          if (isEditingPassword) handlePasswordSave();
          else setIsEditingPassword(true);
        }}
        className="btn btn-primary mt-4"
      >
        {isEditingPassword ? 'Save Password' : 'Change Password'}
      </button>

      <div className="mt-8">
        <h3 className="text-xl font-semibold">Delete Your Account</h3>
        <p className="text-gray-600 text-sm mt-2">
          If you delete your HireMe account, you will no longer be able to get
          information about the matched jobs, following employers, and job
          alerts, shortlisted jobs, and more. You will be abandoned from all
          the services of HireMe.com.
        </p>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="btn btn-error mt-4"
        >
          Close Account
        </button>
      </div>

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
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {showLastDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-md shadow-lg p-6 border border-gray-300 max-w-sm text-center mx-auto">
            <span className="block mb-4">
              Are you absolutely sure you want to delete your account? This
              action cannot be undone.
            </span>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowLastDeleteConfirm(false)}
                className="btn btn-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleLastDeleteAccount}
                className="btn btn-sm btn-error"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingAccount;
