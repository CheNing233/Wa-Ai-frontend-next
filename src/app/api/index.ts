import { WaApp } from "@/app/app.tsx";
import {
  InfoResponse,
  IsLoginResponse,
  LoginParams,
  LoginResponse,
  LogoutResponse,
  RegisterParams,
  RegisterResponse,
  ResetPasswordParams,
  ResetPasswordResponse,
  SendEmailCodeParams,
  SendEmailCodeResponse
} from "@/app/api/model/user.ts";
import { apiRoutes } from "@/config/api-routes.ts";
import { GetStaticImageUrlByIdParams, GetStaticImageUrlByIdResponse } from "@/app/api/model/static-image.ts";
import { GetTaskByUserParams, GetTaskByUserResponse } from "@/app/api/model/task.ts";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { AbortableParams } from "@/app/api/model/base.ts";


export const WaApiEventList = {
  http_error: "http_error" as const,
  network_error: "network_error" as const
};

export class WaApi extends EventTarget {
  #registeredType = new Set<string>();

  app: WaApp;
  api_host: string;
  api_entry: string;
  api_ws_entry: string;


  constructor(
    app: WaApp,
    test_url?: string
  ) {
    super();
    this.app = app;
    this.api_host = test_url || `${location.protocol}//${location.host}`;
    this.api_entry = !test_url ? "/api" : "";
    this.api_ws_entry = !test_url ? "/ws" : "";
  }

  addEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: AddEventListenerOptions | boolean
  ) {
    super.addEventListener(type, callback, options);
    this.#registeredType.add(type);
  }

  removeEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null
  ) {
    super.removeEventListener(type, callback);
  }

  getApiUrl() {
    return `${this.api_host}${this.api_entry}`;
  }

  getWsUrl() {
    return `${this.api_host}${this.api_ws_entry}`;
  }

  async fetchApi(url: string, options?: RequestInit): Promise<Response | null> {
    const target = this.getApiUrl() + url;

    try {
      const response = await fetch(target, options);

      // 处理非网络错误（HTTP状态码错误）
      if (!response.ok) {
        console.warn(`WaApi HTTP Error: ${target} ${response.status} ${response.statusText}`);
        this.dispatchEvent(new CustomEvent(WaApiEventList.http_error, {
          detail: {
            status: response.status,
            statusText: response.statusText
          }
        }));
      }

      return response;
    } catch (e) {
      // 仅捕获网络错误（如DNS解析失败、跨域限制等）
      console.warn(`WaApi Network Error: ${target}`, e);
      this.dispatchEvent(new CustomEvent(WaApiEventList.network_error, {
        detail: e
      }));

      return null;
    }
  }

  /**
   * 使用 Axios 库异步获取 API 数据
   * @deprecated
   * @param url 请求的 URL
   * @param options 可选的请求配置，包括方法和请求体
   * @returns 返回一个 Promise，解析为响应数据或 null
   */
  async fetchApiWithAxios(url: string, options?: RequestInit): Promise<any | null> {
    // 目标 URL
    const target = url;

    // fetch 转 Axios 配置
    const config: AxiosRequestConfig = {
      baseURL: "/api",
      url: target,
      method: options?.method || "GET",
      data: options?.body
    };

    try {
      // 发起请求并获取响应
      const response = await axios(config);

      // axios 转 fetch 响应
      return {
        json: () => Promise.resolve(response.data)
      };
    } catch (error) {
      // 将错误转换为 AxiosError 类型，以便处理不同类型的错误
      const axiosError = error as AxiosError;

      // 处理 HTTP 状态码错误（4xx/5xx）
      if (axiosError.response) {
        console.warn(`WaApi HTTP Error: ${target} ${axiosError.response.status} ${axiosError.response.statusText}`);
        this.dispatchEvent(new CustomEvent(WaApiEventList.http_error, {
          detail: {
            status: axiosError.response.status,
            statusText: axiosError.response.statusText
          }
        }));
      }
      // 处理网络错误（DNS/CORS/超时等）
      else if (axiosError.request) {
        console.warn(`WaApi Network Error: ${target}`, axiosError);
        this.dispatchEvent(new CustomEvent(WaApiEventList.network_error, {
          detail: axiosError
        }));
      }

      // 在发生错误时返回 null
      return null;
    }
  }

  async login(p: LoginParams) {
    const r = await this.fetchApi(apiRoutes.account.login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(p)
    });

    return await r?.json() as LoginResponse;
  }

  async isLogin() {
    const r = await this.fetchApi(apiRoutes.account.isLogin, {
      method: "GET"
    });

    return await r?.json() as IsLoginResponse;
  }

  async logout() {
    const r = await this.fetchApi(apiRoutes.account.logout, {
      method: "POST"
    });

    return await r?.json() as LogoutResponse;
  }

  async getMyUserInfo() {
    const r = await this.fetchApi(apiRoutes.account.me, {
      method: "GET"
    });

    return await r?.json() as InfoResponse;
  }

  async register(p: RegisterParams) {
    const r = await this.fetchApi(apiRoutes.account.register, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(p)
    });

    return await r?.json() as RegisterResponse;
  }

  async sendEmailCode(p: SendEmailCodeParams) {
    const r = await this.fetchApi(
      `${apiRoutes.account.sendEmailCode}?email=${p.email}&type=${p.type}`,
      { method: "POST" }
    );

    return await r?.json() as SendEmailCodeResponse;
  }

  async resetPassword(p: ResetPasswordParams) {
    const r = await this.fetchApi(apiRoutes.account.resetPassword, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(p)
    });

    return await r?.json() as ResetPasswordResponse;
  }

  async getStaticImageUrlById(p: GetStaticImageUrlByIdParams & AbortableParams)
    : Promise<[GetStaticImageUrlByIdResponse, Response | null]> {

    let options: RequestInit = {
      method: "GET"
    };

    if (p.signal) options["signal"] = p.signal;

    const r = await this.fetchApi(
      `${apiRoutes.staticImage.getUrlById}?id=${p.id}`,
      options
    );

    return [await r?.json() as GetStaticImageUrlByIdResponse, r];
  }

  async getTaskByUser(p: GetTaskByUserParams) {

    const r = await this.fetchApi(
      `${apiRoutes.task.getTaskByUser}?page=${p.page}&pageSize=${p.pageSize}`,
      { method: "GET" }
    );

    return await r?.json() as GetTaskByUserResponse;
  }
}

