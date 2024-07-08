"use client";

import { Separator } from "@/components/ui/separator";
import { listing } from "@/lib/types/listing";
import { user } from "@/lib/types/user";
import getUserClientSide from "@/lib/util/getUser";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Watch({ listing }: { listing: listing }) {
  const [loading, setLoading] = useState(true);
  const [isWatching, setIsWatching] = useState(false);
  const [user, setUser] = useState<null | user>(null);

  useEffect(() => {
    const user = getUserClientSide();
    setUser(user);
    if (user) {
      axios
        .get(process.env.NEXT_PUBLIC_API_URL + "/watches/check/" + listing.id, {
          withCredentials: true,
        })
        .then((response) => {
          setIsWatching(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, []);

  async function watch() {
    if (!loading) {
      setLoading(true);
      setIsWatching(true);
      await axios
        .post(
          process.env.NEXT_PUBLIC_API_URL + "/watches",
          { listing_id: listing.id },
          {
            withCredentials: true,
          }
        )
        .catch((error) => {
          console.log(error);
          setIsWatching(false);
        });
      setLoading(false);
    }
  }

  async function unWatch() {
    if (!loading) {
      setLoading(true);
      setIsWatching(false);
      await axios
        .delete(process.env.NEXT_PUBLIC_API_URL + "/watches/" + listing.id, {
          withCredentials: true,
        })
        .catch((error) => {
          console.log(error);
          setIsWatching(true);
        });
      setLoading(false);
    }
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Separator />
      <div className="w-full px-5 py-3 flex">
        {isWatching ? (
          <div
            onClick={() => unWatch()}
            className="flex gap-2 items-center px-3 py-1 border text-blue-700 border-blue-600 cursor-pointer rounded-full text-sm opacity-80 hover:opacity-100"
          >
            <Image
              src="/assets/icons/watch.png"
              width={20}
              height={20}
              alt=""
            />{" "}
            Watching
          </div>
        ) : (
          <div
            onClick={() => watch()}
            className="flex gap-2 items-center px-3 py-1 border border-gray-500 cursor-pointer rounded-full text-sm opacity-60 hover:opacity-80"
          >
            <Image
              className="grayscale"
              src="/assets/icons/watch.png"
              width={20}
              height={20}
              alt=""
            />{" "}
            Watch
          </div>
        )}
      </div>
    </>
  );
}
