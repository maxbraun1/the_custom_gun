"use client";

import { useEffect, useState } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

export default function QuantitySelector({
  className,
  defaultValue,
  min,
  max,
  by,
  setter,
}: {
  className?: string;
  defaultValue: number;
  min: number;
  max: number;
  by: number;
  setter: Function;
}) {
  const [count, setCount] = useState(defaultValue);

  useEffect(() => {
    setter(count);
  }, [count]);

  function decreaseCount() {
    if (count - by >= min) {
      setCount((current) => current - by);
    }
  }

  function increaseCount() {
    if (count + by <= max) {
      setCount((current) => current + by);
    }
  }

  return (
    <div
      className={cn(
        "flex w-full justify-center gap-2 items-center text-md",
        className
      )}
    >
      <Button
        className="border bg-transparent text-black hover:bg-gray-100"
        onClick={() => decreaseCount()}
      >
        -
      </Button>
      <p className="p-2 border rounded-md w-16">{count}</p>
      <Button
        className="border bg-transparent text-black hover:bg-gray-100 text-md"
        onClick={() => increaseCount()}
      >
        +
      </Button>
    </div>
  );
}
