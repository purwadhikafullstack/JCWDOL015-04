import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const checkActiveSubscription = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.user_id;

    // Log userId untuk debugging
    console.log("Checking subscription for userId:", userId);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID found in request." });
    }

    // Cari subscription dengan status 'active'
    const activeSubscription = await prisma.subscription.findFirst({
      where: {
        user_id: userId,
        status: "active", // Pastikan hanya subscription aktif yang diterima
      },
    });

    // Log hasil pencarian subscription
    console.log("Active Subscription:", activeSubscription);

    if (!activeSubscription) {
      return res.status(403).json({
        message: "Access denied: No active subscription found.",
        detail: "Your subscription is either inactive, expired, or not found.",
      });
    }

    // Jika subscription aktif, lanjutkan ke fitur berikutnya
    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error checking active subscription:", error.message);
      res.status(500).json({ message: "Internal server error", detail: error.message });
    } else {
      console.error("Unexpected error:", error);
      res.status(500).json({ message: "Internal server error", detail: "An unknown error occurred." });
    }
  }
  
};




export const checkFeatureLimit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.user_id; // Pastikan Anda memiliki mekanisme auth untuk mendapatkan userId dari token
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Cari subscription aktif untuk user
    const subscription = await prisma.subscription.findFirst({
      where: {
        user_id: userId,
        status: "active",
      },
      include: {
        subscriptionType: true, // Pastikan model SubscriptionType memiliki informasi plan
      },
    });

    if (!subscription) {
      return res.status(403).json({
        message: "Access denied. You need an active subscription to use this feature.",
      });
    }

    const { type } = subscription.subscriptionType; // Misalnya: "Standar", "Profesional"

    if (type === "STANDARD") {
      // Periksa jumlah penggunaan fitur
      const featureUsage = await prisma.featureUsage.count({
        where: {
          user_id: userId,
          feature_name: "Skill Assessment", // Nama fitur
        },
      });

      if (featureUsage >= 2) {
        return res.status(403).json({
          message: "Feature limit reached. Upgrade to Professional plan for unlimited access.",
        });
      }

      // Catat penggunaan fitur
      await prisma.featureUsage.create({
        data: {
          user_id: userId,
          feature_name: "YourFeatureName",
        },
      });
    }

    // Jika plan Profesional, lanjutkan tanpa batasan
    next();
  } catch (error) {
    console.error("Error checking feature limit:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
