import NiceModal, { useModal } from "@ebay/nice-modal-react";
import {
  Button,
  Input,
  Listbox,
  ListboxItem,
  Modal,
  ModalContent,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Selection,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip
} from "@heroui/react";
import { SpinWrapper } from "@/components/common/spin-wrapper.tsx";
import { ChevronDownIcon, FileJson, Play, PlusIcon, SearchCode, SearchIcon, Trash } from "lucide-react";
import { EditableText } from "@/components/common/editable-text.tsx";
import { useParamFormsVM } from "@/viewModels/useParamFormsVM.tsx";
import { useCallback, useMemo, useState } from "react";
import useTableVM, { ColumnType, RowType } from "@/viewModels/useTableVM.tsx";
import { debounce } from "lodash";
import { dialogIdsRegister } from "@/config/dialogs.ts";

const rows: RowType[] = [
  {
    key: "1",
    name: (
      <EditableText
        text={"工作台-未命名"}
        onEditEnd={
          () => {

          }
        }
      />
    ),
    type: "TXT2IMG",
    action: (
      <Button>
        编辑
      </Button>
    ),
    modifyAt: "2023-07-01 12:00:00",
    createAt: "2023-07-01 12:00:00"
  }
];

const columns: ColumnType[] = [
  {
    key: "name",
    label: "名称"
  },
  {
    key: "type",
    label: "类型"
  },
  {
    key: "modifyAt",
    label: "最后变更时间"
  },
  {
    key: "createAt",
    label: "创建时间"
  },
  {
    key: "action",
    label: "操作"
  }
];

const getKeyValue = (obj: any, key: string) => {
  return obj[key];
};


const WManager = NiceModal.create(function _WorkbenchManager() {
  const modal = useModal();
  const {
    forms,
    currentId,
    setCurrentId
  } = useParamFormsVM();

  const [visibleColumns, setVisibleColumns] = useState<Selection>(() => {
    return new Set(columns.map(col => col.key));
  });

  const formRows = useMemo(() => {
    let rows: RowType[] = [];

    forms.forEach(f => {
      rows.push({
        key: f.id,
        alias: f.alias,
        name: (
          <EditableText
            text={f.alias}
            onEditEnd={
              (newText) => {
                console.log(newText);
              }
            }
          />
        ),
        type: f.type,
        action: (
          <div className={"flex flex-row gap-1"}>
            <Tooltip content={"使用"}>
              <Button
                color={f.id === currentId ? "primary" : "default"}
                isIconOnly={true}
                size={"sm"}
                variant={"flat"}
                onPress={() => {
                  setCurrentId(f.id);
                  modal.hide().finally();
                }}
              >
                <Play size={20} />
              </Button>
            </Tooltip>

            <Tooltip content={"查看参数"}>
              <Button
                isIconOnly={true}
                size={"sm"}
                variant={"flat"}
                onPress={() => {

                }}
              >
                <SearchCode size={20} />
              </Button>
            </Tooltip>

            <Tooltip content={"下载JSON"}>
              <Button
                isIconOnly={true}
                size={"sm"}
                variant={"flat"}
                onPress={() => {

                }}
              >
                <FileJson size={20} />
              </Button>
            </Tooltip>


            <Tooltip content={"删除"}>
              <Button
                color={"danger"}
                isDisabled={forms.length === 1}
                isIconOnly={true}
                size={"sm"}
                variant={"flat"}
                onPress={() => {

                }}
              >
                <Trash size={20} />
              </Button>
            </Tooltip>
          </div>
        ),
        modifyAt: f.modifyAt,
        createAt: f.createdAt
      });
    });

    return rows;
  }, [forms]);

  const {
    sortedData: sortedFormRows,
    filterMatchers,
    setFilterMatcher,
    removeFilterMatcher
  } = useTableVM(formRows);

  const formCols = useMemo(() => {
    let cols: ColumnType[] = [];

    for (const key of visibleColumns) {
      const col = columns.find(col => col.key === key);

      if (col) {
        cols.push(col);
      }
    }

    return cols;
  }, [visibleColumns]);

  const handleSearch = useCallback(
    debounce((value: string) => {
      if (value) {
        setFilterMatcher(
          "search-matcher",
          (row: RowType) => (row.alias as string).includes(value)
        );
      } else {
        removeFilterMatcher("search-matcher");
      }
    }, 500),
    [setFilterMatcher, removeFilterMatcher]
  );

  return (
    <Modal
      // TODO wait toast fix
      // backdrop={"blur"}
      hideCloseButton={true}
      isOpen={modal.visible}
      placement="center"
      size={"5xl"}
      onOpenChange={() => modal.hide()}
    >
      <ModalContent className={"overflow-visible"}>
        {(onClose) => {
          return (
            <SpinWrapper cursor={"not-allowed"} isLoading={false}>
              <div className={"absolute overflow-visible left-0 top-0 __id_w_manager_top_content"} />

              <div className={"flex flex-col gap-4 p-3"}>

                <div className="flex flex-row gap-3 justify-between">
                  <Input
                    isClearable
                    className="w-full sm:max-w-[44%]"
                    placeholder="搜索名称..."
                    startContent={<SearchIcon />}
                    onValueChange={handleSearch}
                  />

                  <div className="flex flex-row gap-3 items-end">
                    {/*<Popover*/}
                    {/*  placement={"bottom"}*/}
                    {/*  portalContainer={document.querySelector(".__id_w_manager_top_content")!}*/}
                    {/*>*/}
                    {/*  <PopoverTrigger>*/}
                    {/*    <Button*/}
                    {/*      endContent={<ChevronDownIcon size={20} />}*/}
                    {/*      variant="flat"*/}
                    {/*    >*/}
                    {/*      类型*/}
                    {/*    </Button>*/}
                    {/*  </PopoverTrigger>*/}
                    {/*  <PopoverContent tabIndex={-1}>*/}
                    {/*    <Listbox*/}
                    {/*      aria-label="Multiple selection example"*/}
                    {/*      disallowEmptySelection={true}*/}
                    {/*      selectedKeys={visibleColumns}*/}
                    {/*      selectionMode={"multiple"}*/}
                    {/*      variant="flat"*/}
                    {/*      onSelectionChange={setVisibleColumns}*/}
                    {/*    >*/}
                    {/*      {columns.map((column) => (*/}
                    {/*        <ListboxItem key={column.key}>*/}
                    {/*          {column.label}*/}
                    {/*        </ListboxItem>*/}
                    {/*      ))}*/}
                    {/*    </Listbox>*/}
                    {/*  </PopoverContent>*/}
                    {/*</Popover>*/}

                    <Popover
                      placement={"bottom"}
                      portalContainer={document.querySelector(".__id_w_manager_top_content")!}
                    >
                      <PopoverTrigger>
                        <Button
                          endContent={<ChevronDownIcon size={20} />}
                          variant="flat"
                        >
                          显示列
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent tabIndex={-1}>
                        <Listbox
                          aria-label="Multiple selection example"
                          disallowEmptySelection={true}
                          selectedKeys={visibleColumns}
                          selectionMode={"multiple"}
                          variant="flat"
                          onSelectionChange={setVisibleColumns}
                        >
                          {columns.map((column) => (
                            <ListboxItem key={column.key}>
                              {column.label}
                            </ListboxItem>
                          ))}
                        </Listbox>
                      </PopoverContent>
                    </Popover>

                    <Button
                      color="primary"
                      endContent={<PlusIcon size={20} />}
                      onPress={() => {
                        NiceModal.show(dialogIdsRegister.workbenchNew).finally();
                      }}
                    >
                      新建工作台
                    </Button>
                  </div>
                </div>

                <div className={"flex-1 min-h-72"}>
                  <Table
                    aria-label="workbench-manager"
                    removeWrapper={true}
                    selectionMode={"none"}
                  >
                    <TableHeader columns={formCols}>
                      {(column) => (
                        <TableColumn key={column.key}>{column.label}</TableColumn>
                      )}
                    </TableHeader>
                    <TableBody items={sortedFormRows}>
                      {(item: any) => (
                        <TableRow key={item.key}>
                          {(columnKey) => (
                            <TableCell>
                              {getKeyValue(item, String(columnKey))}
                            </TableCell>
                          )}
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
