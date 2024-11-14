import prisma from '@/prisma';
import { Request, Response } from 'express';

export class NotificationController {
  async getUserNotifications(req: Request, res: Response) {
    try {
      const userId = req.user?.user_id;
      if (!userId) {
        return res.status(400).json({ msg: 'User ID is required' });
      }

      const notifications = await prisma.notification.findMany({
        where: { user_id: userId },
        orderBy: { created_at: 'desc' },
      });
      res.status(200).json({ notifications });
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ msg: 'Failed to fetch notifications' });
    }
  }

  async markAsRead(req: Request, res: Response) {
    try {
      const { notificationId } = req.params;
      const notification = await prisma.notification.update({
        where: { notification_id: Number(notificationId) },
        data: { is_read: true },
      });
      res.status(200).json({ msg: 'Notification marked as read', notification });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      res.status(500).json({ msg: 'Failed to mark notification as read' });
    }
  }
}
