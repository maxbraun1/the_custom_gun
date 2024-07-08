import axios, { AxiosError, AxiosResponse } from "axios";
import { cookies } from "next/headers";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

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

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
} as const;

export default async function NotificationsCard({
  className,
}: {
  className: string;
}) {
  let notifications: Array<notification> = await getNotifications();
  notifications = notifications.slice(0, 3);

  return (
    <Card className={cn("", className)}>
      <CardHeader className="p-3 font-semibold">Notifications</CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-3 p-3 mb-auto">
        {notifications.length > 0 ? (
          notifications.map((notification: notification, index: number) => {
            return (
              <div
                key={index}
                className="w-full flex gap-3 items-start justify-start p-3 bg-gray-50 rounded"
              >
                <div>
                  {notification.status === "unread" ? (
                    <div className="w-3 h-3 rounded-full bg-green-600 m-2"></div>
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-gray-300 m-2"></div>
                  )}
                </div>
                <div>
                  <p className="font-semibold line-clamp-1">
                    {notification.title}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(notification.created_date).toLocaleDateString(
                      undefined,
                      dateOptions
                    )}
                  </p>
                  <p className="text-sm text-gray-600">
                    {notification.description}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-gray-500">No notifications found...</p>
        )}
      </CardContent>
      <Separator />
      <CardFooter className="px-3 py-2">
        <Link
          href="/account/notifications"
          className="text-blue-700 flex items-center gap-1 text-sm"
        >
          View Notifications{" "}
          <Image
            src="/assets/icons/arrow-right.png"
            width={10}
            height={10}
            alt=""
          />
        </Link>
      </CardFooter>
    </Card>
  );
}
