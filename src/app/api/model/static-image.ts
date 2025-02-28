import { BaseResponse } from "@/app/api/model/base.ts";

export interface GetStaticImageUrlByIdParams {
  id: string;
}

export type GetStaticImageUrlByIdResult = string

export type GetStaticImageUrlByIdResponse = BaseResponse<GetStaticImageUrlByIdResult>;
