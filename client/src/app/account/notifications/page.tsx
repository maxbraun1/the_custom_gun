import axios, { AxiosError, AxiosResponse } from "axios";
import { cookies } from "next/headers";
import Notification from "./components/notification";
import NothingFound from "@/components/nothingFound";

async function getNotifications() {
  return await axios
    .get(process.env.NEXT_PUBLIC_API_URL + "/notifications", {
      withCredentials: true,
      headers: {
        Cookie: cookies().toString(),
      },
    })
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((err: AxiosError) => {
      console.log(err);
      return null;
    });
}

interface notification {
  id: string;
  created_date: Date;
  user_id: string;
  status: string;
  title: string;
  description: string;
  reference: string;
  urgent: boolean;
}

export default async function Notifications() {
  const notifications = await getNotifications();

  return (
    <div className="p-8 flex flex-col basis-full">
      <h1 className="font-display text-3xl">Notifications</h1>
      <div className="flex flex-col gap-3 pt-5 items-stretch basis-full">
        {notifications.length <= 0 && (
          <NothingFound message="No Notifications Found" />
        )}
        {notifications.length > 0 &&
          notifications.map((notification: notification, index: number) => {
            return <Notification key={index} notification={notification} />;
          })}
      </div>
    </div>
  );
}
