import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import { Download, HistoryIcon, RefreshCcw, Zap } from "lucide-react";
import { Divider } from "@heroui/divider";
import { Chip } from "@heroui/chip";


export default function Comfy() {
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
          <span className={"font-bold text-xs"}>WA - ComfyUI</span>
        </Chip>
        <div className={"flex-1"} />
        {/*<Button*/}
        {/*  className={"flex-shrink"}*/}
        {/*  color={"primary"}*/}
        {/*  startContent={<Send size={16} />}*/}
        {/*  variant={"shadow"}*/}
        {/*>*/}
        {/*  发布*/}
        {/*</Button>*/}
        {/*<Dropdown>*/}
        {/*  <DropdownTrigger>*/}
        {/*    <Button*/}
        {/*      className={"flex-shrink"}*/}
        {/*      color={"secondary"}*/}
        {/*      isIconOnly={true}*/}
        {/*      startContent={<Hammer size={16} />}*/}
        {/*    />*/}
        {/*  </DropdownTrigger>*/}
        {/*  <DropdownMenu>*/}
        {/*    <DropdownItem key={"insert"}>插入「快速输入」节点</DropdownItem>*/}
        {/*  </DropdownMenu>*/}
        {/*</Dropdown>*/}

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
        <Divider className={"h-7"} orientation={"vertical"} />
        <Button
          className={"flex-shrink basis-28"}
          color={"warning"}
          size={"sm"}
          startContent={<Zap size={16} />}
          variant={"shadow"}
        >
          <span className={"font-bold"}>立即生成</span>
        </Button>
        <Select
          className={"basis-[88px]"}
          defaultSelectedKeys={["1"]}
          size={"sm"}
          startContent={
            <div className={"text-nowrap text-xs font-bold"}>&nbsp;数量:</div>
          }
        >
          <SelectItem key={"1"}>1</SelectItem>
          <SelectItem key={"2"}>2</SelectItem>
          <SelectItem key={"4"}>4</SelectItem>
          <SelectItem key={"8"}>8</SelectItem>
        </Select>
        <Button
          className={"flex-shrink"}
          size={"sm"}
          startContent={<HistoryIcon size={16} />}
        >
          <span className={"font-bold"}>任务记录</span>
        </Button>
      </div>

      <Card className={"flex-1 h-full"}>
        <CardBody className={"p-0 overflow-hidden"}>
          <iframe
            className={"w-full h-full"}
            seamless={true}
            // src={"/test.html"}
            src={'http://localhost:5176'}
            title={"wa-comfy"}
          />
        </CardBody>
      </Card>
    </div>
  );
}
