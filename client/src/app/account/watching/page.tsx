"use client";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import NothingFound from "@/components/nothingFound";
import PageNavigator from "@/components/pageNavigator";
import useQueryParams from "@/lib/util/useQueryParams";
import Bid from "./components/watch";
import { bid } from "@/lib/types/bid";
import { listing } from "@/lib/types/listing";
import Watch from "./components/watch";

export default function Watches() {
  const [watches, setWatches] = useState<Array<listing>>([]);
  const [perPage, setPerPage] = useState(10);
  const [offersCount, setOffersCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const { queryParams, setQueryParams } = useQueryParams();
  let page = Number(queryParams.get("page")) || 1;

  useEffect(() => {
    setLoading(true);

    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL +
          "/watches?page=" +
          page +
          "&per=" +
          perPage,
        {
          withCredentials: true,
        }
      )
      .then((response: AxiosResponse) => {
        setOffersCount(response.data.count);
        setWatches(response.data.watches);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  }, [queryParams]);

  return (
    <div className="p-5 sm:p-8 basis-full flex flex-col items-stretch">
      <h1 className="font-display text-3xl">Listings You&apos;re Watching</h1>
      {loading ? (
        <div className="flex flex-col basis-full justify-center">
          <LoadingSpinner size={30} />
        </div>
      ) : watches && watches.length > 0 ? (
        <div>
          <div className="flex flex-col divide-y">
            {watches.map((watch: listing, index: number) => {
              return <Watch key={index} listing={watch} />;
            })}
          </div>
          <PageNavigator
            currentPage={Number(queryParams.get("page")) || 1}
            pageCount={Math.ceil(offersCount / perPage)}
          />
        </div>
      ) : (
        <NothingFound message="No Watched Listings Found" />
      )}
    </div>
  );
}
