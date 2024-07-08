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
import { formatter } from "@/lib/util/currencyFormatter";
import { bid } from "@/lib/types/bid";

async function getBids() {
  return await axios
    .get(process.env.NEXT_PUBLIC_API_URL + "/bids", {
      withCredentials: true,
      headers: {
        Cookie: cookies().toString(),
      },
    })
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((err: AxiosError) => {
      console.log(err);
      return null;
    });
}

export default async function BidsCard({ className }: { className: string }) {
  let { bids } = await getBids();
  bids = bids.slice(0, 4);

  return (
    <Card className={cn("", className)}>
      <CardHeader className="p-3 font-semibold">Bids</CardHeader>
      <Separator />
      <CardContent className="flex flex-col p-3 divide-y mb-auto">
        {bids && bids.length > 0 ? (
          bids.map((bid: bid, index: number) => {
            return (
              <Link key={index} href={"/listing/" + bid.listing.ref}>
                <div className="flex gap-2 my-2 rounded">
                  <div className="w-14 shrink-0 aspect-square object-cover overflow-hidden relative rounded">
                    <Image
                      className="object-cover"
                      src={bid.listing.thumbnail.url}
                      fill
                      alt=""
                      quality={10}
                    />
                  </div>
                  <div>
                    <p className="line-clamp-1">{bid.listing.title}</p>
                    <p className="text-sm">
                      <span className="font-semibold">Current Bid:</span>{" "}
                      {formatter.format(bid.listing.current_bid)}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Your Bid:</span>{" "}
                      {formatter.format(bid.amount)}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <p className="text-sm text-gray-500">No Bids found...</p>
        )}
      </CardContent>
      <Separator />
      <CardFooter className="px-3 py-2">
        <Link
          href="/account/bids"
          className="text-blue-700 flex items-center gap-1 text-sm"
        >
          View Bids{" "}
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
