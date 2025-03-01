import { FC } from "react";
import { WaterfallImageCardProps } from "@/app/tools/waterfall.tsx";
import { useXCNWaterfallItem } from "../../../../../WebstormProjects/xcn-waterfall";
import ImageCard from "@/components/common/image-card.tsx";
import SelectionWrapper, { useSelectionController } from "@/components/tools/selection-controller.tsx";

export const TaskCard: FC<WaterfallImageCardProps> = (
  { itemCls, itemData }
) => {
  const { item, updateItem, updateItemByFunc, dataContext } = useXCNWaterfallItem(itemData.id);
  const { isMultiSelect, click } = useSelectionController(
    item,
    dataContext.sortedData,
    updateItem,
    updateItemByFunc
  );

  return (
    <SelectionWrapper
      isMultiSelect={isMultiSelect}
      isSelected={item?.isSelected || false}
    >
      <ImageCard
        height={item.height}
        src={itemCls.imageUrl || ""}
        // title={item.id}
        // userAvatarUrl={"https://avatars.githubusercontent.com/u/32773451?v=4"}
        // userNickName={"xChenNing"}
        width={item.width}
        onCardClick={() => click()}
      />
    </SelectionWrapper>
  );
};
