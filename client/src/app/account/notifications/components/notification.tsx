"use client";

import axios, { AxiosError } from "axios";

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

export default function Notification({
  notification,
}: {
  notification: notification;
}) {
  async function markNotificationReadandRedirect() {
    if (notification.status === "unread") {
      await axios
        .post(
          process.env.NEXT_PUBLIC_API_URL + "/notifications",
          { notificationID: notification.id },
          {
            withCredentials: true,
          }
        )
        .catch((err: AxiosError) => {
          console.log(err);
        });
    }
    if (notification.reference) {
      window.location.replace(notification.reference);
    }
  }

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  } as const;

  return (
    <div
      onClick={() => markNotificationReadandRedirect()}
      className="w-full flex gap-3 items-start justify-start p-3 bg-gray-50 rounded cursor-pointer"
    >
      <div>
        {notification.status === "unread" ? (
          <div className="w-3 h-3 rounded-full bg-green-600 m-2"></div>
        ) : (
          <div className="w-3 h-3 rounded-full bg-gray-300 m-2"></div>
        )}
      </div>
      <div>
        <p className="font-semibold">{notification.title}</p>
        <p className="text-xs text-gray-400">
          {new Date(notification.created_date).toLocaleDateString(
            undefined,
            dateOptions
          )}
        </p>
        <p className="text-sm text-gray-600">{notification.description}</p>
      </div>
    </div>
  );
}
