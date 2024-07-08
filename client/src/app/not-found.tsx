"use client";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="h-[calc(100vh-57px)] flex flex-col items-center justify-center">
      <h1 className="font-display text-9xl text-gray-400">404</h1>
      <h2 className="font-display text-5xl text-gray-400">Page Not Found.</h2>
      <Button
        className="bg-blue-800 mt-5 w-32"
        onClick={() => window.history.back()}
      >
        Go Back!
      </Button>
    </div>
  );
}
