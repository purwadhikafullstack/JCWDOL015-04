import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { addDays } from 'date-fns';

const prisma = new PrismaClient();

export class PaymentController {
  // Mengunggah bukti pembayaran
  async uploadPaymentProof(req: Request, res: Response) {
    const userId = req.user?.user_id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized access.' });
    }

    try {
      if (!req.file) throw new Error('No file uploaded'); // Jika file tidak diunggah, lemparkan error

      // Buat tautan publik untuk file yang diunggah
      const link = `http://localhost:8000/api/public/payment-proof/${req.file.filename}`;

      // Konversi subscription_type_id menjadi integer
      const subscription_type_id = parseInt(req.body.subscription_type_id, 10);

      if (isNaN(subscription_type_id)) {
        return res.status(400).json({
          message: 'Invalid subscription_type_id. Must be an integer.',
        });
      }

      // Ambil informasi SubscriptionType berdasarkan subscription_type_id
      const subscriptionType = await prisma.subscriptionType.findUnique({
        where: { subs_type_id: subscription_type_id },
      });

      if (!subscriptionType) {
        return res
          .status(404)
          .json({ message: 'Subscription type not found.' });
      }

      // Cek apakah ada transaksi `pending` untuk user dan subscription_type_id
      let payment = await prisma.paymentTransaction.findFirst({
        where: {
          user_id: userId,
          subscription_type_id,
          status: 'pending',
        },
      });

      // Jika tidak ada transaksi `pending`, buat transaksi baru
      if (!payment) {
        payment = await prisma.paymentTransaction.create({
          data: {
            user_id: userId,
            subscription_type_id,
            amount: subscriptionType.price, // Ambil harga dari SubscriptionType
            status: 'pending',
          },
        });
      }

      // Perbarui kolom receipt dengan nama file
      const updatedPayment = await prisma.paymentTransaction.update({
        where: { transaction_id: payment.transaction_id },
        data: {
          receipt: req.file.filename, // Simpan nama file di kolom receipt
          status: 'pending',
        },
      });

      res.json({
        message: 'Payment proof uploaded successfully',
        receiptUrl: link,
        updatedPayment,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Mengkonfirmasi pembayaran
  async confirmPayment(req: Request, res: Response) {
    const { transactionId, status } = req.body; // Status dapat berupa "completed" atau "failed"
    const developerId = req.user?.user_id;

    if (!developerId) {
      return res.status(401).json({ message: 'Unauthorized access.' });
    }

    try {
      // Cari transaksi terkait
      const payment = await prisma.paymentTransaction.findUnique({
        where: { transaction_id: transactionId },
        include: { subscriptionType: true },
      });

      if (!payment) {
        return res.status(404).json({ message: 'Transaction not found.' });
      }

      // Perbarui hanya status transaksi
      const updatedPayment = await prisma.paymentTransaction.update({
        where: { transaction_id: transactionId },
        data: {
          status, // Perbarui hanya status
        },
      });

      // Jika status adalah "completed", buat data baru di tabel Subscription
      if (status === 'completed') {
        const startDate = new Date();
        const endDate = addDays(startDate, 30); // 30 hari setelah tanggal mulai

        const newSubscription = await prisma.subscription.create({
          data: {
            user_id: payment.user_id,
            subscription_type_id: payment.subscription_type_id,
            status: 'active',
            start_date: startDate,
            end_date: endDate,
            amount: payment.amount,
            payment_proof: true, // Tambahkan payment_proof di Subscription
          },
        });

        return res.json({
          message: 'Payment confirmed and subscription created successfully',
          updatedPayment,
          newSubscription,
        });
      }

      // Jika status adalah "failed", tidak ada data baru di tabel Subscription
      if (status === 'failed') {
        return res.json({
          message: 'Payment confirmation failed. No subscription created.',
          updatedPayment,
        });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Mendapatkan bukti pembayaran berdasarkan subscription ID
  async getPaymentProof(req: Request, res: Response) {
    const subscriptionId = parseInt(req.params.subscriptionId);
    try {
      const payments = await prisma.paymentTransaction.findMany({
        where: {
          subscription_id: subscriptionId,
          receipt: { not: null },
        },
      });
      if (payments.length === 0) {
        res
          .status(404)
          .json({ message: 'No payment proof found for this subscription' });
      } else {
        res.json(payments);
      }
    } catch (error: any) {
      res.status(500).json({
        error: 'Failed to fetch payment proof',
        details: error.message,
      });
    }
  }
}
