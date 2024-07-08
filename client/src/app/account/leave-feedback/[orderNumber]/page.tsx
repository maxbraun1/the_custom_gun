"use client";

import BackButton from "@/components/backButton";
import { Separator } from "@/components/ui/separator";
import { order } from "@/lib/types/order";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import FeedbackForm from "./components/feedbackForm";
import getUser from "@/lib/util/getUser";

async function getOrder(orderNumber: string) {
  return await axios
    .get(process.env.NEXT_PUBLIC_API_URL + "/orders/" + orderNumber, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      console.log(error.message);
      return null;
    });
}

export default async function LeaveFeedback({
  params,
}: {
  params: { orderNumber: string };
}) {
  const order: order = await getOrder(params.orderNumber);
  const user = getUser();

  if (!order || order.buyer_user_id != user?.id) {
    return (
      <div className="py-10 text-center">
        <div className="border p-3 rounded mb-3">
          You cannot leave feedback for this order.
        </div>
        <BackButton />
      </div>
    );
  }

  if (order.feedback_submitted) {
    return (
      <div className="py-10 text-center">
        <div className="border p-3 rounded mb-3">
          You have already submitted feedback for this order.
        </div>
        <BackButton />
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-semibold">Leave Feedback</h1>
      <p className="text-sm text-gray-700">
        {order.listing.title} -{" "}
        <Link
          className="text-blue-700"
          href={"/users/" + order.listing.user.username}
        >
          {order.listing.user.username}
        </Link>
      </p>
      <Separator className="mt-2 mb-5" />
      <FeedbackForm orderNumber={order.number} />
    </div>
  );
}
