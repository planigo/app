import { User } from "@planigo/core/lib/auth/domain/models/User.model"
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface UserStore {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        currentUser: null,
        setCurrentUser: (user: User | null) => {
          set({ currentUser: user });
        },
      }),
      {
        name: "user-store",
      }
    )
  )
);
