import { formatter } from "@/lib/util/currencyFormatter";
import { listing } from "@/lib/types/listing";
import { Separator } from "@/components/ui/separator";

export default function PriceInfo({ listing }: { listing: listing }) {
  let isAuction: boolean;

  if (listing.listing_type == "auction") {
    isAuction = true;
  } else {
    isAuction = false;
  }

  return (
    <div>
      {isAuction ? (
        // Auction
        <div className="flex justify-evenly">
          <div className="text-center">
            <span className="text-sm text-gray-500">Current Bid</span>
            <p className="text-xl">{formatter.format(listing.current_bid)}</p>
          </div>
          <div className="text-center">
            <span className="text-sm text-gray-500">Bid Count</span>
            <p className="text-xl">{listing.bid_count}</p>
          </div>
          {listing.buy_now_price !== 0 && (
            <div className="text-center">
              <span className="text-sm text-gray-500">Buy Now Price</span>
              <p className="text-xl text-blue-700">
                {formatter.format(listing.buy_now_price)}
              </p>
            </div>
          )}
        </div>
      ) : (
        // Fixed Price
        <div className="flex justify-evenly">
          <div className="text-center">
            <span className="text-sm text-gray-500">Price</span>
            <p className="text-xl">{formatter.format(listing.price)}</p>
          </div>
          <div className="text-center">
            <span className="text-sm text-gray-500">Quantity</span>
            <p className="text-xl">{listing.quantity}</p>
          </div>
        </div>
      )}
    </div>
  );
}
