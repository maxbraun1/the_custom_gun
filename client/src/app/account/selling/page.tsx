"use client";

import axios, { AxiosError, AxiosResponse } from "axios";
import SellingControls from "./components/sellingControls";
import { listing } from "@/lib/types/listing";
import SellingItem from "./components/sellingItem";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import NothingFound from "@/components/nothingFound";
import PageNavigator from "@/components/pageNavigator";
import { useSearchParams } from "next/navigation";

export interface sellingSettings {
  status: string;
  type: string;
  sort: string;
}

export default function Selling() {
  const [listings, setListings] = useState<Array<listing>>([]);
  const [perPage, setPerPage] = useState(4);
  const [listingsCount, setListingsCount] = useState(0);
  const [status, setStatus] = useState("active");
  const [type, setType] = useState("any");
  const [order, setOrder] = useState("newest");
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();

  function setSellingSettings(key: "status" | "type" | "sort", value: string) {
    if (key === "status") {
      setStatus(value);
    }
    if (key === "type") {
      setType(value);
    }
    if (key === "sort") {
      setOrder(value);
    }
  }

  useEffect(() => {
    const settings = {
      status,
      type,
      order,
      page: searchParams.get("page"),
      per: perPage,
    };
    setLoading(true);
    axios
      .post(
        process.env.NEXT_PUBLIC_API_URL + "/listings/userlistings",
        settings,
        {
          withCredentials: true,
        }
      )
      .then((response: AxiosResponse) => {
        setListingsCount(response.data.count);
        setListings(response.data.listings);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  }, [status, type, order, searchParams]);

  return (
    <div className="p-5 sm:p-8 basis-full flex flex-col items-stretch">
      <h1 className="font-display text-3xl">Your Listings</h1>
      <SellingControls setSellingSettings={setSellingSettings} />
      {loading ? (
        <div className="flex flex-col basis-full justify-center">
          <LoadingSpinner size={30} />
        </div>
      ) : listings.length > 0 ? (
        <div>
          <div className="flex flex-col divide-y">
            {listings.map((listing: listing, index) => {
              return <SellingItem key={index} listing={listing} />;
            })}
          </div>
          <PageNavigator
            currentPage={Number(searchParams.get("page")) || 1}
            pageCount={Math.ceil(listingsCount / perPage)}
          />
        </div>
      ) : (
        <NothingFound message="No Listings Found" />
      )}
    </div>
  );
}
