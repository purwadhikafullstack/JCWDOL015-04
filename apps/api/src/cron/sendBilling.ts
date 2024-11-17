// cron/sendBillingEmail.ts
import cron from "node-cron";
import nodemailer, { SendMailOptions } from "nodemailer";
import { PrismaClient, Subscription, User } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";


const prisma = new PrismaClient();

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // Update this based on your email provider
  auth: {
    user: process.env.EMAIL_USER as string, // Your email address
    pass: process.env.EMAIL_PASS as string, // Your email password
  },
});

// Helper function to convert Decimal to number
const formatDecimalToNumber = (value: Decimal | null): number => {
  return value ? parseFloat(value.toString()) : 0;
};

// Schedule a cron job to run daily at 12:00 AM
cron.schedule("0 0 * * *", async () => {
  console.log("Running daily cron job to send billing emails...");

  try {
    // Get users whose subscription ends tomorrow
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const subscriptionsEndingSoon = await prisma.subscription.findMany({
      where: {
        end_date: tomorrow,
        status: "active",
      },
      include: {
        user: true,
      },
    });

    // Send billing emails to these users
    for (const subscription of subscriptionsEndingSoon) {
      if (!subscription.user) {
        console.warn(`Subscription ${subscription.subscription_id} has no associated user.`);
        continue;
      }

      const amount = formatDecimalToNumber(subscription.amount);

      const emailOptions: SendMailOptions = {
        from: process.env.EMAIL_USER,
        to: subscription.user.email,
        subject: "Subscription Renewal Reminder",
        text: `Dear ${subscription.user.first_name},

Your subscription is ending on ${subscription.end_date?.toISOString().split("T")[0]}.
Please make sure to renew your subscription to avoid interruption of services.

Amount due: Rp ${new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(amount)}

Thank you,
Your Company Team`,
      };

      await transporter.sendMail(emailOptions);
      console.log(`Billing email sent to ${subscription.user.email}`);
    }
  } catch (error) {
    console.error("Error sending billing emails:", error);
  }
});
