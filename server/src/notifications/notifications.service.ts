import {
  Global,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { formatter } from 'src/util/currencyFormatter';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async getNotifications(user_id) {
    return this.prisma.notifications
      .findMany({
        where: { user_id },
        orderBy: { created_date: 'desc' },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });
  }

  async createNotification(
    user_id: string,
    title: string,
    description: string,
    reference?: string,
    status?: 'read' | 'unread',
    urgent?: boolean,
  ) {
    await this.prisma.notifications
      .create({
        data: {
          user_id,
          status,
          title,
          description,
          reference,
          urgent,
        },
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return true;
  }

  async setNotificationRead(notificationID) {
    this.prisma.notifications
      .update({
        where: { id: notificationID },
        data: {
          status: 'read',
        },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });
  }

  async getNotificationCount(user_id) {
    return await this.prisma.notifications
      .count({
        where: { user_id, status: 'unread' },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });
  }

  // NOTIFICATION TYPES
  async createOfferNotification(
    user_id: string,
    offerAmount: number,
    listingTitle: string,
  ) {
    const title = 'You received an offer!';
    const description = `You've received an offer of ${formatter.format(
      offerAmount,
    )} on your listing "${listingTitle}"!`;
    const urgent = false;
    const reference = '/account/offers';
    await this.prisma.notifications
      .create({
        data: {
          user_id,
          title,
          description,
          reference,
          urgent,
        },
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return true;
  }

  async createSimpleNotification(
    user_id: string,
    title: string,
    description: string,
  ) {
    await this.prisma.notifications
      .create({
        data: {
          user_id,
          title,
          description,
        },
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return true;
  }
}
