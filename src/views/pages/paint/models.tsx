import { Select, SelectItem } from "@heroui/select";
import { useState } from "react";

import { WaterfallItems, XCNWaterfall } from "../../../../../../WebstormProjects/xcn-waterfall";

import ImageCard from "@/components/common/image-card.tsx";
import Container from "@/components/common/container.tsx";
import { FilterDropdown } from "@/components/common/filter-dropdown.tsx";
import { modelsFilter } from "@/config/filters.tsx";

const _generateItems = () => {
  const randomObjects: WaterfallItems[] = [];

  for (let i = 0; i < 50; i++) {
    const w = Math.floor(Math.random() * (1024 - 512 + 1)) + 512;  // 随机宽度在512到1024之间
    const h = Math.floor(Math.random() * (1024 - 512 + 1)) + 512;
    const id = "id-" + Math.random().toString(36).substr(2, 9) + new Date().getTime();

    const obj: WaterfallItems = {
      id: id,
      content: () => {
        return (
          <div className={"w-full h-full p-2"}>
            <ImageCard
              height={h}
              src={"/test.png"}
              title={id}
              userAvatarUrl={"https://avatars.githubusercontent.com/u/32773451?v=4"}
              userNickName={"xChenNing"}
              width={w}
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

export default function ModelsPage() {
  const [data, setData] = useState(_generateItems());

  return (
    <Container>
      <div className={"w-full py-2"}>
        <div className={"flex flex-row flex-nowrap items-center gap-3"}>
          <h2 className={"text-2xl flex-1 block"}>
            模型
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
          <FilterDropdown
            filterSets={modelsFilter}
          />
        </div>
        <p className={"opacity-50"}>
          今天要用什么模型求导呢？
        </p>
        <div className={"block w-[calc(100%+1rem)] py-5 -ml-2"}>
          <XCNWaterfall
            data={data}
            scrollContainer={"#main"}
          />
        </div>
      </div>
    </Container>
  );
}
