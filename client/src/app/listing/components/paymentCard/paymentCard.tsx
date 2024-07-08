"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PriceInfo from "./components/priceInfo";
import { formatter } from "@/lib/util/currencyFormatter";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import TimeLeft from "@/components/timeLeft";
import UserCard from "./components/userCard";
import { states } from "@/lib/util/states";
import { ActionButtons } from "./components/actionButtons";
import { listing } from "@/lib/types/listing";
import { useState } from "react";
import { isEnded } from "@/lib/util/timeLeft";
import { user } from "@/lib/types/user";
import Watch from "./components/watch";

export default function Payment({ listing }: { listing: listing }) {
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  } as const;

  const created_date = new Date(listing.created_date);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="leading-5">{listing.title}</CardTitle>
        <CardDescription>
          {created_date.toLocaleDateString(undefined, dateOptions)}
        </CardDescription>
        <UserCard user={listing.user} />
      </CardHeader>
      <Separator />
      <CardContent className="py-5">
        <PriceInfo listing={listing} />
        {listing.listing_type === "auction" && (
          <div className="text-center">
            <Separator className="my-4" />
            {!listing.has_reserve ? (
              <p className="text-green-600">No Reserve!</p>
            ) : listing.reserve_met ? (
              <p className="text-green-600">Reserve met!</p>
            ) : (
              <p className="text-red-600">Reserve not met</p>
            )}
          </div>
        )}
        <Separator className="my-4" />
        <div className="text-center">
          <span className="text-sm text-gray-500">Time Left</span>
          <TimeLeft className="block text-xl" end_date={listing.end_date} />
        </div>
        <Separator className="my-4" />
        <div className="flex gap-2 items-center">
          <Image
            src="/assets/icons/shipping.png"
            width={20}
            height={20}
            alt=""
          />
          <p>
            {listing.is_free_shipping
              ? "Free Shipping"
              : "Shipping: " + formatter.format(listing.shipping_charge)}
          </p>
        </div>
        <Separator className="my-4" />
        <div className="flex gap-2 items-center">
          <Image
            src="/assets/icons/location.png"
            width={20}
            height={20}
            alt=""
          />
          <p>
            Seller Location:{" "}
            {states.find((state) => state.value === listing.seller_state)?.name}
            , USA
          </p>
        </div>
      </CardContent>
      {!isEnded(listing.end_date) && (
        <>
          <Watch listing={listing} />
          <ActionButtons listing={listing} />
        </>
      )}
    </Card>
  );
}
