import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export class SubsController {
  // Create a new subscription
  async createSubsType(req: Request, res: Response) {
    const { type, description, price, features } = req.body;
    try {
      const SubscriptionType = await prisma.subscriptionType.create({
        data: {
          type,
          description,
          price,
          features,
          User_id: req.user?.user_id!
        },
      });
      res.status(201).send({
        status: 'ok',
        msg: "Subscription created successfully",
        SubscriptionType
      });;
    } catch (error) {

        res.status(400).send({
            status: 'error',
            msg: error,
          });
    }
  }


  // Get all subscriptions
  async getSubsType(req: Request, res: Response) {
    try {
      const subscriptionstypeAll = await prisma.subscriptionType.findMany();
      res.status(201).send({
        status: 'ok',
        msg: "All Subscription successfully Show!",
        subscriptionstypeAll
      });;
    } catch (error) {
        res.status(400).send({
            status: 'error',
            msg: error,
          });
    }
  }

  // Get a single subscription by ID
  async getSubsTypeById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const subscription = await prisma.subscriptionType.findUnique({
        where: { subs_type_id: Number(id) },
      });
      if (subscription) {
        res.status(200).json(subscription);
      } else {
        res.status(404).json({ error: 'Subscription not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch subscription' });
    }
  }

  // Update a subscription by ID
  async updateSubsType(req: Request, res: Response) {
    const { id } = req.params;
    const { type, description, price, features } = req.body;
    try {
      const updatedSubscriptionType = await prisma.subscriptionType.update({
        where: { subs_type_id: Number(id) },
        data: {
            type,
            description,
            price,
            features,
            User_id: req.user?.user_id!
        },
      });
      res.status(201).send({
        status: 'ok',
        msg: "Subscription Type Update successfully",
        updatedSubscriptionType
      });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            msg: error,
          });
    }
  }

  // Delete a subscription by ID
  async deleteSubsType(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await prisma.subscriptionType.delete({
        where: { subs_type_id: Number(id) },
      });
      res.status(201).send({
        status: 'ok',
        msg: "Subscription Type Delete successfully",
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete subscription' });
    }
  }
}
