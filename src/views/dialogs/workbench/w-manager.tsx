import NiceModal, { useModal } from "@ebay/nice-modal-react";
import {
  Button,
  getKeyValue,
  Modal,
  ModalContent,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@heroui/react";
import { SpinWrapper } from "@/components/common/spin-wrapper.tsx";
import { Plus } from "lucide-react";

const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active"
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused"
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active"
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation"
  }
];

const columns = [
  {
    key: "name",
    label: "NAME"
  },
  {
    key: "role",
    label: "ROLE"
  },
  {
    key: "status",
    label: "STATUS"
  }
];


const WManager = NiceModal.create(function _WorkbenchManager() {
  const modal = useModal();


  return (
    <Modal
      // TODO wait toast fix
      // backdrop={"blur"}
      isOpen={modal.visible}
      placement="center"
      size={"5xl"}
      onOpenChange={() => modal.hide()}
    >
      <ModalContent>
        {(onClose) => {
          return (
            <SpinWrapper cursor={"not-allowed"} isLoading={false}>
              <div className={"flex flex-col gap-4 p-3"}>
                <div className={"shrink flex flex-row gap-2 items-center"}>
                  <Button
                    className={"text-sm"}
                    color={"primary"}
                    size={"sm"}
                    startContent={<Plus size={20} />}
                    variant={"shadow"}
                  >
                    新建工作台
                  </Button>
                </div>

                <div className={"flex-1"}>
                  <Table
                    aria-label="workbench-manager"
                    removeWrapper={true}
                    selectionMode={"multiple"}
                  >
                    <TableHeader columns={columns}>
                      {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={rows}>
                      {(item) => (
                        <TableRow key={item.key}>
                          {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>

                </div>
              </div>
            </SpinWrapper>
          );
        }}
      </ModalContent>
    </Modal>
  );
});

export default WManager;
