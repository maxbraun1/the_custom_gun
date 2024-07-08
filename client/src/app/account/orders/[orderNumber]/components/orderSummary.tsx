import { Separator } from "@/components/ui/separator";
import { order } from "@/lib/types/order";
import { formatter } from "@/lib/util/currencyFormatter";

export function OrderSummary({ order }: { order: order }) {
  return (
    <div className="flex py-4">
      {order.checkout_completed && (
        <div className="basis-1/2">
          <h2 className="text-lg font-bold">Shipping</h2>
          <p>{order.ship_to_ffl.BUSINESS_NAME}</p>
          <h2 className="text-lg font-bold">Billing</h2>
          <p>{order.billing_address_1}</p>
        </div>
      )}

      <div className="basis-1/2 text-sm">
        <h2 className="text-lg font-bold">Summary</h2>
        <div className="space-y-1">
          <p className="text-gray-600">
            Subtotal:{" "}
            <span className="text-black text-md font-bold">
              {formatter.format(order.price_per_item * order.quantity)}
            </span>
          </p>
          <p className="text-gray-600">
            Fees:{" "}
            <span className="text-black text-md font-bold">
              {formatter.format(order.fees)}
            </span>
          </p>
          <p className="text-gray-600">
            Shipping:{" "}
            <span className="text-black text-md font-bold">
              {formatter.format(order.shipping_price)}
            </span>
          </p>
          <Separator className="my-2" />
          <p className="text-lg text-gray-600">
            Total:{" "}
            <span className="text-black text-xl font-bold">
              {formatter.format(order.total)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
