import { Input } from "@heroui/input";

import Container from "@/components/ui/container.tsx";
import { FilterDropdown } from "@/components/filter-dropdown.tsx";
import { modelsFilter } from "@/config/filters.tsx";

export default function PromptsPage() {

  return (
    <Container>
      <div className={"w-full py-2"}>
        <div className={"flex flex-row flex-nowrap items-center gap-3"}>
          <h2 className={"text-2xl flex-1 block"}>
            提示词
          </h2>
          <Input
            className={"basis-64"}
            label={"搜索关键词"}
            radius={"lg"}
            size={"sm"}
          />
          <FilterDropdown
            filterSets={modelsFilter}
          />
        </div>
        <p className={"opacity-50"}>
          新时代咒语词典大全喵！
        </p>
        <div className={"block w-full py-5"}>
          正在施工...
        </div>
      </div>
    </Container>
  );
}
