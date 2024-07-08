import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OfferEntity } from './offer.entity';
import { NotificationsService } from 'src/notifications/notifications.service';
import { formatter } from 'src/util/currencyFormatter';
import { OrdersService } from 'src/orders/orders.service';
import { CreateOfferDTO } from './dto/create-offer.dto';

@Injectable()
export class OffersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService,
    private readonly ordersService: OrdersService,
  ) {}

  async createOffer(offer: CreateOfferDTO, user_id: string) {
    const listing = await this.prisma.listings.findFirst({
      where: { id: offer.listing_id },
    });

    const offers = await this.prisma.offers.findMany({
      where: { listing_id: offer.listing_id, buyer_id: user_id },
    });

    if (offers.length > 0)
      return {
        error: true,
        message: 'You have already made an offer on this listing.',
      };

    if (!listing.accept_offers)
      return { error: true, message: 'This listing does not accept offers.' };

    if (listing.status !== 'active')
      return { error: true, message: 'This listing is no longer active.' };

    if (offer.amount < 1)
      return {
        error: true,
        message: 'Offer must be greater than or equal to $1',
      };

    if (offer.quantity > listing.quantity) {
      return {
        error: true,
        message: 'Offer quantity higher than listing available quantity.',
      };
    }

    if (offer.amount > listing.price.toNumber() - 1)
      return {
        error: true,
        message: 'Offer cannot be greater than or equal to listing price.',
      };

    const newOffer = await this.prisma.offers.create({
      data: { ...offer, buyer_id: user_id, seller_id: listing.user_id },
    });

    // Send listing owner a notification about the offer
    this.notificationsService.createOfferNotification(
      listing.user_id,
      newOffer.amount.toNumber(),
      listing.title,
    );

    return new OfferEntity(newOffer);
  }

  async getUserOffers(
    user_id: string,
    per: number,
    page: number,
    status: string | null,
  ) {
    if (!page) page = 1;
    if (!per) per = 10;
    const skip = (page - 1) * per;

    // determine offer status to sort by
    let statusClause = {};
    if (status === 'any' || !status) statusClause = {};
    if (status === 'pending') statusClause = { accepted: null };
    if (status === 'accepted') statusClause = { accepted: true };
    if (status === 'rejected') statusClause = { accepted: false };

    const count = await this.prisma.offers.count({
      where: { seller_id: user_id, ...statusClause },
    });

    const offers = await this.prisma.offers.findMany({
      skip,
      take: per,
      where: { seller_id: user_id, ...statusClause },
      include: { listing: { include: { thumbnail: true } } },
    });

    return { offers: offers.map((offer) => new OfferEntity(offer)), count };
  }

  async acceptOffer(offer_id: string, user_id: string) {
    const checkOffer = await this.prisma.offers.findFirst({
      where: { seller_id: user_id, id: offer_id },
      select: { quantity: true, listing: { select: { quantity: true } } },
    });

    if (!checkOffer) throw new BadRequestException('Offer not found');

    if (checkOffer.quantity > checkOffer.listing.quantity) {
      throw new BadRequestException(
        'Offer quantity exceedes available listing quantity.',
      );
    }

    let offer = await this.prisma.offers.update({
      where: { seller_id: user_id, id: offer_id },
      data: { accepted: true },
      include: {
        listing: {
          select: {
            title: true,
            id: true,
            shipping_charge: true,
            quantity: true,
          },
        },
      },
    });

    if (offer.quantity > offer.listing.quantity) {
      throw new BadRequestException(
        'This offers quantity exceedes available listing quantity.',
      );
    }

    // Create order
    const order = await this.ordersService.createOrder(
      offer.listing.id,
      offer.buyer_id,
      offer.amount.toNumber(),
      offer.listing.shipping_charge.toNumber(),
      offer.quantity,
    );

    // Reduce qty
    const updatedListing = await this.prisma.listings.update({
      where: { id: offer.listing.id },
      data: { quantity: { decrement: offer.quantity } },
    });

    // end listing if quantity is zero
    if (updatedListing.quantity < 1) {
      await this.prisma.listings.update({
        where: { id: updatedListing.id },
        data: { status: 'ended' },
      });
    }

    // Send notification to winner
    const buyer_id = offer.buyer_id;
    const title = 'You won a listing!';
    const description = `Seller accepted your offer of ${formatter.format(
      offer.amount.toNumber(),
    )} on listing "${offer.listing.title}"!`;
    const reference = '/account/orders/' + order.number;

    await this.notificationsService.createNotification(
      buyer_id,
      title,
      description,
      reference,
    );

    return true;
  }

  async rejectOffer(offer_id, user_id) {
    const offer = await this.prisma.offers.update({
      where: { seller_id: user_id, id: offer_id },
      data: { accepted: false },
      include: { listing: { select: { title: true } } },
    });

    this.notificationsService.createSimpleNotification(
      offer.buyer_id,
      'Your offer was rejected.',
      `Your offer of ${formatter.format(offer.amount.toNumber())} on "${
        offer.listing.title
      }" was rejected.`,
    );
    return true;
  }

  async offerAlreadyMade(user_id: string, listing_id: string) {
    const results = await this.prisma.offers.findFirst({
      where: { buyer_id: user_id, listing_id },
    });

    if (!results) return false;

    return true;
  }
}
