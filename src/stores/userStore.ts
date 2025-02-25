import { create } from "zustand";
import { persist } from "zustand/middleware";

import { UserType } from "@/app/user.ts";

type UserState = {
  user: UserType | null
  userState: "pending" | "loggedIn" | "loggedOut"
}

type UserActions = {
  setUser: (partialUser: Partial<UserType>) => void
  clearUser: () => void

  setUserState: (state: "pending" | "loggedIn" | "loggedOut") => void
}


export const useUserStore = create<UserState & UserActions>()(
  persist(
    (set) => ({
      user: null,
      userState: "pending",

      // 更新用户信息（支持部分更新）
      setUser: (partialUser) =>
        set((state) => ({
          user: {
            ...state.user,
            ...partialUser
          } as UserType
        })),

      // 清空用户信息
      clearUser: () => set({ user: null }),

      // 更新用户状态
      setUserState: (state) => set({ userState: state })
    }),
    {
      name: "user-storage" // localStorage 的键名
    }
  )
);
