"use client";

import ListingGrid from "@/components/listingGrid/listingGrid";
import ListingTile from "@/components/listingTile/listingTile";
import PageNavigator from "@/components/pageNavigator";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Separator } from "@/components/ui/separator";
import { listing } from "@/lib/types/listing";
import { user } from "@/lib/types/user";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserListings({ user }: { user: user }) {
  const [loading, setLoading] = useState(true);
  const [perPage, setPerPage] = useState(8);
  const [listingsCount, setListingsCount] = useState(0);
  const [listings, setListings] = useState<Array<listing>>([]);

  const searchParams = useSearchParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL +
          "/listings/user/?username=" +
          user.username +
          "&page=" +
          searchParams.get("page") +
          "&per=" +
          perPage
      )
      .then((response: AxiosResponse) => {
        if (response.data) {
          setListings(response.data.listings);
          console.log(response.data.listings);
          setListingsCount(response.data.count);
        }
        setLoading(false);
      })
      .catch((error: AxiosError) => {
        console.log(error.message);
        setLoading(false);
        return null;
      });
  }, [searchParams]);

  return (
    <Card className="mt-5">
      <CardHeader className="p-3 text-lg font-semibold">
        {user.username}&apos;s Listings
      </CardHeader>
      <Separator />
      <CardContent className="p-3">
        {loading ? (
          <LoadingSpinner className="my-5" />
        ) : listings.length > 0 ? (
          <ListingGrid>
            {listings.map((listing, index) => {
              return <ListingTile key={index} listing={listing} />;
            })}
          </ListingGrid>
        ) : (
          <p className="text-sm text-gray-500">
            {user.username} does not have any active listings
          </p>
        )}
        <PageNavigator
          currentPage={Number(searchParams.get("page")) || 1}
          pageCount={Math.ceil(listingsCount / perPage)}
        />
      </CardContent>
    </Card>
  );
}
