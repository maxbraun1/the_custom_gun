import ListingGrid from "@/components/listingGrid/listingGrid";
import ListingTile from "@/components/listingTile/listingTile";
import { listing } from "@/lib/types/listing";
import axios, { AxiosError, AxiosResponse } from "axios";

async function getLatestListings() {
  return await axios
    .get(process.env.NEXT_PUBLIC_API_URL + "/listings/latest")
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((err: AxiosError) => {
      console.log(err);
    });
}

export default async function Home() {
  const latestListings: Array<listing> = await getLatestListings();

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-6xl p-5 xl:px-0">
        <h1 className="text-2xl font-display">Newest Listings</h1>
        <ListingGrid className="py-5">
          {latestListings &&
            latestListings.map((listing, index) => {
              return <ListingTile key={index} listing={listing} />;
            })}
        </ListingGrid>
      </div>
    </div>
  );
}
