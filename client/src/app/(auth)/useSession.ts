import { user } from "@/lib/types/user";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface SessionState {
  user: user | null;
  setUser: (user: any) => void;
  logOut: () => void;
}

export const useSession = create<SessionState>()(
  persist(
    devtools((set) => ({
      user: null,
      setUser: (user) => set(() => ({ user: user })),
      logOut: () => set(() => ({ user: null })),
    })),
    {
      name: "Session",
    }
  )
);
