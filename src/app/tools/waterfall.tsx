import { BaseDataCls } from "@/app/api/dataclass/base.ts";
import { app } from "@/app/app.tsx";
import { WaterfallItems } from "../../../../../WebstormProjects/xcn-waterfall";


export class WaterfallTool {
  private constructor() {
  }

  static async buildWaterfallItem(
    dataCls: BaseDataCls
  ) {
    console.log("[buildWaterfallItem] getImageUrl");
    const imageUrl = await dataCls.getImageUrl();
    console.log("[buildWaterfallItem] getImageUrl end");

    if (!imageUrl) throw new Error("[buildWaterfallItem] imageUrl is null");

    const { width, height } = await app.staticImage.getImageDimensions(imageUrl as string);
    const Card = dataCls.getImageCard();

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
      }
    } as WaterfallItems;
  }
}
