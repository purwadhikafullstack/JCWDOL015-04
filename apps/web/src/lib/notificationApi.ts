import { Notification } from "@/types/notification";
import { getToken } from './server';
import base_url from './user';

export const getUnreadNotifications = async (): Promise<{ notifications: Notification[]; ok: boolean }> => {
  const token = await getToken();
  if (!token) {
    console.error('No token found');
    return { notifications: [], ok: false };
  }

  try {
    const res = await fetch(`${base_url}/notifications`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    });

    if (!res.ok) {
      console.error('Failed to fetch notifications:', res.status, res.statusText);
      return { notifications: [], ok: false };
    }

    const result = await res.json();
    return { notifications: result.notifications || [], ok: true };
  } catch (error) {
    console.error("Error in getUnreadNotifications:", error);
    return { notifications: [], ok: false };
  }
};

export const markNotificationAsRead = async (notificationId: number): Promise<{ ok: boolean }> => {
  const token = await getToken();

  if (!token) {
    console.error('No token found');
    return { ok: false };
  }

  try {
    const res = await fetch(`${base_url}/notifications/${notificationId}/read`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      cache: 'no-cache',
    });

    if (!res.ok) {
      console.error('Failed to mark notification as read:', res.status, res.statusText);
      return { ok: false };
    }

    return { ok: true };
  } catch (error) {
    console.error("Error in markNotificationAsRead:", error);
    return { ok: false };
  }
};

export const markAllNotificationsAsRead = async (): Promise<{ ok: boolean }> => {
  const token = await getToken();

  if (!token) {
    console.error('No token found');
    return { ok: false };
  }

  try {
    const res = await fetch(`${base_url}/notifications/mark-all-read`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      cache: 'no-cache',
    });

    if (!res.ok) {
      console.error('Failed to mark all notifications as read:', res.status, res.statusText);
      return { ok: false };
    }

    return { ok: true };
  } catch (error) {
    console.error("Error in markAllNotificationsAsRead:", error);
    return { ok: false };
  }
};
