import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";

import { WaterfallItems, XCNWaterfall } from "../../../../../WebstormProjects/xcn-waterfall";

import ImageCard from "@/components/ui/image-card.tsx";
import CheckboxSection from "@/components/ui/checkbox-section.tsx";
import Container from "@/components/ui/container.tsx";
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

const FilterDropdown = () => {
  const [open, setOpen] = useState(false);

  const [filters, setFilters] = useState<string[]>([])

  return (
    <Popover
      isOpen={open}
      placement={"bottom-end"}
      onOpenChange={setOpen}
    >
      <PopoverTrigger>
        <Button
          color={filters.length === 0 ? "default" : "success"}
          size={"lg"}
          variant={filters.length === 0 ? "solid" : "shadow"}
        >
          <div className={"absolute w-full h-full py-1.5 px-3"}>
            <div className={"flex flex-row flex-nowrap items-center"}>
              <div className={"flex-grow flex flex-col items-start justify-start w-full h-full"}>
                <span className={"text-xs text-default-600"}>筛选</span>
                <span className={"text-sm text-default-foreground"}>
                  {filters.length === 0
                    ? "未选择"
                    : `已选${filters.length}个`
                  }
                </span>
              </div>
              <div className={"flex-shrink"}>
                {open
                  ? <ChevronUp size={16} />
                  : <ChevronDown size={16} />
                }
              </div>
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className={"p-4 max-w-sm"}>
        <CheckboxSection
          sections={modelsFilter}
          selected={filters}
          onSelectedChange={setFilters}
        />
      </PopoverContent>
    </Popover>
  );
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
          <FilterDropdown />
        </div>
        <p className={"opacity-50"}>
          今天要用什么模型求导呢？
        </p>
        <div className={"block w-[calc(100%+1rem)] py-5 -ml-2"}>
          <XCNWaterfall
            data={data}
          />
        </div>
      </div>
    </Container>
  );
}
