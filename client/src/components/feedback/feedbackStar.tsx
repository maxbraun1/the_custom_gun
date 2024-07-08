"use client";

import Image from "next/image";

export default function FeedbackStar({
  size,
  active,
}: {
  size?: number;
  active: boolean;
}) {
  return (
    <Image
      src="/assets/icons/star.png"
      width={size || 25}
      height={size || 25}
      alt=""
      draggable="false"
      className={active ? "" : "grayscale"}
    />
  );
}
