"use client";

import { useSession } from "@/app/(auth)/useSession";

export default function getUser() {
  return useSession.getState().user;
}
