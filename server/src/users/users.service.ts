import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserEntity } from 'src/auth/types';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetPublicUserDTO } from './dto/get-public-user.dto';
import { UpdateProfileInfoDto } from './dto/update-profile-info.dto';
import { AuthResponseUserDTO } from 'src/auth/dto/auth-response-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getPublicUser(username: string) {
    const user = await this.prisma.users
      .findFirst({
        where: { username },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });

    if (user) return new GetPublicUserDTO(user);

    return null;
  }

  async getSingleUser(email: string) {
    const user = await this.prisma.users.findFirst({
      where: { email },
    });

    if (user) {
      return new UserEntity(user);
    } else {
      return null;
    }
  }

  async updateUser(body: UpdateUserDto, user) {
    return await this.prisma.users
      .update({
        where: {
          id: user.id,
        },
        data: {
          ...body,
        },
      })
      .then(async (result) => {
        if (
          result.username &&
          result.first_name &&
          result.last_name &&
          result.verified
        ) {
          return await this.prisma.users
            .update({
              where: { id: user.id },
              data: { account_status: 'active' },
            })
            .then((user) => {
              return user;
            })
            .catch((err) => {
              console.log(err);
              throw new InternalServerErrorException();
            });
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });
  }

  async updateProfile(body: UpdateProfileInfoDto, user) {
    return await this.prisma.users
      .update({
        where: {
          id: user.id,
        },
        data: {
          ...body,
        },
      })
      .then(async (result) => {
        return new AuthResponseUserDTO(result);
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });
  }

  async checkUsername(username: string) {
    const result = await this.prisma.users
      .findFirst({
        where: { username },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });

    if (result === null) {
      // Good; No user with that username found
      return true;
    } else {
      // Bad; Username already registered
      return false;
    }
  }

  async checkEmail(email: string) {
    const result = await this.prisma.users
      .findFirst({
        where: { email },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });

    if (result === null) {
      // Good; no user with that username found
      return true;
    } else {
      // Bad; Email already registered
      return false;
    }
  }

  async getDefaultBilling(user_id: string) {
    const billingInfo = await this.prisma.users.findFirst({
      where: { id: user_id },
      select: {
        billing_name: true,
        billing_address_1: true,
        billing_address_2: true,
        billing_city: true,
        billing_state: true,
        billing_zip: true,
      },
    });

    if (Object.values(billingInfo).every((x) => x === null || x === '')) {
      return null;
    }

    return billingInfo;
  }

  async getDefaultFFL(user_id: string) {
    const ffl = await this.prisma.users.findFirst({
      where: { id: user_id },
      select: {
        default_ffl: {
          select: {
            id: true,
            LICENSE_NAME: true,
            BUSINESS_NAME: true,
            PREMISE_STREET: true,
            PREMISE_CITY: true,
            PREMISE_STATE: true,
            PREMISE_ZIP_CODE: true,
            MAIL_STREET: true,
            MAIL_CITY: true,
            MAIL_STATE: true,
            MAIL_ZIP_CODE: true,
            VOICE_PHONE: true,
          },
        },
      },
    });

    if (ffl.default_ffl === null) return null;

    return ffl.default_ffl;
  }

  async updateDefaultFFL(ffl_id, user_id: string) {
    const updated_user = await this.prisma.users.update({
      where: { id: user_id },
      data: {
        default_ffl_id: ffl_id,
      },
      include: { default_ffl: true },
    });

    return updated_user.default_ffl;
  }

  async updateDefaultBilling(billing_info, user_id: string) {
    return await this.prisma.users.update({
      where: { id: user_id },
      data: {
        billing_name: billing_info.billing_name,
        billing_address_1: billing_info.billing_address_1,
        billing_address_2: billing_info.billing_address_2,
        billing_city: billing_info.billing_city,
        billing_state: billing_info.billing_state,
        billing_zip: billing_info.billing_zip,
      },
    });
  }
}
