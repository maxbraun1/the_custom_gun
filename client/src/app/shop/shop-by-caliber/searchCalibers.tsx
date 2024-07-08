"use client";

import { Input } from "@/components/ui/input";
import { Caliber } from "@/lib/types/caliber";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SearchCalibers() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [calibers, setCalibers] = useState<Array<Caliber> | null>(null);
  const [results, setResults] = useState<Array<Caliber> | null>(null);

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/calibers")
      .then((response) => {
        setCalibers(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    search();
  }, [searchTerm]);

  function search() {
    if (searchTerm.length > 0 && calibers) {
      setResults(
        calibers.filter((caliber) =>
          caliber.display.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setResults(null);
    }
  }

  function enterPressedOnSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      search();
    }
  }

  return (
    <div>
      <div className="flex border rounded-lg overflow-hidden my-5 divide-x">
        <div className="basis-12 flex items-center justify-center">
          <Image src="/assets/icons/search.png" width={20} height={20} alt="" />
        </div>
        <Input
          className="flex-grow border-0 rounded-none focus:ring-0 focus-visible:ring-0"
          value={searchTerm}
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Calibers..."
          onKeyDown={(e) => enterPressedOnSearch(e)}
        />
      </div>

      <div className="border rounded p-5 flex flex-col gap-2">
        {results ? (
          results.map((caliber, index) => {
            return (
              <Link
                className="underline hover:text-blue-600"
                href={"/search?caliber=" + caliber.value}
                key={index}
              >
                {caliber.display}
              </Link>
            );
          })
        ) : (
          <p className="text-center text-sm text-gray-500">
            No calibers found. Please search for calibers in the search bar
            above.
          </p>
        )}
      </div>
    </div>
  );
}
