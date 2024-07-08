import { Separator } from "@/components/ui/separator";
import { order } from "@/lib/types/order";
import { formatter } from "@/lib/util/currencyFormatter";
import Image from "next/image";
import Link from "next/link";

export function OrderListing({ order }: { order: order }) {
  return (
    <>
      <div className="flex gap-3 py-4">
        <div className="flex items-center w-24 aspect-square bg-gray-100 rounded object-cover overflow-hidden">
          <Image
            src={order.listing.thumbnail.url}
            width={96}
            height={96}
            alt=""
          />
        </div>
        <div className="grow">
          <h2 className="text-lg font-semibold">
            <Link href={"/listing/" + order.listing.ref}>
              {order.listing.title}
            </Link>
          </h2>
          <p className="text-sm text-gray-700">
            Price Per: {formatter.format(order.price_per_item)}
          </p>
          <p className="text-sm text-gray-700">Qty: {order.quantity}</p>
          <p className="text-sm text-gray-700">
            Seller:{" "}
            <Link
              className="underline"
              href={"/users/" + order.listing.user.username}
            >
              {order.listing.user.username}
            </Link>
          </p>
        </div>
      </div>
      <Separator />
    </>
  );
}
