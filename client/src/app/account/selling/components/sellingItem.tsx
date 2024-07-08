"use client";

import TimeLeft from "@/components/timeLeft";
import { ValueHighlighter } from "@/components/valueHighlighter";
import { listing } from "@/lib/types/listing";
import { formatter } from "@/lib/util/currencyFormatter";
import Image from "next/image";
import Link from "next/link";
import SellingItemMenu from "./sellingItemMenu";

export default function SellingItem({ listing }: { listing: listing }) {
  let editDisabled: boolean = false;

  if (listing.listing_type === "auction" && listing.bid_count !== 0) {
    editDisabled = true;
  }
  return (
    <div className="flex items-start py-5 w-full gap-2 text-sm sm:text-base sm:gap-5">
      <Link
        href={"/listing/" + listing.ref}
        className="block w-16 sm:w-20 shrink-0 rounded overflow-hidden aspect-square relative"
      >
        <Image
          className="object-cover"
          src={listing.thumbnail.url}
          alt={listing.title}
          fill
          quality={5}
        />
      </Link>
      <div className="flex flex-grow flex-col gap-1">
        <Link
          href={"/listing/" + listing.ref}
          className="text-md tracking-tight leading-5 line-clamp-2 font-semibold"
        >
          {listing.title}
        </Link>
        <span className="block text-gray-500 text-sm">
          Time Left: <TimeLeft end_date={listing.end_date} />
        </span>

        {listing.listing_type === "auction" && (
          <>
            <span className="block text-gray-500 text-sm">
              Current Bid:{" "}
              <ValueHighlighter>
                {formatter.format(listing.current_bid)}
              </ValueHighlighter>
            </span>
            <span className="block text-gray-500 text-sm">
              Bids: <ValueHighlighter>{listing.bid_count}</ValueHighlighter>
            </span>
          </>
        )}

        {listing.buy_now_price !== 0 && (
          <span className="block text-gray-500 text-sm">
            Buy Now Price:{" "}
            <ValueHighlighter>
              {formatter.format(listing.buy_now_price)}
            </ValueHighlighter>
          </span>
        )}

        {listing.listing_type === "fixed" && (
          <span className="block text-gray-500 text-sm">
            Price:{" "}
            <ValueHighlighter>
              {formatter.format(listing.price)}
            </ValueHighlighter>
          </span>
        )}
      </div>

      <div className="w-10 shrink-0">
        <SellingItemMenu editDisabled={editDisabled} listing={listing} />
      </div>
    </div>
  );
}
