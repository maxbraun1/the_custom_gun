import Details from "@/app/listing/components/details";
import Images from "@/app/listing/components/images";
import Payment from "@/app/listing/components/paymentCard/paymentCard";
import ListingNotFound from "@/components/listingNotFound";
import axios, { AxiosError } from "axios";
import Description from "@/app/listing/components/description";

async function getListing(listingRef: string) {
  return await axios
    .get(process.env.NEXT_PUBLIC_API_URL + "/listings/listing/" + listingRef, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      console.log(error.message);
      return null;
    });
}

export default async function Listing({
  params,
}: {
  params: { listingRef: string };
}) {
  const listing = await getListing(params.listingRef);
  console.log(listing);

  if (!listing) {
    return <ListingNotFound />;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-8 flex-col md:flex-row">
        <div className="md:basis-3/5 basis-full">
          <Images images={listing.images} />
        </div>
        <div className="md:basis-2/5 md:block">
          <Payment listing={listing} />
        </div>
      </div>

      <div className="flex gap-3 flex-col md:flex-row md:gap-8">
        <div className="md:basis-3/5 basis-full">
          <Description listing={listing} />
        </div>
        <div className="md:basis-2/5 md:block">
          <Details listing={listing} />
        </div>
      </div>
    </div>
  );
}
