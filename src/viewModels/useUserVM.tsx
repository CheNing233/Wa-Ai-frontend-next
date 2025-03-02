import { useEffect, useState } from "react";
import { addToast } from "@heroui/toast";

import { useUserStore } from "@/stores/userStore.ts";
import { $app } from "@/app/app.tsx";
import { SendEmailCodeParams } from "@/app/api/model/user.ts";


let sendEmailCodeCoolingTime = 0;
const eventPub = new EventTarget();

export const useUserVM = () => {
  const user = useUserStore((state) => state.user);
  const userState = useUserStore((state) => state.userState);

  const [, setFresh] = useState(0);

  useEffect(() => {
    eventPub.addEventListener("cooling", (e: any) => {
      setFresh(e.detail);
    });

    return () => {
      eventPub.removeEventListener("cooling", (e: any) => {
        setFresh(e.detail);
      });
    };
  }, []);

  const sendEmailCode = async (p: SendEmailCodeParams) => {
    if (sendEmailCodeCoolingTime > 0) {
      addToast(
        {
          title: "请稍后",
          description: "不要发那么频繁喵",
          color: "warning"
        }
      );

      return;
    }

    sendEmailCodeCoolingTime = 60;
    eventPub.dispatchEvent(new CustomEvent("cooling", { detail: sendEmailCodeCoolingTime }));

    let timer: any = setInterval(() => {
      if (sendEmailCodeCoolingTime > 0) {
        sendEmailCodeCoolingTime -= 1;
        eventPub.dispatchEvent(new CustomEvent("cooling", { detail: sendEmailCodeCoolingTime }));
      } else {
        clearInterval(timer);
        eventPub.dispatchEvent(new CustomEvent("cooling", { detail: 0 }));
        timer = undefined;
      }
    }, 1000);

    await $app.user.sendEmailCode(p);
  };

  return {
    user,
    userState,
    sendEmailCode,
    sendEmailCodeCoolingTime
  };
};
