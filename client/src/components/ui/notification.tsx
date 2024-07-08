"use client";

import Image from "next/image";

export function Notification({
  type,
  message,
  urgent,
}: {
  type: "success" | "error";
  message: string;
  urgent?: boolean;
}) {
  let border = "";
  if (urgent && type === "error") {
    border = " border-red-300";
  }
  if (urgent && type === "success") {
    border = " border-green-500";
  }
  return (
    <div
      className={
        "w-full border rounded text-sm p-3 my-5 flex gap-3 items-center" +
        border
      }
    >
      {type === "success" && (
        <Image width={18} height={18} alt="" src="/assets/icons/check.png" />
      )}
      {type === "error" && (
        <Image width={18} height={18} alt="" src="/assets/icons/x.png" />
      )}
      <p>{message}</p>
    </div>
  );
}
