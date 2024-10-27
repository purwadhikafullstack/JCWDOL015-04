import Image from 'next/image';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGlobe,
} from 'react-icons/fa';
import moment from 'moment';

const CompanyInfo = ({ job }: any) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <h2 className="text-xl font-semibold mb-4">
      About {job.company.company_name}
    </h2>
    {job.company.logo && (
      <div className="flex justify-center mb-4">
        <Image
          src={job.company.logo}
          alt={`${job.company.company_name} Logo`}
          width={60}
          height={60}
          className="rounded-full"
        />
      </div>
    )}
    <ul className="space-y-2 text-sm">
      <li>
        <strong>Founded:</strong>{' '}
        {job.company.yearOfEstablish
          ? moment(job.company.yearOfEstablish).format('MMMM D, YYYY')
          : 'N/A'}
      </li>
      <li>
        <strong>Industry:</strong> {job.company.IndustryType || 'Not specified'}
      </li>
      <li>
        <strong>Company Size:</strong>{' '}
        {job.company.TeamSize
          ? `${job.company.TeamSize.toLocaleString()} Employees`
          : 'Not specified'}
      </li>
      <li>
        <strong>Phone:</strong> {job.company.phone || 'N/A'}
      </li>
      <li>
        <strong>Email:</strong> {job.company.email}
      </li>
      <li>
        <strong>Website:</strong>{' '}
        <a
          href={job.company.website}
          target="_blank"
          className="text-blue-500 underline"
        >
          {job.company.website}
        </a>
      </li>
    </ul>
    <div className="flex justify-center space-x-4 mt-4 text-gray-600">
      <FaFacebook
        size={20}
        className="cursor-pointer hover:scale-105 transition-transform"
      />
      <FaTwitter
        size={20}
        className="cursor-pointer hover:scale-105 transition-transform"
      />
      <FaInstagram
        size={20}
        className="cursor-pointer hover:scale-105 transition-transform"
      />
      <FaLinkedin
        size={20}
        className="cursor-pointer hover:scale-105 transition-transform"
      />
      <FaGlobe
        size={20}
        className="cursor-pointer hover:scale-105 transition-transform"
      />
    </div>
  </div>
);

export default CompanyInfo;
