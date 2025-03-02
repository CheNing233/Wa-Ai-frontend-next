import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Form, Input, Modal, ModalContent, Select, SelectItem } from "@heroui/react";
import { SpinWrapper } from "@/components/common/spin-wrapper.tsx";
import { useParamFormsVM } from "@/viewModels/useParamFormsVM.tsx";


const WNew = NiceModal.create(function _WorkbenchNew() {
  const modal = useModal();
  const {
    forms,
    currentId,
    setCurrentId
  } = useParamFormsVM();

  return (
    <Modal
      // TODO wait toast fix
      // backdrop={"blur"}
      isOpen={modal.visible}
      placement="center"
      onOpenChange={() => modal.hide()}
    >
      <ModalContent className={"overflow-visible"}>
        {(onClose) => {
          return (
            <SpinWrapper cursor={"not-allowed"} isLoading={false}>
              <Form className={"p-3"}>
                <Input
                  label={"名称"}
                  name={"name"}
                  placeholder={"名称"}
                />

                <Select
                  name={"type"}
                  placeholder={"类型"}
                >
                  <SelectItem key={"txt2img"}>
                    TXT2IMG
                  </SelectItem>
                </Select>
              </Form>
            </SpinWrapper>
          );
        }}
      </ModalContent>
    </Modal>
  );
});

export default WNew;
