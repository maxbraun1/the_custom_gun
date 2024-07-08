import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { feeCalculator } from 'src/util/feeCalculator';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async getOrders(user_id: string) {
    return await this.prisma.orders
      .findMany({
        where: { buyer_user_id: user_id },
        include: {
          listing: {
            include: { thumbnail: true, user: true },
          },
        },
        orderBy: { date: 'desc' },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });
  }

  async getSoldOrders(user_id: string) {
    return await this.prisma.orders
      .findMany({
        where: { seller_user_id: user_id },
        include: {
          buyer: { select: { username: true, email: true } },
          listing: {
            include: { thumbnail: true },
          },
        },
        orderBy: { date: 'desc' },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });
  }

  async getOrder(user_id: string, number: number) {
    return await this.prisma.orders
      .findFirst({
        where: { buyer_user_id: user_id, number },
        include: {
          listing: {
            select: {
              title: true,
              thumbnail: true,
              ref: true,
              user: { select: { username: true } },
            },
          },
          ship_to_ffl: true,
        },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });
  }

  async getSoldOrder(user_id: string, number: number) {
    return await this.prisma.orders
      .findFirst({
        where: { seller_user_id: user_id, number },
        include: {
          listing: {
            select: {
              title: true,
              thumbnail: true,
              ref: true,
              user: { select: { username: true } },
            },
          },
          ship_to_ffl: true,
        },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });
  }

  async createOrder(
    listing_id: string,
    buyer_user_id: string,
    item_price: number,
    shippingCharge: number,
    quantity?: number,
  ) {
    const { total, subtotal, fees } = feeCalculator(
      item_price,
      quantity || 1,
      shippingCharge,
    );

    const quantityClause = quantity ? { quantity: quantity } : {};

    const listing = await this.prisma.listings.findFirst({
      where: { id: listing_id },
      select: { id: true, user_id: true, listing_type: true },
    });

    const order = await this.prisma.orders
      .create({
        data: {
          listing_id,
          buyer_user_id,
          seller_user_id: listing.user_id,
          price_per_item: item_price,
          total: total,
          subtotal: subtotal,
          fees: fees,
          shipping_price: shippingCharge,
          ...quantityClause,
        },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });

    if (listing.listing_type === 'fixed') {
      this.prisma.listings.update({
        where: { id: listing.id },
        data: { quantity: { decrement: quantity } },
      });
    }

    return order;
  }

  async updateOrder(user_id: string, order) {
    return await this.prisma.orders
      .update({
        where: { buyer_user_id: user_id, number: order.number },
        data: {},
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });
  }

  async markOrderShipped(
    order_number: number,
    user_id: string,
    tracking_number?: string,
  ) {
    await this.prisma.orders.update({
      where: {
        number: order_number,
        seller_user_id: user_id,
      },
      data: {
        is_shipped: true,
        status: 'shipped',
        tracking_number: tracking_number,
      },
    });

    // TODO: Create notification and send email to buyer
  }
}
