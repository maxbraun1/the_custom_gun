import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import validator from 'validator';
import { UserEntity } from './types';
import { EmailService } from 'src/email/email.service';
import { AuthResponseUserDTO } from './dto/auth-response-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.users.findFirst({
      where: { email },
    });
    if (user === null) return null;
    if (user.password && (await bcrypt.compare(password, user.password))) {
      // user was found and password is correct
      await this.prisma.users.update({
        where: { email },
        data: { last_sign_in: new Date() },
      });
      return user;
    } else {
      // user not found or password incorrect
      return null;
    }
  }

  async validateUserGoogle(userInfo: {
    email: string;
    googleID: string;
    first: string;
    last: string;
  }) {
    const user = await this.prisma.users
      .findFirst({
        where: {
          email: userInfo.email,
        },
      })
      .catch((err) => {
        console.log(err);
        throw new HttpException(
          'There was in issue while signing in.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    if (user) {
      await this.prisma.users.update({
        where: { email: user.email },
        data: { last_sign_in: new Date() },
      });

      return new UserEntity(user);
    }

    // GOOGLE USER SIGN UP
    const newUser = await this.prisma.users
      .create({
        data: {
          email: userInfo.email,
          first_name: userInfo.first,
          last_name: userInfo.last,
          google_id: userInfo.googleID,
          provider: 'google',
          verified: true,
        },
      })
      .catch((err) => {
        console.log(err);
        throw new HttpException(
          'There was in issue while signing in.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    this.emailService.addUser(user.email, user.first_name, user.last_name);
    this.emailService.sendWelcomeEmail(user.email);

    return new UserEntity(newUser);
  }

  async registerUser(email: string, password: string) {
    // Validate user info
    if (
      validator.isEmail(email) &&
      RegExp('^(?=.*[A-Za-z])(?=.*\\d).{6,}$').test(password) // at least 6 characters, at least one letter and at least one number
    ) {
      // Valid

      // Check if user account already exists
      const existingUser = await this.prisma.users.findFirst({
        where: {
          email: email,
        },
      });

      if (!existingUser) {
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        if (!hash) {
          return new HttpException(
            'Server Error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
        // Store user in DB
        const user = await this.prisma.users.create({
          data: {
            provider: 'local',
            email: email,
            password: hash,
          },
        });
        await this.createVerificationEmail(user.id, user.email);
        return new UserEntity(user);
      } else {
        return new BadRequestException(
          'A user with that email address already exists.',
        );
      }
    } else {
      // Invalid
      return new HttpException(
        'Invalid email or password provided.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async verifyEmail(code, user_id) {
    const verification = await this.prisma.email_verifications.findFirst({
      where: { code, user_id },
    });

    let user = null;

    if (verification) {
      user = await this.prisma.users.update({
        where: { id: user_id },
        data: { verified: true },
      });

      if (user.first_name && user.last_name && user.username) {
        await this.prisma.users.update({
          where: { id: user_id },
          data: { account_status: 'active' },
        });
      }
    }

    if (verification) {
      return { error: false, user };
    } else {
      return { error: true };
    }
  }

  async createVerificationEmail(user_id: string, email: string) {
    // Delete any verifcations that may exist for user
    await this.prisma.email_verifications
      .deleteMany({
        where: { user_id },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });

    // create new verification
    const code = Math.floor(Math.random() * 90000) + 10000;
    const newEmailVerification = await this.prisma.email_verifications
      .create({
        data: {
          user_id,
          code,
        },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });

    // Send verification email
    await this.emailService.sendVerificationEmail(
      newEmailVerification.code,
      email,
    );

    return true;
  }

  async finishSignup(
    first_name: string,
    last_name: string,
    username: string,
    user_id: string,
  ) {
    const user = await this.prisma.users
      .update({
        where: { id: user_id },
        data: {
          first_name,
          last_name,
          username,
          account_status: 'active',
        },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });

    this.emailService.addUser(user.email, user.first_name, user.last_name);
    this.emailService.sendWelcomeEmail(user.email);

    return user;
  }

  async getUser(user_id: string) {
    const user = await this.prisma.users.findFirst({
      where: { id: user_id },
    });

    return new AuthResponseUserDTO(user);
  }

  async checkPassword(password, user_id) {
    const user = await this.prisma.users
      .findFirst({
        where: { id: user_id },
        select: { password: true },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });

    if (!user) return false;

    return await bcrypt.compare(password, user.password);
  }

  async resetPassword(currentPassword, newPassword, user_id) {
    if (!(await this.checkPassword(currentPassword, user_id))) {
      throw new BadRequestException();
    }

    const saltRounds = 10;
    const hash = await bcrypt.hash(newPassword, saltRounds);
    if (!hash) {
      return new HttpException(
        'Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    // Update Password
    await this.prisma.users
      .update({
        where: { id: user_id },
        data: {
          password: hash,
        },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });

    return true;
  }

  async resetPasswordExternal(code, password) {
    // TODO: Check if reset code is old
    const reset_code = await this.prisma.password_reset_codes
      .findFirst({
        where: { id: code },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });

    if (!reset_code)
      return { error: true, message: 'Invalid password reset code.' };

    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    if (!hash) {
      return new HttpException(
        'Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    // Update Password
    await this.prisma.users
      .update({
        where: { id: reset_code.user_id },
        data: {
          password: hash,
        },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });

    // Delete reset code
    this.prisma.password_reset_codes
      .delete({
        where: { id: code },
      })
      .catch((err) => {
        console.log(err);
      });

    // TODO: Send email to user about password reset

    return { error: false };
  }

  async sendPasswordResetEmail(email: string) {
    const user = await this.prisma.users
      .findFirst({
        where: { email },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });

    if (!user) {
      return {
        error: true,
        message: 'This email address is not associated with an active account.',
      };
    }
    if (user.provider !== 'local') {
      return { error: true, message: "This user's password cannot be reset." };
    }

    // delete previous reset codes
    await this.prisma.password_reset_codes.deleteMany({
      where: { user_id: user.id },
    });

    // generate reset code
    const reset_code = await this.prisma.password_reset_codes
      .create({
        data: {
          user_id: user.id,
        },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });

    // Send Reset Email
    await this.emailService.sendPasswordResetEmail(reset_code.id, user.email);

    return true;
  }
}
