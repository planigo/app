import { User } from "@/models/user.model";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface UserStore {
  currentUser: User;
  setCurrentUser: (user: User) => void;
}

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        currentUser: {
          id: "0676cd6f-b82e-11ed-b521-0242ac150002",
          firstname: "Customer",
          lastname: "Client",
          email: "customer@gmail.com",
          role: "customer",
          isEmailVerified: true
        },
        setCurrentUser: (user: User) => {
          console.log(user, 'new user')
        }
      }),
      { name: 'users' }
    )
  )
);
