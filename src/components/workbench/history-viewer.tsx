import { Button } from "@heroui/button";
import { CopyCheck, Download, Eye, EyeOff, Heart, Send, Settings, Star, ZoomIn } from "lucide-react";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { useEffect, useRef, useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { Tooltip } from "@heroui/tooltip";

import { WaterfallItems, XCNWaterfall } from "../../../../../WebstormProjects/xcn-waterfall";
import TiltCard from "@/components/tilt-card.tsx";
import { TaskDataCls } from "@/app/api/dataclass/task.tsx";
import { app } from "@/app/app.tsx";
import { WaterfallTool } from "@/app/tools/waterfall.tsx";
import { TaskCard } from "@/components/waterfall/taskImageCard.tsx";
import { SelectionController, SelectionControllerElement } from "@/components/tools/selection-controller.tsx";


export default function HistoryViewer() {
  const selectedControllerRef = useRef<SelectionControllerElement>(null);

  const [data] = useState<WaterfallItems[]>([]);

  const [showViewer, setShowViewer] = useState(true);
  const [selectedMode, setSelectedMode] = useState<"single" | "multi">("single");
  const [currentItem, setCurrentItem] = useState<WaterfallItems | null>(null);

  const abortController = useRef<AbortController>(new AbortController());

  useEffect(() => {
    abortController.current.abort();
    abortController.current = new AbortController();

    const handleSelectionChange = (e: any) => {
      const item = (e as CustomEvent<WaterfallItems>).detail;

      setCurrentItem(item || null);
    };

    if (selectedControllerRef.current)
      selectedControllerRef.current.eventTarget.addEventListener("selectionChange", handleSelectionChange);

    return () => {
      abortController.current.abort();

      if (selectedControllerRef.current)
        selectedControllerRef.current.eventTarget.removeEventListener("selectionChange", handleSelectionChange);
    };
  }, []);

  const handleRequestBottomMore: (reqCount: number) => Promise<WaterfallItems[]> =
    (reqCount) => {
      return new Promise<WaterfallItems[]>(
        (resolve, reject) => {
          app.task.getTaskByUser({
            page: reqCount,
            pageSize: 12
          })
            .then((taskDataClsList: TaskDataCls[]) => {
              const promiseList: Promise<WaterfallItems>[] = [];

              if (taskDataClsList.length > 0) {
                for (const taskCls of taskDataClsList) {
                  promiseList.push(WaterfallTool.buildWaterfallItem(
                    taskCls,
                    TaskCard,
                    abortController.current.signal
                  ));
                }
              }

              Promise.all(promiseList)
                .then((waterfallItems: WaterfallItems[]) => {
                  resolve(waterfallItems);
                })
                .catch(reject);
            })
            .catch(reject);
        }
      );
    };

  return (
    <Card className={"w-full"}>
      <CardBody className={"flex flex-row gap-2 overflow-hidden"}>

        {showViewer && <div className={
          "flex-1 animate-appearance-in pt-7"
        }>
          <div className={
            "absolute top-0 left-1 " +
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
                onPress={() => {
                  currentItem?.dataCls?.downloadImage(
                    currentItem?.dataCls?.imageUrl,
                    currentItem?.dataCls?.id
                  );
                }}
              >
                <Download size={20} />
              </Button>
            </Tooltip>
          </div>

          <TiltCard
            cardAspectRatio={`${currentItem?.width || 600}/${currentItem?.height || 600}`}
            cardMaxHeight={"calc(100dvh - 128px - 84px)"}
            cardMaxWidth={"calc(100% - 16px)"}
            cardSlot={(
              <Image
                className={"object-contain"}
                isBlurred={true}
                src={currentItem?.dataCls?.imageUrl}
                style={{
                  opacity: 1,
                  aspectRatio: `${currentItem?.width || 600}/${currentItem?.height || 600}`
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
              <Button
                color={selectedMode === "multi" ? "primary" : "default"} isIconOnly={true}
                size={"sm"}
                variant={selectedMode === "multi" ? "shadow" : "solid"}
                onPress={() => setSelectedMode(selectedMode === "single" ? "multi" : "single")}
              >
                <CopyCheck size={20} />
              </Button>
            </Tooltip>

            <Tooltip content={"设置"}>
              <Button isIconOnly={true} size={"sm"}>
                <Settings size={20} />
              </Button>
            </Tooltip>
          </div>

          <SelectionController
            ref={selectedControllerRef}
            selectedMode={selectedMode}
          >
            <ScrollShadow
              className={"flex-none h-[calc(100dvh-128px-64px)] __id_task_history"}
            >
              <XCNWaterfall
                columnsGroup={{
                  xs: 1,
                  sm: 3
                }}
                data={data}
                debugMode={false}
                scrollContainer={".__id_task_history"}
                onRequestBottomMore={handleRequestBottomMore}
              />
            </ScrollShadow>
          </SelectionController>
        </div>
      </CardBody>
    </Card>
  );
}
