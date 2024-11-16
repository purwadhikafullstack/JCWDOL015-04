import prisma from '@/prisma';
import { Request, Response } from 'express';
import { compare, genSalt, hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { transporter } from '@/helpers/notmailer';
import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
import { EducationLevel, Gender } from '@prisma/client';

export class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { first_name, last_name, email, password, role } = req.body;

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res
          .status(400)
          .json({ status: 'error', msg: 'Email already in use!' });
      }

      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);

      const newUser = await prisma.user.create({
        data: {
          first_name,
          last_name,
          email,
          password: hashedPassword,
          role,
          is_verified: false,
        },
      });

      const payload = { id: newUser.user_id };
      const token = sign(payload, process.env.SECRET_JWT!, {
        expiresIn: '60m',
      });

      const templatePath = path.join(
        __dirname,
        '../templates',
        'verification.hbs',
      );
      const templateSource = fs.readFileSync(templatePath, 'utf-8');
      const compiledTemplate = handlebars.compile(templateSource);
      const emailHtml = compiledTemplate({
        name: newUser.first_name + ' ' + newUser.last_name,
        link: `http://localhost:3000/verify/${token}`,
      });

      // Send verification email
      await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: newUser.email,
        subject: 'Verify Your HireMe Account',
        html: emailHtml,
      });

      // Respond with success
      res.status(201).json({
        status: 'ok',
        msg: 'Account created successfully! Please verify your email!',
        user: newUser,
      });
    } catch (err) {
      console.error('Error during registration:', err);
      res.status(400).json({
        status: 'error',
        msg: 'An error occurred during user registration.',
      });
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Mencari user berdasarkan email
      const existingUser = await prisma.user.findUnique({
        where: { email: email },
        select: {
          user_id: true,
          role: true,
          is_verified: true,
          password: true,
        },
      });

      if (!existingUser) throw new Error('Account not found!');
      if (!existingUser.is_verified) throw new Error('Account not verified!');

      // Verifikasi password
      const isValidPass = await compare(password, existingUser.password);
      if (!isValidPass) throw new Error('Incorrect password!');

      // Mendapatkan `company_id` pertama yang terkait dengan user ini (jika ada)
      const userCompanies = await prisma.company.findFirst({
        where: {
          users: {
            some: {
              user_id: existingUser.user_id,
            },
          },
        },
        select: {
          company_id: true,
        },
      });

      // Membuat payload token dengan `company_id` opsional
      const payload: { user_id: number; role: string; company_id?: number } = {
        user_id: existingUser.user_id,
        role: existingUser.role,
      };

      if (userCompanies?.company_id) {
        payload.company_id = userCompanies.company_id;
      }

      // Membuat token JWT
      const token = sign(payload, process.env.SECRET_JWT!, { expiresIn: '1d' });

      // Menghapus password dari response
      const { password: _, ...userWithoutPassword } = existingUser;

      res.status(200).send({
        status: 'ok',
        msg: 'Login success!',
        token,
        user: userWithoutPassword,
      });
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err instanceof Error ? err.message : String(err),
      });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const user = await prisma.user.findMany({
        select: {
          user_id: true,
          first_name: true,
          last_name: true,
          email: true,
          profile_picture: true,
          role: true,
        },
      });
      res.status(200).send({
        status: 'ok',
        msg: 'Account fetched!',
        user,
      });
    } catch (err) {
      console.error(err);
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async getUserId(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id, 10);
      if (isNaN(userId)) {
        return res.status(400).send({
          status: 'error',
          msg: 'Invalid user ID',
        });
      }

      const user = await prisma.user.findUnique({
        where: { user_id: userId },
      });

      if (!user) {
        return res.status(404).send({
          status: 'error',
          msg: 'Account not found!',
        });
      }

      res.status(200).send({
        status: 'ok',
        msg: 'Account fetched!',
        user,
      });
    } catch (err) {
      console.error('Error fetching user:', err);
      res.status(500).send({
        status: 'error',
        msg: 'Internal server error',
        error: err || err,
      });
    }
  }

  async verifyUser(req: Request, res: Response) {
    try {
      const token =
        typeof req.query.token === 'string'
          ? req.query.token
          : req.header('Authorization')?.replace('Bearer ', '');

      if (!token) {
        return res.status(400).send({
          status: 'error',
          msg: 'Token is missing',
        });
      }

      const decoded = verify(token, process.env.SECRET_JWT!) as unknown as {
        id: number;
      };
      const userId = decoded.id;

      const user = await prisma.user.findUnique({
        where: { user_id: userId },
      });

      if (!user) {
        return res.status(404).send({
          status: 'error',
          msg: 'User not found.',
        });
      }

      if (user.is_verified) {
        return res.status(400).send({
          status: 'error',
          msg: 'User is already verified.',
        });
      }

      await prisma.user.update({
        where: { user_id: userId },
        data: { is_verified: true },
      });

      res.status(200).send({
        status: 'ok',
        msg: 'Account successfully verified!',
      });
    } catch (err) {
      console.error('Verification Error:', err);
      res.status(400).send({
        status: 'error',
        msg: 'Invalid or expired verification token',
      });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const {
        first_name,
        last_name,
        phone,
        email,
        currentPassword,
        Newpassword,
        Confirmpassword,
        website,
        linkedin,
        github,
        twitter,
        facebook,
        instagram,
        title,
        education,
        biography,
        location,
        skills,
        languages,
        nationality,
        gender,
        country,
        tempat_lahir,
        DateOfBirth,
        years_of_experience,
      } = req.body;

      // Access the uploaded profile picture file path
      const profilePictureUrl = req.file
        ? `http://localhost:8000/api/public/profile_pictures/${req.file.filename}`
        : undefined;

      const userId = req.user?.user_id;
      if (!userId) throw new Error('Account not authenticated');

      const user = await prisma.user.findUnique({ where: { user_id: userId } });
      if (!user) throw new Error('Account not found');

      let hashedPassword;
      if (Newpassword) {
        if (!currentPassword) {
          return res.status(400).send({
            status: 'error',
            msg: 'Current password is required to update the password.',
          });
        }

        const isPasswordValid = await compare(currentPassword, user.password);
        if (!isPasswordValid) {
          return res.status(400).send({
            status: 'error',
            msg: 'Current password is incorrect.',
          });
        }

        if (Newpassword !== Confirmpassword) {
          return res.status(400).send({
            status: 'error',
            msg: 'New password and confirmation password do not match.',
          });
        }

        hashedPassword = await hash(Newpassword, await genSalt(10));
      }

      const yearsOfExperienceInt = years_of_experience
        ? parseInt(years_of_experience, 10)
        : undefined;

      const parsedDateOfBirth = DateOfBirth ? new Date(DateOfBirth) : undefined;

      const updatedUser = await prisma.user.update({
        where: { user_id: userId },
        data: {
          first_name,
          last_name,
          phone,
          email,
          profile_picture: profilePictureUrl,
          website,
          linkedin,
          github,
          twitter,
          facebook,
          instagram,
          title,
          education,
          biography,
          location,
          skills,
          languages,
          nationality,
          gender,
          DateOfBirth: parsedDateOfBirth,
          years_of_experience: yearsOfExperienceInt,
          ...(hashedPassword && { password: hashedPassword }),
        },
      });

      res.status(200).send({
        status: 'ok',
        msg: 'Account information updated successfully!',
        user: updatedUser,
      });
    } catch (err) {
      console.error('Update Error:', err);
      res.status(400).send({
        status: 'error',
        msg: 'An error occurred while updating user information',
      });
    }
  }

  async resendVerificationLink(req: Request, res: Response) {
    try {
      const { email } = req.body;

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(404).json({
          status: 'error',
          msg: 'User not found!',
        });
      }

      if (user.is_verified) {
        return res.status(400).json({
          status: 'error',
          msg: 'User is already verified.',
        });
      }

      const payload = { id: user.user_id };
      const token = sign(payload, process.env.SECRET_JWT!, {
        expiresIn: '60m',
      });

      const templatePath = path.join(
        __dirname,
        '../templates',
        'verification.hbs',
      );
      const templateSource = fs.readFileSync(templatePath, 'utf-8');
      const compiledTemplate = handlebars.compile(templateSource);

      const emailHtml = compiledTemplate({
        name: user.first_name + ' ' + user.last_name,
        link: `http://localhost:3000/verify/${token}`,
      });

      await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: user.email,
        subject: 'Resend Verification - Verify Your HireMe Account',
        html: emailHtml,
      });

      res.status(200).json({
        status: 'ok',
        msg: 'Verification link resent successfully!',
      });
    } catch (err) {
      console.error('Resend Verification Error:', err);
      res.status(500).json({
        status: 'error',
        msg: 'An error occurred while resending verification link.',
      });
    }
  }

  async requestPasswordReset(req: Request, res: Response) {
    try {
      const { email } = req.body;

      // Check if user exists
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res
          .status(404)
          .json({ status: 'error', msg: 'User not found!' });
      }

      // Generate a reset token that expires in 15 minutes
      const payload = { id: user.user_id };
      const resetToken = sign(payload, process.env.SECRET_JWT!, {
        expiresIn: '15m',
      });

      // Create reset link
      const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

      const templatePath = path.join(
        __dirname,
        '../templates',
        'resetPassword.hbs',
      );
      const templateSource = fs.readFileSync(templatePath, 'utf-8');
      const compiledTemplate = handlebars.compile(templateSource);

      const emailHtml = compiledTemplate({
        name: user.first_name + ' ' + user.last_name,
        link: resetLink,
      });

      // Send email
      await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Password Reset Request',
        html: emailHtml,
      });

      res.status(200).json({ status: 'ok', msg: 'Password reset link sent!' });
    } catch (err) {
      console.error('Password Reset Request Error:', err);
      res.status(500).json({
        status: 'error',
        msg: 'An error occurred during password reset request.',
      });
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const { token, newPassword, confirmNewPassword } = req.body;

      if (newPassword !== confirmNewPassword) {
        return res
          .status(400)
          .json({ status: 'error', msg: 'Passwords do not match' });
      }

      // Verify the token
      const decoded = verify(token, process.env.SECRET_JWT!) as { id: number };

      // Fetch the user using decoded token data
      const user = await prisma.user.findUnique({
        where: { user_id: decoded.id },
      });
      if (!user) {
        return res
          .status(404)
          .json({ status: 'error', msg: 'User not found!' });
      }

      // Hash the new password
      const salt = await genSalt(10);
      const hashedPassword = await hash(newPassword, salt);

      // Update user password and respond
      await prisma.user.update({
        where: { user_id: user.user_id },
        data: { password: hashedPassword },
      });

      res
        .status(200)
        .json({ status: 'ok', msg: 'Password has been reset successfully!' });
    } catch (err) {
      console.error('Password Reset Error:', err);
      res
        .status(400)
        .json({ status: 'error', msg: 'Invalid or expired token' });
    }
  }

  async socialLogin(req: Request, res: Response) {
    const { email, first_name, last_name, profile_picture } = req.body;

    try {
      // Check if the user already exists in the MySQL database
      let user = await prisma.user.findUnique({
        where: { email },
      });

      // If the user does not exist, create a new one
      if (!user) {
        user = await prisma.user.create({
          data: {
            email,
            first_name,
            last_name,
            profile_picture,
            is_verified: true,
            password: '', // Social login users won't have a password set
            role: 'candidate', // Assign default role or customize as needed
          },
        });
      }

      // Generate JWT token for the session
      const payload = { user_id: user.user_id, role: user.role };
      const token = sign(payload, process.env.SECRET_JWT!, { expiresIn: '1d' });

      // Return the user data and token
      res.status(200).json({
        status: 'ok',
        msg: 'Social login successful',
        token,
        user,
      });
    } catch (error) {
      console.error('Error in social login:', error);
      res.status(500).json({
        status: 'error',
        msg: 'Internal server error during social login',
      });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(404).json({
          status: 'error',
          msg: 'User not found!',
        });
      }

      const isPasswordValid = await compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({
          status: 'error',
          msg: 'Incorrect password provided!',
        });
      }

      await prisma.user.delete({
        where: { user_id: user.user_id },
      });

      res.status(200).json({
        status: 'ok',
        msg: 'Account deleted successfully!',
      });
    } catch (err) {
      console.error('Delete Account Error:', err);
      res.status(500).json({
        status: 'error',
        msg: 'Failed to delete account. Please try again.',
      });
    }
  }

  async getUserSubscriptions(req: Request, res: Response) {
    const user_id = req.user?.user_id;
    console.log('User ID in getUserSubscriptions:', req.user?.user_id);


    try {
      const subscriptions = await prisma.subscription.findMany({
        where: { user_id },
        include: { subscriptionType: true },
      });

      res.status(200).json({
        status: 'success',
        data: subscriptions,
      });
    } catch (error: any) {
      console.error('Error fetching subscriptions:', error);
      res.status(500).json({
        status: 'error',
        msg: 'Failed to fetch subscriptions',
        error: error.message,
      });
    }
  }

  // Mendapatkan Riwayat Pembayaran Berdasarkan user_id
  async getUserPayments(req: Request, res: Response) {
    const user_id = req.user?.user_id; 

    try {
      const payments = await prisma.paymentTransaction.findMany({
        where: { user_id },
      });

      res.status(200).json({
        status: 'success',
        data: payments,
      });
    } catch (error: any) {
      console.error('Error fetching payments:', error);
      res.status(500).json({
        status: 'error',
        msg: 'Failed to fetch payments',
        error: error.message,
      });
    }
  }
}
