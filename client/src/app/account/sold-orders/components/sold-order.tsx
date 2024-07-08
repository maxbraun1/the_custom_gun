"use client";

import { Separator } from "@/components/ui/separator";
import { order } from "@/lib/types/order";
import { formatter } from "@/lib/util/currencyFormatter";
import Image from "next/image";
import Link from "next/link";
import { processArrows } from "./processArrows";
import OrderItemMenu from "./sold-order-item-menu";

export default function Order({ order }: { order: order }) {
  const dateFormat = {
    weekday: undefined,
    year: "numeric",
    month: "long",
    day: "numeric",
  } as const;

  return (
    <div className="w-full rounded overflow-hidden border" key={1}>
      {/* Order Header */}
      <div className="w-full text-sm p-1.5 flex justify-between px-3">
        <span>
          Order No.{" "}
          <Link
            className="underline"
            href={"/account/sold-orders/" + order.number}
          >
            {order.number}
          </Link>
        </span>
        <span className="text-gray-500">
          {new Date(order.date).toLocaleDateString(undefined, dateFormat)}
        </span>
      </div>
      <Separator />

      {/* Order Body */}
      <div className="flex gap-3 p-3 items-start">
        <div className="basis-16 sm:basis-20 aspect-square shrink-0 flex items-center bg-gray-100 rounded overflow-hidden border">
          <Image
            className="overflow-hidden w-full"
            src={order.listing.thumbnail.url}
            width={100}
            height={100}
            alt={order.listing.title}
          />
        </div>

        <div className="basis-5/6 flex flex-col gap-0">
          <h1 className="line-clamp-1 cursor-pointer">
            <Link href={"/listing/" + order.listing.ref}>
              {order.listing.title}
            </Link>
          </h1>
          <span className="text-sm">
            Buyer:{" "}
            <Link
              className="text-blue-800"
              href={"/users/" + order.buyer.username}
            >
              {order.buyer.username}
            </Link>
          </span>
          <div id="details" className="mt-2 text-gray-500">
            <p className="text-sm">Quantity: {order.quantity}</p>
            <p className="text-sm">
              Order Total:{" "}
              <span className="text-black font-semibold">
                {formatter.format(order.total)}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Order Footer */}
      <Separator />
      <div className="w-full text-sm p-1.5 flex items-center justify-between px-3">
        {/* TODO: maybe visualize order status here: ordered -> paid -> shipped -> etc. */}
        {processArrows(order.status)}
        <OrderItemMenu order={order} />
      </div>
    </div>
  );
}
