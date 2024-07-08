import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import OrderNotFound from "./components/orderNotFound";
import OrderHeader from "./components/orderHeader";
import { OrderListing } from "./components/orderListing";
import { OrderSummary } from "./components/orderSummary";
import { order } from "@/lib/types/order";

async function getSoldOrder(orderNumber: number) {
  return await axios
    .get(process.env.NEXT_PUBLIC_API_URL + "/orders/sold/" + orderNumber, {
      withCredentials: true,
      headers: {
        Cookie: cookies().toString(),
      },
    })

    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      console.log(error.message);
      return null;
    });
}

export default async function SoldOrder({
  params,
}: {
  params: { orderNumber: number };
}) {
  const order: order = await getSoldOrder(params.orderNumber);

  if (!order) {
    return <OrderNotFound />;
  }

  return (
    <div className="p-8">
      <OrderHeader order={order} />
      <OrderListing order={order} />
      <OrderSummary order={order} />
    </div>
  );
}
