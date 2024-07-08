"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { order } from "@/lib/types/order";
import axios, { AxiosError } from "axios";
import { useState } from "react";

export function OrderShipping({ order }: { order: order }) {
  const [trackingNumber, setTrackingNumber] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  function markOrderShipped() {
    setLoading(true);
    const data = {
      order_number: order.number,
      tracking_number: trackingNumber,
    };
    axios
      .put(process.env.NEXT_PUBLIC_API_URL + "/orders/mark-shipped", data, {
        withCredentials: true,
      })

      .then((response) => {
        window.location.reload();
        console.log(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error.message);
        setLoading(false);
      });
  }

  let shipped_info: string;
  if (order.tracking_number) {
    shipped_info = "Shipped with tracking number " + order.tracking_number;
  } else {
    shipped_info = "Shipped without tracking";
  }

  return (
    <div className="py-4 gap-5">
      <div className="mb-5">
        {order.checkout_completed ? (
          <>
            <h2 className="text-lg font-bold mb-2">Shipping</h2>
            <p>{order.ship_to_ffl.BUSINESS_NAME}</p>
            <p>{order.ship_to_ffl.PREMISE_STREET}</p>
            <p>
              {order.ship_to_ffl.PREMISE_CITY},{" "}
              {order.ship_to_ffl.PREMISE_STATE}
            </p>
            <p>{order.ship_to_ffl.PREMISE_ZIP_CODE}</p>
            <h2 className="text-lg font-bold pt-2">Billing</h2>
            <p>{order.billing_name}</p>
            <p>
              {order.billing_address_1}, {order.billing_address_2}
            </p>
            <p>
              {order.billing_city}, {order.billing_state}, {order.billing_zip}
            </p>
          </>
        ) : (
          <p className="text-sm">
            <h2 className="text-lg font-bold">Shipping & Billing</h2>
            Information has not been submitted yet.
          </p>
        )}
      </div>

      {order.is_shipped ? (
        <h1 className="bg-green-700 text-white rounded py-1 px-2 w-fit text-sm font-semibold">
          {shipped_info}
        </h1>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Mark Order Shipped</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Mark this order as shipped?</DialogTitle>
              <DialogDescription>
                Enter tracking number below. Tracking number will be shared with
                buyer.
              </DialogDescription>
              <div className="py-3">
                <Label htmlFor="tracking_number" className="block mb-2">
                  Tracking Number (Recommended)
                </Label>
                <Input
                  id="tracking_number"
                  placeholder="Tracking Number"
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  value={trackingNumber || ""}
                />
              </div>
              <Button onClick={markOrderShipped}>
                {loading ? <Spinner /> : "Mark Shipped"}
              </Button>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
