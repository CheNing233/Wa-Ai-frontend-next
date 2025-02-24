
// 响应接口
export interface BaseResponse<T> {
  /* 是否成功 */
  success: boolean;

  /* 请求代码 */
  code: number;

  /* 错误消息 */
  errorMsg: string;

  /* 数据 */
  data: T;

  [key: string]: any;
}
