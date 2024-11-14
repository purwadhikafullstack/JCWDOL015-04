import React from 'react';
import { Notification as NotificationType } from '@/types/notification';
import moment from 'moment';

interface NotificationModalProps {
  notification: NotificationType;
  onClose: () => void;
  onMarkAsRead: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ notification, onClose, onMarkAsRead }) => {
  const handleCloseAndMarkAsRead = () => {
    if (!notification.is_read) {
      onMarkAsRead();
    }
    onClose();
  };

  return (
    <>
      {/* Modal checkbox for DaisyUI styling */}
      <input type="checkbox" id="notification-modal" className="modal-toggle" checked readOnly />
      <div className="modal">
        {/* Increase modal size by 30% */}
        <div className="modal-box w-full max-w-2xl mx-4 sm:mx-auto relative">
          <h3 className="text-lg font-bold mb-4">Notification Details</h3>
          {/* Date & Time positioned to the top right */}
          <span className="absolute top-8 right-7 text-gray-400 text-xs">
            {moment(notification.created_at).format('DD MMMM, YYYY | h:mm A')}
          </span>
          
          <p className="text-gray-800 font-semibold mt-4">{notification.subject}</p>
          <p className="text-gray-600 text-sm mt-2">{notification.message}</p>

          <div className="modal-action mt-4">
            <button className="btn" onClick={handleCloseAndMarkAsRead}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationModal;
