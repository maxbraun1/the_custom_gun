"use client";

import { useEffect, useState } from "react";
import DescribeStep from "./steps/describe";
import OptionsStep from "./steps/options";
import { Button } from "@/components/ui/button";
import ShippingStep from "./steps/shipping";
import axios, { AxiosError, AxiosResponse } from "axios";
import { listing } from "../../../lib/types/listing";
import { Spinner } from "@/components/ui/spinner";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { toast } from "@/components/ui/use-toast";
import { user } from "@/lib/types/user";
import getUser from "@/lib/util/getUser";
import Link from "next/link";

export default function EditListing({
  params,
}: {
  params: { listingRef: string };
}) {
  const [user, setUser] = useState<user | null>(null);
  const [listing, setListing] = useState<any>(null);
  const [readyToList, setReadyToList] = useState(false);
  const [describeStepReady, setDescribeStepReady] = useState(false);
  const [optionsStepReady, setOptionsStepReady] = useState(false);
  const [shippingStepReady, setShippingStepReady] = useState(false);
  const [updatedListing, setUpdatedListing] = useState<listing>();
  const [loading, setLoading] = useState(false);
  const [listingNotFound, setListingNotFound] = useState(false);

  useEffect(() => {
    setUser(getUser());
    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL +
          "/listings/update/" +
          params.listingRef,
        { withCredentials: true }
      )
      .then((response: AxiosResponse) => {
        setListing(response.data);
      })
      .catch((err: AxiosError) => {
        console.log(err);
        setListingNotFound(true);
      });
  }, []);

  async function editListing() {
    setLoading(true);

    if (listing) {
      await axios
        .put(
          process.env.NEXT_PUBLIC_API_URL + "/listings/update/" + listing.id,
          updatedListing,
          {
            withCredentials: true,
          }
        )
        .then((response: AxiosResponse) => {
          console.log(response);
          if (response.data) {
            // success
            window.location.replace("/listing/" + listing.ref);
          } else {
            // Error
            toast({
              variant: "destructive",
              title:
                "An error occured while updating listing. Please try again later.",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          toast({
            variant: "destructive",
            title:
              "An error occured while updating listing. Please try again later.",
          });
        });
    } else {
      toast({
        variant: "destructive",
        title:
          "An error occured while updating listing. Please try again later.",
      });
    }

    setLoading(false);
  }

  function updateListing(newData: listing) {
    let updatedListingData = {
      ...updatedListing,
      ...newData,
    };
    setUpdatedListing(updatedListingData);
  }

  useEffect(() => {
    console.log(updatedListing);
    if (describeStepReady && optionsStepReady && shippingStepReady) {
      setReadyToList(true);
    } else {
      setReadyToList(false);
    }
  }, [describeStepReady, optionsStepReady, shippingStepReady]);

  if (user && !user.verified) {
    // user email not verified
    return (
      <p className="p-3 border rounded">
        Please{" "}
        <Link className="text-blue-800 font-semibold" href="/verify-email">
          verify your email address
        </Link>{" "}
        to create a listing.
      </p>
    );
  } else if (user && user.account_status !== "active") {
    return (
      <p className="p-3 border rounded">
        Please{" "}
        <Link className="text-blue-800 font-semibold" href="/complete-info">
          complete your profile information
        </Link>{" "}
        to create a listing.
      </p>
    );
  }

  if (listing === null) {
    return (
      <div className="h-96 flex items-center justify-center border rounded-md">
        {listingNotFound ? (
          <span className="font-display text-3xl text-gray-500">
            Listing not found.
          </span>
        ) : (
          <LoadingSpinner size={40} />
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <DescribeStep
        listing={listing}
        updateListing={updateListing}
        setDescribeStepReady={setDescribeStepReady}
      />
      <OptionsStep
        listing={listing}
        updateListing={updateListing}
        setOptionsStepReady={setOptionsStepReady}
      />
      <ShippingStep
        listing={listing}
        updateListing={updateListing}
        setShippingStepReady={setShippingStepReady}
      />
      <Button
        className="bg-blue-800 hover:bg-blue-900 w-40"
        onClick={editListing}
        disabled={!readyToList}
      >
        {loading ? <Spinner size={25} /> : "Update Listing"}
      </Button>
    </div>
  );
}
