import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FeedbackService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserFeedback(username: string) {
    const user = await this.prisma.users.findFirst({
      where: { username },
    });

    if (!user) return null;

    const feedback = await this.prisma.feedback.findMany({
      where: { seller_id: user.id },
      include: { buyer: { select: { username: true } } },
    });

    return { feedback, rating: user.rating.toNumber() };
  }

  async createFeedback(feedback, user_id) {
    const order = await this.prisma.orders.findFirst({
      where: {
        number: Number(feedback.orderNumber),
        buyer_user_id: user_id,
        feedback_submitted: false,
      },
      include: { listing: { select: { user: { select: { id: true } } } } },
    });

    if (!order) return false;

    await this.prisma.feedback.create({
      data: {
        order_id: order.id,
        score: feedback.score,
        message: feedback.message,
        seller_id: order.listing.user.id,
        buyer_id: user_id,
      },
    });

    await this.prisma.orders.update({
      where: { id: order.id },
      data: { feedback_submitted: true },
    });

    // Update users rating based on new rating

    const userFeedbackScores = await this.prisma.feedback.findMany({
      where: { seller_id: order.listing.user.id },
      select: { score: true },
    });

    const user = await this.prisma.users.findFirst({
      where: { id: order.listing.user.id },
      select: { rating: true },
    });

    userFeedbackScores.push({ score: feedback.score });

    const userCurrentRating = user.rating.toNumber();

    let total = 0;
    userFeedbackScores.map((item) => {
      total = total + item.score;
    });

    const newRating = total / userFeedbackScores.length;

    await this.prisma.users.update({
      where: { id: order.listing.user.id },
      data: { rating: newRating },
    });

    return true;
  }
}
