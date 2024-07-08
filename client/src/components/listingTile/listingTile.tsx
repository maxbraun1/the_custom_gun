"use client";

import { listing } from "@/lib/types/listing";
import { formatter } from "@/lib/util/currencyFormatter";
import Image from "next/image";
import Link from "next/link";

export default function ListingTile({ listing }: { listing: listing }) {
  // TODO: add time left next to bid count like Ebay
  return (
    <Link
      href={"/listing/" + listing.ref}
      className="w-full flex flex-col gap-1"
    >
      <div className="w-full aspect-square bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
        <Image
          width={600}
          height={600}
          src={listing.thumbnail.url}
          alt={listing.title}
        />
      </div>
      <h2 className="text-md tracking-tight leading-6 line-clamp-2">
        {listing.title}
      </h2>
      <p className="text-md text-gray-500 capitalize">{listing.condition}</p>
      {listing.listing_type === "auction" &&
        // Auction
        (listing.bid_count < 1 ? (
          // No Bids
          <span className="font-semibold leading-4">
            {formatter.format(listing.starting_bid)}
          </span>
        ) : (
          // Has Bids
          <span className="font-semibold leading-4">
            {formatter.format(listing.current_bid)}
          </span>
        ))}
      {listing.listing_type === "auction" && (
        <span className="text-sm text-gray-500 leading-4">
          {listing.bid_count} bids
        </span>
      )}

      {listing.listing_type === "fixed" && (
        // Fixed Price
        <>
          <span className="font-semibold leading-4">
            {formatter.format(listing.price)}
          </span>
          <span className="text-sm text-gray-500 leading-4">Buy Now</span>
        </>
      )}

      <span className="text-sm text-gray-500 leading-4">
        {listing.is_free_shipping
          ? "Free Shipping"
          : formatter.format(listing.shipping_charge) + " Shipping"}
      </span>
    </Link>
  );
}
