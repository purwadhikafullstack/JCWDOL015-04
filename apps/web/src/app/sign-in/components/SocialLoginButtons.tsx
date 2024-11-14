import Image from 'next/image';
import { useSocialLogin } from '@/hooks/useSocialLogin';
import IconFacebook from '../../../assets/category/Icon-Facebook.png';
import IconGoogle from '../../../assets/category/Icon-Google.png';

const SocialLoginButtons: React.FC = () => {
  const { handleFacebookLogin, handleGoogleLogin } = useSocialLogin();

  return (
    <div className="flex space-x-6">
      <button onClick={handleFacebookLogin} className="w-full flex items-center justify-center bg-gray-100 p-3 rounded-md hover:bg-gray-200 transition">
        <Image src={IconFacebook} alt="Facebook" width={24} height={24} />
        <span className="ml-2 text-gray-700">Sign in with Facebook</span>
      </button>
      <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center bg-gray-100 p-3 rounded-md hover:bg-gray-200 transition">
        <Image src={IconGoogle} alt="Google" width={24} height={24} />
        <span className="ml-2 text-gray-700">Sign in with Google</span>
      </button>
    </div>
  );
};

export default SocialLoginButtons;
