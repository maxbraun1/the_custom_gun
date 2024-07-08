"use client";

import TimeLeft from "@/components/timeLeft";
import { formatter } from "@/lib/util/currencyFormatter";
import Image from "next/image";
import Link from "next/link";
import { offer } from "@/lib/types/offer";
import { useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "@/components/ui/use-toast";

export default function Offer({ offer }: { offer: offer }) {
  const [loading, setLoading] = useState(false);

  function accept() {
    setLoading(true);
    axios
      .put(
        process.env.NEXT_PUBLIC_API_URL + "/offers/accept",
        { offerID: offer.id },
        {
          withCredentials: true,
        }
      )
      .then((response: AxiosResponse) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((err: AxiosError) => {
        toast({
          variant: "destructive",
          description:
            "An error has occured while accepting this offer. Please try again later.",
        });
        setLoading(false);
        console.log(err);
      });
  }
  function reject() {
    setLoading(true);
    axios
      .put(
        process.env.NEXT_PUBLIC_API_URL + "/offers/reject",
        { offerID: offer.id },
        {
          withCredentials: true,
        }
      )
      .then((response: AxiosResponse) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((err: AxiosError) => {
        toast({
          variant: "destructive",
          description:
            "An error has occured while rejecting this offer. Please try again later.",
        });
        setLoading(false);
        console.log(err);
      });
  }

  function offerInteraction() {
    if (offer.accepted === null) {
      return (
        <>
          <p
            onClick={() => accept()}
            className="px-1 sm:px-3 py-1 text-green-600 cursor-pointer rounded hover:bg-gray-100"
          >
            Accept
          </p>
          <p
            onClick={() => reject()}
            className="px-1 sm:px-3 py-1 text-red-600 cursor-pointer rounded hover:bg-gray-100"
          >
            Reject
          </p>
        </>
      );
    } else if (offer.accepted === false) {
      return <p className="py-1 text-red-600">Offer Rejected</p>;
    } else if (offer.accepted === true) {
      return <p className="py-1 text-green-600">Offer Accepted</p>;
    }
  }

  return (
    <div>
      <div className="flex items-start py-5 w-full gap-2 text-sm sm:text-base sm:gap-5">
        <Link
          href={"/listing/" + offer.listing.ref}
          className="flex w-16 sm:w-20 shrink-0 rounded overflow-hidden aspect-square relative"
        >
          <Image
            className="object-cover"
            src={offer.listing.thumbnail.url}
            alt=""
            width={100}
            height={100}
            quality={5}
          />
        </Link>
        <div className="flex flex-grow flex-col gap-1">
          <Link
            href={"/listing/" + offer.listing.ref}
            className="text-md tracking-tight leading-5 line-clamp-2 font-semibold"
          >
            {offer.listing.title}
          </Link>
          <span className="block text-gray-500 text-sm">
            Time Left: <TimeLeft end_date={offer.listing.end_date} />
          </span>
          <span className="block text-gray-500 text-sm">
            Price:{" "}
            <span className="font-semibold text-black">
              {formatter.format(offer.listing.price)}
            </span>
          </span>
        </div>
      </div>

      <div className="flex rounded border py-1 px-1 sm:px-5 mb-2 gap-3 justify-between">
        <p className="text-center text-sm flex gap-2 items-center">
          Offer Amount:
          <span className="font-semibold text-blue-700 text-base">
            {formatter.format(offer.amount)}
          </span>
        </p>
        <div className="flex gap-2 font-semibold items-center text-sm sm:text-base">
          {loading ? (
            <div className="w-24 p-1.5">
              <LoadingSpinner size={20} />
            </div>
          ) : (
            offerInteraction()
          )}
        </div>
      </div>
    </div>
  );
}
