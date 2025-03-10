import NiceModal from "@ebay/nice-modal-react";

import UserEnter from "@/views/dialogs/user/enter.tsx";
import ImagesModalViewer from "@/views/dialogs/images/modal-viewer.tsx";
import WManager from "@/views/dialogs/workbench/w-manager.tsx";
import WNew from "@/views/dialogs/workbench/w-new.tsx";


export const dialogIdsRegister = {
  userEnter: "user-enter",
  imagesModalViewer: "images-modal-viewer",
  workbenchManager: "workbench-manager",
  workbenchNew: "workbench-new",
};

NiceModal.register(dialogIdsRegister.userEnter, UserEnter);
NiceModal.register(dialogIdsRegister.imagesModalViewer, ImagesModalViewer);
NiceModal.register(dialogIdsRegister.workbenchManager, WManager);
NiceModal.register(dialogIdsRegister.workbenchNew, WNew);
