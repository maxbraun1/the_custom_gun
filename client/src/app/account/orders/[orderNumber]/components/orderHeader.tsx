import { Separator } from "@/components/ui/separator";
import { order } from "@/lib/types/order";

export default function orderHeader({ order }: { order: order }) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  } as const;

  let statusColor = "#737373";
  if (order.status === "pending") {
    statusColor = "#737373";
  } else if (order.status === "paid") {
    statusColor = "#1d4ed8";
  } else if (order.status === "complete") {
    statusColor = "#16a34a";
  } else if (order.status === "returned") {
    statusColor = "#000000";
  }

  const orderDate = new Date(order.date).toLocaleDateString(undefined, options);
  return (
    <>
      <div className="flex items-center pb-3">
        <div className="grow">
          <h1 className="text-3xl font-display">Order #{order.number}</h1>
          <p className="text-sm text-gray-600">Order Date: {orderDate}</p>
        </div>
        <div
          className="w-fit py-1 px-3 rounded capitalize text-white font-semibold text-sm"
          style={{ backgroundColor: statusColor }}
        >
          {order.status}
        </div>
      </div>
      <Separator />
    </>
  );
}
