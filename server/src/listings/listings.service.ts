import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  PayloadTooLargeException,
  UnauthorizedException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadService } from 'src/upload/upload.service';
import { ListingEntity } from './listing.entity';
import { NotificationsService } from 'src/notifications/notifications.service';
import { formatter } from 'src/util/currencyFormatter';
import { listings } from '@prisma/client';
import { findWinner } from './util/findWinner';
import { BidsEntity } from 'src/bids/bids.entity';
import { OrdersService } from 'src/orders/orders.service';
import { sanitize } from 'isomorphic-dompurify';
import * as striptags from 'striptags';

@Injectable()
export class ListingsService {
  constructor(
    private readonly uploadService: UploadService,
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService,
    private readonly ordersService: OrdersService,
  ) {}

  async getListing(listingRef) {
    const listing = await this.prisma.listings
      .findFirst({
        where: { ref: listingRef },
        include: {
          images: { orderBy: { index: 'asc' } },
          thumbnail: true,
          frame_finish: true,
          caliber: true,
          brand: true,
          user: {
            select: {
              first_name: true,
              last_name: true,
              ref: true,
              username: true,
            },
          },
        },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });

    if (!listing) {
      throw new NotFoundException();
    }

    return listing;
  }

  async getFullListing(ref, user_id) {
    const listing = await this.prisma.listings
      .findFirst({
        where: { ref, user_id },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });

    if (!listing) {
      throw new NotFoundException();
    }

    return listing;
  }

  async updateListing(listing, listing_id, user_id) {
    const updatedListing = await this.prisma.listings
      .update({
        where: { id: listing_id, user_id },
        data: { ...listing },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });

    if (updatedListing) {
      // Success
      return true;
    } else {
      // Listing id incorrect or not user's listing
      return false;
    }
  }

  async createListing(listing, user_id: string) {
    // todo: Finish DTO for validation

    // Make sure user has username
    const user = await this.prisma.users.findFirst({
      where: { id: user_id },
    });

    if (!user.username || !user.first_name || !user.last_name) {
      throw new BadRequestException(
        'You must complete your profile information before creating listings.',
      );
    }

    const images = listing.images.map((image, index) => {
      this.prisma.listing_images.update({
        where: { id: image },
        data: { index },
      });
      return { id: image };
    });

    const current_time_stamp = new Date();
    const ending_time_stamp = new Date(
      current_time_stamp.setDate(
        current_time_stamp.getDate() + listing.duration,
      ),
    );

    let has_reserve = false;

    if (listing.reserve_price > 0) has_reserve = true;

    let description = sanitize(listing.description);

    const strippedDescription = striptags(description);

    if (strippedDescription === '')
      throw new BadRequestException('Description cannot be empty.');
    // trim description to 10,000 characters maximum
    description = description.substring(0, 10000);

    const result = await this.prisma.listings
      .create({
        data: {
          user_id,
          status: 'active',
          title: listing.title,
          created_date: new Date(),
          description: description,
          condition: listing.condition,
          upc: listing.upc,
          sku: listing.sku,
          serial_no: listing.serial_no,
          caliber_id: listing.caliber,
          customized_by: listing.customized_by,
          brand_id: listing.brand,
          item_type: listing.item_type,
          is_engraved: listing.is_engraved,
          frame_finish_id: listing.frame_finish,
          secondary_finish_id: listing.secondary_finish,
          end_date: ending_time_stamp,
          has_reserve: has_reserve,

          images: {
            connect: images,
          },
          thumbnail: {
            connect: { id: listing.thumbnail },
          },

          listing_type: listing.listing_type,
          duration: listing.duration,
          price: listing.price,
          quantity: listing.quantity,
          accept_offers: listing.accept_offers,
          starting_bid: listing.starting_bid,
          reserve_price: listing.reserve_price,
          buy_now_price: listing.buy_now_price || null,
          is_free_shipping: listing.is_free_shipping,
          shipping_charge: listing.shipping_charge,
          seller_state: listing.seller_state,
        },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });
    return result;
  }

  async registerListingImages(listingImages, listing_id) {
    if (listingImages.length > 10) {
      listingImages = listingImages.slice(0, 10);
    }

    this.prisma.listing_images
      .updateMany({
        where: { id: { in: listingImages } },
        data: { listing_id: listing_id },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });
  }

  async listingImageUpload(image: Express.Multer.File) {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (!allowedFileTypes.includes(image.mimetype)) {
      throw new UnsupportedMediaTypeException();
    }

    if (image.size > 10000000) {
      // 10MB
      throw new PayloadTooLargeException();
    }

    const url = await this.uploadService.upload(image, 'the-custom-gun');

    return this.prisma.listing_images
      .create({
        data: {
          url,
        },
      })
      .then((result) => {
        return { id: result.id, url: url };
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });
  }

  async getPublicUserListings(username: string, page: number, per: number) {
    const skip = (page - 1) * per;
    const user = await this.prisma.users
      .findFirst({
        where: { username },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });

    if (!user) return null;

    const listings = await this.prisma.listings
      .findMany({
        where: {
          user_id: user.id,
          status: 'active',
        },
        orderBy: {
          created_date: 'asc',
        },
        skip: skip,
        take: per,
        include: {
          images: true,
          thumbnail: true,
        },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });

    const count = await this.prisma.listings
      .count({
        where: {
          user_id: user.id,
          status: 'active',
        },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });

    return { listings, count };
  }

  async getLatestListings() {
    return await this.prisma.listings
      .findMany({
        where: {
          status: 'active',
        },
        orderBy: {
          created_date: 'asc',
        },
        take: 10,
        include: {
          images: true,
          thumbnail: true,
        },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });
  }

  async getUserListings(settings, user_id: string, page: number, per: number) {
    const skip = (page - 1) * per;

    // Order By
    let orderBy: any = { created_date: 'desc' };
    if (settings.order == 'endingsoonest') orderBy = { end_date: 'asc' };
    if (settings.order == 'bidcount') orderBy = { bid_count: 'desc' };

    const listings = await this.prisma.listings
      .findMany({
        where: {
          ...(settings.status !== 'any' && { status: settings.status }),
          ...(settings.type !== 'any' && { listing_type: settings.type }),
          user_id,
        },
        include: { thumbnail: true },
        take: per,
        skip,
        orderBy: orderBy,
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });

    const count = await this.prisma.listings
      .count({
        where: {
          ...(settings.status !== 'any' && { status: settings.status }),
          ...(settings.type !== 'any' && { listing_type: settings.type }),
          user_id,
        },
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException();
      });

    return {
      count: count,
      listings: listings.map((listing) => new ListingEntity(listing)),
    };
  }

  async endListingEarly(ref: string, user_id: string) {
    const listing = await this.prisma.listings.findFirst({ where: { ref } });
    if (listing.user_id !== user_id) throw new UnauthorizedException();

    await this.prisma.listings.update({
      where: { ref },
      data: { status: 'ended', end_date: new Date() },
    });

    return true;
  }

  async endListings() {
    // Get all listings with the status "active" where the end date is in the past
    const listingsToEnd = await this.prisma.listings.findMany({
      where: {
        status: 'active',
        end_date: {
          lte: new Date(),
        },
      },
      include: {
        bids: true,
      },
    });

    console.log('Ending ' + listingsToEnd.length + ' listings...');

    // Map through all listings that need to be ended.
    listingsToEnd.map(async (listing) => {
      // Delete watches
      await this.prisma.watches.deleteMany({
        where: { listing_id: listing.id },
      });

      // If the listing type is fixed, not much else to do.
      if (listing.listing_type === 'auction') {
        const winner: BidsEntity = findWinner(listing);

        if (winner) {
          // If theres a winner

          // Send notification to winner
          const user_id = winner.user_id;
          const status = 'unread';
          const title = 'You won a listing!';
          const description =
            'Your bid (' +
            formatter.format(winner.amount.toNumber()) +
            ') on listing "' +
            listing.title +
            '" was the highest!';
          const reference = '/listing/' + listing.ref;
          const urgent = true;

          await this.notificationsService.createNotification(
            user_id,
            title,
            description,
            reference,
            status,
            urgent,
          );

          // Create order
          await this.ordersService.createOrder(
            listing.id,
            winner.user_id,
            winner.amount.toNumber(),
            listing.shipping_charge.toNumber(),
          );
        }
      }

      // LAST: Mark listing as ended
      await this.prisma.listings.update({
        where: { id: listing.id },
        data: { status: 'ended' },
      });
    });
  }

  generateEndListingNotificationDescription(listing: listings) {
    if (listing.listing_type === 'auction') {
      if (listing.bid_count === 0) {
        // Auction with no bids
        return 'Your listing ended with 0 bids.';
      } else {
        // Auction with bids
        if (listing.reserve_price) {
          // Auction with bids and reserve price
          if (
            listing.current_bid.toNumber() >= listing.reserve_price.toNumber()
          ) {
            // Listing reached the reserve price
            return (
              'Your listing sold for ' +
              formatter.format(Number(listing.current_bid))
            );
          } else {
            // Listing did not react the reserve price
            return 'Your listing did not meet the reserve price.';
          }
        } else {
          // Auction with bids and no reserve price
          return (
            'Your listing sold for ' +
            formatter.format(Number(listing.current_bid)) +
            '!'
          );
        }
      }
    } else if (listing.listing_type === 'fixed') {
      return 'Your listing ended with no buyers.';
    }
  }

  async searchListings(
    term: string,
    per: number,
    page: number,
    listing_type: string | null,
    frame_finish: string | null,
    item_type: string | null,
    brand: string | null,
    caliber: string | null,
    condition: string | null,
  ) {
    // Sanitize search term
    let searchClause: null | object = null;

    if (term) {
      term = term.trim().split(' ').join(' & ');
      searchClause = {
        OR: [{ title: { search: term } }, { description: { search: term } }],
      };
    }

    const skip = (page - 1) * per;
    if (!per) per = 10;

    // determine listing type to sort by
    const listing_typeClause =
      listing_type === 'any' || !listing_type
        ? {}
        : { listing_type: listing_type };

    const itemConditionClause =
      condition === 'any' || !condition ? {} : { condition: condition };

    // determine primary finish to sort by
    let frameFinishClause: object;

    // determine item type to sort by
    const itemTypeClause =
      item_type === 'any' || !item_type ? {} : { item_type: item_type };

    // determine frame finish to sort by
    if (!frame_finish) {
      frameFinishClause = {};
    } else {
      const result = await this.prisma.finishes.findFirst({
        where: { value: frame_finish },
      });
      if (result) {
        frameFinishClause = { frame_finish_id: result.id };
      } else {
        return { listings: null, count: 0 };
      }
    }

    // determine brand to sort by
    let brandClause;
    if (!brand) {
      brandClause = {};
    } else {
      const result = await this.prisma.brands.findFirst({
        where: { value: brand },
      });
      if (result) {
        brandClause = { brand_id: result.id };
      } else {
        return { listings: null, count: 0 };
      }
    }

    // determine caliber to sort by
    let caliberClause;
    if (!caliber) {
      caliberClause = {};
    } else {
      const result = await this.prisma.calibers.findFirst({
        where: { value: caliber },
      });
      if (result) {
        caliberClause = { caliber_id: result.id };
      } else {
        return { listings: null, count: 0 };
      }
    }

    // Count valid listings
    const count = await this.prisma.listings.count({
      where: {
        status: 'active',
        ...listing_typeClause,
        ...frameFinishClause,
        ...itemTypeClause,
        ...brandClause,
        ...caliberClause,
        ...searchClause,
        ...itemConditionClause,
      },
    });

    // Get page listings
    const listings = await this.prisma.listings.findMany({
      where: {
        status: 'active',
        ...listing_typeClause,
        ...frameFinishClause,
        ...itemTypeClause,
        ...brandClause,
        ...caliberClause,
        ...searchClause,
        ...itemConditionClause,
      },
      include: { thumbnail: true },
      skip,
      take: per,
    });

    if (listings.length < 1) return null;

    const listingEntities = listings.map(
      (listing) => new ListingEntity(listing),
    );

    return { listings: listingEntities, count };
  }
}
