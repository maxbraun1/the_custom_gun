"use client";

import { Separator } from "@/components/ui/separator";
import useQueryParams from "@/lib/util/useQueryParams";
import NoResults from "./components/noResults";
import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { listing } from "@/lib/types/listing";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import PageNavigator from "@/components/pageNavigator";
import ListingGrid from "@/components/listingGrid/listingGrid";
import ListingTile from "@/components/listingTile/listingTile";

export default function SearchResults() {
  const { queryParams, setQueryParams } = useQueryParams();
  const [listings, setListings] = useState<null | Array<listing>>(null);
  const [listingCount, setListingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [perPage, setPerPage] = useState(16);

  const term = queryParams.get("term");
  let page = Number(queryParams.get("page"));

  if (!page) page = 1;

  useEffect(() => {
    setLoading(true);
    setListingCount(0);
    setListings(null);

    let term = queryParams.get("term")
      ? "?term=" + queryParams.get("term")
      : "?term";

    let condition = queryParams.get("condition")
      ? "&condition=" + queryParams.get("condition")
      : "";

    let ltype = queryParams.get("ltype")
      ? "&listing_type=" + queryParams.get("ltype")
      : "";

    let pfinish = queryParams.get("ffinish")
      ? "&frame_finish=" + queryParams.get("ffinish")
      : "";

    let itype = queryParams.get("itype")
      ? "&item_type=" + queryParams.get("itype")
      : "";

    let caliber = queryParams.get("caliber")
      ? "&caliber=" + queryParams.get("caliber")
      : "";

    let brand = queryParams.get("brand")
      ? "&brand=" + queryParams.get("brand")
      : "";

    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL +
          "/listings/search" +
          term +
          "&page=" +
          page +
          "&per=" +
          perPage +
          ltype +
          pfinish +
          itype +
          brand +
          caliber +
          condition
      )
      .then((response: AxiosResponse) => {
        if (response.data) {
          setListings(response.data.listings);
          setListingCount(response.data.count);
        }
        setLoading(false);
      })
      .catch((error: AxiosError) => {
        console.log(error.message);
        setLoading(false);
      });
  }, [queryParams]);

  return (
    <div className="p-5">
      {!loading && (
        <>
          {term && (
            <h1 className="font-semibold">
              Results for &quot;{queryParams.get("term")}&quot;
            </h1>
          )}

          <p className="text-sm text-gray-600">{listingCount} Listings Found</p>
          <Separator className="mt-3" />
        </>
      )}

      <div>
        {loading ? (
          <LoadingSpinner className="my-10" />
        ) : listings ? (
          <div className="my-5">
            <ListingGrid>
              {listings.map((listing, index: number) => {
                return <ListingTile key={index} listing={listing} />;
              })}
            </ListingGrid>
            <PageNavigator
              pageCount={Math.ceil(listingCount / perPage)}
              currentPage={page}
            />
          </div>
        ) : (
          <NoResults />
        )}
      </div>
    </div>
  );
}
