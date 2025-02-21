import { Button } from "@heroui/button";
import { ArrowLeftRight, PlusIcon, Settings, Smartphone, TvMinimal, X, Zap } from "lucide-react";
import { ReactNode, useState } from "react";
import { Input, Textarea } from "@heroui/input";
import { Slider } from "@heroui/slider";
import { Card, CardBody } from "@heroui/card";
import { ScrollShadow } from "@heroui/scroll-shadow";
import ModelCard from "@/components/ui/model-card.tsx";
import Container from "@/components/ui/container.tsx";
import HistoryViewer from "@/components/workbench/historyViewer.tsx";
import { Select, SelectItem } from "@heroui/select";

function Tittle(
  {
    title,
    subTitle
  }: {
    title: string | ReactNode,
    subTitle: string | ReactNode
  }
) {
  return (
    <div className={"flex flex-col gap-1"}>
      <h2 className={"text-large"}>{title}</h2>
      <p className={"text-sm opacity-60"}>{subTitle}</p>
    </div>
  );
}

function Selector() {
  const [selectedOption, setSelectedOption] = useState("832x1216");

  const options = {
    "1216x832": <TvMinimal size={16} />,
    "832x1216": <Smartphone size={16} />,
    "1152x896": <TvMinimal size={16} />,
    "896x1152": <Smartphone size={16} />
  };

  return (
    <div className={"flex flex-col gap-3"}>
      <div className={"flex flex-row gap-3 flex-wrap"}>
        {options && Object.entries(options).map(
          ([key, value]) => (
            <Button
              key={key}
              className={"flex flex-col h-12 gap-1"}
              color={selectedOption === key ? "primary" : "default"}
              variant={selectedOption === key ? "shadow" : "flat"}
              onPress={() => setSelectedOption(key)}
            >
              {value}
              <span className={"text-xs"}>{key}</span>
            </Button>
          )
        )}
        <Button
          className={"flex flex-col h-12 gap-1 min-w-[87.32px]"}
          color={selectedOption === "custom" ? "primary" : "default"}
          variant={selectedOption === "custom" ? "shadow" : "flat"}
          onPress={() => setSelectedOption("custom")}
        >
          <Settings size={16} />
          <span className={"text-xs"}>自定义</span>
        </Button>
      </div>
      {selectedOption === "custom" && <div className={"flex flex-row flex-nowrap items-center gap-2"}>
        <Input
          className={"flex-1"}
          defaultValue={"1216"}
          label={"宽度"}
          labelPlacement={"outside"}
          placeholder={"宽度"}
          size={"sm"}
        />
        <X size={20} />
        <Input
          className={"flex-1"}
          defaultValue={"832"}
          label={"高度"}
          labelPlacement={"outside"}
          placeholder={"高度"}
          size={"sm"}
        />
      </div>}
    </div>
  );
}


export default function Start() {

  return (
    <Container>
      <div className={"w-full flex flex-row gap-3"} id={"quick-start-main-page"}>

        <div className={"basis-1/3 relative"}>

          <ScrollShadow className={
            "pr-3 pb-10 overflow-y-scroll h-[calc(100dvh-128px-78px)] " +
            "flex flex-col gap-8 "
          }>
            <div className={"flex flex-col gap-3"}>
              <Tittle
                subTitle={"选择一个或多个模型，模型决定生成图像的风格"}
                title={"模型选择"}
              />

              <ModelCard
                as={"card"}
                rightSlot={
                  <div className={"text-xs opacity-75"}>
                    <ArrowLeftRight className={"inline"} size={16} />&nbsp;更换底模
                  </div>
                }
              />

              <Button
                className={"border-dotted"}
                startContent={<PlusIcon size={20} />}
                variant={"bordered"}
              >
                添加风格模型
              </Button>
            </div>

            <div className={"flex flex-col gap-3"}>
              <Tittle
                subTitle={"提示词，用于引导模型生成符合要求的图片"}
                title={"图片创意描述"}
              />

              <Textarea
                minRows={6}
                placeholder={"请使用多个「英文单词」来描述你想要生成的内容，并使用「英文逗号」隔开"}
              />
            </div>

            <div className={"flex flex-col gap-3"}>
              <Tittle
                subTitle={"设置模型如何生成"}
                title={"参数设置"}
              />

              <Card>
                <CardBody>
                  <Slider
                    defaultValue={0}
                    endContent={<p className={"text-nowrap text-xs opacity-50"}>创意</p>}
                    fillOffset={0}
                    getValue={(donuts) => {
                      if ((donuts as number) > 0) return `更创意发散（${donuts}）`;
                      else if ((donuts as number) < 0) return `更相关服从（${donuts}）`;
                      else return `平衡（${donuts}）`;
                    }}
                    label="创意相关度"
                    maxValue={5}
                    minValue={-5}
                    showTooltip={false}
                    size="sm"
                    startContent={<p className={"text-nowrap text-xs opacity-50"}>相关</p>}
                  />
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <span className={"text-sm mb-1"}>图片大小</span>
                  <span className={"text-xs mb-3 opacity-50"}>推荐使用以下系统给定的预设大小，不推荐自定义</span>
                  <Selector />
                </CardBody>
              </Card>
            </div>

            <div className={"flex flex-col gap-3"}>
              <Tittle
                subTitle={"反向提示词，用于引导模型远离该内容"}
                title={<>不希望呈现的内容<span className={"text-sm opacity-50"}>（非必填）</span></>}
              />

              <Textarea
                defaultValue={""}
                minRows={6}
                placeholder={"请使用多个「英文单词」来描述，并使用「英文逗号」隔开"}
              />
            </div>
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
          <HistoryViewer />
        </div>
      </div>
    </Container>
  );
}
