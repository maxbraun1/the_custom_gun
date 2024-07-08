"use client";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import NothingFound from "@/components/nothingFound";
import PageNavigator from "@/components/pageNavigator";
import { offer } from "@/lib/types/offer";
import useQueryParams from "@/lib/util/useQueryParams";
import OfferControls from "./components/offerControls";
import Offer from "./components/offer";

export interface sellingSettings {
  status: string;
  type: string;
  sort: string;
}

export default function Offers() {
  const [offers, setOffers] = useState<Array<offer>>([]);
  const [perPage, setPerPage] = useState(16);
  const [offersCount, setOffersCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const { queryParams, setQueryParams } = useQueryParams();
  let page = Number(queryParams.get("page")) || 1;

  useEffect(() => {
    setLoading(true);
    const status = queryParams.get("status")
      ? "&status=" + queryParams.get("status")
      : "&status=pending";

    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL +
          "/offers?page=" +
          page +
          "&per=" +
          perPage +
          status,
        {
          withCredentials: true,
        }
      )
      .then((response: AxiosResponse) => {
        setOffersCount(response.data.count);
        setOffers(response.data.offers);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  }, [queryParams]);

  return (
    <div className="p-5 sm:p-8 basis-full flex flex-col items-stretch">
      <h1 className="font-display text-3xl">Your Offers</h1>
      <OfferControls />
      {loading ? (
        <div className="flex flex-col basis-full justify-center">
          <LoadingSpinner size={30} />
        </div>
      ) : offers && offers.length > 0 ? (
        <div>
          <div className="flex flex-col divide-y">
            {offers.map((offer: offer, index) => {
              return <Offer key={index} offer={offer} />;
            })}
          </div>
          <PageNavigator
            currentPage={Number(queryParams.get("page")) || 1}
            pageCount={Math.ceil(offersCount / perPage)}
          />
        </div>
      ) : (
        <NothingFound message="No Offers Found" />
      )}
    </div>
  );
}
