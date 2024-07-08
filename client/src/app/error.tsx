"use client";

import { Button } from "@/components/ui/button";
import Error from "next/error";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.log(error);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="-mt-24">
        <h1 className="w-full text-center text-5xl font-display text-gray-500">
          Something went wrong!
        </h1>
        <p className="text-gray-500 text-sm">
          Please try again later or{" "}
          <Link href="/support" className="text-blue-700 underline">
            contact support
          </Link>{" "}
          if this issue persists.
        </p>
        <div className="flex justify-center gap-2 my-4">
          <Button
            className="bg-blue-800 hover:bg-blue-900"
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
          <Button variant="secondary" onClick={() => reset()}>
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
