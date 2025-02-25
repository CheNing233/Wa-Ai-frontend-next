import { useUserStore } from "@/stores/userStore.ts";
import { app } from "@/app/app.tsx";
import { useEffect, useState } from "react";


export const useUserVM = () => {
  const user = useUserStore((state) => state.user);
  const userState = useUserStore((state) => state.userState);

  return {
    user,
    userState,
  };
};
