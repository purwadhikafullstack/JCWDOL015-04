import { LinkedinIcon, LinkedinShareButton } from 'react-share';

export default function LinkedInButton({
  slug,
  url,

}: {
  slug: string;
  url: string;

}) {
  return (
    <LinkedinShareButton url={`${url}`} >
      <div className="relative w-32 h-11 border rounded-md flex items-center overflow-hidden border-[#EDEFF5] group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFF6E6] to-[#0076B2] transform -translate-x-full transition-transform duration-300 ease-in-out group-hover:translate-x-0 "></div>
        <div className="relative flex items-center z-10 py-3 px-4 hover:text-white text-[#0076B2]">
          <LinkedinIcon size={18} round={true} />
          <p className="ml-3 text-sm">LinkedIn</p>
        </div>
      </div>
    </LinkedinShareButton>
  );
}

