import prisma from '@/prisma';
import { Request, Response } from 'express';
import { compare, genSalt, hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { transporter } from '@/helpers/notmailer';
import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';

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

      const existingUser = await prisma.user.findUnique({
        where: { email: email },
      });

      if (!existingUser) throw new Error('Account not found!');
      if (!existingUser.is_verified) throw new Error('Account not verified!');

      const isValidPass = await compare(password, existingUser.password);

      if (!isValidPass) throw new Error('Incorrect password!');

      const payload = {
        user_id: existingUser.user_id,
        role: existingUser.role,
      };
      const token = sign(payload, process.env.SECRET_JWT!, { expiresIn: '1d' });

      res.status(200).send({
        status: 'ok',
        msg: 'Login success!',
        token,
        user: existingUser,
      });
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err instanceof Error ? err.message : err,
      });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const user = await prisma.user.findMany();
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
        profile_picture,
        website,
        title,
        education,
        biography,
        location,
        skills,
        languages,
        nationality,
        gender,
        DateOfBirth,
        resume,
        years_of_experience,
      } = req.body;

      const userId = req.user?.user_id;

      if (!userId) throw new Error('Account not authenticated');

      // Retrieve the current user data
      const user = await prisma.user.findUnique({ where: { user_id: userId } });
      if (!user) throw new Error('Account not found');

      // Check if the user wants to update the password
      let hashedPassword;
      if (Newpassword) {
        // Ensure the user provided the current password
        if (!currentPassword) {
          return res.status(400).send({
            status: 'error',
            msg: 'Current password is required to update the password.',
          });
        }

        // Verify the current password matches the stored password
        const isPasswordValid = await compare(currentPassword, user.password);
        if (!isPasswordValid) {
          return res.status(400).send({
            status: 'error',
            msg: 'Current password is incorrect.',
          });
        }

        // Ensure the new password and confirmation match
        if (Newpassword !== Confirmpassword) {
          return res.status(400).send({
            status: 'error',
            msg: 'New password and confirmation password do not match.',
          });
        }

        // If the current password is correct, hash the new password
        hashedPassword = await hash(Newpassword, await genSalt(10));
      }

      const updatedUser = await prisma.user.update({
        where: { user_id: userId },
        data: {
          first_name,
          last_name,
          phone,
          email,
          profile_picture,
          website,
          title,
          education,
          biography,
          location,
          skills,
          languages,
          nationality,
          gender,
          DateOfBirth,
          resume,
          years_of_experience,
          ...(hashedPassword && { password: hashedPassword }), // Update the password if provided
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

      const templatePath = path.join(__dirname, '../templates', 'verification.hbs');
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

}
