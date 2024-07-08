import InfoTooltip from "@/components/infoTooltip";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { order } from "@/lib/types/order";
import { formatter } from "@/lib/util/currencyFormatter";
import Image from "next/image";

export function OrderSummary({ order }: { order: order }) {
  return (
    <div className="flex py-4 gap-5">
      <div className="basis-1/2">
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

      <div className="basis-1/2 text-sm">
        <h2 className="text-lg font-bold mb-2">Payment</h2>
        <p className="font-bold">Total Paid: {formatter.format(order.total)}</p>
        <Separator className="my-1" />
        <p>Subtotal: {formatter.format(order.subtotal)}</p>
        <Separator className="my-1" />
        <p>
          Fees: {formatter.format(order.fees)}
          <InfoTooltip>
            Fees include:
            <br />
            <ul>
              <li>Credit Card Fee</li>
            </ul>
          </InfoTooltip>
        </p>
        <Separator className="my-1" />
        <p>Shipping: {formatter.format(order.shipping_price)}</p>
        <Separator className="my-1" />
        <p className="border-2 border-blue-600 rounded p-3 mt-2">
          To be paid to you:
          <InfoTooltip>
            The amount paid to you is the subtotal minus the 5% service fee.
          </InfoTooltip>{" "}
          <span className="block w-full text-xl font-bold text-blue-700">
            {formatter.format(order.subtotal - order.subtotal * 0.05)}
          </span>
        </p>
        {!order.checkout_completed && (
          <p className="text-sm text-red-500">Payment has not been made yet.</p>
        )}
      </div>
    </div>
  );
}
