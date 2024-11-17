// // Scheduler to run daily at midnight
// setInterval(async () => {
//     const currentDate = new Date();
  
//     // Check for subscriptions ending tomorrow
//     const expiringSubscriptions = await prisma.subscription.findMany({
//       where: {
//         status: 'active',
//         end_date: {
//           equals: new Date(currentDate.setDate(currentDate.getDate() + 1))
//         }
//       },
//       include: { user: true }
//     });
  
//     for (const subscription of expiringSubscriptions) {
//       // Send reminder email
//       await sendBillingEmail(subscription.user.email, subscription.amount);
//     }
  
//     // Expire subscriptions that have ended
//     await prisma.subscription.updateMany({
//       where: {
//         status: 'active',
//         end_date: {
//           lte: new Date()
//         }
//       },
//       data: {
//         status: 'expired'
//       }
//     });
//   }, 24 * 60 * 60 * 1000); // Runs every 24 hours
  
//   async function sendBillingEmail(email, amount) {
//     const transporter = nodemailer.createTransport({
//       host: process.env.EMAIL_HOST,
//       port: process.env.EMAIL_PORT,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//       }
//     });
  
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'Subscription Renewal Notice',
//       text: `Your subscription will end soon. Please make a payment of ${amount} to continue access.`
//     });
//   }
  