// src/app/dashboard-admin-developer/components/TabCompanySettings/Contact.tsx
import { useState } from 'react';

const Contact = () => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div className="p-6 space-y-6">
      <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-600 mb-2">Phone Number</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter Phone Number"
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <button className="btn btn-primary mt-6">Save Changes</button>
    </div>
  );
};

export default Contact;
