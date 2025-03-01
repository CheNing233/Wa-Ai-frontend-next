import { BaseDataCls } from "@/app/api/dataclass/base.ts";
import { app } from "@/app/app.tsx";
import { WaterfallItems } from "../../../../../WebstormProjects/xcn-waterfall";
import { FC } from "react";


// 会在 WaterfallTool 中注入参数
export interface WaterfallImageCardProps {
  // itemData 保存渲染配置和State
  itemData: WaterfallItems;
  // itemCls 原始数据类，提供原始数据方法
  itemCls: BaseDataCls;
}


export class WaterfallTool {
  private constructor() {
  }

  static async buildWaterfallItem(
    dataCls: BaseDataCls,
    imageCard: FC<WaterfallImageCardProps>,
    signal: AbortSignal
  ) {
    const imageUrl = await dataCls.getImageUrl(signal);

    if (!imageUrl) throw new Error("[buildWaterfallItem] imageUrl is null");

    const { width, height } = await app.staticImage.getImageDimensions(imageUrl as string);

    const Card = imageCard;

    return {
      id: dataCls.getId(),
      width: width,
      height: height,
      content: ({ item }: { item: WaterfallItems }) => {
        return (
          <div className={"w-full h-full p-2"}>
            <Card itemCls={dataCls} itemData={item} />
          </div>
        );
      },
      dataCls: dataCls
    } as WaterfallItems;
  }
}
