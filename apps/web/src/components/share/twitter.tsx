import { XIcon, TwitterShareButton } from 'react-share';

export default function TwitterButton({
  slug,
  url,
 
}: {
  slug: string;
  url: string;

}) {
  return (
    <TwitterShareButton url={`${url}`}  >
      <div className="relative w-32 h-11 border rounded-md flex items-center overflow-hidden border-[#EDEFF5] group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFF6E6] to-black transform -translate-x-full transition-transform duration-300 ease-in-out group-hover:translate-x-0 "></div>
        <div className="relative flex items-center z-10 py-3 px-4 hover:text-white text-black">
          <XIcon size={18} round={true} />
          <p className="ml-3 text-sm">X/Twitter</p>
        </div>
      </div>
    </TwitterShareButton>
  );
}

