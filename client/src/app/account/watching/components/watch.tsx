"use client";

import TimeLeft from "@/components/timeLeft";
import { formatter } from "@/lib/util/currencyFormatter";
import Image from "next/image";
import Link from "next/link";
import { listing } from "@/lib/types/listing";

export default function Watch({ listing }: { listing: listing }) {
  return (
    <div>
      <div className="flex items-start py-5 w-full gap-2 text-sm sm:text-base sm:gap-5">
        <Link
          href={"/listing/" + listing.ref}
          className="flex w-16 sm:w-20 shrink-0 rounded overflow-hidden aspect-square relative"
        >
          <Image
            className="object-cover"
            src={listing.thumbnail.url}
            alt=""
            width={100}
            height={100}
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
          <span className="block text-gray-500 text-sm">
            Current Bid:{" "}
            <span className="font-semibold text-black">
              {formatter.format(listing.current_bid)}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
