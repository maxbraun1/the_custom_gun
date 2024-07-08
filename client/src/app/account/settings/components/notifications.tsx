"use client";

import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import { useEffect, useState } from "react";

export default function NotificationSettings() {
  const [marketing, setMarketing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/email/marketing/check", {
        withCredentials: true,
      })
      .then((response) => {
        setMarketing(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  function marketingSubscribe(subscribe: boolean) {
    setMarketing((current) => !current);
    axios
      .put(
        process.env.NEXT_PUBLIC_API_URL + "/email/marketing/set-subscription",
        { subscribe },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (!response.data) setMarketing((current) => !current);
      })
      .catch((error) => {
        setMarketing((current) => !current);
        console.log(error);
      });
  }

  return (
    <div className="flex flex-col gap-5 md:flex-row">
      <div className="basis-1/2">
        <h1 className="font-bold">Notifications</h1>
        <p className="text-xs text-gray-500 leading-5">
          Manage what notifications you receive.
        </p>
      </div>

      <div className="basis-1/2">
        <div className="flex justify-between items-center">
          <Label>Marketing Emails</Label>
          {loading ? (
            <LoadingSpinner size={20} className="w-16" />
          ) : (
            <Switch
              checked={marketing}
              onCheckedChange={(checked) => {
                marketingSubscribe(checked);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
