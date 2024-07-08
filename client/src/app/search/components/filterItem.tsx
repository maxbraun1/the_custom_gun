"use client";

import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import { useState } from "react";

export default function FilterItem({
  children,
  defaultOpen,
  name,
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
  name: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <div
        className={cn("rounded-md", open ? "bg-gray-50" : "hover:bg-gray-50")}
      >
        <div
          className="p-3 w-full flex justify-between items-center cursor-pointer"
          onClick={() => setOpen((current) => !current)}
        >
          <p className="text-sm font-semibold">{name}</p>
          <Image
            src="/assets/icons/expand-down.png"
            width={10}
            height={10}
            alt=""
            className={open ? "rotate-180" : ""}
          />
        </div>
        {open && <div className="px-3 pb-3">{children}</div>}
      </div>
      <Separator />
    </div>
  );
}
