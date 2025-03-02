import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Modal, ModalContent } from "@heroui/react";
import { useEffect, useState } from "react";

import UserLogin from "@/views/dialogs/user/login.tsx";
import UserForgetPassword from "@/views/dialogs/user/forget-pwd.tsx";
import UserRegister from "@/views/dialogs/user/register.tsx";
import { useUserVM } from "@/viewModels/useUserVM.tsx";

type UserEnterForms = "login" | "register" | "forgetPassword";

const UserEnter = NiceModal.create(function _UserEnter() {
  const modal = useModal();

  const [currentForm, setCurrentForm] = useState<UserEnterForms>("login");

  const { userState } = useUserVM();

  useEffect(() => {
    if (userState === "loggedIn") {
      modal.hide().finally();
    }
  }, [userState]);

  return (
    <Modal
      // TODO wait toast fix
      // backdrop={"blur"}
      isOpen={modal.visible}
      placement="center"
      onOpenChange={() => modal.hide()}
    >
      <ModalContent>
        {(onClose) => {
          switch (currentForm) {
            case "login":
              return (
                <UserLogin
                  onForgetPassword={() => setCurrentForm("forgetPassword")}
                  onRegister={() => setCurrentForm("register")}
                />
              );
            case "register":
              return (
                <UserRegister
                  onLogin={() => setCurrentForm("login")}
                />
              );
            case "forgetPassword":
              return (
                <UserForgetPassword
                  onLogin={() => setCurrentForm("login")}
                />
              );
          }
        }}
      </ModalContent>
    </Modal>
  );
});

export default UserEnter;
