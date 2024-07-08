"use client";

import { Button } from "./ui/button";

export default function BackButton() {
  return (
    <Button
      className="bg-blue-800 hover:bg-blue-900"
      onClick={() => window.history.back()}
    >
      Go Back
    </Button>
  );
}
