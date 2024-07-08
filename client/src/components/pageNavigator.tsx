"use client";

import useQueryParams from "@/lib/util/useQueryParams";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function PageNavigator({
  currentPage,
  pageCount,
}: {
  currentPage: number;
  pageCount: number;
}) {
  const { queryParams, setQueryParams } = useQueryParams();
  let buttons: Array<React.JSX.Element> = [];

  if (pageCount < 2) return null;

  if (pageCount <= 5) {
    for (let i = 1; i <= pageCount; i++) {
      buttons.push(
        <PageButton key={i} number={i} active={currentPage === i} />
      );
    }
  } else {
    let show = 5;

    let start = currentPage - 2;
    let end = currentPage + 2;

    if (start < 1) {
      start = 1;
      end = currentPage + (show - currentPage);
    }
    if (end > pageCount) {
      end = pageCount;
      start = currentPage - (show - 1 - (pageCount - currentPage));
    }

    console.log(start);
    console.log(end);
    for (let i = start; i <= end; i++) {
      buttons.push(
        <PageButton key={i} number={i} active={currentPage === i} />
      );
    }
  }

  function nextPage() {
    if (currentPage !== pageCount) {
      setQueryParams({ page: currentPage + 1 });
    }
  }

  function lastPage() {
    if (currentPage > 1) {
      setQueryParams({ page: currentPage - 1 });
    }
  }

  return (
    <div className="w-full flex justify-center mt-10">
      <div className="border rounded-full h-9 flex overflow-hidden justify-between w-full max-w-lg">
        <div
          onClick={() => lastPage()}
          className={cn(
            "basis-full text-center leading-8 cursor-pointer flex items-center justify-center hover:bg-gray-100",
            currentPage <= 1 && "opacity-30 cursor-default hover:bg-white"
          )}
        >
          <Image
            src="/assets/icons/arrow-left-black.png"
            width={20}
            height={20}
            alt=""
          />
        </div>
        {buttons.map((button) => button)}
        <div
          onClick={() => nextPage()}
          className={cn(
            "basis-full text-center leading-8 cursor-pointer flex items-center justify-center hover:bg-gray-100",
            currentPage === pageCount &&
              "opacity-30 cursor-default hover:bg-white"
          )}
        >
          <Image
            src="/assets/icons/arrow-right-black.png"
            width={20}
            height={20}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

function PageButton({ active, number }: { active: boolean; number: number }) {
  const { queryParams, setQueryParams } = useQueryParams();

  return (
    <div
      className={cn(
        "basis-full text-center leading-8 cursor-pointer hover:bg-gray-100",
        active && " bg-blue-800 text-white hover:bg-blue-900"
      )}
      onClick={() => {
        setQueryParams({ page: number });
      }}
    >
      {number}
    </div>
  );
}
