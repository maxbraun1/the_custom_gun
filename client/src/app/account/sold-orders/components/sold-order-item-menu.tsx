"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { order } from "@/lib/types/order";

export default function OrderItemMenu({ order }: { order: order }) {
  function orderOptions() {
    if (order.status === "pending") {
    } else if (order.status === "paid") {
      return (
        <>
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href={"/account/sold-orders/ship-order/" + order.number}>
              Ship Order
            </Link>
          </DropdownMenuItem>
        </>
      );
    } else if (order.status === "complete") {
      return (
        <>
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href={"/account/orders/" + order.number}>View Order</Link>
          </DropdownMenuItem>
          {!order.feedback_submitted && (
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link href={"/account/leave-feedback/" + order.number}>
                Leave Feedback
              </Link>
            </DropdownMenuItem>
          )}
        </>
      );
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="p-1 h-auto" variant="outline">
            <Image
              src="/assets/icons/elipses.png"
              alt=""
              width={20}
              height={20}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Order Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer">
            <Link href={"/account/sold-orders/" + order.number}>
              View Order
            </Link>
          </DropdownMenuItem>

          {orderOptions()}

          <DropdownMenuItem className="cursor-pointer">
            <Link href={"mailto:" + order.buyer.email}>Contact Buyer</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Link href="">Report Buyer</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
