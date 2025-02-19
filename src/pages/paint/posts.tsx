import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { Plus } from "lucide-react";
import { WaterfallItems, XCNWaterfall } from "xcn-waterfall";
import { useState } from "react";
import NiceModal from "@ebay/nice-modal-react";

import Container from "@/components/ui/container.tsx";
import ImageCard from "@/components/ui/image-card.tsx";
import { modalIdsRegister } from "@/config/modals.ts";
import BackTop from "@/components/back-top.tsx";

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
              title={item.id}
              userAvatarUrl={"https://avatars.githubusercontent.com/u/32773451?v=4"}
              userNickName={"xChenNing"}
              width={item.width}
              withRankBar={true}
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

export default function PostsPage() {
  const [data, setData] = useState(_generateItems());

  return (
    <Container>
      <BackTop scrollContainer={"#main"} />

      <div className={"w-full py-2"}>
        <div className={"flex flex-row flex-nowrap items-center gap-3"}>
          <h2 className={"text-2xl flex-1 block"}>
            帖子
          </h2>
          <Select
            className={"flex-shrink flex-grow-0 w-28"}
            defaultSelectedKeys={["hot"]}
            label={"排序"}
            radius={"lg"}
            size={"sm"}
          >
            <SelectItem key={"hot"}>
              热门推荐
            </SelectItem>
            <SelectItem key={"new"}>
              最新发布
            </SelectItem>
          </Select>
          <Button
            color={"primary"}
            size={"lg"}
            startContent={<Plus size={20} />}
            variant={"shadow"}
            onPress={() => {
              NiceModal.show(modalIdsRegister.imagesModalViewer).finally();
            }}
          >
            发布帖子
          </Button>
        </div>
        <p className={"opacity-50"}>
          来看看魔法师们今天的创作吧！
        </p>
        <div className={"block w-[calc(100%+1rem)] py-5 -ml-2"}>
          <XCNWaterfall
            columnsGroup={{
              xs: 2,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 5
            }}
            data={data}
            debugMode={false}
            scrollContainer={"#main"}
          />
        </div>
      </div>
    </Container>
  );
}
