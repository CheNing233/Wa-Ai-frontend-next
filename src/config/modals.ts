import NiceModal from "@ebay/nice-modal-react";

import UserEnter from "@/pages/user/enter.tsx";


export const modalIdsRegister = {
  userEnter: "user-enter"
};

NiceModal.register(modalIdsRegister.userEnter, UserEnter);
