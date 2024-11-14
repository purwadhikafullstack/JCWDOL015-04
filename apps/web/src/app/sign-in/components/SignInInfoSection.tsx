import Image from 'next/image';
import Background from '../../../assets/BG-CreateAccount.png';
import IconCompany from '../../../assets/Icon-Company-Trans.png';
import IconJob from '../../../assets/Icon-Job-Trans.png';

const SignInInfoSection: React.FC = () => (
  <div className="hidden lg:block lg:w-1/2 bg-cover bg-center relative" style={{ backgroundImage: `url(${Background.src})` }}>
    <div className="absolute inset-0 flex flex-col justify-end items-center text-white pb-36 px-4">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Over 1,75,324 candidates</h2>
        <p className="text-xl lg:text-2xl font-light mt-4">waiting for good employees.</p>
        <div className="mt-12 flex justify-center space-x-8">
          <div className="text-center">
            <Image src={IconJob} alt="Live Jobs" width={50} height={50} className="mx-auto" />
            <p className="text-lg font-bold mt-4">1,75,324</p>
            <p className="text-sm">Live Job</p>
          </div>
          <div className="text-center">
            <Image src={IconCompany} alt="Companies" width={50} height={50} className="mx-auto" />
            <p className="text-lg font-bold mt-4">97,354</p>
            <p className="text-sm">Companies</p>
          </div>
          <div className="text-center">
            <Image src={IconJob} alt="New Jobs" width={50} height={50} className="mx-auto" />
            <p className="text-lg font-bold mt-4">7,532</p>
            <p className="text-sm">New Jobs</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SignInInfoSection;
