import { Prisma } from '@prisma/client';
import { ListingEntity } from '../listing.entity';

type listingsWithBids = Prisma.listingsGetPayload<{
  include: {
    bids: true;
  };
}>;

export function findWinner(listing: listingsWithBids) {
  if (listing.listing_type === 'fixed') return null;

  // Auction Listing
  if (listing.bids) {
    // Listing ended with bids
    if (listing.reserve_price) {
      // Listing has reserve price
      if (listing.current_bid >= listing.reserve_price) {
        // Current bid is higher than reserve, there is a winner
        return getHighestBid(listing.bids);
      } else {
        // Highest bid is lower than reserve, no winner.
        return null;
      }
    } else {
      // listing has no reserve, there is a winner
      return getHighestBid(listing.bids);
    }
  } else return null;
}

function getHighestBid(bids) {
  const highestBid = bids.reduce(
    (prev, current) =>
      prev && prev.amount.toNumber() > current.amount.toNumber()
        ? prev
        : current,
    null,
  );

  return highestBid;
}
