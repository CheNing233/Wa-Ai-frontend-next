import { TaskType } from "@/app/api/model/task.ts";
import { app } from "@/app/app.tsx";
import { useXCNWaterfallItem, WaterfallItems } from "../../../../../../WebstormProjects/xcn-waterfall";
import SelectionWrapper from "@/components/common/selection-wrapper.tsx";
import ImageCard from "@/components/common/image-card.tsx";
import { FC } from "react";
import { BaseDataCls } from "@/app/api/dataclass/base.ts";

export interface TaskCardProps {
  itemData: WaterfallItems;
  itemCls: TaskDataCls;
}


const TaskCard: FC<TaskCardProps> = (
  // 会在 WaterfallTool 中注入参数
  { itemCls, itemData }
) => {
  const { item, updateItem } = useXCNWaterfallItem(itemData.id);

  return (
    <SelectionWrapper
      isMultiSelect={true}
      isSelected={item?.isSelected || false}
    >
      <ImageCard
        height={item.height}
        src={itemCls.imageUrl || ""}
        // title={item.id}
        // userAvatarUrl={"https://avatars.githubusercontent.com/u/32773451?v=4"}
        // userNickName={"xChenNing"}
        width={item.width}
        onCardClick={() => {
          updateItem({
            isSelected: !item?.isSelected || false
          });
        }}
      />
    </SelectionWrapper>
  );
};

export class TaskDataCls extends BaseDataCls {
  raw_data: TaskType;
  imageUrl: string | null = null;

  constructor(raw_data: TaskType) {
    super();
    this.raw_data = raw_data;
  }

  getId(): string {
    return this.raw_data.id;
  }

  async getImageUrl() {
    if (this.imageUrl) return this.imageUrl;

    const url = await app.staticImage.getStaticImageUrlById({ id: this.raw_data.id });

    if (url) {
      this.imageUrl = url;
    }

    return url;
  }

  getImageCard() {
    return TaskCard;
  }
}
