"use client";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { cn } from "@/lib/utils";
import SearchSidebar from "./searchSidebar";

export default function SearchMobileSidebar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <div
        className={cn(
          "flex items-center gap-2 py-2 px-5 w-full bg-gray-50 cursor-pointer transition-all",
          menuOpen ? "justify-end" : ""
        )}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Image
          src="/assets/icons/menu-blue.png"
          width={25}
          height={25}
          alt=""
        />
        <p className="text-sm text-blue-700">Filters</p>
      </div>

      <div
        className={cn(
          "flex w-screen max-w-lg fixed top-[59px] bottom-0 bg-white flex-col transition-all",
          menuOpen ? "left-0" : "-left-full"
        )}
      >
        <div
          className="absolute p-2 top-3 right-3"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/assets/icons/x-black.png"
            width={20}
            height={20}
            alt=""
          />
        </div>
        <SearchSidebar />
      </div>
      <Separator />
    </div>
  );
}
