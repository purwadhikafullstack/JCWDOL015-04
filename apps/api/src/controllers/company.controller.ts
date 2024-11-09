import prisma from '@/prisma';
import { $Enums, CountryCode, IndustryType, Prisma } from '@prisma/client';
import { Request, Response } from 'express';

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
        ? `http://localhost:8000/api/public/company_logos/${req.files.logo[0].filename}`
        : null;

      const bannerUrl = req.files?.banner?.[0]
        ? `http://localhost:8000/api/public/company_banners/${req.files.banner[0].filename}`
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
        yearOfEstablish: yearOfEstablish ? new Date(yearOfEstablish) : null,
        IndustryType,
        TeamSize: TeamSize ? parseInt(TeamSize, 10) : null,
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
      console.error('Error creating company:', err);
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
        ? `http://localhost:8000/api/public/company_logos/${req.files.logo[0].filename}`
        : undefined;

      const bannerUrl = req.files?.banner?.[0]
        ? `http://localhost:8000/api/public/company_banners/${req.files.banner[0].filename}`
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
          yearOfEstablish: yearOfEstablish ? new Date(yearOfEstablish) : null,
          IndustryType,
          TeamSize: TeamSize ? parseInt(TeamSize, 10) : null,
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
      console.error('Update Company Error:', err);
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
      console.error('Error fetching companies:', err);
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
  
      // Search filter across multiple fields, including IndustryType
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
  
      // Industry filter (separate from search)
      if (IndustryType) {
        const industryArray = Array.isArray(IndustryType)
          ? IndustryType
          : [IndustryType];
        filter.IndustryType = { in: industryArray as $Enums.IndustryType[] };
      }
  
      // Country filter
      if (country) {
        filter.country = country as $Enums.CountryCode;
      }
  
      // Team size filter
      if (TeamSize) {
        filter.TeamSize = { equals: parseInt(TeamSize as string, 10) };
      }
  
      // Order companies by creation date
      const orderBy: Prisma.CompanyOrderByWithRelationInput = {
        created_at: dateRange === 'latest' ? 'desc' : 'asc',
      };
  
      // Fetch companies with applied filters and ordering
      const companies = await prisma.company.findMany({
        where: filter,
        orderBy,
      });
  
      res.status(200).json({ status: 'ok', companies });
    } catch (error) {
      console.error('Error fetching companies:', error);
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
      console.error('Error fetching company:', err);
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
      console.error('Error deleting company:', err);
      res.status(400).json({
        status: 'error',
        msg: 'An error occurred while deleting the company.',
      });
    }
  }
}
