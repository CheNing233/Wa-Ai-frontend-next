import { FC } from "react";


export abstract class BaseDataCls {
  abstract raw_data: any;
  abstract imageUrl: string | null;

  abstract getId(): string

  abstract getImageUrl(signal: AbortSignal): Promise<string | null>

  abstract getImageCard(): FC<any>
}
