import NiceModal from "@ebay/nice-modal-react";

import UserEnter from "@/pages/user/enter.tsx";
import ImagesModalViewer from "@/pages/images/modal-viewer.tsx";


export const modalIdsRegister = {
  userEnter: "user-enter",
  imagesModalViewer: "images-modal-viewer"
};

NiceModal.register(modalIdsRegister.userEnter, UserEnter);
NiceModal.register(modalIdsRegister.imagesModalViewer, ImagesModalViewer);
