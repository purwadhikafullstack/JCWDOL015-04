import React from 'react';
import { Notification as NotificationType } from '@/types/notification';

interface NotificationModalProps {
  notifications: NotificationType[];
  onClose: () => void;
  onMarkAsRead: (notificationId: number) => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  notifications,
  onClose,
  onMarkAsRead,
}) => {
  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h2 className="text-lg font-bold mb-4">Notifications</h2>
        <ul>
          {notifications.map(notification => (
            <li
              key={notification.notification_id}
              className={`py-2 ${notification.is_read ? '' : 'font-bold text-blue-600'}`}>
              <a
                href={notification.link ?? '#'}
                onClick={() => onMarkAsRead(notification.notification_id)}
              >
                {notification.message}
              </a>
              <span className="text-sm text-gray-500">
                {new Date(notification.created_at).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
