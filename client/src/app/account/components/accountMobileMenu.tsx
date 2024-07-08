"use client";

import Image from "next/image";
import AccountMenu from "./accountMenu";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function AccountMobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <div className="lg:hidden">
      <div
        className="flex items-center gap-2 py-2 px-5 sm:px-8 w-full bg-gray-50 cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Image
          src="/assets/icons/menu-blue.png"
          width={25}
          height={25}
          alt=""
        />
        <p className="text-sm text-blue-700">Account Menu</p>
      </div>

      <div className={cn("", menuOpen ? "block" : "hidden")}>
        <AccountMenu />
      </div>
      <Separator />
    </div>
  );
}
