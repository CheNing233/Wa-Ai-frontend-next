import { Input } from "@heroui/input";
import { Card, CardBody } from "@heroui/card";
import { Switch } from "@heroui/switch";
import { Tab, Tabs } from "@heroui/tabs";
import { Button } from "@heroui/button";
import { Copy, HelpCircle, Send, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useXCNWaterfallItem, WaterfallItems, XCNWaterfall } from "../../../../../WebstormProjects/xcn-waterfall";

import Container from "@/components/ui/container.tsx";
import PromptButton from "@/components/ui/prompt-button.tsx";


function generateRandomPromptButtons(num: number) {
  function getRandomText(length: number, lang: "en" | "zh") {
    const chars = lang === "en"
      ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
      : "一二三四五六七八九十百千零万曰月年春夏秋冬我你他她它是的不在有在来去到的以为也着都在了能够可以爱更大小明白真是不可能好吧";

    let result = "";

    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
  }

  const objects = [];

  for (let i = 0; i < num; i++) {
    const primaryLength = Math.floor(Math.random() * 40) + 1; // Primary text between 1 and 40 chars
    const secondaryLength = Math.floor(Math.random() * 30) + 1; // Secondary text between 1 and 30 chars

    const primaryText = getRandomText(primaryLength, "en");
    const secondaryText = getRandomText(secondaryLength, "zh");

    objects.push(<PromptButton primaryText={primaryText} secondaryText={secondaryText} />);
  }

  return objects;
}

const PromptsCard = (props: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  // 通过 useXCNWaterfallItem 获取到当前卡片的 item 数据，并修改并重新渲染该卡片
  const {
    item, updateItem,
    initState, computedPosition, computedItemsInView, setItemsToRender
  } = useXCNWaterfallItem(props.name);

  const [data] = useState(generateRandomPromptButtons(100));

  useEffect(() => {
    const handleResize = () => {
      if (cardRef.current) {
        const cardHeight = cardRef.current.getBoundingClientRect().height;
        const cardWidth = cardRef.current.getBoundingClientRect().width;

        // console.log("id", props.name, "cardHeight", cardHeight, "cardWidth", cardWidth);
        updateItem({
          width: cardWidth,
          height: cardHeight + 12
        });
        initState();
        computedPosition();
        setItemsToRender(computedItemsInView());
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);

    if (cardRef.current)
      resizeObserver.observe(cardRef.current);

    return () => {
      if (cardRef.current)
        resizeObserver.unobserve(cardRef.current);
    };
  }, [cardRef.current]);

  return (
    <div className={"relative w-full"}>
      <div ref={cardRef} className={"absolute left-0 top-3 w-full"}>
        <div className={"flex flex-row flex-wrap gap-3"}>
          <PromptButton
            primaryText={"================== PAGE N =================="}
            secondaryText={"================== 页分割 =================="}
          />
          {data}
        </div>
      </div>
    </div>
  );
};

const generateWaterfallItems = (num: number) => {
  const items = [];

  for (let i = 0; i < num; i++) {
    const id = "id-" + Math.random().toString(36).substr(2, 9) + new Date().getTime();

    items.push(
      {
        id: id,
        width: 200,
        height: 200,
        content: () => <PromptsCard name={id} />
      } as WaterfallItems
    );
  }

  return items;
};

const WaterfallContainer = (
  {
    simuPrompts
  }: {
    simuPrompts: WaterfallItems[]
  }
) => {

  const scrollContainerRef = useRef(null);

  return (
    <div
      ref={scrollContainerRef}
      className={"w-full h-[80dvh] overflow-y-scroll overflow-x-hidden"}
    >
      <XCNWaterfall
        columns={1}
        data={simuPrompts}
        scrollContainerRef={scrollContainerRef}
      />
    </div>
  );
};

const tabs = [
  {
    id: "danbooru-tags",
    label: "Danbooru Tags 8w+",
    content: "Lorem ipsum agna aliqua. Ut enim ad miodo consequat."
  },
  {
    id: "rewwu",
    label: "人物",
    content: "Lorem ipsum agna aliqua. Ut enim ad miodo consequat."
  },
  {
    id: "cj",
    label: "场景",
    content: "Lorem ipsum agna aliqua. Ut enim ad miodo consequat."
  },
  {
    id: "dz",
    label: "动作",
    content: "Lorem ipsum agna aliqua. Ut enim ad miodo consequat."
  },
  {
    id: "jingtou",
    label: "镜头",
    content: "Lorem ipsum agna aliqua. Ut enim ad miodo consequat."
  }
];


export default function PromptsPage() {
  const [simuPrompts, setSimuPrompts] = useState(generateWaterfallItems(3));

  const bottomRef = useRef(null);

  return (
    <Container>
      <div className={"w-full py-2"}>
        <div className={"flex flex-row flex-nowrap items-center gap-3"}>
          <h2 className={"text-2xl flex-1 block"}>
            提示词
          </h2>
          <Button
            color={"primary"}
            size={"lg"}
            startContent={<Send size={20} />}
            variant={"shadow"}
          >
            发送到工作区
          </Button>
        </div>
        <p className={"opacity-50"}>
          新时代咒语词典大全喵！
        </p>
        <div className={
          "block w-full pt-5 "
          // + "h-[calc(80dvh-5rem)]"
        }>

          <div className={"h-full w-full flex flex-col flex-nowrap gap-3"}>

            {/*input box*/}
            <div className={"flex-1"}>
              <Card className={"h-[20dvh] relative"}>
                <CardBody>
                  这里是输入框
                </CardBody>
              </Card>
            </div>

            {/*tool bar*/}
            <div className={"flex-shrink"}>
              <div className={"flex flex-row flex-nowrap gap-3 items-center"}>
                <Button
                  isIconOnly={true}
                >
                  <Copy size={20} />
                </Button>

                <Button
                  isIconOnly={true}
                >
                  <Trash2 size={20} />
                </Button>

                <Button
                  isIconOnly={true}
                >
                  <HelpCircle size={20} />
                </Button>

                {/*<Button*/}
                {/*  startContent={<PanelTopClose size={20} />}*/}
                {/*>*/}
                {/*  收起编辑区*/}
                {/*</Button>*/}

                {/*<Button*/}
                {/*  startContent={<PanelBottomClose size={20} />}*/}
                {/*>*/}
                {/*  收起提示词云*/}
                {/*</Button>*/}

                <div className={"flex-1"} />
                <div>
                  <Switch size={"sm"}>
                    编辑框模式
                  </Switch>
                </div>
                <div>
                  <Input
                    placeholder={"搜索关键词"}
                  />
                </div>
              </div>
            </div>

            {/*prompts cloud*/}
            <div ref={bottomRef} className={"basis-2/3 w-full"}>
              <Tabs
                className={"flex justify-start w-full"}
                classNames={{
                  panel: "px-0"
                }}
                items={tabs}
              >
                {(item) => (
                  <Tab key={item.id} title={item.label}>
                    <Card className={"h-full relative"}>
                      <CardBody>
                        <WaterfallContainer simuPrompts={simuPrompts} />
                      </CardBody>
                    </Card>
                  </Tab>
                )}
              </Tabs>
            </div>
          </div>


        </div>
      </div>
    </Container>
  );
}
