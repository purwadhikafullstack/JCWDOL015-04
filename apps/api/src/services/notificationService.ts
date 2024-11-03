import prisma from '@/prisma';

export async function createApplicationStatusNotification(applicationId: number, userId: number, newStatus: string) {
  await prisma.notification.create({
    data: {
      user_id: userId,
      message: `Your application status has been updated to ${newStatus}.`,
      is_read: false,
      type: 'application',
      related_id: applicationId,
      link: `/applications/${applicationId}`,
    },
  });
}

export async function createInterviewNotification(interviewId: number, userId: number, status: string) {
  await prisma.notification.create({
    data: {
      user_id: userId,
      message: `Your interview is now ${status}.`,
      is_read: false,
      type: 'interview',
      related_id: interviewId,
      link: `/interviews/${interviewId}`,
    },
  });
}

export async function createSubscriptionNotification(subscriptionId: number, userId: number, status: string) {
  await prisma.notification.create({
    data: {
      user_id: userId,
      message: `Your subscription status is now ${status}.`,
      is_read: false,
      type: 'subscription',
      related_id: subscriptionId,
      link: `/subscriptions/${subscriptionId}`,
    },
  });
}
