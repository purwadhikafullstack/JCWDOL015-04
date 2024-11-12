import React, { useEffect, useState } from 'react';
import { getUnreadNotifications, markNotificationAsRead } from '@/lib/notificationApi';
import { Notification as NotificationType } from '@/types/notification';
import { BsBell } from 'react-icons/bs';
import NotificationModal from './NotificationModal';
import JobIcon from '@/assets/Icon_Job.png';
import Image from 'next/image';
import moment from 'moment';

const Notification: React.FC = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<NotificationType | null>(null);

  useEffect(() => {
    async function fetchUnreadNotifications() {
      const { notifications, ok } = await getUnreadNotifications();
      if (ok) {
        setUnreadCount(notifications.filter(n => !n.is_read).length);
        setNotifications(notifications);
      }
    }
    fetchUnreadNotifications();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openNotificationModal = (notification: NotificationType) => {
    setSelectedNotification(notification);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNotification(null);
  };

  const handleMarkAsRead = async (notificationId: number) => {
    const { ok } = await markNotificationAsRead(notificationId);
    if (ok) {
      setNotifications(prevNotifications =>
        prevNotifications.map(notification =>
          notification.notification_id === notificationId
            ? { ...notification, is_read: true }
            : notification
        )
      );
      setUnreadCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell Icon */}
      <button onClick={toggleDropdown} className="relative btn btn-ghost btn-circle">
        <BsBell size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-6 w-80 bg-white rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Notifications</h3>
            <button
              className="text-sm text-blue-500 hover:underline"
              onClick={() => notifications.forEach(notification => handleMarkAsRead(notification.notification_id))}
            >
              Mark all as read
            </button>
          </div>
          <ul className="max-h-80 overflow-y-auto">
            {notifications.slice(0, 5).map(notification => (
              <li
                key={notification.notification_id}
                className="flex items-start p-4 hover:bg-gray-100 border-b border-gray-200 cursor-pointer"
                onClick={() => openNotificationModal(notification)} 
              >
                {/* Notification Icon */}
                <div className="mr-3">
                  <Image
                    src={JobIcon}
                    alt="Icon"
                    className="w-8 h-8 rounded-full"
                  />
                </div>
                {/* Notification Details */}
                <div className="flex-1">
                  <p className={`font-semibold ${!notification.is_read ? 'text-gray-800' : 'text-gray-500'}`}>
                    {notification.subject}
                  </p>
                  <p className="text-gray-600 text-sm">{notification.message}</p>
                  <span className="text-gray-400 text-xs">{moment(notification.created_at).format('DD MMMM, YYYY | h:mm A')}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Notification Modal */}
      {isModalOpen && selectedNotification && (
        <NotificationModal
          notification={selectedNotification}
          onClose={closeModal}
          onMarkAsRead={() => handleMarkAsRead(selectedNotification.notification_id)}
        />
      )}
    </div>
  );
};

export default Notification;
