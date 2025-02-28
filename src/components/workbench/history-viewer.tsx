import { Button } from "@heroui/button";
import { CopyCheck, Download, Eye, EyeOff, Heart, Send, Settings, Star, ZoomIn } from "lucide-react";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { Tooltip } from "@heroui/tooltip";

import { WaterfallItems, XCNWaterfall } from "../../../../../WebstormProjects/xcn-waterfall";
import TiltCard from "@/components/tilt-card.tsx";
import SelectionWrapper from "@/components/common/selection-wrapper.tsx";
import { app } from "@/app/app.tsx";
import { TaskDataCls } from "@/app/api/dataclass/task.tsx";
import { WaterfallTool } from "@/app/tools/waterfall.tsx";


export default function HistoryViewer() {
  const [data, setData] = useState();

  const [showViewer, setShowViewer] = useState(true);

  const handleRequestBottomMore: (reqCount: number) => Promise<WaterfallItems[]> =
    async (reqCount) => {
      const taskDataClsList: TaskDataCls[] = await app.task.getTaskByUser({
        page: reqCount,
        pageSize: 12
      });

      const promiseList: Promise<WaterfallItems>[] = [];

      if (taskDataClsList.length > 0) {
        for (const taskCls of taskDataClsList) {
          promiseList.push(WaterfallTool.buildWaterfallItem(taskCls));
        }
      }

      const newWaterfallItems: WaterfallItems[] = await Promise.all(promiseList);

      return newWaterfallItems;
    };

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

          <SelectionWrapper
            isMultiSelect={false}
            isSelected={false}
          >
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
          </SelectionWrapper>

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
            id={"task-history"}
          >
            <XCNWaterfall
              columnsGroup={{
                xs: 1,
                sm: 3
              }}
              data={data}
              debugMode={false}
              scrollContainer={"#task-history"}
              onRequestBottomMore={handleRequestBottomMore}
            />
          </ScrollShadow>
        </div>
      </CardBody>
    </Card>
  );
}
