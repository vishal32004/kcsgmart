// store/user-slice.ts
import { StateCreator } from "zustand";
import { User } from "@/types/Auth";
import { Store } from "@/types/store";

export interface UserSlice {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const createUserSlice: StateCreator<
  Store,
  [["zustand/immer", never], ["zustand/devtools", never], ["zustand/persist", unknown], ["zustand/subscribeWithSelector", never]],
  [],
  UserSlice
> = (set) => ({
  user: null,
  isLoggedIn: false,

  setUser: (user) =>
    set((state) => {
      state.user = user;
      state.isLoggedIn = true;
    }, false, "setUser"),

  clearUser: () =>
    set((state) => {
      state.user = null;
      state.isLoggedIn = false;
    }, false, "clearUser"),
});
