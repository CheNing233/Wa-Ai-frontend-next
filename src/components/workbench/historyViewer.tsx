import { Button } from "@heroui/button";
import { CopyCheck, Download, Eye, EyeOff, Heart, Info, Send, Settings, Star, ZoomIn } from "lucide-react";
import { ScrollShadow } from "@heroui/scroll-shadow";
import NiceModal from "@ebay/nice-modal-react";
import { useState } from "react";

import { WaterfallItems, XCNWaterfall } from "../../../../../WebstormProjects/xcn-waterfall";

import ImageCard from "@/components/common/image-card.tsx";
import { modalIdsRegister } from "@/config/modals.ts";
import { Card, CardBody } from "@heroui/card";
import TiltCard from "@/components/tilt-card.tsx";
import { Image } from "@heroui/image";
import { Tooltip } from "@heroui/tooltip";


const _generateItems = () => {
  const randomObjects: any[] = [];

  for (let i = 0; i < 50; i++) {
    const w = Math.floor(Math.random() * (1024 - 512 + 1)) + 512;  // 随机宽度在512到1024之间
    const h = Math.floor(Math.random() * (1024 - 512 + 1)) + 512;
    const id = "id-" + Math.random().toString(36).substr(2, 9) + new Date().getTime();

    const obj = {
      id: id,
      content: ({ item }: { item: WaterfallItems }) => {
        return (
          <div className={"w-full h-full p-2"}>
            <ImageCard
              height={item.height}
              src={"/test.png"}
              // title={item.id}
              // userAvatarUrl={"https://avatars.githubusercontent.com/u/32773451?v=4"}
              // userNickName={"xChenNing"}
              width={item.width}
              onCardClick={() => {
                console.log("clicked", item.id);
                NiceModal.show(modalIdsRegister.imagesModalViewer).finally();
              }}
            />
          </div>
        );
      },
      width: w,
      height: h
    };

    randomObjects.push(obj);
  }

  return randomObjects;
};

export default function HistoryViewer() {
  const [data, setData] = useState(_generateItems());

  const [showViewer, setShowViewer] = useState(true);

  return (
    <Card className={"w-full"}>
      <CardBody className={"flex flex-row gap-2 overflow-hidden"}>

        {showViewer && <div className={
          "flex-1 animate-appearance-in pt-7"
        }>
          <div className={
            "absolute top-0 left-1/2 -translate-x-1/2 " +
            "flex flex-row gap-2 z-10"
          }>
            <Tooltip content={"发帖"}>
              <Button
                color={"primary"} isIconOnly={true}
                size={"sm"}
                variant={"shadow"}
              >
                <Send size={20} />
              </Button>
            </Tooltip>

            <Tooltip content={"喜欢"}>
              <Button
                isIconOnly={true}
                size={"sm"}
              >
                <Heart size={20} />
              </Button>
            </Tooltip>

            <Tooltip content={"收藏"}>
              <Button
                isIconOnly={true}
                size={"sm"}
              >
                <Star size={20} />
              </Button>
            </Tooltip>

            <Tooltip content={"查看详情"}>
              <Button
                isIconOnly={true}
                size={"sm"}
              >
                <ZoomIn size={20} />
              </Button>
            </Tooltip>

            <Tooltip content={"下载"}>
              <Button
                isIconOnly={true}
                size={"sm"}
              >
                <Download size={20} />
              </Button>
            </Tooltip>
          </div>

          <TiltCard
            cardAspectRatio={"832/1216"}
            cardMaxHeight={"calc(100dvh - 128px - 84px)"}
            cardSlot={(
              <Image
                isBlurred={true}
                src={"/test.png"}
                style={{
                  aspectRatio: "832/1216"
                }}
              />
            )}
          />
        </div>}

        <div className={
          "relative flex flex-col gap-2 " +
          (showViewer ? "basis-52" : "flex-1")
        }>
          <div className={"flex-1 flex flex-row justify-end gap-2"}>
            <Tooltip content={"显示预览"}>
              <Button
                isIconOnly={true} size={"sm"}
                onPress={() => setShowViewer(!showViewer)}
              >
                <Eye className={showViewer ? "inline" : "hidden"} size={20} />
                <EyeOff className={!showViewer ? "inline" : "hidden"} size={20} />
              </Button>
            </Tooltip>

            <Tooltip content={"多选"}>
              <Button isIconOnly={true} size={"sm"}>
                <CopyCheck size={20} />
              </Button>
            </Tooltip>

            <Tooltip content={"设置"}>
              <Button isIconOnly={true} size={"sm"}>
                <Settings size={20} />
              </Button>
            </Tooltip>
          </div>

          <ScrollShadow
            className={"flex-none h-[calc(100dvh-128px-64px)]"}
            id={"quick-start-task-history"}
          >
            <XCNWaterfall
              columnsGroup={{
                xs: 1,
                sm: 3
              }}
              data={data}
              debugMode={false}
              scrollContainer={"#quick-start-task-history"}
            />
          </ScrollShadow>
        </div>
      </CardBody>
    </Card>
  );
}
