"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  function search() {
    if (searchTerm.length > 0) {
      setSearchTerm("");
      window.location.replace("/search?term=" + searchTerm);
    }
  }

  function enterPressedOnSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      search();
    }
  }

  return (
    <div className="flex border rounded-lg overflow-hidden">
      <Input
        className="flex-grow border-0 rounded-none focus:ring-0 focus-visible:ring-0"
        value={searchTerm}
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        onKeyDown={(e) => enterPressedOnSearch(e)}
      />
      <div
        onClick={() => search()}
        className="basis-12 flex items-center justify-center cursor-pointer hover:bg-gray-100"
      >
        <Image src="/assets/icons/search.png" width={20} height={20} alt="" />
      </div>
    </div>
  );
}
