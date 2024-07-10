"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { listing } from "@/lib/types/listing";
import Image from "next/image";
import Link from "next/link";
import { formatter } from "@/lib/util/currencyFormatter";
import { useEffect, useState } from "react";
import QuantitySelector from "@/components/ui/quantity-selector";
import { UseFormReturn } from "react-hook-form";
import { feeCalculator } from "@/lib/util/feeCalculator";

function getPerUnitPrice(listing: listing) {
  if (listing.listing_type === "auction") {
    return listing.buy_now_price;
  }
  if (listing.listing_type === "fixed") {
    return listing.price;
  } else {
    return 0;
  }
}

export default function Summary({
  listing,
  form,
  children,
}: {
  listing: listing;
  form: UseFormReturn<any>;
  children: React.ReactNode;
}) {
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [fees, setFees] = useState(0);
  const [quantity, setItemQuantity] = useState(1);

  const shipping = listing.shipping_charge;
  const perUnitPrice = getPerUnitPrice(listing);

  function setQuantity(quantity: number) {
    form.setValue("quantity", quantity);
    setItemQuantity(quantity);
  }

  useEffect(() => {
    let { total, subtotal, fees } = feeCalculator(
      perUnitPrice,
      quantity,
      shipping
    );
    setFees(fees);
    setSubtotal(subtotal);
    setTotal(total);
  }, [quantity]);

  function quantitySelector() {
    if (listing.listing_type === "fixed" && listing.quantity > 1) {
      return (
        <div className="text-center">
          <Separator className="my-3" />
          <p className="text-sm text-gray-500 mb-2">Quantity</p>
          <QuantitySelector
            min={1}
            max={listing.quantity}
            by={1}
            defaultValue={1}
            setter={setQuantity}
          />
        </div>
      );
    }
  }

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
                src={listing.thumbnail.url}
                width={100}
                height={100}
                quality={30}
                alt={listing.title}
              />
            </div>
            <div>
              <p className="underline line-clamp-2">
                <Link href={"/listing/" + listing.ref}>{listing.title}</Link>
              </p>
              <p className="text-sm">
                <span className="font-semibold">Seller: </span>
                <Link
                  className="text-blue-800"
                  href={"/users/" + listing.user.username}
                >
                  {listing.user.username}
                </Link>
              </p>
            </div>
          </div>
          {quantitySelector()}
          <Separator className="my-3" />
          <div>
            <p className="flex justify-between">
              <span className="font-semibold">Item Price: </span>
              <span>
                {formatter.format(perUnitPrice)}{" "}
                {form.getValues("quantity") > 1 &&
                  " x " + form.getValues("quantity")}
              </span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold">Shipping: </span>
              <span>
                {shipping === 0 ? "Free" : formatter.format(shipping)}
              </span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold">Fees: </span>
              <span>{formatter.format(fees)}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold">Subtotal: </span>
              <span>{formatter.format(subtotal)}</span>
            </p>
          </div>
          <Separator className="my-3" />
          <p className="flex justify-between">
            <span className="font-semibold">Total: </span>
            <span>{formatter.format(total)}</span>
          </p>
        </CardContent>
        <Separator />
        <CardFooter className="p-3">{children}</CardFooter>
      </Card>
    </>
  );
}
