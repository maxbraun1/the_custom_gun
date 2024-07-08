"use client";

import { Input } from "@/components/ui/input";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SearchFinishes() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [finishes, setFinishes] = useState<Array<Finish> | null>(null);
  const [results, setResults] = useState<Array<Finish> | null>(null);

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/finishes")
      .then((response) => {
        setFinishes(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    search();
  }, [searchTerm]);

  function search() {
    if (searchTerm.length > 0 && finishes) {
      setResults(
        finishes.filter((finish) =>
          finish.display.toLowerCase().includes(searchTerm.toLowerCase())
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
          placeholder="Search Finishes..."
          onKeyDown={(e) => enterPressedOnSearch(e)}
        />
      </div>

      <div className="border rounded p-5 flex flex-col gap-2">
        {results ? (
          results.map((finish, index) => {
            return (
              <Link
                className="underline hover:text-blue-600"
                href={"/search?ffinish=" + finish.value}
                key={index}
              >
                {finish.display}
              </Link>
            );
          })
        ) : (
          <p className="text-center text-sm text-gray-500">
            No finishes found. Please search for finishes in the search bar
            above.
          </p>
        )}
      </div>
    </div>
  );
}
