import { BaseResponse } from "@/app/api/model/base.ts";

/**
 * 请求参数接口
 */

export interface LoginParams {
  /* 用户名 */
  userName?: string;
  /* 邮箱 */
  email?: string;
  /* 密码 */
  password?: string;
  /* OAuth ID */
  oauthId?: number;
  /* 授权码 */
  authorizationCode?: string;
  /* 记住我 */
  rememberMe?: boolean;
}

export interface RegisterParams {
  userName: string;
  nickName: string;
  email: string;
  emailCode: string;
  password: string;
  rePassword: string;
  oauthId?: number;
  authorizationCode?: string;
}

export interface ResetPasswordParams {
  email: string;
  emailCode: string;
  password: string;
  rePassword: string;
}

export interface PutUserInformationParams {
  nickName?: string;
  email?: string;
  description?: string;
  gender?: string;
}

export interface BindGithubIdParams {
  githubId?: number;
  authorizationCode?: string;
}

export interface LoginByGithubParams {
  githubId?: number;
  authorizationCode?: string;
  rememberMe?: boolean;
}

/**
 * 响应结果接口
 */

export interface LoginResult {
  [key: string]: any;
}

export interface CalculationPointResult {
  freePoint: number;
  payPoint: number;
}

export type TaskCountByDateResult = [string, number][];

export interface UserInfoByGithubCodeResult {
  githubId: number;
  githubUsername: string;
  authorizationCode: string;
}

export interface GithubClientIdResult {
  clientId: string;
}

export interface LoginByGithubResult {
  [key: string]: unknown;
}

// 通用空结果接口
export interface EmptyResult {
  [key: string]: any;
}

/**
 * 响应类型定义
 */

// 登录接口响应
export type LoginResponse = BaseResponse<LoginResult>;

// 登出接口响应
export type LogoutResponse = BaseResponse<EmptyResult>;

// 是否登录接口响应
export type IsLoginResponse = BaseResponse<EmptyResult>;

// 获取用户信息接口响应
export type InfoResponse = BaseResponse<EmptyResult>;

// 注册接口响应
export type RegisterResponse = BaseResponse<EmptyResult>;

// 重置密码接口响应
export type ResetPasswordResponse = BaseResponse<EmptyResult>;

// 发送邮箱验证码接口响应
export type SendEmailCodeResponse = BaseResponse<EmptyResult>;

// 权限测试接口响应
export type AuthTestResponse = BaseResponse<EmptyResult>;

// 获取用户信息接口响应
export type GetUserInformationResponse = BaseResponse<EmptyResult>;

// 获取算力点接口响应
export type GetCalculationPointResponse = BaseResponse<CalculationPointResult>;

// 获取任务统计接口响应
export type GetTaskCountByDateResponse = BaseResponse<TaskCountByDateResult>;

// 修改用户信息接口响应
export type PutUserInformationResponse = BaseResponse<EmptyResult>;

// 上传头像接口响应
export type UpdateAvatarResponse = BaseResponse<EmptyResult>;

// 获取Github客户端ID接口响应
export type GetGithubClientIdResponse = BaseResponse<GithubClientIdResult>;

// 获取Github用户信息（通过code）接口响应
export type GetUserInfoByGithubCodeResponse = BaseResponse<UserInfoByGithubCodeResult>;

// 使用GitHub登录接口响应
export type LoginByGithubResponse = BaseResponse<LoginByGithubResult>;

// 绑定Github ID接口响应
export type BindGithubIdResponse = BaseResponse<EmptyResult>;
