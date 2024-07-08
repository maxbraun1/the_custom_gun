import axios, { AxiosError, AxiosResponse } from "axios";
import { cookies } from "next/headers";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { listing } from "@/lib/types/listing";
import { formatter } from "@/lib/util/currencyFormatter";

async function getWatches() {
  return await axios
    .get(process.env.NEXT_PUBLIC_API_URL + "/watches", {
      withCredentials: true,
      headers: {
        Cookie: cookies().toString(),
      },
    })
    .then((response: AxiosResponse) => {
      return response.data.watches;
    })
    .catch((err: AxiosError) => {
      console.log(err);
      return null;
    });
}

export default async function WatchesCard({
  className,
}: {
  className: string;
}) {
  let listings = await getWatches();

  return (
    <Card className={cn("", className)}>
      <CardHeader className="p-3 font-semibold">Watching</CardHeader>
      <Separator />
      <CardContent className="flex flex-col p-3 divide-y mb-auto">
        {listings && listings.length > 0 ? (
          listings.map((listing: listing, index: number) => {
            return (
              <Link key={index} href={"/listing/" + listing.ref}>
                <div className="flex gap-2 my-2 rounded">
                  <div className="w-14 shrink-0 aspect-square object-cover overflow-hidden relative rounded">
                    <Image
                      className="object-cover"
                      src={listing.thumbnail.url}
                      fill
                      alt=""
                      quality={10}
                    />
                  </div>
                  <div>
                    <p className="line-clamp-1">{listing.title}</p>
                    {listing.listing_type === "auction" && (
                      <p className="text-sm">
                        <span className="font-semibold">Current Bid:</span>{" "}
                        {formatter.format(listing.current_bid)}
                      </p>
                    )}
                    {listing.listing_type === "fixed" && (
                      <p className="text-sm">
                        <span className="font-semibold">Price:</span>{" "}
                        {formatter.format(listing.price)}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <p className="text-sm text-gray-500">No watched listings found...</p>
        )}
      </CardContent>
      <Separator />
      <CardFooter className="px-3 py-2">
        <Link
          href="/account/watching"
          className="text-blue-700 flex items-center gap-1 text-sm"
        >
          View Watched Listings{" "}
          <Image
            src="/assets/icons/arrow-right.png"
            width={10}
            height={10}
            alt=""
          />
        </Link>
      </CardFooter>
    </Card>
  );
}
