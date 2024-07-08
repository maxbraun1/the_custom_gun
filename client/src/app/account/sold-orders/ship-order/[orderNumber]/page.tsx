import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import OrderNotFound from "./components/orderNotFound";
import OrderHeader from "./components/orderHeader";
import { OrderListing } from "./components/orderListing";
import { order } from "@/lib/types/order";
import { OrderShipping } from "./components/orderShipping";

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
  if (!order.is_paid) {
    return (
      <>
        <h1>This order has not been paid!</h1>
        <p>
          Please wait for the buyer to pay for this order before shipping their
          item(s).
        </p>
      </>
    );
  }

  return (
    <div className="p-8">
      <OrderHeader order={order} />
      <OrderListing order={order} />
      <OrderShipping order={order} />
    </div>
  );
}
