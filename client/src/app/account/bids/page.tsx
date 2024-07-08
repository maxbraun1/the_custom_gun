"use client";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import NothingFound from "@/components/nothingFound";
import PageNavigator from "@/components/pageNavigator";
import useQueryParams from "@/lib/util/useQueryParams";
import Bid from "./components/bid";
import { bid } from "@/lib/types/bid";

export default function Bids() {
  const [bids, setBids] = useState<Array<bid>>([]);
  const [perPage, setPerPage] = useState(10);
  const [offersCount, setOffersCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const { queryParams } = useQueryParams();
  let page = Number(queryParams.get("page")) || 1;

  useEffect(() => {
    setLoading(true);

    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL +
          "/bids?page=" +
          page +
          "&per=" +
          perPage,
        {
          withCredentials: true,
        }
      )
      .then((response: AxiosResponse) => {
        setOffersCount(response.data.count);
        setBids(response.data.bids);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  }, [queryParams]);

  return (
    <div className="p-5 sm:p-8 basis-full flex flex-col items-stretch">
      <h1 className="font-display text-3xl">Your Bids</h1>
      {loading ? (
        <div className="flex flex-col basis-full justify-center">
          <LoadingSpinner size={30} />
        </div>
      ) : bids && bids.length > 0 ? (
        <div>
          <div className="flex flex-col divide-y">
            {bids.map((bid: bid, index: number) => {
              return <Bid key={index} bid={bid} />;
            })}
          </div>
          <PageNavigator
            currentPage={Number(queryParams.get("page")) || 1}
            pageCount={Math.ceil(offersCount / perPage)}
          />
        </div>
      ) : (
        <NothingFound message="No Bids Found" />
      )}
    </div>
  );
}
