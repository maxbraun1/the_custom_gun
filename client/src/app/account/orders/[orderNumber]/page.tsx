import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import OrderNotFound from "./components/orderNotFound";
import OrderHeader from "./components/orderHeader";
import { OrderListing } from "./components/orderListing";
import { OrderSummary } from "./components/orderSummary";
import { Button } from "@/components/ui/button";
import { order } from "@/lib/types/order";
import Link from "next/link";

async function getOrder(orderNumber: number) {
  return await axios
    .get(process.env.NEXT_PUBLIC_API_URL + "/orders/" + orderNumber, {
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

export default async function Order({
  params,
}: {
  params: { orderNumber: number };
}) {
  const order: order = await getOrder(params.orderNumber);

  if (!order) {
    return <OrderNotFound />;
  }

  return (
    <div className="p-8">
      <OrderHeader order={order} />
      <OrderListing order={order} />
      <OrderSummary order={order} />

      {!order.checkout_completed && (
        <>
          <Link href={"/checkout/order/" + order.number}>
            <Button className="bg-blue-800 hover:bg-blue-900">Checkout</Button>
          </Link>
          <p className="text-xs text-gray-500 mt-2">
            Checkout to pay for this order and select an FFL for shipping.
          </p>
        </>
      )}
    </div>
  );
}
