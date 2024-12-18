import prisma from '@/prisma';
import { $Enums, CountryCode, IndustryType, Prisma } from '@prisma/client';
import { Request, Response } from 'express';

export const base_url = process.env.BASE_API_URL


export class CompanyController {
  async createCompany(req: Request, res: Response) {
    try {
      const {
        company_name,
        email,
        phone,
        aboutUs,
        website,
        linkedin,
        instagram,
        twitter,
        facebook,
        yearOfEstablish,
        IndustryType,
        TeamSize,
        country,
        address,
        description,
      } = req.body;

      const logoUrl = req.files?.logo?.[0]
        ? `${base_url}/public/company_logos/${req.files.logo[0].filename}`
        : null;

      const bannerUrl = req.files?.banner?.[0]
        ? `${base_url}/public/company_banners/${req.files.banner[0].filename}`
        : null;

      const userId = req.user?.user_id;

      if (!company_name || !email || !userId) {
        return res.status(400).json({
          status: 'error',
          msg: 'company name, email, and user ID are required',
        });
      }

      const companyData: Prisma.CompanyCreateInput = {
        company_name,
        email,
        phone,
        aboutUs,
        website,
        linkedin,
        instagram,
        twitter,
        facebook,
        yearOfEstablish,
        IndustryType,
        TeamSize,
        country,
        address,
        description,
        logo: logoUrl,
        banner: bannerUrl,
        users: { connect: { user_id: userId } },
      };

      const company = await prisma.company.create({ data: companyData });

      res
        .status(201)
        .json({ status: 'ok', msg: 'Company created successfully!', company });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        msg: 'An error occurred while creating the company.',
      });
    }
  }

  async updateCompany(req: Request, res: Response) {
    try {
      const {
        company_name,
        email,
        phone,
        aboutUs,
        website,
        linkedin,
        instagram,
        twitter,
        facebook,
        yearOfEstablish,
        IndustryType,
        TeamSize,
        country,
        address,
        description,
      } = req.body;

      const logoUrl = req.files?.logo?.[0]
        ? `${base_url}/public/company_logos/${req.files.logo[0].filename}`
        : undefined;

      const bannerUrl = req.files?.banner?.[0]
        ? `${base_url}/public/company_banners/${req.files.banner[0].filename}`
        : undefined;
      const updatedCompany = await prisma.company.update({
        where: { company_id: parseInt(req.params.id) },
        data: {
          company_name,
          email,
          phone,
          aboutUs,
          website,
          linkedin,
          instagram,
          twitter,
          facebook,
          yearOfEstablish,
          IndustryType,
          TeamSize,
          country,
          address,
          description,
          ...(logoUrl && { logo: logoUrl }),
          ...(bannerUrl && { banner: bannerUrl }),
        },
      });

      res.status(200).json({
        status: 'ok',
        msg: 'Company updated successfully!',
        company: updatedCompany,
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        msg: 'An error occurred while updating company information',
      });
    }
  }

  async getAllCompanies(req: Request, res: Response) {
    try {
      const companies = await prisma.company.findMany();
      res.status(200).json({ status: 'ok', companies });
    } catch (err) {
      res.status(400).json({
        status: 'error',
        msg: 'An error occurred while fetching companies.',
      });
    }
  }

  async getCompanies(req: Request, res: Response) {
    try {
      const { search, IndustryType, country, TeamSize, dateRange } = req.query;
  
      const filter: Prisma.CompanyWhereInput = {};
  
      if (typeof search === 'string') {
        const lowerSearch = search.toLowerCase();
        filter.OR = [
          { company_name: { contains: lowerSearch } },
          { address: { contains: lowerSearch } },
          { aboutUs: { contains: lowerSearch } },
          { website: { contains: lowerSearch } },
          { linkedin: { contains: lowerSearch } },
          { instagram: { contains: lowerSearch } },
          { twitter: { contains: lowerSearch } },
          { facebook: { contains: lowerSearch } },
          { description: { contains: lowerSearch } },
        ];
      }
  
      if (IndustryType) {
        const industryArray = Array.isArray(IndustryType)
          ? IndustryType
          : [IndustryType];
        filter.IndustryType = { in: industryArray as $Enums.IndustryType[] };
      }
  
      if (country) {
        filter.country = country as $Enums.CountryCode;
      }
  
      if (TeamSize) {
        filter.TeamSize};
  
      const orderBy: Prisma.CompanyOrderByWithRelationInput = {
        created_at: dateRange === 'latest' ? 'desc' : 'asc',
      };
  
      const companies = await prisma.company.findMany({
        where: filter,
        orderBy,
      });
  
      res.status(200).json({ status: 'ok', companies });
    } catch (error) {
      res
        .status(500)
        .json({ status: 'error', message: 'Failed to fetch companies' });
    }
  }

  async getCompanyById(req: Request, res: Response) {
    try {
      const companyId = parseInt(req.params.id, 10);
      const company = await prisma.company.findUnique({
        where: { company_id: companyId },
        include: { jobs: true },
      });

      if (!company) {
        return res
          .status(404)
          .json({ status: 'error', msg: 'Company not found.' });
      }

      res.status(200).json({ status: 'ok', company });
    } catch (err) {
      res.status(400).json({
        status: 'error',
        msg: 'An error occurred while fetching the company.',
      });
    }
  }

  async deleteCompany(req: Request, res: Response) {
    try {
      const companyId = parseInt(req.params.id, 10);
      await prisma.company.delete({ where: { company_id: companyId } });
      res
        .status(200)
        .json({ status: 'ok', msg: 'Company deleted successfully!' });
    } catch (err) {
      res.status(400).json({
        status: 'error',
        msg: 'An error occurred while deleting the company.',
      });
    }
  }

  async getUserCompany(req: Request, res: Response) {
    try {
      const userId = req.user?.user_id;

      if (!userId) {
        return res.status(400).json({
          status: 'error',
          msg: 'User ID not found. Please log in.',
        });
      }

      // Fetch companies associated with the authenticated user
      const company = await prisma.company.findFirst({
        where: {
          users: {
            some: {
              user_id: userId, // User associated with the company
            },
          },
        },
        include: {
          users: true,  // You can include more relations if necessary
        },
      });

      if (!company) {
        return res.status(404).json({
          status: 'error',
          msg: 'No company found for the authenticated user.',
        });
      }

      // Return the company data
      res.status(200).json({
        status: 'ok',
        company,
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        msg: 'An error occurred while fetching company information.',
      });
    }
  }
}
