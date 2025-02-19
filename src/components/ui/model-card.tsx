import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { Chip } from "@heroui/chip";
import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";
import { CopyIcon, InfoIcon, Settings } from "lucide-react";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { ReactNode } from "react";

export interface ModelCardProps {
  as?: "div" | "card";
  rightSlot?: ReactNode;
}

export default function ModelCard(
  {
    as = "card",
    rightSlot
  }: ModelCardProps
) {

  const Content = () => {
    return (
      <div className={"flex flex-row gap-3"}>
        <Image
          className={"flex-none w-16 h-16 object-cover"}
          src={"/test.png"}
        />
        <div
          className={"flex-1 flex flex-col gap-1 pt-1"}
        >
          <div className={"flex-shrink flex flex-row items-center gap-2"}>
            <Chip size={"sm"}>
              Checkpoint
            </Chip>

            <Tooltip
              content={"模型详情"}
            >
              <Button
                className={"h-6 min-w-6 w-6"}
                isIconOnly={true} radius={"full"} size={"sm"}
              >
                <InfoIcon size={14} />
              </Button>
            </Tooltip>

            <Tooltip
              content={"复制模型名称"}
            >
              <Button
                className={"h-6 min-w-6 w-6"}
                isIconOnly={true} radius={"full"} size={"sm"}
              >
                <CopyIcon size={14} />
              </Button>
            </Tooltip>

            <div className={"flex-1"} />

            {rightSlot}
          </div>

          <div className={"-mx-1.5"}>
            <Accordion
              className={"flex-1"}
              itemClasses={{
                trigger: "py-0 h-8"
              }}
            >
              <AccordionItem
                key="model-setting"
                aria-label="model-setting"
                className={"relative w-full"}
                indicator={<Settings size={20} />}
                isCompact={true}
                title={(
                  <div className={"absolute top-1.5 w-[calc(100%-1rem)]"}>
                    <h2
                      aria-label={"123"}
                      className={"font-semibold text-medium text-white w-full truncate text-start"}
                      title={"123"}
                    >
                      {"123 AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"}
                    </h2>
                  </div>
                )}
              >
                暂无可调参数
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    );
  };

  switch (as) {
    case "card":
      return (
        <Card className={"w-full"} isPressable={true}>
          <CardBody className={"overflow-visible"}>
            <Content />
          </CardBody>
        </Card>
      );
    case "div":
      return (
        <div className={"w-full"}>
          <Content />
        </div>
      );
  }
}
