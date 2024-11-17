import { useState } from 'react';
import CompanyInfo from './TabCompanySettings/CompanyInfo';
import FoundingInfo from './TabCompanySettings/FoundingInfo';
import SocialMediaLink from './TabCompanySettings/SocialMediaLink';
import Contact from './TabCompanySettings/Contact';

const SettingCompany = () => {
  const [companyTab, setCompanyTab] = useState('companyInfo');

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Company Settings</h2>
      <div className="flex space-x-4 border-b pb-4 mb-8">
        <button
          className={`${
            companyTab === 'companyInfo' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-700'
          }`}
          onClick={() => setCompanyTab('companyInfo')}
        >
          Company Info
        </button>
        <button
          className={`${
            companyTab === 'foundingInfo' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-700'
          }`}
          onClick={() => setCompanyTab('foundingInfo')}
        >
          Founding Info
        </button>
        <button
          className={`${
            companyTab === 'socialMediaLink' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-700'
          }`}
          onClick={() => setCompanyTab('socialMediaLink')}
        >
          Social Media Link
        </button>
        <button
          className={`${
            companyTab === 'contact' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-700'
          }`}
          onClick={() => setCompanyTab('contact')}
        >
          Contact
        </button>
      </div>
      <div>
        {companyTab === 'companyInfo' && <CompanyInfo />}
        {companyTab === 'foundingInfo' && <FoundingInfo />}
        {companyTab === 'socialMediaLink' && <SocialMediaLink />}
        {companyTab === 'contact' && <Contact />}
      </div>
    </div>
  );
};

export default SettingCompany;
