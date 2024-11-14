import { useState, useEffect } from 'react';
import { fetchUserCompany, updateCompany } from '@/lib/company';
import { toast } from 'react-toastify';

const Contact = () => {
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadCompanyData = async () => {
      setLoading(true);
      try {
        const { company, ok } = await fetchUserCompany();
        if (ok && company) {
          setCompanyId(company.company_id.toString());
          setPhone(company.phone || '');
          setEmail(company.email || '');
        } else {
          setError('Failed to load company contact information.');
        }
      } catch (err) {
        setError('An error occurred while fetching company contact information.');
      } finally {
        setLoading(false);
      }
    };

    loadCompanyData();
  }, []);

  const toggleEditMode = () => {
    if (isEditing) {
      handleSaveChanges();
    }
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = async () => {
    if (!companyId) {
      toast.error('Company ID is not available');
      return;
    }

    const formData = new FormData();
    formData.append('phone', phone);
    formData.append('email', email);

    try {
      const { company, ok } = await updateCompany(companyId, formData);

      if (ok) {
        setPhone(company?.phone || '');
        setEmail(company?.email || '');
        toast.success('Contact information updated successfully');
        setIsEditing(false);
      } else {
        toast.error('Failed to update contact information');
      }
    } catch (error) {
      toast.error('An error occurred while updating contact information');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Contact Information</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-600 mb-2">Phone Number</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter Phone Number"
            disabled={!isEditing}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            placeholder="Enter Email"
            disabled={!isEditing}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <button onClick={toggleEditMode} className="btn btn-primary mt-6">
        {isEditing ? 'Save Changes' : 'Change Data'}
      </button>
    </div>
  );
};

export default Contact;
