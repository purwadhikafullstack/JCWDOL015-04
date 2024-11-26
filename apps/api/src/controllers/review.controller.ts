import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export class ReviewController {
  // Constructor untuk mengikat metode ke 'this'
  async createReview(req: Request, res: Response) {
    const {
      comment,
      salary_estimate,
      position,
      workCultureRating,
      workLifeBalanceRating,
      facilitiesRating,
      careerOpportunitiesRating,
      company_id,
    } = req.body;

    try {
      const user_id = req.user?.user_id;

      if (!user_id) {
        return res.status(403).json({ message: 'User not authenticated' });
      }

      // Ambil company_id dari database jika tidak ada di body
      const userCompany = await prisma.company.findFirst({
        where: {
          company_id: req.body.company_id,
          users: {
            some: {
              user_id: req.user?.user_id,
            },
          },
        },
      });
      
      if (!userCompany) {
        return res.status(403).json({ message: 'User tidak terverifikasi untuk perusahaan ini' });
      }
      

      const verifiedCompanyId = userCompany.company_id;

      // Periksa apakah ulasan sudah ada untuk user dan perusahaan ini
      const existingReview = await prisma.review.findFirst({
        where: {
          user_id,
          company_id: verifiedCompanyId,
        },
      });

      if (existingReview) {
        return res.status(400).json({
          message: 'Anda hanya dapat membuat satu ulasan untuk perusahaan ini',
        });
      }

      // Hitung rata-rata rating dari empat aspek lainnya
      const ratings = [
        workCultureRating,
        workLifeBalanceRating,
        facilitiesRating,
        careerOpportunitiesRating,
      ];
      const validRatings = ratings.filter((r) => r !== undefined && r !== null);
      const averageRating = validRatings.length
        ? parseFloat(
            (
              validRatings.reduce((a, b) => a + b, 0) / validRatings.length
            ).toFixed(1),
          )
        : null;

      // Membuat ulasan baru
      const newReview = await prisma.review.create({
        data: {
          rating: averageRating,
          comment,
          salary_estimate,
          position,
          workCultureRating,
          workLifeBalanceRating,
          facilitiesRating,
          careerOpportunitiesRating,
          user: { connect: { user_id } },
          company: { connect: { company_id: verifiedCompanyId } },
        },
      });

      return res.status(201).json({
        message: 'Ulasan berhasil dibuat',
        review: newReview,
      });
    } catch (error) {
      console.error('Error creating review:', error);
      return res.status(500).json({ message: 'Gagal membuat ulasan', error });
    }
  }

  // Mendapatkan semua ulasan untuk sebuah perusahaan
  async getReviewsByCompany(req: Request, res: Response) {
    const { company_id } = req.params;

    try {
      const reviews = await prisma.review.findMany({
        where: { company_id: Number(company_id) },
        select: {
          review_id: true,
          rating: true,
          comment: true,
          salary_estimate: true,
          position: true, // Mengambil `position` langsung dari model `Review`
          workCultureRating: true,
          workLifeBalanceRating: true,
          facilitiesRating: true,
          careerOpportunitiesRating: true,
          created_at: true,
          user: {
            select: {
              user_id: true, // Ambil atribut dari `User` jika diperlukan
              // tambahkan atribut lain dari `User` yang diperlukan
            },
          },
        },
      });

      res.json(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ message: 'Gagal mendapatkan ulasan', error });
    }
  }

  // Mendapatkan rata-rata rating untuk sebuah perusahaan
  async getAverageRatingByCompany(req: Request, res: Response) {
    const { company_id } = req.params;

    try {
      // Dapatkan semua rating untuk `company_id` tertentu
      const reviews = await prisma.review.findMany({
        where: { company_id: Number(company_id) },
        select: {
          rating: true,
        },
      });

      // Jika tidak ada ulasan, return 0 atau informasi bahwa belum ada rating
      if (reviews.length === 0) {
        return res.status(200).json({
          averageRating: 0,
          message: 'Belum ada ulasan untuk perusahaan ini',
        });
      }

      // Hitung rata-rata rating
      const totalRating = reviews.reduce(
        (sum, review) => sum + (review.rating ? review.rating.toNumber() : 0),
        0,
      );

      const averageRating =
        reviews.length > 0
          ? parseFloat((totalRating / reviews.length).toFixed(1))
          : 0;

      res
        .status(200)
        .json({ averageRating: parseFloat(averageRating.toFixed(1)) });
    } catch (error) {
      console.error('Error calculating average rating:', error);
      res
        .status(500)
        .json({ message: 'Gagal menghitung rata-rata rating', error });
    }
  }
}
