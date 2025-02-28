import { BaseResponse } from "@/app/api/model/base.ts";

export enum TaskStatus {
  created = 0, // 已创建
  running = 1, // 运行中
  success = 2, // 成功
  failed = 3, // 失败
  deleted = 4, // 删除
  unknown = 9, // 未知
}

export type TaskType = {
  id: string,
  userId: number,
  nickName: string,
  type: string,
  priority: number,
  status: TaskStatus,
  imageId: string,
  createTime: string,
  updateTime: string,
}

export interface GetTaskByUserParams {
  page: number;
  pageSize: number;
}

export interface GetTaskByUserResult {
  list: TaskType[];
}

export type GetTaskByUserResponse = BaseResponse<GetTaskByUserResult>;
