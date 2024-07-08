"use client";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { order } from "@/lib/types/order";
import Order from "./components/order";
import NothingFound from "@/components/nothingFound";

export default function Orders() {
  const [orders, setOrders] = useState<Array<order>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/orders", {
        withCredentials: true,
      })
      .then((response: AxiosResponse) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="p-5 sm:p-8 basis-full flex flex-col items-stretch">
      <h1 className="font-display text-3xl w-full">Your Orders</h1>
      {loading ? (
        <LoadingSpinner className="py-24" size={25} />
      ) : (
        <div className="my-5 flex flex-col gap-5">
          {orders.length > 0 ? (
            orders.map((order, index) => <Order order={order} key={index} />)
          ) : (
            <NothingFound message="No Orders Found" />
          )}
        </div>
      )}
    </div>
  );
}
