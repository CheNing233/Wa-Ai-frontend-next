import { TaskType } from "@/app/api/model/task.ts";
import { app } from "@/app/app.tsx";
import { useXCNWaterfallItem, WaterfallItems } from "../../../../../../WebstormProjects/xcn-waterfall";
import ImageCard from "@/components/common/image-card.tsx";
import { FC } from "react";
import { BaseDataCls } from "@/app/api/dataclass/base.ts";

import { TaskCard } from "@/components/waterfall/taskImageCard.tsx";
import SelectionWrapper from "@/components/tools/selection-controller.tsx";



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

  async getImageUrl(signal: AbortSignal) {
    if (this.imageUrl) return this.imageUrl;

    const url = await app.staticImage.getStaticImageUrlById({
      id: this.raw_data.id,
      signal: signal
    });

    if (url) {
      this.imageUrl = url;
    }

    return url;
  }

  getImageCard() {
    return TaskCard;
  }
}
