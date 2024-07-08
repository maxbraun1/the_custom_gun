"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { formatter } from "@/lib/util/currencyFormatter";
import { order } from "@/lib/types/order";

export default function Summary({
  order,
  children,
}: {
  order: order;
  children: React.ReactNode;
}) {
  return (
    <>
      <Card>
        <CardHeader className="p-3">
          <h2 className="font-display text-2xl">Order Summary</h2>
        </CardHeader>
        <Separator />
        <CardContent className="p-3">
          <div className="flex gap-3 items-center">
            <div className="basis-24 aspect-square bg-gray-200 rounded overflow-hidden relative">
              <Image
                className="aspect-square bg-gray-200 object-contain"
                src={order.listing.thumbnail.url}
                width={100}
                height={100}
                quality={30}
                alt={order.listing.title}
              />
            </div>
            <div>
              <p className="underline line-clamp-2">
                <Link href={"/listing/" + order.listing.ref}>
                  {order.listing.title}
                </Link>
              </p>
              <p className="text-sm">
                <span className="font-semibold">Seller: </span>
                <Link
                  className="text-blue-800"
                  href={"/users/" + order.listing.user.username}
                >
                  {order.listing.user.username}
                </Link>
              </p>
            </div>
          </div>
          <Separator className="my-3" />
          <div>
            <p className="flex justify-between">
              <span className="font-semibold">Item Price: </span>
              <span>{formatter.format(order.price_per_item)} </span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold">Shipping: </span>
              <span>
                {order.shipping_price === 0
                  ? "Free"
                  : formatter.format(order.shipping_price)}
              </span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold">Fees: </span>
              <span>{formatter.format(order.fees)}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold">Subtotal: </span>
              <span>{formatter.format(order.subtotal)}</span>
            </p>
          </div>
          <Separator className="my-3" />
          <p className="flex justify-between">
            <span className="font-semibold">Total: </span>
            <span>{formatter.format(order.total)}</span>
          </p>
        </CardContent>
        <Separator />
        <CardFooter className="p-3">{children}</CardFooter>
      </Card>
    </>
  );
}
