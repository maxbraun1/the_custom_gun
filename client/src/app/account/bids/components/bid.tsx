"use client";

import TimeLeft from "@/components/timeLeft";
import { formatter } from "@/lib/util/currencyFormatter";
import Image from "next/image";
import Link from "next/link";
import { bid } from "@/lib/types/bid";

export default function Bid({ bid }: { bid: bid }) {
  return (
    <div>
      <div className="flex items-start py-5 w-full gap-2 text-sm sm:text-base sm:gap-5">
        <Link
          href={"/listing/" + bid.listing.ref}
          className="flex w-16 sm:w-20 shrink-0 rounded overflow-hidden aspect-square relative"
        >
          <Image
            className="object-cover"
            src={bid.listing.thumbnail.url}
            alt=""
            width={100}
            height={100}
            quality={5}
          />
        </Link>
        <div className="flex flex-grow flex-col gap-1">
          <Link
            href={"/listing/" + bid.listing.ref}
            className="text-md tracking-tight leading-5 line-clamp-2 font-semibold"
          >
            {bid.listing.title}
          </Link>
          <span className="block text-gray-500 text-sm">
            Time Left: <TimeLeft end_date={bid.listing.end_date} />
          </span>
          <span className="block text-gray-500 text-sm">
            Current Bid:{" "}
            <span className="font-semibold text-black">
              {formatter.format(bid.listing.current_bid)}
            </span>
          </span>
          {bid.amount === bid.listing.current_bid && (
            <p className="bg-green-600 text-white font-semibold rounded w-fit text-sm px-2">
              You&apos;re winning this auction!
            </p>
          )}
        </div>
      </div>

      <div className="flex rounded border py-1 px-1 sm:px-5 mb-2 gap-3 justify-between">
        <p className="text-center text-sm flex gap-2 items-center">
          Your Bid:
          <span className="font-semibold text-blue-700 text-base">
            {formatter.format(bid.amount)}
          </span>
        </p>
      </div>
    </div>
  );
}
