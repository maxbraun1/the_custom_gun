"use client";

import { useSession } from "@/app/(auth)/useSession";
import { useEffect } from "react";

export default function SessionUpdater({ session }: { session: boolean }) {
  useEffect(() => {
    if (!session) {
      useSession.setState({ user: null });
    }
  });

  return null;
}
