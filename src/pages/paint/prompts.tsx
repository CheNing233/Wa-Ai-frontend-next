import { Input } from "@heroui/input";
import { Card, CardBody } from "@heroui/card";
import { Switch } from "@heroui/switch";
import { Tab, Tabs } from "@heroui/tabs";
import { Button } from "@heroui/button";
import { Copy, HelpCircle, Send, Trash2 } from "lucide-react";

import Container from "@/components/ui/container.tsx";

export default function PromptsPage() {
  let tabs = [
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
        <div className={"block w-full pt-5 h-[calc(80dvh-5rem)]"}>


          <div className={"h-full w-full flex flex-col flex-nowrap gap-3"}>
            <div className={"flex-1"}>
              <Card className={"h-full relative"}>
                <CardBody>
                  这里是输入框
                </CardBody>
              </Card>
            </div>
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
            <div className={"basis-2/3 w-full"}>
              <Tabs
                className={"flex justify-start w-full"}
                classNames={{
                  panel: "px-0"
                }}
                items={tabs}
              >
                {(item) => (
                  <Tab key={item.id} title={item.label}>
                    <Card className={"h-full"}>
                      <CardBody className={"flex flex-row flex-wrap gap-3"}>
                        <Button>
                          1girl
                        </Button>
                        <Button>
                          medium breasts
                        </Button>
                        <Button>
                          white shirt
                        </Button>
                        <Button>
                          black pleated skirt
                        </Button>
                        <Button>
                          bare thighs
                        </Button>
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
