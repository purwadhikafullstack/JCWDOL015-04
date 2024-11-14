import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class SubscriptionController {
  // Mendapatkan status subscription
  async getSubscriptionStatus(req: Request, res: Response) {
    const userId = parseInt(req.params.userId);
    try {
      const subscription = await prisma.subscription.findFirst({
        where: { user_id: userId, status: 'active' }
      });
      if (!subscription) {
        res.status(404).json({ message: 'No active subscription found' });
      } else {
        res.json(subscription);
      }
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to fetch subscription status', details: error.message });
    }
  }

  // Mendapatkan subscription berdasarkan ID
  async getSubscriptionById(req: Request, res: Response) {
    const subscriptionId = parseInt(req.params.id);
    try {
      const subscription = await prisma.subscription.findUnique({
        where: { subscription_id: subscriptionId }
      });
      if (!subscription) {
        res.status(404).json({ message: 'Subscription not found' });
      } else {
        res.json(subscription);
      }
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to fetch subscription', details: error.message });
    }
  }

  // Membuat subscription baru
  async createSubscription(req: Request, res: Response) {
    const { userId, subscriptionTypeId, amount } = req.body;
    try {
      const newSubscription = await prisma.subscription.create({
        data: {
          user_id: userId,
          subscription_type_id: subscriptionTypeId,
          amount,
          status: 'active',
          start_date: new Date(),
          end_date: new Date(new Date().setDate(new Date().getDate() + 30))
        }
      });
      res.status(201).json(newSubscription);
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to create subscription', details: error.message });
    }
  }

  // Mengupdate subscription
  async updateSubscription(req: Request, res: Response) {
    const subscriptionId = parseInt(req.params.id);
    const { amount, status } = req.body;
    try {
      const updatedSubscription = await prisma.subscription.update({
        where: { subscription_id: subscriptionId },
        data: { amount, status }
      });
      res.json(updatedSubscription);
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to update subscription', details: error.message });
    }
  }

  // Menghapus subscription
  async deleteSubscription(req: Request, res: Response) {
    const subscriptionId = parseInt(req.params.id);
    try {
      await prisma.subscription.delete({
        where: { subscription_id: subscriptionId }
      });
      res.json({ message: 'Subscription deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to delete subscription', details: error.message });
    }
  }
}
