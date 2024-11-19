'use client';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  XIcon,
} from 'react-share';
import { useState } from 'react';
import { FiShare2 } from 'react-icons/fi';

export default function ShareButton({ id }: { id: number }): JSX.Element {
  const [customMessage, setCustomMessage] = useState('');
  const [isTextareaVisible, setIsTextareaVisible] = useState(false);
  const [showShareButtons, setShowShareButtons] = useState(false);

  const base_url = process.env.NEXT_PUBLIC_BASE_WEB_URL;

  const currentUrl = `${base_url}/job-page/${id}`;
  // const currentUrl = 'purwadhika.com';

  const handleMainButtonClick = () => {
    setShowShareButtons(true);
    setIsTextareaVisible(true);
  };

  const closeModal = () => {
    setIsTextareaVisible(false);
    setShowShareButtons(false);
  };

  return (
    <div className="relative">
      {/* Main Share Button */}
      {!showShareButtons && (
        <div className="flex items-center">
          <p className="font-semibold mr-2">Share this Job </p>
          <button
            className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            onClick={handleMainButtonClick}
          >
            <FiShare2 size={16} />
          </button>
        </div>
      )}

      {/* Modal with Textarea and Share Buttons */}
      {isTextareaVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="bg-white p-4 rounded-md shadow-md w-1/2">
            <button
              className="absolute top-4 right-4 font-bold text-xl text-black hover:text-gray-800"
              onClick={closeModal}
            >
              X
            </button>
            <textarea
              className="w-full p-2 border rounded-md mb-3"
              placeholder="Add a custom message for your post..."
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
            ></textarea>
            <div className="flex gap-4 justify-center mt-4">
              {/* Facebook share button */}
              <FacebookShareButton
                url={currentUrl}
                hashtag={`${customMessage} #hireme`}
              >
                <div className="relative w-32 h-11 border rounded-md flex items-center overflow-hidden border-[#EDEFF5] group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFF6E6] to-[#0066FF] transform -translate-x-full transition-transform duration-300 ease-in-out group-hover:translate-x-0 "></div>
                  <div className="relative flex items-center z-10 py-3 px-4 hover:text-white text-[#0066FF]">
                    <FacebookIcon size={18} round={true} />
                    <p className="ml-3 text-sm">Facebook</p>
                  </div>
                </div>
              </FacebookShareButton>

              {/* LinkedIn share button */}
              <LinkedinShareButton
                url={currentUrl}
                title={customMessage}
                summary={customMessage}
                source={customMessage}
              >
                <div className="relative w-32 h-11 border rounded-md flex items-center overflow-hidden border-[#EDEFF5] group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFF6E6] to-[#0076B2] transform -translate-x-full transition-transform duration-300 ease-in-out group-hover:translate-x-0 "></div>
                  <div className="relative flex items-center z-10 py-3 px-4 hover:text-white text-[#0076B2]">
                    <LinkedinIcon size={18} round={true} />
                    <p className="ml-3 text-sm">LinkedIn</p>
                  </div>
                </div>
              </LinkedinShareButton>

              {/* Twitter share button */}
              <TwitterShareButton url={currentUrl} title={customMessage}>
                <div className="relative w-32 h-11 border rounded-md flex items-center overflow-hidden border-[#EDEFF5] group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFF6E6] to-black transform -translate-x-full transition-transform duration-300 ease-in-out group-hover:translate-x-0 "></div>
                  <div className="relative flex items-center z-10 py-3 px-4 hover:text-white text-black">
                    <XIcon size={18} round={true} />
                    <p className="ml-3 text-sm">X/Twitter</p>
                  </div>
                </div>
              </TwitterShareButton>

              {/* WhatsApp share button */}
              <WhatsappShareButton url={currentUrl} title={customMessage}>
                <div className="relative w-32 h-11 border rounded-md flex items-center overflow-hidden border-[#EDEFF5] group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFF6E6] to-[#60D66A] transform -translate-x-full transition-transform duration-300 ease-in-out group-hover:translate-x-0 "></div>
                  <div className="relative flex items-center z-10 py-3 px-4 hover:text-white text-[#60D66A]">
                    <WhatsappIcon size={18} round={true} />
                    <p className="ml-3 text-sm">Whatsapp</p>
                  </div>
                </div>
              </WhatsappShareButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
