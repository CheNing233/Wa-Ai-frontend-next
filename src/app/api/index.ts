import { WaApp } from "@/app/app.tsx";
import {
  InfoResponse,
  IsLoginResponse,
  LoginParams,
  LoginResponse,
  LogoutResponse,
  RegisterParams,
  RegisterResponse,
  SendEmailCodeParams,
  SendEmailCodeResponse
} from "@/app/api/model/user.ts";
import { apiRoutes } from "@/config/api-routes.ts";


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
}

