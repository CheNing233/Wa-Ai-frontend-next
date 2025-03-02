import { ScrollShadow } from "@heroui/scroll-shadow";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { ChevronDown, Download, RefreshCcw, Zap } from "lucide-react";
import { Select, SelectItem } from "@heroui/select";
import HistoryViewer from "@/components/workbench/history-viewer.tsx";
import { Chip } from "@heroui/chip";
import { ParamFormRenderer } from "@/components/workbench/param-form-renderer.tsx";
import { $app } from "@/app/app.tsx";
import { useParamFormsVM } from "@/viewModels/useParamFormsVM.tsx";
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@heroui/dropdown";
import { Kbd } from "@heroui/kbd";
import NiceModal from "@ebay/nice-modal-react";
import { dialogIdsRegister } from "@/config/dialogs.ts";

const FormDropdown = () => {
  const { forms, currentId, setCurrentId } = useParamFormsVM();

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          className={"text-xs font-bold pl-1"}
          endContent={<ChevronDown size={14} />}
          radius={"md"}
          size={"sm"}
          variant={"bordered"}
        >
          <Kbd className={"text-xs font-bold"}>实时保存</Kbd>
          {forms.find(f => f.id === currentId)?.alias || "未选择工作台"}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownSection title={"操作"}>
          <DropdownItem key="new">新建工作台</DropdownItem>
          <DropdownItem
            key="edit"
            onPress={() => {
              NiceModal.show(dialogIdsRegister.workbenchManager).finally();
            }}
          >
            管理工作台
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title={"本地已保存"}>
          {
            forms.map(f => (
              <DropdownItem
                key={f.id}
                onPress={() => setCurrentId(f.id)}
              >
                <div className={"flex flex-row items-center gap-2"}>
                  <div className={"flex flex-col gap-1"}>
                    <span className={"flex flex-row gap-2 items-center font-semibold"}>
                      {f.alias}
                      <Kbd className={"text-xs"}>
                        {f.type.toUpperCase()}
                      </Kbd>
                    </span>
                    <span className={"text-xs opacity-50"}>{f.createdAt}</span>
                  </div>
                </div>
              </DropdownItem>
            ))
          }
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};


export default function A1111() {
  const formsConfig = $app.paramForm.loadConfig("ti2i");

  return (
    <div className={
      "relative w-[calc(100%-20px)] h-[calc(100dvh-64px-26px)] mx-2.5 my-3 " +
      "flex flex-col gap-3"
    }>
      <div className={
        "flex-shrink " +
        "flex flex-row items-center gap-3 flex-nowrap"
      }>
        <Chip
          color={"success"}
          radius={"md"}
          size={"lg"}
          variant={"dot"}
        >
          <span className={"font-bold text-xs"}>WA - SDWebUI</span>
        </Chip>

        <FormDropdown />

        <div className={"flex-1"} />

        <Button
          className={"flex-shrink"}
          isIconOnly={true}
          size={"sm"}
          startContent={<RefreshCcw size={16} />}
        />
        <Button
          className={"flex-shrink"}
          isIconOnly={true}
          size={"sm"}
          startContent={<Download size={16} />}
        />
      </div>

      <div className={"flex-1 h-full"}>
        <div className={"w-full flex flex-row gap-3"} id={"A1111 main page"}>

          <div className={"basis-1/3 relative"}>

            <ScrollShadow className={
              "pr-3 pb-10 overflow-y-scroll h-[calc(100dvh-128px-78px)] " +
              "flex flex-col gap-8 "
            }>
              {/*TODO 多选项卡 */}
              <ParamFormRenderer formConfig={formsConfig} />
            </ScrollShadow>

            <div className={"mt-3 mr-[calc(1rem+2px)]"}>
              <Card className={"w-full"}>
                <CardBody className={"flex flex-row gap-2"}>
                  <Button
                    className={"flex-1"}
                    color={"warning"}
                    startContent={<Zap size={16} />}
                    variant={"shadow"}
                  >
                    立即生成
                  </Button>
                  <Select
                    className={"basis-24"}
                    defaultSelectedKeys={["1"]}
                    startContent={
                      <div className={"text-nowrap text-sm"}>数量:</div>
                    }
                  >
                    <SelectItem key={"1"}>1</SelectItem>
                    <SelectItem key={"2"}>2</SelectItem>
                    <SelectItem key={"4"}>4</SelectItem>
                    <SelectItem key={"8"}>8</SelectItem>
                  </Select>
                </CardBody>
              </Card>
            </div>
          </div>

          <div className={"flex-1"}>
            <HistoryViewer key={"A1111"} />
          </div>
        </div>
      </div>
    </div>
  )
    ;
};
